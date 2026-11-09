import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { comDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { backLocaleError, translateBackTexts } from 'back/locales/back';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { and, asc, eq, inArray, sql } from 'drizzle-orm';
import { CmComWid } from 'shared/api';
import { CmEditorTsjrpcModel } from 'shared/api/tsjrpc/cm/editor.tsjrpc.model';
import { CmCom } from 'shared/const/cm/Com';
import { Bool } from 'shared/enums';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { chordsBlockIncorrectMessage } from 'shared/utils/cm/com/chordsBlockIncorrectMessage';
import { objectKeys, objectLength, objectValues } from 'shared/utils/object.utils';
import { cmEditComBusyTsjrpcMethods } from './complect/edit-com-busy';
import { cmGetResourceHTMLString } from './complect/mp3-rules';
import { cmShareEditorServerTsjrpcMethods } from './editor.tsjrpc.shares';
import { chordPackFileStore, eePackFileStore, mp3ResourcesFileStorage } from './file-stores';
import { cmShareServerTsjrpcMethods } from './tsjrpc.shares';

export const cmEditorTsjrpcBaseServer = new (class CmEditor extends TsjrpcBaseServer<CmEditorTsjrpcModel> {
  constructor() {
    super({
      scope: 'CmEditor',
      methods: {
        ...cmEditComBusyTsjrpcMethods,

        setChords: async ({ chords }, { auth }) => {
          if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'CHORD', 'U')) throw '';

          chordPackFileStore.setValue({ ...chordPackFileStore.getValue(), ...chords });
          const modifiedAt = chordPackFileStore.fileModifiedAt();
          cmShareServerTsjrpcMethods.editedChords({ chords, modifiedAt }, null);

          return {
            value: chords,
            description: backLocaleError(BackLocaleKey.CmEditorChordsChanged, { l: objectKeys(chords).join(', ') }),
          };
        },

        setEEWords: async ({ words }, { auth }) => {
          if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'EE', 'U')) throw '';

          eePackFileStore.setValue({ ...eePackFileStore.getValue(), ...words });
          const modifiedAt = eePackFileStore.fileModifiedAt();
          cmShareEditorServerTsjrpcMethods.editedEEWords(
            {
              words,
              modifiedAt,
            },
            (_, auth) => {
              try {
                throwIfNoUserScopeAccessRight(auth, 'cm', 'EDIT', 'R');
              } catch (_) {
                return false;
              }
              return true;
            },
          );

          return {
            value: words,
            description: backLocaleError(BackLocaleKey.CmEditorEEWordsChanged, { l: objectKeys(words).join(', ') }),
          };
        },

        getResourceHTMLString: cmGetResourceHTMLString,
        getMp3RulesList: async () => ({ value: mp3ResourcesFileStorage.getValue() }),
        getSmartSearchFilters: async (_, { visitInfo }) => ({
          value: {
            filters: [
              {
                id: BackLocaleKey.CmSmartSearchNoSecondTextSplit,
                title: translateBackTexts(visitInfo?.langi, BackLocaleKey.CmSmartSearchNoSecondTextSplit),
              },
              {
                id: BackLocaleKey.CmSmartSearchNoTextSplits,
                title: translateBackTexts(visitInfo?.langi, BackLocaleKey.CmSmartSearchNoTextSplits),
              },
              {
                id: BackLocaleKey.CmSmartSearchIncorrectChords,
                title: translateBackTexts(visitInfo?.langi, BackLocaleKey.CmSmartSearchIncorrectChords),
              },
              {
                id: BackLocaleKey.CmSmartSearchTooFewSlides,
                title: translateBackTexts(visitInfo?.langi, BackLocaleKey.CmSmartSearchTooFewSlides),
              },
            ],
          },
        }),
        getSmartSearchComws: async ({ filterId }) => {
          let comws: CmComWid[];

          switch (filterId) {
            case BackLocaleKey.CmSmartSearchNoSecondTextSplit:
            case BackLocaleKey.CmSmartSearchNoTextSplits: {
              const nlFilter =
                filterId === BackLocaleKey.CmSmartSearchNoSecondTextSplit
                  ? sql`(jsonb_path_exists(${comDB.nl}, '$[0] ? (@ != null)') and not jsonb_path_exists(${comDB.nl}, '$[1 to last] ? (@ != null)'))`
                  : sql`(${comDB.nl} is null or not jsonb_path_exists(${comDB.nl}, '$[*] ? (@ != null)'))`;

              comws = (
                await db
                  .select({ w: comDB.w })
                  .from(comDB)
                  .where(and(eq(comDB.isRemoved, Bool.False), nlFilter))
                  .orderBy(asc(comDB.w))
              ).map(it => it.w);
              break;
            }
            case BackLocaleKey.CmSmartSearchIncorrectChords:
              comws = (
                await db
                  .select({ w: comDB.w, c: comDB.c, c1: comDB.c1 })
                  .from(comDB)
                  .where(eq(comDB.isRemoved, Bool.False))
                  .orderBy(asc(comDB.w))
              )
                .filter(
                  ({ c, c1 }) =>
                    c.some(block => chordsBlockIncorrectMessage(block, Bool.False).errors?.length) ||
                    c1?.some(block => chordsBlockIncorrectMessage(block, Bool.True).errors?.length),
                )
                .map(it => it.w);
              break;
            case BackLocaleKey.CmSmartSearchTooFewSlides: {
              const comRows = await db
                .select({ w: comDB.w, nl: comDB.nl, am: comDB.am })
                .from(comDB)
                .where(eq(comDB.isRemoved, Bool.False))
                .orderBy(asc(comDB.w));
              const candidateWids = comRows
                .filter(
                  ({ nl, am }) =>
                    nl?.[0] != null || (am != null && objectValues(am).some(src => objectLength(src))),
                )
                .map(({ w }) => w);
              const candidateComRows = candidateWids.length
                ? await db.select().from(comDB).where(inArray(comDB.w, candidateWids)).orderBy(asc(comDB.w))
                : [];

              comws = candidateComRows
                .filter(comRow => {
                  const { nl, am } = comRow;
                  const markCounts = am ? objectValues(am).map(objectLength) : [];
                  const hasMarks = markCounts.some(count => count > 0);

                  if (nl?.[0] == null && !hasMarks) return false;

                  try {
                    const com = new CmCom(comRow, null, null, Bool.False);
                    const expandLines = com.makeExpandLines(null);
                    const slides1 = com.makeExpandSlides([1], true, undefined, expandLines).length;

                    if (
                      nl?.[0] != null &&
                      com.makeExpandSlides([0], true, undefined, expandLines).length * 2 < slides1
                    )
                      return true;

                    return hasMarks && Math.max(...markCounts) * 2 < slides1;
                  } catch (_error) {
                    return false;
                  }
                })
                .map(it => it.w);
              break;
            }
            default:
              throw backLocaleError(BackLocaleKey.CmSmartSearchUnknownFilter);
          }

          return { value: { comws } };
        },
        addMp3Rule: async ({ rule }, { auth }) => {
          if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'MP3', 'U')) throw '';

          mp3ResourcesFileStorage.modifyValueWithAutoSave(srcs => srcs.push(rule));

          return { description: backLocaleError(BackLocaleKey.CmEditorMp3RuleAdded) };
        },
        setMp3Rule: async ({ rule }, { auth }) => {
          if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'MP3', 'U')) throw '';

          mp3ResourcesFileStorage.modifyValueWithAutoSave(list => {
            const index = list.findIndex(r => r.w === rule.w);
            if (index < 0) throw backLocaleError(BackLocaleKey.CmEditorMp3RuleNotFound);
            list.splice(index, 1, rule);
          });

          return { description: backLocaleError(BackLocaleKey.CmEditorMp3RuleChanged) };
        },

        requestFreshes: async ({ lastModfiedAt }, { client, auth }) => {
          lastModfiedAt = Math.trunc(lastModfiedAt);

          try {
            if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'EDIT', 'R')) throw '';
          } catch (_) {
            return;
          }

          const eePackModifiedAt = eePackFileStore.fileModifiedAt();
          if (eePackModifiedAt > lastModfiedAt) {
            cmShareEditorServerTsjrpcMethods.refreshEEPack(
              {
                modifiedAt: eePackModifiedAt,
                pack: eePackFileStore.getValue(),
              },
              client,
            );
          }
        },
      },
    });
  }
})();
