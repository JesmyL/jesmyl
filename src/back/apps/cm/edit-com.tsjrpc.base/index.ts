import { constantsConfigFileStore } from 'back/apps/index/schedules/file-stores';
import { takeCmAudioKeyFromLink } from 'back/audio/md5LinkRedirectDict';
import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { comDB } from 'back/drizzle.schema';
import { db, dbDelete } from 'back/drizzle/drizzle.db';
import { makePgCheckedSelectExportableComSqlRaw } from 'back/drizzle/ex/com.selectors';
import { backLocaleError } from 'back/locales/back';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import type { TSJRPCFeedbackDiff, TSJRPCFeedbackEntry } from 'back/tsjrpc.model';
import { eq } from 'drizzle-orm';
import { makeRegExp } from 'regexpert';
import { CmComIntensityLevel, CmComWid, Langi } from 'shared/api';
import { CmEditComTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com.tsjrpc.model';
import { cmComIntensityLevelTitleDict } from 'shared/const/cm/cmComDriveLevelTitleDict';
import { cmComMetricNumTitles } from 'shared/const/cm/com-metric-nums';
import { Bool } from 'shared/enums';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { itNNil } from 'shared/utils';
import { takeCorrectMetronomeBpm } from 'shared/utils/cm';
import { cmComLanguages } from 'shared/utils/cm/com/const';
import { textLinesLengthIncorrects } from 'shared/utils/cm/com/textLinesLengthIncorrects';
import { transformToClearText } from 'shared/utils/cm/com/transformToClearText';
import { cmShareServerTsjrpcMethods } from '../tsjrpc.shares';
import { modifyCom } from './lib/modifiers';
import { cmEditComServerTsjrpcNewlines } from './newlines';
import { cmEditComServerTsjrpcTextableBlocks } from './textableBlocks';

export const cmEditComServerTsjrpcBase = new (class CmEditCom extends TsjrpcBaseServer<CmEditComTsjrpcModel> {
  constructor() {
    super({
      scope: 'CmEditCom',
      methods: {
        ...cmEditComServerTsjrpcNewlines(),
        ...cmEditComServerTsjrpcTextableBlocks,

        rename: modifyCom('COM_MAIN', (com, { value }) => {
          // Нормализуем имя на границе входа: пробельный дефисный штрих (« - », « -- ») становится длинным тире « — » до записи в com.n
          const n = value.replace(makeRegExp('/( -+) /g'), ' — ');

          return simpleUpdateReverse(backLocaleError(BackLocaleKey.CmComRenamed, { v: n }), (com.n = n));
        }),

        setBpM: modifyCom('COM_MAIN', (com, { value }) => {
          const prev = com.bpm;
          const next = (com.bpm = takeCorrectMetronomeBpm(value));

          return simpleUpdateReverse(backLocaleError(BackLocaleKey.CmComBpmSet), next, { was: prev, new: next });
        }),

        setMeterSize: modifyCom('COM_MAIN', (com, { value }) => {
          const was = cmComMetricNumTitles[com.s ?? 4];
          const next = (com.s = value);

          return simpleUpdateReverse(backLocaleError(BackLocaleKey.CmComMeterSizeSet), next, {
            was,
            new: cmComMetricNumTitles[next],
          });
        }),

        changeLanguage: modifyCom('COM_MAIN', (com, { value }) => {
          const was = com.l == null ? null : cmComLanguages[com.l];
          const next = (com.l = value);

          return simpleUpdateReverse(backLocaleError(BackLocaleKey.CmComLanguageSet), next, {
            was,
            new: cmComLanguages[next],
          });
        }),

        changeDrive: modifyCom('COM_MAIN', (com, { value }) => {
          const was = cmComIntensityLevelTitleDict[com.d ?? CmComIntensityLevel.Medium];
          const next = (com.d = value);

          return simpleUpdateReverse(backLocaleError(BackLocaleKey.CmComDriveSet), next, {
            was,
            new: cmComIntensityLevelTitleDict[next],
          });
        }),

        changeTon: modifyCom('COM_MAIN', (com, { value }) => {
          const was = com.p;
          const next = (com.p = value);

          return simpleUpdateReverse(backLocaleError(BackLocaleKey.CmComTonSet), next, { was, new: next });
        }),

        makeBemoled: modifyCom('COM_MAIN', (com, { value }) =>
          simpleUpdate(
            (com.b = value),
            backLocaleError(value ? BackLocaleKey.CmComMadeFlat : BackLocaleKey.CmComMadeSharp),
          ),
        ),

        toggleAudioLink: modifyCom('COM_AUDIO', async (com, { link }) => {
          const prev = com.al ?? [];

          if (prev.some(pLink => pLink === link)) {
            com.al = prev.filter(pLink => pLink !== link);

            return {
              description: backLocaleError(BackLocaleKey.CmComAudioLinkRemoved),
              was: prev,
              new: com.al,
            };
          }

          const key = await takeCmAudioKeyFromLink(link, com.n);
          const isThereInPrev = prev.includes(key);

          com.al = isThereInPrev ? prev.filter(pLink => pLink !== key) : [...prev, key];

          return {
            description: backLocaleError(
              isThereInPrev ? BackLocaleKey.CmComAudioLinkRemoved : BackLocaleKey.CmComAudioLinkAdded,
            ),
            was: prev,
            new: com.al,
          };
        }),

        newCom: async ({ value: newCom }, { auth }) => {
          if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'COM', 'C')) throw '';

          const incorrects = newCom.t
            ?.map(text =>
              textLinesLengthIncorrects(text, constantsConfigFileStore.getValue().maxAvailableComLineLength),
            )
            .filter(itNNil);

          if (incorrects?.[0]?.errors?.length) throw incorrects[0].errors[0].message;

          const w = Date.now() as CmComWid;

          const com = {
            ...newCom,
            // Имя нормализуем на границе входа: пробельный дефисный штрих (« - », « -- ») становится « — » до вставки в базу
            n: newCom.n.replace(makeRegExp('/( -+) /g'), ' — '),
            w,
            m: w,
            t: newCom.t?.map(text => transformToClearText(text)),
            l: newCom.l || Langi.Ru,
            al: await Promise.all((newCom.al ?? []).map(link => takeCmAudioKeyFromLink(link, newCom.n))),
          };

          await db.insert(comDB).values(com);

          cmShareServerTsjrpcMethods.editedCom({ com, mod: w }, null);

          return { value: com.w, description: backLocaleError(BackLocaleKey.CmComCreated, { v: com.n }) };
        },

        remove: modifyCom(['COM', 'D'], com =>
          simpleUpdate((com.isRemoved = Bool.True), backLocaleError(BackLocaleKey.CmComDeleted)),
        ),

        bringBackToLife: modifyCom(['COM', 'C'], com =>
          simpleUpdate((com.isRemoved = Bool.False), backLocaleError(BackLocaleKey.CmComRestored)),
        ),

        takeRemovedComs: async (_, { auth }) => {
          if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'COM', 'C')) throw '';

          return {
            value: (
              await db
                .select({ c: makePgCheckedSelectExportableComSqlRaw() })
                .from(comDB)
                .where(eq(comDB.isRemoved, Bool.True))
            ).map(it => it.c),
          };
        },
        destroy: async ({ comw }, { auth }) => {
          if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'COM', 'C')) throw '';
          if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'COM', 'R')) throw '';
          if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'COM', 'U')) throw '';
          if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'COM', 'D')) throw '';

          const whereComw = eq(comDB.w, comw);

          const [com] = await db.select({ n: comDB.n, is: comDB.isRemoved }).from(comDB).where(whereComw);

          if (!com) throw backLocaleError(BackLocaleKey.CmComUnknown);
          if (!com.is) throw backLocaleError(BackLocaleKey.CmComMustDeleteFirst);

          await dbDelete(comDB, whereComw);

          return { value: com.n, description: backLocaleError(BackLocaleKey.CmComDestroyed, { v: com.n }) };
        },
      },
    });
  }
})();

export * from './lib/modifiers';

const simpleUpdate = (_result: unknown, description: string, diff?: TSJRPCFeedbackDiff): TSJRPCFeedbackEntry => ({
  description,
  ...diff,
});
const simpleUpdateReverse = (
  description: string,
  _result: unknown,
  diff?: TSJRPCFeedbackDiff,
): TSJRPCFeedbackEntry => ({ description, ...diff });
