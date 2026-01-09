import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { ServerTSJRPCTool, TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { CmComWid, IExportableCom, IServerSideCom } from 'shared/api';
import { CmEditComTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com.tsjrpc.model';
import { cmComMetricNumTitles } from 'shared/const/cm/com-metric-nums';
import { cmComLineGroupingDefaultKinds } from 'shared/const/cm/comLineGroupingKind';
import { CmBroadcastSlideGrouperKindCombiner } from 'shared/model/cm/broadcast';
import { itNNil, smylib, trimTextLines } from 'shared/utils';
import { cmComLanguages } from 'shared/utils/cm/com/const';
import { textLinesLengthIncorrects } from 'shared/utils/cm/com/textLinesLengthIncorrects';
import { transformToClearText } from 'shared/utils/cm/com/transformToClearText';
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

          com.n = value;

          return `переименована на "${value}"`;
        }),

        setBpM: modifyCom((com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_MAIN', 'U')) throw '';

          const prev = com.bpm;
          com.bpm = value;

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

        changePushKind: modifyCom((com, { value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_TR', 'U')) throw '';

          const prev = com.k;
          let next = com.k;

          const newKind: CmBroadcastSlideGrouperKindCombiner =
            smylib.isNum(prev) || smylib.isNil(prev)
              ? { d: {}, n: prev || 0 }
              : smylib.isStr(prev)
                ? { d: {}, s: prev }
                : prev;

          if (smylib.isStr(value)) {
            newKind.s = value;
            delete newKind.n;
          } else if (smylib.isNum(value)) {
            newKind.n = value;
            delete newKind.s;
          } else newKind.d = { ...newKind.d, ...value };

          smylib.keys(newKind.d).forEach(key => {
            newKind.d[key] = +newKind.d[key]!;
            if (!newKind.d[key]) delete newKind.d[key];
          });

          if (!smylib.keys(newKind.d).length) next = newKind.n ?? newKind.s;
          else next = newKind;

          if (smylib.isStr(next)) {
            const index = cmComLineGroupingDefaultKinds.indexOf(next);

            com.k = (index < 0 ? next : index) || undefined;
          } else com.k = next;

          return `изменено значение правила группировок для слайдов - ${JSON.stringify(com.k)} (было ${JSON.stringify(prev)})`;
        }),

        toggleAudioLink: modifyCom((com, { link }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_AUDIO', 'U')) throw '';

          const prev = makeCmComNumLeadToHttpAudioLinks(com.al);
          const isThereInPrev = prev?.includes(link);

          com.al = makeCmComHttpToNumLeadAudioLinks(
            isThereInPrev ? prev?.filter(pLink => pLink !== link) : [...(prev ?? []), link],
          );

          return `изменение аудио-ссылок:\n\n${isThereInPrev ? 'удалено' : 'добавлено'}:\n${link}\n\nбыло:\n${prev}`;
        }),

        changeChordBlock: modifyCom((com, { texti: coli, value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_CH', 'U')) throw '';

          com.c ??= [];
          const prev = com.c[coli];
          com.c[coli] = trimTextLines(value);

          return `изменён аккордный блок:\n\n${value}\n\nбыло:\n${prev}`;
        }),
        changeTextBlock: modifyCom((com, { texti: coli, value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_TXT', 'U')) throw '';

          const incorrects = textLinesLengthIncorrects(
            value,
            cmConstantsConfigFileStore.getValue().maxAvailableComLineLength,
          );

          if (incorrects?.errors?.length) throw incorrects.errors[0].message;

          com.t ??= [];
          const prev = com.t[coli];
          com.t[coli] = transformToClearText(value);

          return `изменён текстовый блок:\n\n${value}\n\nбыло:\n${prev}`;
        }),

        insertChordBlock: insertInTextableBlock('c', ({ value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_CH', 'C')) throw '';

          return `вставлен${value ? '' : ' новый'} аккордный блок ${value ? `:\n\n${value}` : ''}`;
        }),
        insertTextBlock: insertInTextableBlock('t', ({ value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_TXT', 'C')) throw '';

          return `вставлен${value ? '' : ' новый'} текстовый блок${value ? `:\n\n${value}` : ''}`;
        }),

        removeChordBlock: removeTextableBlock('c', ({ value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_CH', 'D')) throw '';

          return `удалён${value ? '' : ' новый'} аккордный блок ${value ? `:\n\n${value}` : ''}`;
        }),
        removeTextBlock: removeTextableBlock('t', ({ value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_TXT', 'D')) throw '';

          return `удалён${value ? '' : ' новый'} текстовый блок${value ? `:\n\n${value}` : ''}`;
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

          comsDirStore.createItem(() => mapCmExportableToImportableCom(com), com.w);
          const mod = comsDirStore.saveItem(com.w) ?? 0;

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

const und = undefined;
const comBlank: Record<keyof IExportableCom, und> = {
  w: und,
  m: und,
  n: und,
  b: und,
  bpm: und,
  s: und,
  k: und,
  l: und,
  p: und,
  al: und,
  t: und,
  c: und,
  o: und,
  ton: und,
  a: und,
  isRemoved: und,
};

export function modifyCom<Props extends { comw: CmComWid }>(
  mapper: (com: IServerSideCom, props: Props, tool: ServerTSJRPCTool) => string | null,
) {
  return async (props: Props, tool: ServerTSJRPCTool) => {
    if (throwIfNoUserScopeAccessRight(tool.auth?.login, 'cm', 'COM', 'U')) throw '';

    const com = comsDirStore.getItem(props.comw);

    if (com == null) throw new Error(`Песня не найдена`);
    if (!com.n) throw new Error(`У песни нет названия`);

    delete com.a;
    delete (com as { m?: 0 }).m;

    const comName = com.n;
    const description = mapper(com, props, tool);

    const mod = comsDirStore.saveItem(props.comw, { ...comBlank, ...com }) ?? 0;
    const expCom = mapCmImportableToExportableCom(com);

    cmShareServerTsjrpcMethods.editedCom({ com: expCom, mod }, null);

    return { value: expCom, description: description ? `Песня "${comName}" - ${description}` : null };
  };
}

function insertInTextableBlock<Props extends { value: string; comw: CmComWid; insertToi: number }>(
  coln: 'c' | 't',
  text: (props: Props, tool: ServerTSJRPCTool) => string,
) {
  return modifyCom<Props>((com, props, tool) => {
    if (com[coln] == null) return '';
    const list = com[coln];

    list.splice(props.insertToi, 0, props.value);
    com.o?.forEach(ord => {
      if (ord[coln] != null && ord[coln] >= props.insertToi) ord[coln]++;
    });

    return text(props, tool);
  });
}

function removeTextableBlock<Props extends { comw: CmComWid; removei: number }>(
  coln: 'c' | 't',
  text: (props: Props, tool: ServerTSJRPCTool) => string,
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

    return text(props, tool);
  });
}
