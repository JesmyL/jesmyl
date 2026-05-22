import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { CmComIntensityLevel } from 'shared/api';
import { CmEditComTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com.tsjrpc.model';
import { cmComIntensityLevelTitleDict } from 'shared/const/cm/cmComDriveLevelTitleDict';
import { cmComMetricNumTitles } from 'shared/const/cm/com-metric-nums';
import { itNNil } from 'shared/utils';
import { takeCorrectMetronomeBpm } from 'shared/utils/cm';
import { cmComLanguages } from 'shared/utils/cm/com/const';
import { textLinesLengthIncorrects } from 'shared/utils/cm/com/textLinesLengthIncorrects';
import { transformToClearText } from 'shared/utils/cm/com/transformToClearText';
import { makeCmComNumLeadAudioLinkList, makeCmComNumLeadLinkFromHttp } from '../complect/com-http-links';
import { mapCmExportableToImportableCom, mapCmImportableToExportableCom } from '../complect/tools';
import { cmConstantsConfigFileStore, comsDirStorage } from '../file-stores';
import { cmShareServerTsjrpcMethods } from '../tsjrpc.shares';
import { modifyCom } from './lib/modifiers';
import { cmEditComServerTsjrpcNewlines } from './newlines';
import { cmEditComServerTsjrpcTextableBlocks } from './textableBlocks';

export const cmEditComServerTsjrpcBase = new (class CmEditCom extends TsjrpcBaseServer<CmEditComTsjrpcModel> {
  constructor() {
    super({
      scope: 'CmEditCom',
      methods: {
        ...cmEditComServerTsjrpcNewlines,
        ...cmEditComServerTsjrpcTextableBlocks,

        rename: modifyCom((com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_MAIN', 'U')) throw '';

          com.n = value;

          return `переименована на "${value}"`;
        }),

        setBpM: modifyCom((com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_MAIN', 'U')) throw '';

          const prev = com.bpm;
          com.bpm = takeCorrectMetronomeBpm(value);

          if (takeCorrectMetronomeBpm() === com.bpm) delete com.bpm;

          return `значение ударов в минуту установлено в ${value} (было ${prev})`;
        }),

        setMeterSize: modifyCom((com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_MAIN', 'U')) throw '';

          const prev = com.s;
          com.s = value;
          if (com.s === 4) delete com.s;

          return `размерность теперь ${cmComMetricNumTitles[value]} (было ${cmComMetricNumTitles[prev ?? 4]})`;
        }),

        changeLanguage: modifyCom((com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_MAIN', 'U')) throw '';

          const prev = com.l;
          com.l = value || undefined;

          return `язык изменён на ${cmComLanguages[value]} (было ${prev == null ? null : cmComLanguages[prev]})`;
        }),

        changeDrive: modifyCom((com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_MAIN', 'U')) throw '';

          const prev = com.d;
          com.d = value;
          if (com.d === CmComIntensityLevel.Medium) delete com.d;

          return `уровень интенсивности установлен как "${cmComIntensityLevelTitleDict[com.d ?? CmComIntensityLevel.Medium]}" (было ${cmComIntensityLevelTitleDict[prev ?? CmComIntensityLevel.Medium]})`;
        }),

        changeTon: modifyCom((com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_MAIN', 'U')) throw '';

          const prev = com.p;
          com.p = value;

          return `тональность изменена на ${value} (было ${prev})`;
        }),

        makeBemoled: modifyCom((com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_MAIN', 'U')) throw '';

          com.b = value || undefined;

          return `теперь ${value ? 'бемольная' : 'диезная'}`;
        }),

        toggleAudioLink: modifyCom((com, { link }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_AUDIO', 'U')) throw '';

          const prev = makeCmComNumLeadAudioLinkList(com.al);
          const isThereInPrev = prev?.includes(link);

          com.al = isThereInPrev ? prev?.filter(pLink => pLink !== link) : [...(prev ?? []), link];

          return `изменение аудио-ссылок:\n\n${isThereInPrev ? 'удалено' : 'добавлено'}:\n${link}\n\nбыло:\n${prev}`;
        }),

        newCom: async ({ value: newCom }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM', 'C')) throw '';

          const incorrects = newCom.t
            ?.map(text =>
              textLinesLengthIncorrects(text, cmConstantsConfigFileStore.getValue().maxAvailableComLineLength),
            )
            .filter(itNNil);

          if (incorrects?.[0]?.errors?.length) throw incorrects[0].errors[0].message;

          const com = {
            ...newCom,
            w: Date.now(),
            t: newCom.t?.map(text => transformToClearText(text)),
          };

          try {
            com.al = com.al?.map(makeCmComNumLeadLinkFromHttp);
          } catch {
            //
          }
          comsDirStorage.createItem(() => mapCmExportableToImportableCom(com), com.w);

          const mod = comsDirStorage.saveItem(com.w) ?? 0;

          cmShareServerTsjrpcMethods.editedCom({ com, mod }, null);

          return { value: com, description: `Добавлена новая песня "${com.n}"` };
        },

        remove: modifyCom((com, _, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM', 'D')) throw '';

          com.isRemoved = 1;

          return `удалена`;
        }),

        bringBackToLife: modifyCom((com, _, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM', 'C')) throw '';

          delete com.isRemoved;

          return `(ранее удалённая) возвращена`;
        }),

        takeRemovedComs: async (_, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM', 'C')) throw '';

          return {
            value: comsDirStorage
              .getAllItems()
              .filter(com => com.isRemoved)
              .map(mapCmImportableToExportableCom),
          };
        },
        destroy: async ({ comw }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM', 'C')) throw '';
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM', 'R')) throw '';
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM', 'U')) throw '';
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM', 'D')) throw '';

          const com = comsDirStorage.getItem(comw);
          if (com == null) throw '';
          comsDirStorage.deleteItem(comw);

          return { value: com.n, description: `Песня ${com.n} НЕ уничтожена` };
        },
      },
    });
  }
})();

export * from './lib/modifiers';
