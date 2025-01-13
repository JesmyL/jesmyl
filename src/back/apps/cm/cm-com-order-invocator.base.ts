import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { CmComOrderWid, CmComWid, IExportableCom, IExportableOrder } from 'shared/api';
import { CmComOrderSokiInvocatorMethods } from 'shared/api/invocators/cm/com-order-invocators.model';
import { itNNil, smylib } from 'shared/utils';
import { getCmComNameInBrackets, modifyInvocableCom } from './cm-com-invocator.base';

class CmComOrderSokiInvocatorBaseServer extends SokiInvocatorBaseServer<CmComOrderSokiInvocatorMethods> {}

const modifyOrd = (comw: CmComWid, ordw: CmComOrderWid, modifier: (ord: IExportableOrder) => void) => {
  return modifyInvocableCom(comw, com => {
    const ord = com.o?.find(ord => ord.w === ordw);

    if (ord == null) throw new Error('Ord not found');

    modifier(ord);

    return com;
  });
};

const simpleOrdValueSetter = <Key extends keyof IExportableOrder>(key: Key) => {
  return () => (ordw: CmComOrderWid, _orderTitle: string, comw: CmComWid, value: IExportableOrder[Key] | null) =>
    modifyOrd(comw, ordw, ord => (ord[key] = value as never));
};

const getNextOrdWid = (ords: { w: CmComOrderWid }[]) =>
  ords.reduce((max, curr) => (curr.w > max ? curr.w : max), CmComOrderWid.def) + 1;

const getOrder = (com: IExportableCom, ordw: CmComOrderWid) => com.o?.find(o => o.w === ordw);

