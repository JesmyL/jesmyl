import { constantsConfigFileStore } from 'back/apps/index/schedules/file-stores';
import { takeCmAudioKeyFromLink } from 'back/audio/md5LinkRedirectDict';
import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { comDB } from 'back/drizzle.schema';
import { db, dbDelete } from 'back/drizzle/drizzle.db';
import { makePgCheckedSelectExportableComSqlRaw } from 'back/drizzle/ex/com.selectors';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import type { TSJRPCFeedbackDiff, TSJRPCFeedbackEntry } from 'back/tsjrpc.model';
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

        setBpM: modifyCom('COM_MAIN', (com, { value }) => {
          const prev = com.bpm;
          const next = (com.bpm = takeCorrectMetronomeBpm(value));

          return simpleUpdateReverse('изменено значение ударов в минуту', next, { was: prev, new: next });
        }),

        setMeterSize: modifyCom('COM_MAIN', (com, { value }) => {
          const was = cmComMetricNumTitles[com.s ?? 4];
          const next = (com.s = value);

          return simpleUpdateReverse('размерность изменена', next, { was, new: cmComMetricNumTitles[next] });
        }),

        changeLanguage: modifyCom('COM_MAIN', (com, { value }) => {
          const was = com.l == null ? null : cmComLanguages[com.l];
          const next = (com.l = value);

          return simpleUpdateReverse('язык изменён', next, { was, new: cmComLanguages[next] });
        }),

        changeDrive: modifyCom('COM_MAIN', (com, { value }) => {
          const was = cmComIntensityLevelTitleDict[com.d ?? CmComIntensityLevel.Medium];
          const next = (com.d = value);

          return simpleUpdateReverse('уровень интенсивности изменён', next, {
            was,
            new: cmComIntensityLevelTitleDict[next],
          });
        }),

        changeTon: modifyCom('COM_MAIN', (com, { value }) => {
          const was = com.p;
          const next = (com.p = value);

          return simpleUpdateReverse('тональность изменена', next, { was, new: next });
        }),

        makeBemoled: modifyCom('COM_MAIN', (com, { value }) =>
          simpleUpdate((com.b = value), `теперь ${value ? 'бемольная' : 'диезная'}`),
        ),

        toggleAudioLink: modifyCom('COM_AUDIO', async (com, { link }) => {
          const prev = com.al ?? [];
          const key = await takeCmAudioKeyFromLink(link, com.n);
          const isThereInPrev = prev.includes(key);

          com.al = isThereInPrev ? prev.filter(pLink => pLink !== key) : [...prev, key];

          return {
            description: `изменение аудио-ссылок: ${isThereInPrev ? 'удалено' : 'добавлено'}`,
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
            w,
            m: w,
            t: newCom.t?.map(text => transformToClearText(text)),
            l: newCom.l || Langi.Ru,
            al: await Promise.all((newCom.al ?? []).map(link => takeCmAudioKeyFromLink(link, newCom.n))),
          };

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

const simpleUpdate = (_result: unknown, description: string, diff?: TSJRPCFeedbackDiff): TSJRPCFeedbackEntry => ({
  description,
  ...diff,
});
const simpleUpdateReverse = (
  description: string,
  _result: unknown,
  diff?: TSJRPCFeedbackDiff,
): TSJRPCFeedbackEntry => ({ description, ...diff });
