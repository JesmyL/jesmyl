import { FileStore } from 'back/complect/FileStore';
import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { CmComWid, IExportableCom } from 'shared/api';
import { CmComSokiInvocatorModel } from 'shared/api/invocators/cm/com-invocators.model';
import { smylib } from 'shared/utils';
import { cmComLanguages } from 'shared/values/values';
import { comsFileStore } from './fresh-invocator.base';
import { cmServerInvocatorShareMethods } from './invocator.shares';

const comwVisitsFileStore = new FileStore<PRecord<CmComWid, number>>('/apps/cm/comwVisits.json', {});

export const cmComServerInvocatorBase =
  new (class CmComSokiInvocatorBaseServer extends SokiInvocatorBaseServer<CmComSokiInvocatorModel> {
    constructor() {
      const simpleComKeyValueSetter = <Key extends keyof IExportableCom>(key: Key) => {
        return ({ comw, value }: { comw: CmComWid; value: IExportableCom[Key] }) =>
          modifyInvocableCom(comw, com => (com[key] = value));
      };

      const insertInTextableBlock =
        (coln: 'c' | 't') =>
        ({ comw, insertToi, value }: { value: string; comw: CmComWid; insertToi: number }) =>
          modifyInvocableCom(comw, com => {
            if (com[coln] == null) return;
            const list = com[coln];

            list.splice(insertToi, 0, value);
            com.o?.forEach(ord => {
              if (ord[coln] != null && ord[coln] >= insertToi) ord[coln]++;
            });
          });

      const removeTextableBlock =
        (coln: 'c' | 't') =>
        ({ comw, removei }: { comw: CmComWid; removei: number }) =>
          modifyInvocableCom(comw, com => {
            if (com[coln] == null) return;
            const list = com[coln];

            list.splice(removei, 1);
            com.o?.forEach(ord => {
              if (ord[coln] != null && ord[coln] >= removei) ord[coln]--;
            });
          });

      super({
        className: 'CmComSokiInvocatorBaseServer',
        beforeEachDefaultTool: { minLevel: 50 },
        methods: {
          rename: simpleComKeyValueSetter('n'),
          setBpM: simpleComKeyValueSetter('bpm'),
          setMeterSize: simpleComKeyValueSetter('s'),
          changeLanguage: simpleComKeyValueSetter('l'),
          changeTon: simpleComKeyValueSetter('p'),
          makeBemoled: simpleComKeyValueSetter('b'),
          changePushKind: simpleComKeyValueSetter('k'),
          setAudioLinks: ({ comw, value }) => modifyInvocableCom(comw, com => (com.a = value.trim())),

          changeChordBlock: ({ texti: coli, comw, value }) =>
            modifyInvocableCom(comw, com => (com.c = com.c?.with(coli, value) ?? [])),
          changeTextBlock: ({ texti: coli, comw, value }) =>
            modifyInvocableCom(comw, com => (com.t = com.t?.with(coli, value) ?? [])),

          insertChordBlock: insertInTextableBlock('c'),
          insertTextBlock: insertInTextableBlock('t'),

          removeChordBlock: removeTextableBlock('c'),
          removeTextBlock: removeTextableBlock('t'),

          newCom: async ({ value: newCom }) => {
            const com = { ...newCom, w: Date.now(), m: Date.now() };
            comsFileStore.getValue().push(com);
            comsFileStore.saveValue();
            cmServerInvocatorShareMethods.editedCom({ com });

            return com;
          },

          remove: ({ comw }) => modifyInvocableCom(comw, com => (com.isRemoved = 1)),
          bringBackToLife: ({ comw }) => modifyInvocableCom(comw, com => delete com.isRemoved),

          printComwVisit: async ({ comw }) => {
            const marks = comwVisitsFileStore.getValueWithAutoSave();
            marks[comw] ??= 0;
            marks[comw]++;
          },

          takeComwVisitsCount: async ({ comw }) => comwVisitsFileStore.getValue()[comw] ?? 0,
          getComwVisits: async () => comwVisitsFileStore.getValue(),

          takeRemovedComs: async () => comsFileStore.getValue().filter(com => com.isRemoved),
          destroy: async ({ comw }) => {
            const coms = comsFileStore.getValueWithAutoSave();
            const index = coms.findIndex(com => com.w === comw);
            if (index < 0) return '';
            const name = coms[index].n;
            coms.splice(index, 1);

            return name;
          },
        },
        onEachFeedback: {
          changeLanguage: ({ value }, com) =>
            `Язык песни ${getCmComNameInBrackets(com)} изменён на ${cmComLanguages[value]}`,

          changePushKind: ({ value }, com) =>
            `Изменено значение правила группировок для слайдов в песне ${getCmComNameInBrackets(com)} - ${value}`,

          changeTon: ({ value }, com) => `Тональность песни ${getCmComNameInBrackets(com)} изменена на ${value}`,

          makeBemoled: ({ value }, com) =>
            `Песня ${getCmComNameInBrackets(com)} теперь ${value ? 'бемольная' : 'диезная'}`,

          rename: (_, com) => `Песня ${getCmComNameInBrackets(com)} переименована`,

          setAudioLinks: ({ value }, com) =>
            `Изменение аудио-ссылок для песни ${getCmComNameInBrackets(com)}:\n\n${value}`,

          setBpM: ({ value }, com) =>
            `Значение ударов в минуту для песни ${getCmComNameInBrackets(com)} установлено в ${value}`,

          setMeterSize: ({ value }, com) =>
            `Размерность песни ${getCmComNameInBrackets(com)} установлено в значение ${value}/4`,

          changeChordBlock: ({ value }, com) =>
            `Изменён аккордный блок в песне ${getCmComNameInBrackets(com)}:\n\n${value}`,

          changeTextBlock: ({ value }, com) =>
            `Изменён текстовый блок в песне ${getCmComNameInBrackets(com)}:\n\n${value}`,

          insertChordBlock: ({ value }, com) =>
            `Вставлен${value ? '' : ' новый'} аккордный блок в песне ` +
            `${getCmComNameInBrackets(com)}${value ? `:\n\n${value}` : ''}`,
          insertTextBlock: ({ value }, com) =>
            `Вставлен${value ? '' : ' новый'} текстовый блок в песне ` +
            `${getCmComNameInBrackets(com)}${value ? `:\n\n${value}` : ''}`,

          removeTextBlock: ({ value }, com) =>
            `Удалён${value ? '' : ' новый'} текстовый блок в песне ` +
            `${getCmComNameInBrackets(com)}${value ? `:\n\n${value}` : ''}`,
          removeChordBlock: ({ value }, com) =>
            `Удалён${value ? '' : ' новый'} аккордный блок в песне ` +
            `${getCmComNameInBrackets(com)}${value ? `:\n\n${value}` : ''}`,

          newCom: (_, com) => `Добавлена новая песня ${getCmComNameInBrackets(com)}`,

          remove: (_, com) => `Песня ${getCmComNameInBrackets(com)} удалена`,
          destroy: (_, comName) => `Песня ${comName} уничтожена`,
          bringBackToLife: (_, com) => `Удалённая песня ${getCmComNameInBrackets(com)} возвращена`,

          printComwVisit: null,
          takeComwVisitsCount: null,
          takeRemovedComs: null,
          getComwVisits: null,
        },
      });
    }
  })();

export const getCmComNameInBrackets = (comScalar: CmComWid | IExportableCom) => {
  if (smylib.isNum(comScalar)) {
    const com = comsFileStore.getValue().find(com => com.w === comScalar);
    if (com == null) return '[Неизвестная песня]';
    return `"${com.n}"`;
  }

  return `"${comScalar.n}"`;
};

export const modifyInvocableCom = async (comw: CmComWid, mapper: (com: IExportableCom) => void) => {
  const com = comsFileStore.getValue().find(com => com.w === comw);

  if (com === undefined) throw new Error(`Песня не найдена`);

  mapper(com);
  com.m = Date.now() + Math.random();

  comsFileStore.saveValue();
  cmServerInvocatorShareMethods.editedCom({ com });

  return com;
};