export const cmComOrderServerInvocatorBase = new CmComOrderSokiInvocatorBaseServer(
  'CmComOrderSokiInvocatorBaseServer',
  {
    clearOwnRepeats: simpleOrdValueSetter('r'),
    setRepeats: simpleOrdValueSetter('r'),
    setType: simpleOrdValueSetter('s'),
    bindChordBlock: simpleOrdValueSetter('c'),

    toggleVisibility: () => (ordw: CmComOrderWid, _orderTitle: string, comw: CmComWid) =>
      modifyOrd(comw, ordw, ord => (ord.v = ord.v ? 0 : 1)),

    toggleAnchorInheritVisibility: () => (comw, leadOrderWid, anchorInheritIndex) =>
      modifyOrd(comw, leadOrderWid, ord => {
        ord.inh ??= {};
        ord.inh.v ??= {};

        ord.inh.v[anchorInheritIndex] = ord.inh.v[anchorInheritIndex] === undefined ? 0 : undefined;

        if (!smylib.values(ord.inh.v).filter(itNNil).length) delete ord.inh.v;
        if (!smylib.values(ord.inh).filter(itNNil).length) delete ord.inh;
      }),

    moveOrdAfter: () => (ordw, _orderTitle, comw, insertAfterOrdwOrFirst) =>
      modifyInvocableCom(comw, com => {
        com.o ??= [];

        const movableOrdi = com.o.findIndex(o => o.w === ordw);
        const insertAfterOrdi =
          insertAfterOrdwOrFirst == null ? -1 : com.o.findIndex(o => o.w === insertAfterOrdwOrFirst);

        if (movableOrdi < 0) throw new Error('Целевой порядковый блок не найден');

        const [ord] = com.o.splice(movableOrdi, 1);
        com.o.splice(insertAfterOrdi + (movableOrdi < insertAfterOrdi ? 0 : 1), 0, ord);
      }),

    remove: () => (_orderTitle, comw, ordw) =>
      modifyInvocableCom(comw, com => {
        com.o ??= [];
        com.o = com.o.filter(ord => ord.w !== ordw && ord.a !== ordw);
      }),

    addAnchorOrder: () => (_orderTitle, comw, targetOrdw, insertAfterOrdw) =>
      modifyInvocableCom(comw, com => {
        com.o ??= [];

        const targetOrdi = com.o.findIndex(o => o.w === targetOrdw);
        const insertAfterOrdi = com.o.findIndex(o => o.w === insertAfterOrdw);

        if (targetOrdi < 0) throw new Error('Целевой порядковый блок не найден');
        if (insertAfterOrdi < 0) throw new Error('Опорный порядковый блок не найден');
        if (insertAfterOrdi < targetOrdi) throw new Error('Целевой порядковый блок должен быть выше опорного');

        com.o.splice(insertAfterOrdi + 1, 0, {
          w: getNextOrdWid(com.o),
          a: targetOrdw,
        });
      }),

    setTexti: () => (_, comw, ordw, texti) => modifyOrd(comw, ordw, ord => (ord.t = texti)),

    toggleVisibilityInMiniMode: () => (_, comw, ordw) => modifyOrd(comw, ordw, ord => (ord.o = ord.o ? undefined : 1)),

    toggleTitleVisibility: () => (_, comw, ordw) => modifyOrd(comw, ordw, ord => (ord.e = ord.e ? undefined : 1)),

    insertNewBlock: () => (comw, _, insertAfterOrdwOrFirst, chordi, type, texti) =>
      modifyInvocableCom(comw, com => {
        com.o ??= [];
        const afterOrdi =
          insertAfterOrdwOrFirst == null ? -1 : com.o.findIndex(ord => ord.w === insertAfterOrdwOrFirst);

        const ord: IExportableOrder = {
          w: getNextOrdWid(com.o),
          s: type,
          c: chordi,
          t: texti,
        };

        if (afterOrdi < 1) {
          com.o.unshift(ord);
        } else com.o.splice(afterOrdi + 1, 0, ord);
      }),

    setPositionsLine: () => (comw, _, ordw, linei, line) =>
      modifyOrd(comw, ordw, ord => {
        ord.p ??= [];
        ord.p[linei] = line;
      }),

    setModulationValue: () => (comw, _, ordw, value) =>
      modifyOrd(comw, ordw, ord => {
        ord.f ??= {};
        ord.f.md = value;
      }),
  },

  {
    clearOwnRepeats: (com, _ordw, orderTitle) =>
      `Сброшено значение повторений для блока ${orderTitle} в песне ${getCmComNameInBrackets(com)}`,

    setRepeats: (com, _ordw, orderTitle, _comw, _value, textValue) =>
      `Изменены повторения для блока ${orderTitle} в песне ${getCmComNameInBrackets(com)}:\n\n${textValue}`,

    setType: (com, _ordw, orderTitle, _comw, _type, newTypeTitle) =>
      `В песне ${getCmComNameInBrackets(com)} название блока ${orderTitle} изменено на ${newTypeTitle}`,

    bindChordBlock: (com, _, orderTitle, __, chordi, isAnchor) =>
      `В песне ${getCmComNameInBrackets(com)} к ${isAnchor ? 'ссылке на блок' : 'блоку'} ` +
      `${orderTitle} прикреплён ${chordi + 1}-й блок Аккордов`,

    toggleVisibility: (com, ordw, orderTitle) =>
      `В песне ${getCmComNameInBrackets(com)} порядковый блок ` +
      `${orderTitle} сделан ${getOrder(com, ordw)?.v ? '' : 'не'}видимым`,

    toggleAnchorInheritVisibility: (com, _, leadOrderWid, anchorInheritIndex, leadOrderTitle) =>
      `В песне ${getCmComNameInBrackets(com)} ${anchorInheritIndex + 2}-я часть ссылки на ${leadOrderTitle}` +
      ` сделана ${getOrder(com, leadOrderWid)?.inh?.v?.[anchorInheritIndex] == null ? '' : 'не'}видимой`,

    moveOrdAfter: (com, _, orderTitle) =>
      `Перемещён порядковый блок ${orderTitle} в песне ${getCmComNameInBrackets(com)}`,

    addAnchorOrder: (com, orderTitle) => `В песне создана ссылка ${getCmComNameInBrackets(com)} ${orderTitle}`,

    setTexti: (com, orderTitle, _, __, texti) =>
      `В песне ${getCmComNameInBrackets(com)} к порядковому блоку ${orderTitle} прикреплён ${texti + 1} текст`,

    toggleVisibilityInMiniMode: (com, orderTitle, _, ordw) =>
      `В песне ${getCmComNameInBrackets(com)} ссылка на блок ${orderTitle} сделана ` +
      `${getOrder(com, ordw)?.o ? 'видимой' : 'невидимой'} в мини-режиме`,

    toggleTitleVisibility: (com, orderTitle, _, ordw) =>
      `В песне ${getCmComNameInBrackets(com)} заголовок в порядковом блоке ${orderTitle} сделан ` +
      `${getOrder(com, ordw)?.e ? 'видимым' : 'невидимым'}`,

    remove: (com, orderTitle, _, __, isAnchor) =>
      `В песне ${getCmComNameInBrackets(com)} ${isAnchor ? 'удалена ссылка на' : 'удалён'} ${orderTitle}`,

    insertNewBlock: (com, _, orderTitle) =>
      `В песне ${getCmComNameInBrackets(com)} добавлен новый порядковый блок ${orderTitle}`,

    setPositionsLine: (com, _, orderTitle, __, linei, line, lineChangesText) =>
      `В песне ${getCmComNameInBrackets(com)} в блоке ${orderTitle} изменена аппликатура в ` +
      `${linei + 1}-й строке: ${lineChangesText}`,

    setModulationValue: (com, _, orderTitle, __, value) =>
      `В песне ${getCmComNameInBrackets(com)} установлено значение модулирования блока ${orderTitle} - ${value}`,
  },
);
