import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { ServerTSJRPCTool, TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { CmComWid, IExportableCom, IServerSideCom } from 'shared/api';
import { CmEditComTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com.tsjrpc.model';
import { itNNil, smylib } from 'shared/utils';
import { CmComUtils } from 'shared/utils/cm/ComUtils';
import { makeCmComHttpToNumLeadAudioLinks, makeCmComNumLeadToHttpAudioLinks } from './complect/com-http-links';
import { mapCmExportableToImportableCom, mapCmImportableToExportableCom } from './complect/tools';
import { cmConstantsConfigFileStore, comsFileStore } from './file-stores';
import { cmShareServerTsjrpcMethods } from './tsjrpc.shares';

export const cmEditComServerTsjrpcBase = new (class CmEditCom extends TsjrpcBaseServer<CmEditComTsjrpcModel> {
  constructor() {
    super({
      scope: 'CmEditCom',
      methods: {
        rename: modifyInvocableCom((com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'COM_MAIN', 'U')) throw '';

          const prev = com.n;
          com.n = value;

          return `Песня "${prev}" переименована на ${getCmComNameInBrackets(com)}`;
        }),

        setBpM: modifyInvocableCom((com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'COM_MAIN', 'U')) throw '';

          const prev = com.bpm;
          com.bpm = value;

          return `Значение ударов в минуту для песни ${getCmComNameInBrackets(com)} установлено в ${value} (было ${prev})`;
        }),

        setMeterSize: modifyInvocableCom((com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'COM_MAIN', 'U')) throw '';

          const prev = com.s;
          com.s = value;

          return `Размерность песни ${getCmComNameInBrackets(com)} установлено в значение ${value}/4 (было ${prev}/4)`;
        }),

        changeLanguage: modifyInvocableCom((com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'COM_MAIN', 'U')) throw '';

          const prev = com.l;
          com.l = value;

          return `Язык песни ${getCmComNameInBrackets(com)} изменён на ${CmComUtils.cmComLanguages[value]} (было ${prev == null ? null : CmComUtils.cmComLanguages[prev]})`;
        }),

        changeTon: modifyInvocableCom((com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'COM_MAIN', 'U')) throw '';

          const prev = com.p;
          com.p = value;

          return `Тональность песни ${getCmComNameInBrackets(com)} изменена на ${value} (было ${prev})`;
        }),

        makeBemoled: modifyInvocableCom((com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'COM_MAIN', 'U')) throw '';

          com.b = value;

          return `Песня ${getCmComNameInBrackets(com)} теперь ${value ? 'бемольная' : 'диезная'}`;
        }),

        changePushKind: modifyInvocableCom((com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'COM_TR', 'U')) throw '';

          const prev = com.k;
          com.k = value;

          return `Изменено значение правила группировок для слайдов в песне ${getCmComNameInBrackets(com)} - ${value} (было ${prev})`;
        }),

        toggleAudioLink: modifyInvocableCom((com, { link }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'COM_AUDIO', 'U')) throw '';

          const prev = makeCmComNumLeadToHttpAudioLinks(com.al);
          const isThereInPrev = prev?.includes(link);

          com.al = makeCmComHttpToNumLeadAudioLinks(
            isThereInPrev ? prev?.filter(pLink => pLink !== link) : [...(prev ?? []), link],
          );

          return `Изменение аудио-ссылок для песни ${getCmComNameInBrackets(com)}:\n\n${isThereInPrev ? 'удалено' : 'добавлено'}:\n${link}\n\nбыло:\n${prev}`;
        }),

        changeChordBlock: modifyInvocableCom((com, { texti: coli, value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'COM_CH', 'U')) throw '';

          com.c ??= [];
          const prev = com.c[coli];
          com.c[coli] = CmComUtils.trimTextLines(value);

          return `Изменён аккордный блок в песне ${getCmComNameInBrackets(com)}:\n\n${value}\n\nбыло:\n${prev}`;
        }),
        changeTextBlock: modifyInvocableCom((com, { texti: coli, value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'COM_TXT', 'U')) throw '';

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
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'COM_CH', 'C')) throw '';

          return (
            `Вставлен${value ? '' : ' новый'} аккордный блок в песне ` +
            `${getCmComNameInBrackets(com)}${value ? `:\n\n${value}` : ''}`
          );
        }),
        insertTextBlock: insertInTextableBlock('t', (com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'COM_TXT', 'C')) throw '';

          return (
            `Вставлен${value ? '' : ' новый'} текстовый блок в песне ` +
            `${getCmComNameInBrackets(com)}${value ? `:\n\n${value}` : ''}`
          );
        }),

        removeChordBlock: removeTextableBlock('c', (com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'COM_CH', 'D')) throw '';

          return (
            `Удалён${value ? '' : ' новый'} аккордный блок в песне ` +
            `${getCmComNameInBrackets(com)}${value ? `:\n\n${value}` : ''}`
          );
        }),
        removeTextBlock: removeTextableBlock('t', (com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'COM_TXT', 'D')) throw '';

          return (
            `Удалён${value ? '' : ' новый'} текстовый блок в песне ` +
            `${getCmComNameInBrackets(com)}${value ? `:\n\n${value}` : ''}`
          );
        }),

        newCom: async ({ value: newCom }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'COM', 'C')) throw '';

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
            m: Date.now(),
            t: newCom.t?.map(text => CmComUtils.transformToClearText(text)),
          };
          comsFileStore.getValue().push(mapCmExportableToImportableCom(com));
          comsFileStore.saveValue();
          cmShareServerTsjrpcMethods.editedCom({ com }, null);

          return { value: com, description: `Добавлена новая песня ${getCmComNameInBrackets(com)}` };
        },

        remove: modifyInvocableCom((com, _, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'COM', 'D')) throw '';

          com.isRemoved = 1;

          return `Песня ${getCmComNameInBrackets(com)} удалена`;
        }),

        bringBackToLife: modifyInvocableCom((com, _, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'COM', 'C')) throw '';

          delete com.isRemoved;

          return `Удалённая песня ${getCmComNameInBrackets(com)} возвращена`;
        }),

        takeRemovedComs: async (_, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'COM', 'C')) throw '';

          return {
            value: comsFileStore
              .getValue()
              .filter(com => com.isRemoved)
              .map(mapCmImportableToExportableCom),
            description: '',
          };
        },
        destroy: async ({ comw }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'COM', 'C')) throw '';
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'COM', 'R')) throw '';
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'COM', 'U')) throw '';
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'COM', 'D')) throw '';

          const coms = comsFileStore.getValueWithAutoSave();
          const index = coms.findIndex(com => com.w === comw);
          if (index < 0) return { value: '', description: null };
          const name = coms[index].n;
          coms.splice(index, 1);

          return { value: name, description: `Песня ${name} уничтожена` };
        },
      },
    });
  }
})();

