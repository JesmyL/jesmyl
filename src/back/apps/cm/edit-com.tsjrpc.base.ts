import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { ServerTSJRPCTool, TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { CmComWid, IExportableCom, IServerSideCom } from 'shared/api';
import { CmEditComTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com.tsjrpc.model';
import { cmComMetricNumTitles } from 'shared/const/cm/com-metric-nums';
import { itNNil, smylib } from 'shared/utils';
import { CmComUtils } from 'shared/utils/cm/ComUtils';
import { makeCmComHttpToNumLeadAudioLinks, makeCmComNumLeadToHttpAudioLinks } from './complect/com-http-links';
import { mapCmExportableToImportableCom, mapCmImportableToExportableCom } from './complect/tools';
import { cmConstantsConfigFileStore, comsDirStore } from './file-stores';
import { cmShareServerTsjrpcMethods } from './tsjrpc.shares';

export const cmEditComServerTsjrpcBase = new (class CmEditCom extends TsjrpcBaseServer<CmEditComTsjrpcModel> {
  constructor() {
    super({
      scope: 'CmEditCom',
      methods: {
        rename: modifyCom((com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_MAIN', 'U')) throw '';

          const prev = com.n;
          com.n = value;

          return `Песня "${prev}" переименована на ${getCmComNameInBrackets(com)}`;
        }),

        setBpM: modifyCom((com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_MAIN', 'U')) throw '';

          const prev = com.bpm;
          com.bpm = value;

          return `Значение ударов в минуту для песни ${getCmComNameInBrackets(com)} установлено в ${value} (было ${prev})`;
        }),

        setMeterSize: modifyCom((com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_MAIN', 'U')) throw '';

          const prev = com.s;
          com.s = value;

          return `Размерность песни ${getCmComNameInBrackets(com)} установлено в значение ${cmComMetricNumTitles[value]} (было ${cmComMetricNumTitles[prev ?? 4]})`;
        }),

        changeLanguage: modifyCom((com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_MAIN', 'U')) throw '';

          const prev = com.l;
          com.l = value;

          return `Язык песни ${getCmComNameInBrackets(com)} изменён на ${CmComUtils.cmComLanguages[value]} (было ${prev == null ? null : CmComUtils.cmComLanguages[prev]})`;
        }),

        changeTon: modifyCom((com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_MAIN', 'U')) throw '';

          const prev = com.p;
          com.p = value;

          return `Тональность песни ${getCmComNameInBrackets(com)} изменена на ${value} (было ${prev})`;
        }),

        makeBemoled: modifyCom((com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_MAIN', 'U')) throw '';

          com.b = value;

          return `Песня ${getCmComNameInBrackets(com)} теперь ${value ? 'бемольная' : 'диезная'}`;
        }),

        changePushKind: modifyCom((com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_TR', 'U')) throw '';

          const prev = com.k;
          com.k = value;

          return `Изменено значение правила группировок для слайдов в песне ${getCmComNameInBrackets(com)} - ${value} (было ${prev})`;
        }),

        toggleAudioLink: modifyCom((com, { link }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_AUDIO', 'U')) throw '';

          const prev = makeCmComNumLeadToHttpAudioLinks(com.al);
          const isThereInPrev = prev?.includes(link);

          com.al = makeCmComHttpToNumLeadAudioLinks(
            isThereInPrev ? prev?.filter(pLink => pLink !== link) : [...(prev ?? []), link],
          );

          return `Изменение аудио-ссылок для песни ${getCmComNameInBrackets(com)}:\n\n${isThereInPrev ? 'удалено' : 'добавлено'}:\n${link}\n\nбыло:\n${prev}`;
        }),

        changeChordBlock: modifyCom((com, { texti: coli, value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_CH', 'U')) throw '';

          com.c ??= [];
          const prev = com.c[coli];
          com.c[coli] = CmComUtils.trimTextLines(value);

          return `Изменён аккордный блок в песне ${getCmComNameInBrackets(com)}:\n\n${value}\n\nбыло:\n${prev}`;
        }),
        changeTextBlock: modifyCom((com, { texti: coli, value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_TXT', 'U')) throw '';

          const incorrects = CmComUtils.textLinesLengthIncorrects(
            value,
            cmConstantsConfigFileStore.getValue().maxAvailableComLineLength,
          );

          if (incorrects?.errors?.length) throw incorrects.errors[0].message;

          com.t ??= [];
          const prev = com.t[coli];
          com.t[coli] = CmComUtils.transformToClearText(value);

          return `Изменён текстовый блок в песне ${getCmComNameInBrackets(com)}:\n\n${value}\n\nбыло:\n${prev}`;
        }),

        insertChordBlock: insertInTextableBlock('c', (com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_CH', 'C')) throw '';

          return (
            `Вставлен${value ? '' : ' новый'} аккордный блок в песне ` +
            `${getCmComNameInBrackets(com)}${value ? `:\n\n${value}` : ''}`
          );
        }),
        insertTextBlock: insertInTextableBlock('t', (com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_TXT', 'C')) throw '';

          return (
            `Вставлен${value ? '' : ' новый'} текстовый блок в песне ` +
            `${getCmComNameInBrackets(com)}${value ? `:\n\n${value}` : ''}`
          );
        }),

        removeChordBlock: removeTextableBlock('c', (com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_CH', 'D')) throw '';

          return (
            `Удалён${value ? '' : ' новый'} аккордный блок в песне ` +
            `${getCmComNameInBrackets(com)}${value ? `:\n\n${value}` : ''}`
          );
        }),
        removeTextBlock: removeTextableBlock('t', (com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_TXT', 'D')) throw '';

          return (
            `Удалён${value ? '' : ' новый'} текстовый блок в песне ` +
            `${getCmComNameInBrackets(com)}${value ? `:\n\n${value}` : ''}`
          );
        }),

        newCom: async ({ value: newCom }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM', 'C')) throw '';

          const incorrects = newCom.t
            ?.map(text =>
              CmComUtils.textLinesLengthIncorrects(
                text,
                cmConstantsConfigFileStore.getValue().maxAvailableComLineLength,
              ),
            )
            .filter(itNNil);

          if (incorrects?.[0]?.errors?.length) throw incorrects[0].errors[0].message;

          const com = {
            ...newCom,
            w: Date.now(),
            t: newCom.t?.map(text => CmComUtils.transformToClearText(text)),
          };

          comsDirStore.createItem(() => mapCmExportableToImportableCom(com), com.w);
          comsDirStore.saveItem(com.w);

          cmShareServerTsjrpcMethods.editedCom({ com }, null);

          return { value: com, description: `Добавлена новая песня ${getCmComNameInBrackets(com)}` };
        },

        remove: modifyCom((com, _, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM', 'D')) throw '';

          com.isRemoved = 1;

          return `Песня ${getCmComNameInBrackets(com)} удалена`;
        }),

        bringBackToLife: modifyCom((com, _, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM', 'C')) throw '';

          delete com.isRemoved;

          return `Удалённая песня ${getCmComNameInBrackets(com)} возвращена`;
        }),

        takeRemovedComs: async (_, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM', 'C')) throw '';

          return {
            value: comsDirStore
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

          const com = comsDirStore.getItem(comw);
          if (com == null) throw '';
          comsDirStore.deleteItem(comw);

          return { value: com.n, description: `Песня ${com.n} НЕ уничтожена` };
        },
      },
    });
  }
})();

export const getCmComNameInBrackets = (comScalar: CmComWid | IServerSideCom | IExportableCom) => {
  if (smylib.isNum(comScalar)) {
    const com = comsDirStore.getItem(comScalar);
    if (com == null) return '[Неизвестная песня]';
    return `"${com.n}"`;
  }

  return `"${comScalar.n}"`;
};

export function modifyCom<Props extends { comw: CmComWid }>(
  mapper: (com: IServerSideCom, props: Props, tool: ServerTSJRPCTool) => string | null,
) {
  return async (props: Props, tool: ServerTSJRPCTool) => {
    if (throwIfNoUserScopeAccessRight(tool.auth?.login, 'cm', 'COM', 'U')) throw '';

    const com = comsDirStore.getItem(props.comw);

    if (com == null) throw new Error(`Песня не найдена`);

    const description = mapper(com, props, tool);

    comsDirStore.saveItem(props.comw);
    const expCom = mapCmImportableToExportableCom(com);

    cmShareServerTsjrpcMethods.editedCom({ com: expCom }, null);

    return { value: expCom, description };
  };
}

function insertInTextableBlock<Props extends { value: string; comw: CmComWid; insertToi: number }>(
  coln: 'c' | 't',
  text: (com: IServerSideCom, props: Props, tool: ServerTSJRPCTool) => string,
) {
  return modifyCom<Props>((com, props, tool) => {
    if (com[coln] == null) return '';
    const list = com[coln];

    list.splice(props.insertToi, 0, props.value);
    com.o?.forEach(ord => {
      if (ord[coln] != null && ord[coln] >= props.insertToi) ord[coln]++;
    });

    return text(com, props, tool);
  });
}

function removeTextableBlock<Props extends { comw: CmComWid; removei: number }>(
  coln: 'c' | 't',
  text: (com: IServerSideCom, props: Props, tool: ServerTSJRPCTool) => string,
) {
  return modifyCom<Props>((com, props, tool) => {
    if (com[coln] == null) return null;
    const list = com[coln];

    list.splice(props.removei, 1);
    com.o?.forEach(ord => {
      if (ord[coln] != null)
        if (ord[coln] > props.removei) ord[coln]--;
        else if (ord[coln] === props.removei) delete ord[coln];
    });

    com.o = com.o?.filter(ord => ord.a != null || ord.c != null || ord.t != null);

    return text(com, props, tool);
  });
}
