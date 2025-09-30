import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { makeRegExp } from 'regexpert';
import { CmComOrderWid, CmComWid, IExportableCom, IExportableOrder } from 'shared/api';
import { CmEditComOrderTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com-order.tsjrpc.model';
import { itNNil, smylib } from 'shared/utils';
import { getCmComNameInBrackets, modifyInvocableCom } from './edit-com.tsjrpc.base';

export const cmEditComOrderServerTsjrpcBase =
  new (class CmEditComOrder extends TsjrpcBaseServer<CmEditComOrderTsjrpcModel> {
    constructor() {
      super({
        scope: 'CmEditComOrder',
        defaultBeforeEachTool: { minLevel: 50 },
        methods: {
          clearOwnRepeats: modifyOrd(ord => delete ord.r),
          setRepeats: modifyOrd((ord, { value, inhIndex }) => {
            if (inhIndex !== undefined) {
              ord.inh ??= {};
              ord.inh.r ??= {};

              ord.inh.r[inhIndex] = value;

              if (!smylib.values(ord.inh.v).filter(itNNil).length) delete ord.inh.v;
              if (!smylib.values(ord.inh).filter(itNNil).length) delete ord.inh;
            } else ord.r = value;
          }),
          setType: modifyOrd((ord, { type }) => (ord.s = type)),
          bindChordBlock: modifyOrd((ord, { chordi }) => (ord.c = chordi)),

          toggleVisibility: modifyOrd(ord => (ord.v = ord.v ? 0 : 1)),

          toggleAnchorInheritVisibility: modifyOrd((ord, { anchorInheritIndex }) => {
            ord.inh ??= {};
            ord.inh.v ??= {};

            ord.inh.v[anchorInheritIndex] = ord.inh.v[anchorInheritIndex] === undefined ? 0 : undefined;

            if (!smylib.values(ord.inh.v).filter(itNNil).length) delete ord.inh.v;
            if (!smylib.values(ord.inh).filter(itNNil).length) delete ord.inh;
          }),

          moveOrdAfter: modifyInvocableCom((com, { insertAfterOrdwOrFirst, ordw }) => {
            com.o ??= [];

            const movableOrdi = com.o.findIndex(o => o.w === ordw);
            const insertAfterOrdi =
              insertAfterOrdwOrFirst == null ? -1 : com.o.findIndex(o => o.w === insertAfterOrdwOrFirst);

            if (movableOrdi < 0) throw new Error('Целевой порядковый блок не найден');

            const [ord] = com.o.splice(movableOrdi, 1);
            com.o.splice(insertAfterOrdi + (movableOrdi < insertAfterOrdi ? 0 : 1), 0, ord);
          }),

          remove: modifyInvocableCom((com, { ordw }) => {
            com.o ??= [];
            com.o = com.o.filter(ord => ord.w !== ordw && ord.a !== ordw);
          }),

          addAnchorOrder: modifyInvocableCom((com, { insertAfterOrdw, targetOrdw }) => {
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

          setTexti: modifyOrd((ord, { texti }) => (ord.t = texti)),

          toggleVisibilityInMiniMode: modifyOrd(ord => (ord.o = ord.o ? undefined : 1)),

          toggleTitleVisibility: modifyOrd(ord => (ord.e = ord.e ? undefined : 1)),

          insertNewBlock: modifyInvocableCom((com, { insertAfterOrdwOrFirst, type, chordi, texti }) => {
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

          setPositionsLine: modifyOrd((ord, { linei, line }, com) => {
            let targetOrd = ord;
            if (ord.a != null) {
              targetOrd = com.o?.find(o => o.w === ord.a) ?? ord;
              delete ord.p;
            }

            targetOrd.p ??= [];
            targetOrd.p[linei] = line;
          }),

          trimOverPositions: modifyOrd((ord, _, com) => {
            if (com.t == null) throw 'В песне нет текстов';

            let targetOrd = ord;
            if (ord.a != null) {
              targetOrd = com.o?.find(o => o.w === ord.a) ?? ord;
              delete ord.p;
            }

            if (targetOrd.t == null || !com.t[targetOrd.t]) throw 'Текста нет';
            if (targetOrd.p == null) throw 'Аппликатура не обнаружена';

            const textLinesCount = com.t[targetOrd.t].split(makeRegExp('/\n/')).length;
            if (textLinesCount < targetOrd.p.length) targetOrd.p.length = textLinesCount;
          }),

          setModulationValue: modifyOrd((ord, { value }) => {
            ord.f ??= {};
            ord.f.md = value;
          }),

          removeRepeats: modifyOrd(ord => delete ord.r),
        },

        onEachFeedback: {
          clearOwnRepeats: ({ orderTitle }, com) =>
            `Сброшено значение повторений для блока ${orderTitle} в песне ${getCmComNameInBrackets(com)}`,

          setRepeats: ({ orderTitle, textValue }, com) =>
            `Изменены повторения для блока ${orderTitle} в песне ${getCmComNameInBrackets(com)}:\n\n${textValue}`,

          setType: ({ orderTitle, newTypeTitle }, com) =>
            `В песне ${getCmComNameInBrackets(com)} название блока ${orderTitle} изменено на ${newTypeTitle}`,

          bindChordBlock: ({ orderTitle, chordi, isAnchor }, com) =>
            `В песне ${getCmComNameInBrackets(com)} к ${isAnchor ? 'ссылке на блок' : 'блоку'} ` +
            `${orderTitle} прикреплён ${chordi + 1}-й блок Аккордов`,

          toggleVisibility: ({ ordw, orderTitle }, com) =>
            `В песне ${getCmComNameInBrackets(com)} порядковый блок ` +
            `${orderTitle} сделан ${getOrder(com, ordw)?.v ? '' : 'не'}видимым`,

          toggleAnchorInheritVisibility: ({ ordw: leadOrderWid, anchorInheritIndex, leadOrderTitle }, com) =>
            `В песне ${getCmComNameInBrackets(com)} ${anchorInheritIndex + 2}-я часть ссылки на ${leadOrderTitle}` +
            ` сделана ${getOrder(com, leadOrderWid)?.inh?.v?.[anchorInheritIndex] == null ? '' : 'не'}видимой`,

          moveOrdAfter: ({ orderTitle }, com) =>
            `Перемещён порядковый блок ${orderTitle} в песне ${getCmComNameInBrackets(com)}`,

          addAnchorOrder: ({ orderTitle }, com) =>
            `В песне ${getCmComNameInBrackets(com)} создана ссылка ${orderTitle}`,

          setTexti: ({ orderTitle, texti }, com) =>
            `В песне ${getCmComNameInBrackets(com)} к порядковому блоку ${orderTitle} прикреплён ${texti + 1} текст`,

          toggleVisibilityInMiniMode: ({ orderTitle, ordw }, com) =>
            `В песне ${getCmComNameInBrackets(com)} ссылка на блок ${orderTitle} сделана ` +
            `${getOrder(com, ordw)?.o ? 'видимой' : 'невидимой'} в мини-режиме`,

          toggleTitleVisibility: ({ orderTitle, ordw }, com) =>
            `В песне ${getCmComNameInBrackets(com)} заголовок в порядковом блоке ${orderTitle} сделан ` +
            `${getOrder(com, ordw)?.e ? 'видимым' : 'невидимым'}`,

          remove: ({ orderTitle, isAnchor }, com) =>
            `В песне ${getCmComNameInBrackets(com)} ${isAnchor ? 'удалена ссылка на' : 'удалён'} ${orderTitle}`,

          insertNewBlock: ({ orderTitle }, com) =>
            `В песне ${getCmComNameInBrackets(com)} добавлен новый порядковый блок ${orderTitle}`,

          setPositionsLine: ({ orderTitle, linei, lineChangesText }, com) =>
            `В песне ${getCmComNameInBrackets(com)} в блоке ${orderTitle} изменена аппликатура в ` +
            `${linei + 1}-й строке: ${lineChangesText}`,

          trimOverPositions: ({ orderTitle }, com) =>
            `В песне ${getCmComNameInBrackets(com)} в блоке ${orderTitle} удалены лишние строки аппликатуры`,

          setModulationValue: ({ orderTitle, value }, com) =>
            `В песне ${getCmComNameInBrackets(com)} установлено значение модулирования блока ${orderTitle} - ${value}`,

          removeRepeats: ({ orderTitle }, com) =>
            `В песне ${getCmComNameInBrackets(com)} убраны повторения в блоке ${orderTitle}`,
        },
      });
    }
  })();

function modifyOrd<Props extends { ordw: CmComOrderWid; comw: CmComWid }>(
  modifier: (ord: IExportableOrder, props: Props, com: IExportableCom) => void,
) {
  return modifyInvocableCom<Props>((com, props) => {
    const ord = com.o?.find(ord => ord.w === props.ordw);

    if (ord == null) throw new Error('Ord not found');

    modifier(ord, props, com);

    return com;
  });
}

const getNextOrdWid = (ords: { w: CmComOrderWid }[]) =>
  ords.reduce((max, curr) => (curr.w > max ? curr.w : max), CmComOrderWid.def) + 1;

const getOrder = (com: IExportableCom, ordw: CmComOrderWid) => com.o?.find(o => o.w === ordw);
