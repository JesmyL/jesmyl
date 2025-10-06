import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { ServerTSJRPCTool, TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { makeRegExp } from 'regexpert';
import { CmComOrderWid, CmComWid, IExportableOrder, IServerSideCom } from 'shared/api';
import { CmEditComOrderTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com-order.tsjrpc.model';
import { itNNil, smylib } from 'shared/utils';
import { getCmComNameInBrackets, modifyInvocableCom } from './edit-com.tsjrpc.base';

export const cmEditComOrderServerTsjrpcBase =
  new (class CmEditComOrder extends TsjrpcBaseServer<CmEditComOrderTsjrpcModel> {
    constructor() {
      super({
        scope: 'CmEditComOrder',
        methods: {
          clearOwnRepeats: modifyOrd((ord, { orderTitle }, com, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_REP', 'U')) throw '';

            delete ord.r;

            return `Сброшено значение повторений для блока ${orderTitle} в песне ${getCmComNameInBrackets(com)}`;
          }),
          setRepeats: modifyOrd((ord, { value, inhIndex, orderTitle, textValue }, com, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_REP', 'U')) throw '';

            if (inhIndex !== undefined) {
              ord.inh ??= {};
              ord.inh.r ??= {};

              ord.inh.r[inhIndex] = value;

              if (!smylib.values(ord.inh.v).filter(itNNil).length) delete ord.inh.v;
              if (!smylib.values(ord.inh).filter(itNNil).length) delete ord.inh;
            } else ord.r = value;

            return `Изменены повторения для блока ${orderTitle} в песне ${getCmComNameInBrackets(com)}:\n\n${textValue}`;
          }),
          setType: modifyOrd((ord, { type, newTypeTitle, orderTitle }, com, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';

            ord.s = type;

            return `В песне ${getCmComNameInBrackets(com)} название блока ${orderTitle} изменено на ${newTypeTitle}`;
          }),
          bindChordBlock: modifyOrd((ord, { chordi, isAnchor, orderTitle }, com, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';

            ord.c = chordi;

            return (
              `В песне ${getCmComNameInBrackets(com)} к ${isAnchor ? 'ссылке на блок' : 'блоку'} ` +
              `${orderTitle} прикреплён ${chordi + 1}-й блок Аккордов`
            );
          }),

          toggleVisibility: modifyOrd((ord, { orderTitle }, com, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';

            ord.v = ord.v ? 0 : 1;

            return (
              `В песне ${getCmComNameInBrackets(com)} порядковый блок ` +
              `${orderTitle} сделан ${ord.v ? '' : 'не'}видимым`
            );
          }),

          toggleAnchorInheritVisibility: modifyOrd((ord, { anchorInheritIndex, leadOrderTitle }, com, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';

            ord.inh ??= {};
            ord.inh.v ??= {};

            ord.inh.v[anchorInheritIndex] = ord.inh.v[anchorInheritIndex] === undefined ? 0 : undefined;

            if (!smylib.values(ord.inh.v).filter(itNNil).length) delete ord.inh.v;
            if (!smylib.values(ord.inh).filter(itNNil).length) delete ord.inh;

            return (
              `В песне ${getCmComNameInBrackets(com)} ${anchorInheritIndex + 2}-я часть ссылки на ${leadOrderTitle}` +
              ` сделана ${ord.inh?.v?.[anchorInheritIndex] == null ? '' : 'не'}видимой`
            );
          }),

          moveOrdAfter: modifyInvocableCom((com, { insertAfterOrdwOrFirst, ordw, orderTitle }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';

            com.o ??= [];

            const movableOrdi = com.o.findIndex(o => o.w === ordw);
            const insertAfterOrdi =
              insertAfterOrdwOrFirst == null ? -1 : com.o.findIndex(o => o.w === insertAfterOrdwOrFirst);

            if (movableOrdi < 0) throw new Error('Целевой порядковый блок не найден');

            const [ord] = com.o.splice(movableOrdi, 1);
            com.o.splice(insertAfterOrdi + (movableOrdi < insertAfterOrdi ? 0 : 1), 0, ord);

            return `Перемещён порядковый блок ${orderTitle} в песне ${getCmComNameInBrackets(com)}`;
          }),

          remove: modifyInvocableCom((com, { ordw, isAnchor, orderTitle }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'D')) throw '';

            com.o ??= [];
            com.o = com.o.filter(ord => ord.w !== ordw && ord.a !== ordw);

            return `В песне ${getCmComNameInBrackets(com)} ${isAnchor ? 'удалена ссылка на' : 'удалён'} ${orderTitle}`;
          }),

          addAnchorOrder: modifyInvocableCom((com, { insertAfterOrdw, targetOrdw, orderTitle }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';

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

            return `В песне ${getCmComNameInBrackets(com)} создана ссылка ${orderTitle}`;
          }),

          setTexti: modifyOrd((ord, { texti, orderTitle }, com, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';

            ord.t = texti;

            return `В песне ${getCmComNameInBrackets(com)} к порядковому блоку ${orderTitle} прикреплён ${texti + 1} текст`;
          }),

          toggleVisibilityInMiniMode: modifyOrd((ord, { orderTitle }, com, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';

            ord.o = ord.o ? undefined : 1;

            return (
              `В песне ${getCmComNameInBrackets(com)} ссылка на блок ${orderTitle} сделана ` +
              `${ord.o ? 'видимой' : 'невидимой'} в мини-режиме`
            );
          }),

          toggleTitleVisibility: modifyOrd((ord, { orderTitle }, com, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';

            ord.e = ord.e ? undefined : 1;

            return (
              `В песне ${getCmComNameInBrackets(com)} заголовок в порядковом блоке ${orderTitle} сделан ` +
              `${ord.e ? 'видимым' : 'невидимым'}`
            );
          }),

          insertNewBlock: modifyInvocableCom(
            (com, { insertAfterOrdwOrFirst, type, chordi, texti, orderTitle }, { auth }) => {
              if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'C')) throw '';

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

              return `В песне ${getCmComNameInBrackets(com)} добавлен новый порядковый блок ${orderTitle}`;
            },
          ),

          setPositionsLine: modifyOrd((ord, { linei, line, lineChangesText, orderTitle }, com, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_APPS', 'U')) throw '';

            let targetOrd = ord;
            if (ord.a != null) {
              targetOrd = com.o?.find(o => o.w === ord.a) ?? ord;
              delete ord.p;
            }

            targetOrd.p ??= [];
            targetOrd.p[linei] = line;

            return (
              `В песне ${getCmComNameInBrackets(com)} в блоке ${orderTitle} изменена аппликатура в ` +
              `${linei + 1}-й строке: ${lineChangesText}`
            );
          }),

          trimOverPositions: modifyOrd((ord, { orderTitle }, com, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_APPS', 'U')) throw '';

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

            return `В песне ${getCmComNameInBrackets(com)} в блоке ${orderTitle} удалены лишние строки аппликатуры`;
          }),

          setModulationValue: modifyOrd((ord, { value, orderTitle }, com) => {
            ord.f ??= {};
            ord.f.md = value;

            return `В песне ${getCmComNameInBrackets(com)} установлено значение модулирования блока ${orderTitle} - ${value}`;
          }),

          removeRepeats: modifyOrd((ord, { orderTitle }, com) => {
            delete ord.r;

            return `В песне ${getCmComNameInBrackets(com)} убраны повторения в блоке ${orderTitle}`;
          }),
        },
      });
    }
  })();

function modifyOrd<Props extends { ordw: CmComOrderWid; comw: CmComWid }>(
  modifier: (ord: IExportableOrder, props: Props, com: IServerSideCom, tool: ServerTSJRPCTool) => string | null,
) {
  return modifyInvocableCom<Props>((com, props, tool) => {
    const ord = com.o?.find(ord => ord.w === props.ordw);

    if (ord == null) throw new Error('Ord not found');

    return modifier(ord, props, com, tool);
  });
}

const getNextOrdWid = (ords: { w: CmComOrderWid }[]) =>
  ords.reduce((max, curr) => (curr.w > max ? curr.w : max), CmComOrderWid.def) + 1;
