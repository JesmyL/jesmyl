import { constantsConfigFileStore } from 'back/apps/index/schedules/file-stores';
import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { comDB } from 'back/drizzle.schema';
import { db, dbDelete } from 'back/drizzle/drizzle.db';
import { makePgCheckedSelectExportableComSqlRaw } from 'back/drizzle/ex/com.selectors';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { eq } from 'drizzle-orm';
import { CmComIntensityLevel, CmComWid, Langi } from 'shared/api';
import { CmEditComTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com.tsjrpc.model';
import { cmComIntensityLevelTitleDict } from 'shared/const/cm/cmComDriveLevelTitleDict';
import { cmComMetricNumTitles } from 'shared/const/cm/com-metric-nums';
import { Bool } from 'shared/enums';
import { itNNil } from 'shared/utils';
import { takeCorrectMetronomeBpm } from 'shared/utils/cm';
import { cmComLanguages } from 'shared/utils/cm/com/const';
import { textLinesLengthIncorrects } from 'shared/utils/cm/com/textLinesLengthIncorrects';
import { transformToClearText } from 'shared/utils/cm/com/transformToClearText';
import { makeCmComNumLeadAudioLinkList, makeCmComNumLeadLinkFromHttp } from '../complect/com-http-links';
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

        rename: modifyCom('COM_MAIN', (com, { value }) =>
          simpleUpdateReverse(`переименована на "${value}"`, (com.n = value)),
        ),

        setBpM: modifyCom('COM_MAIN', (com, { value }) =>
          simpleUpdateReverse(
            `значение ударов в минуту установлено в ${value} (было ${com.bpm})`,
            (com.bpm = takeCorrectMetronomeBpm(value)),
          ),
        ),

        setMeterSize: modifyCom('COM_MAIN', (com, { value }) =>
          simpleUpdateReverse(
            `размерность теперь ${cmComMetricNumTitles[value]} (было ${cmComMetricNumTitles[com.s ?? 4]})`,
            (com.s = value),
          ),
        ),

        changeLanguage: modifyCom('COM_MAIN', (com, { value }) =>
          simpleUpdateReverse(
            `язык изменён на ${cmComLanguages[value]} (было ${com.l == null ? null : cmComLanguages[com.l]})`,
            (com.l = value),
          ),
        ),

        changeDrive: modifyCom('COM_MAIN', (com, { value }) =>
          simpleUpdateReverse(
            `уровень интенсивности установлен как "${cmComIntensityLevelTitleDict[com.d ?? CmComIntensityLevel.Medium]}" (было ${cmComIntensityLevelTitleDict[com.d ?? CmComIntensityLevel.Medium]})`,
            (com.d = value),
          ),
        ),

        changeTon: modifyCom('COM_MAIN', (com, { value }) =>
          simpleUpdateReverse(`тональность изменена на ${value} (было ${com.p})`, (com.p = value)),
        ),

        makeBemoled: modifyCom('COM_MAIN', (com, { value }) =>
          simpleUpdate((com.b = value), `теперь ${value ? 'бемольная' : 'диезная'}`),
        ),

        toggleAudioLink: modifyCom('COM_AUDIO', (com, { link }) => {
          const prev = makeCmComNumLeadAudioLinkList(com.al);
          const isThereInPrev = prev?.includes(link);

          com.al = isThereInPrev ? prev?.filter(pLink => pLink !== link) : [...(prev ?? []), link];

          return `изменение аудио-ссылок:\n\n${isThereInPrev ? 'удалено' : 'добавлено'}:\n${link}\n\nбыло:\n${prev}`;
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
            w,
            m: w,
            t: newCom.t?.map(text => transformToClearText(text)),
            l: newCom.l || Langi.Ru,
            al: newCom.al?.map(makeCmComNumLeadLinkFromHttp) || [],
          };

          try {
            com.al = com.al?.map(makeCmComNumLeadLinkFromHttp);
          } catch {
            //
          }

          await db.insert(comDB).values(com);

          cmShareServerTsjrpcMethods.editedCom({ com, mod: w }, null);

          return { value: com.w, description: `Добавлена новая песня "${com.n}"` };
        },

        remove: modifyCom(['COM', 'D'], com => simpleUpdate((com.isRemoved = Bool.True), `удалена`)),

        bringBackToLife: modifyCom(['COM', 'C'], com =>
          simpleUpdate((com.isRemoved = Bool.False), `(ранее удалённая) возвращена`),
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

          if (!com) throw 'Неизвестная песня';
          if (!com.is) throw 'Сначала песню нужно удалить';

          await dbDelete(comDB, whereComw);

          return { value: com.n, description: `Песня ${com.n} уничтожена` };
        },
      },
    });
  }
})();

export * from './lib/modifiers';

const simpleUpdate = (_result: unknown, dsc: string) => dsc;
const simpleUpdateReverse = (dsc: string, _result: unknown) => dsc;
