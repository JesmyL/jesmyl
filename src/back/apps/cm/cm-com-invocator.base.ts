import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { CmComWid, IExportableCom } from 'shared/api';
import { CmComSokiInvocatorMethods } from 'shared/api/invocators/cm/cm-com-invocators';
import { smylib } from 'shared/utils';
import { comsFileStore } from './cm-freshes-invocator.base';
import { cmServerInvocatorMethods } from './cm-invocator';
import { cmGetMp3RulesList, cmGetResourceHTMLString } from './mp3-rules';
import { cmComLanguages } from './values';

// import * as colsJSON from './+case/cols.json';
// const cols = { ...colsJSON };
// Promise.resolve().then(() => comsFileStore.setValue(cols.coms as never));

// setTimeout(() => {
//   comsFileStore.getValue().forEach(com => {
//     const anchors: Record<number, CmComOrderWid> = {};

//     com.o?.forEach(ord => {
//       const o = ord as any;
//       if (o.u != null) {
//         anchors[o.u] = ord.w;
//         delete o.u;
//       }

//       if (ord.a == null) return;

//       ord.a = anchors[ord.a] ?? ord.a;
//     });
//   });
//   comsFileStore.saveValue();
// }, 100);

// catsFileStore.getValue().forEach(cat => (cat.m = Date.now() + Math.random()));

export const getCmComNameInBrackets = (comScalar: CmComWid | IExportableCom) => {
  if (smylib.isNum(comScalar)) {
    const com = comsFileStore.getValue().find(com => com.w === comScalar);
    if (com == null) return '[Неизвестная песня]';
    return `"${com.n}"`;
  }

  return `"${comScalar.n}"`;
};

class CmComSokiInvocatorBaseServer extends SokiInvocatorBaseServer<CmComSokiInvocatorMethods> {}

export const modifyInvocableCom = async (comw: CmComWid, mapper: (com: IExportableCom) => void) => {
  const com = comsFileStore.getValue().find(com => com.w === comw);

  if (com === undefined) throw new Error(`Песня не найдена`);

  mapper(com);
  com.m = Date.now() + Math.random();

  comsFileStore.saveValue();
  cmServerInvocatorMethods.editedCom(null, com);

  return com;
};

const simpleComKeyValueSetter = <Key extends keyof IExportableCom>(key: Key) => {
  return () => (comw: CmComWid, value: IExportableCom[Key]) => modifyInvocableCom(comw, com => (com[key] = value));
};

const insertInTextableBlock = (coln: 'c' | 't') => () => (value: string, comw: CmComWid, insertToi: number) =>
  modifyInvocableCom(comw, com => {
    if (com[coln] == null) return;
    const list = com[coln];

    list.splice(insertToi, 0, value);
    com.o?.forEach(ord => {
      if (ord[coln] != null && ord[coln] >= insertToi) ord[coln]++;
    });
  });

const removeTextableBlock = (coln: 'c' | 't') => () => (comw: CmComWid, _value: string, removei: number) =>
  modifyInvocableCom(comw, com => {
    if (com[coln] == null) return;
    const list = com[coln];

    list.splice(removei, 1);
    com.o?.forEach(ord => {
      if (ord[coln] != null && ord[coln] >= removei) ord[coln]--;
    });
  });

export const cmComServerInvocatorBase = new CmComSokiInvocatorBaseServer(
  'CmComSokiInvocatorBaseServer',
  {
    rename: simpleComKeyValueSetter('n'),
    setBpM: simpleComKeyValueSetter('bpm'),
    setMeterSize: simpleComKeyValueSetter('s'),
    changeLanguage: simpleComKeyValueSetter('l'),
    changeTon: simpleComKeyValueSetter('p'),
    makeBemoled: simpleComKeyValueSetter('b'),
    changePushKind: simpleComKeyValueSetter('k'),
    setAudioLinks: () => (comw, value) => modifyInvocableCom(comw, com => (com.a = value.trim())),

    changeChordBlock: () => (coli, comw, value) =>
      modifyInvocableCom(comw, com => (com.c = com.c?.with(coli, value) ?? [])),
    changeTextBlock: () => (coli, comw, value) =>
      modifyInvocableCom(comw, com => (com.t = com.t?.with(coli, value) ?? [])),

    insertChordBlock: insertInTextableBlock('c'),
    insertTextBlock: insertInTextableBlock('t'),

    removeChordBlock: removeTextableBlock('c'),
    removeTextBlock: removeTextableBlock('t'),

    getResourceHTMLString: () => cmGetResourceHTMLString,
    getMp3RulesList: () => cmGetMp3RulesList,

    newCom: () => async newCom => {
      const com = { ...newCom, w: Date.now(), m: Date.now() };
      comsFileStore.getValue().push(com);
      comsFileStore.saveValue();
      cmServerInvocatorMethods.editedCom(null, com);

      return com;
    },
  },

  {
    changeLanguage: (com, _comw, value) =>
      `Язык песни ${getCmComNameInBrackets(com)} изменён на ${cmComLanguages[value]}`,

    changePushKind: (com, _comw, value) =>
      `Изменено значение правила группировок для слайдов в песне ${getCmComNameInBrackets(com)} - ${value}`,

    changeTon: (com, _comw, value) => `Тональность песни ${getCmComNameInBrackets(com)} изменена на ${value}`,

    makeBemoled: (com, _comw, value) => `Песня ${getCmComNameInBrackets(com)} теперь ${value}`,

    rename: (com, _comw, value) => `Песня ${getCmComNameInBrackets(com)} переименована на ${value}`,

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

    getResourceHTMLString: (_, src) => `Запрос HTML-кода ресурcа ${src}`,
    getMp3RulesList: () => `Запрос MP3-правил`,

    newCom: com => `Добавлена новая песня ${getCmComNameInBrackets(com)}`,
  },
);
