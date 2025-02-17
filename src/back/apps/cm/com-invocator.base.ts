import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { CmComWid, IExportableCom } from 'shared/api';
import { CmComSokiInvocatorModel } from 'shared/api/invocators/cm/com-invocators.model';
import { smylib } from 'shared/utils';
import { cmComLanguages } from 'shared/values/values';
import { comsFileStore } from './fresh-invocator.base';
import { cmServerInvocatorShareMethods } from './invocator.shares';

class CmComSokiInvocatorBaseServer extends SokiInvocatorBaseServer<CmComSokiInvocatorModel> {
  constructor() {
    super(
      'CmComSokiInvocatorBaseServer',
      {
        rename: () => this.simpleComKeyValueSetter('n'),
        setBpM: () => this.simpleComKeyValueSetter('bpm'),
        setMeterSize: () => this.simpleComKeyValueSetter('s'),
        changeLanguage: () => this.simpleComKeyValueSetter('l'),
        changeTon: () => this.simpleComKeyValueSetter('p'),
        makeBemoled: () => this.simpleComKeyValueSetter('b'),
        changePushKind: () => this.simpleComKeyValueSetter('k'),
        setAudioLinks: () => (comw, value) => modifyInvocableCom(comw, com => (com.a = value.trim())),

        changeChordBlock: () => (coli, comw, value) =>
          modifyInvocableCom(comw, com => (com.c = com.c?.with(coli, value) ?? [])),
        changeTextBlock: () => (coli, comw, value) =>
          modifyInvocableCom(comw, com => (com.t = com.t?.with(coli, value) ?? [])),

        insertChordBlock: () => this.insertInTextableBlock('c'),
        insertTextBlock: () => this.insertInTextableBlock('t'),

        removeChordBlock: () => this.removeTextableBlock('c'),
        removeTextBlock: () => this.removeTextableBlock('t'),

        newCom: () => async newCom => {
          const com = { ...newCom, w: Date.now(), m: Date.now() };
          comsFileStore.getValue().push(com);
          comsFileStore.saveValue();
          cmServerInvocatorShareMethods.editedCom(null, com);

          return com;
        },

        remove: () => comw => modifyInvocableCom(comw, com => (com.isRemoved = 1)),
        bringBackToLife: () => comw => modifyInvocableCom(comw, com => delete com.isRemoved),
      },

      {
        changeLanguage: (com, _comw, value) =>
          `Язык песни ${getCmComNameInBrackets(com)} изменён на ${cmComLanguages[value]}`,

        changePushKind: (com, _comw, value) =>
          `Изменено значение правила группировок для слайдов в песне ${getCmComNameInBrackets(com)} - ${value}`,

        changeTon: (com, _comw, value) => `Тональность песни ${getCmComNameInBrackets(com)} изменена на ${value}`,

        makeBemoled: (com, _comw, value) =>
          `Песня ${getCmComNameInBrackets(com)} теперь ${value ? 'бемольная' : 'диезная'}`,

        rename: com => `Песня ${getCmComNameInBrackets(com)} переименована`,

        setAudioLinks: (com, _comw, value) =>
          `Изменение аудио-ссылок для песни ${getCmComNameInBrackets(com)}:\n\n${value}`,

        setBpM: (com, _comw, value) =>
          `Значение ударов в минуту для песни ${getCmComNameInBrackets(com)} установлено в ${value}`,

        setMeterSize: (com, _comw, value) =>
          `Размерность песни ${getCmComNameInBrackets(com)} установлено в значение ${value}/4`,

        changeChordBlock: (com, _texti, _comw, value) =>
          `Изменён аккордный блок в песне ${getCmComNameInBrackets(com)}:\n\n${value}`,

        changeTextBlock: (com, _texti, _comw, value) =>
          `Изменён текстовый блок в песне ${getCmComNameInBrackets(com)}:\n\n${value}`,

        insertChordBlock: (com, _comw, _texti, value) =>
          `Вставлен${value ? '' : ' новый'} аккордный блок в песне ` +
          `${getCmComNameInBrackets(com)}${value ? `:\n\n${value}` : ''}`,
        insertTextBlock: (com, _comw, _texti, value) =>
          `Вставлен${value ? '' : ' новый'} текстовый блок в песне ` +
          `${getCmComNameInBrackets(com)}${value ? `:\n\n${value}` : ''}`,

        removeTextBlock: (com, _comw, value) =>
          `Удалён${value ? '' : ' новый'} текстовый блок в песне ` +
          `${getCmComNameInBrackets(com)}${value ? `:\n\n${value}` : ''}`,
        removeChordBlock: (com, _comw, value) =>
          `Удалён${value ? '' : ' новый'} аккордный блок в песне ` +
          `${getCmComNameInBrackets(com)}${value ? `:\n\n${value}` : ''}`,

        newCom: com => `Добавлена новая песня ${getCmComNameInBrackets(com)}`,

        remove: com => `Песня ${getCmComNameInBrackets(com)} удалена`,
        bringBackToLife: com => `Удалённая песня ${getCmComNameInBrackets(com)} возвращена`,
      },
    );
  }

  private simpleComKeyValueSetter = <Key extends keyof IExportableCom>(key: Key) => {
    return (comw: CmComWid, value: IExportableCom[Key]) => modifyInvocableCom(comw, com => (com[key] = value));
  };

  private insertInTextableBlock = (coln: 'c' | 't') => (value: string, comw: CmComWid, insertToi: number) =>
    modifyInvocableCom(comw, com => {
      if (com[coln] == null) return;
      const list = com[coln];

      list.splice(insertToi, 0, value);
      com.o?.forEach(ord => {
        if (ord[coln] != null && ord[coln] >= insertToi) ord[coln]++;
      });
    });

  private removeTextableBlock = (coln: 'c' | 't') => (comw: CmComWid, _value: string, removei: number) =>
    modifyInvocableCom(comw, com => {
      if (com[coln] == null) return;
      const list = com[coln];

      list.splice(removei, 1);
      com.o?.forEach(ord => {
        if (ord[coln] != null && ord[coln] >= removei) ord[coln]--;
      });
    });
}

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
  cmServerInvocatorShareMethods.editedCom(null, com);

  return com;
};

export const cmComServerInvocatorBase = new CmComSokiInvocatorBaseServer();