export const getCmComNameInBrackets = (comScalar: CmComWid | IServerSideCom | IExportableCom) => {
  if (smylib.isNum(comScalar)) {
    const com = comsFileStore.getValue().find(com => com.w === comScalar);
    if (com == null) return '[Неизвестная песня]';
    return `"${com.n}"`;
  }

  return `"${comScalar.n}"`;
};

export function modifyInvocableCom<Props extends { comw: CmComWid }>(
  mapper: (com: IServerSideCom, props: Props, tool: ServerTSJRPCTool) => string | null,
) {
  return async (props: Props, tool: ServerTSJRPCTool) => {
    if (throwIfNoUserScopeAccessRight(tool.auth?.login, 'cm', 'COM', 'U')) throw '';

    const com = comsFileStore.getValue().find(com => com.w === props.comw);

    if (com === undefined) throw new Error(`Песня не найдена`);

    const description = mapper(com, props, tool);
    com.m = Date.now();

    comsFileStore.saveValue();
    const expCom = mapCmImportableToExportableCom(com);

    cmShareServerTsjrpcMethods.editedCom({ com: expCom }, null);

    return { value: expCom, description };
  };
}

function insertInTextableBlock<Props extends { value: string; comw: CmComWid; insertToi: number }>(
  coln: 'c' | 't',
  text: (com: IServerSideCom, props: Props, tool: ServerTSJRPCTool) => string,
) {
  return modifyInvocableCom<Props>((com, props, tool) => {
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
  return modifyInvocableCom<Props>((com, props, tool) => {
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
