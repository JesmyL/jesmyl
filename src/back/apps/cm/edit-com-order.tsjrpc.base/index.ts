import {
  checkWhatOfUserScopeOperationAccessRight,
  throwIfNoUserScopeAccessRight,
} from 'back/complect/throwIfNoUserScopeAccessRight';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { makeRegExp } from 'regexpert';
import { IExportableOrder } from 'shared/api';
import { CmEditComOrderTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com-order.tsjrpc.model';
import { checkIsNil, checkIsUndefined } from 'shared/utils/checkIs';
import { objectLength } from 'shared/utils/object.utils';
import { modifyCom } from '../edit-com.tsjrpc.base';
import { cmEditComOrderServerTsjrpcRepeats } from './repeats';
import { clearNullableOrderInheritValues, getNextOrdWid, modifyOrd } from './utils';

export const cmEditComOrderServerTsjrpcBase =
  new (class CmEditComOrder extends TsjrpcBaseServer<CmEditComOrderTsjrpcModel> {
    constructor() {
      super({
        scope: 'CmEditComOrder',
        methods: {
          ...cmEditComOrderServerTsjrpcRepeats,

          setKind: modifyOrd((ord, { kind, newTypeTitle, orderTitle }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';
            if (kind == null) throw 'Неизвестный тип';

            ord.k = kind;

            return `название блока ${orderTitle} изменено на ${newTypeTitle}`;
          }),
          bindChordBlock: modifyOrd((ord, { chordi, isAnchor, orderTitle }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';

            ord.c = chordi;

            return `к ${isAnchor ? 'ссылке на блок' : 'блоку'} ${orderTitle} прикреплён ${chordi + 1}-й блок Аккордов`;
          }),

          toggleVisibility: modifyOrd((ord, { orderTitle }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'D')) throw '';

            ord.v ??= 1;
            ord.v = ord.v ? 0 : 1;
            if (ord.v) delete ord.v;

            return `порядковый блок ${orderTitle} сделан ${ord.v ? '' : 'не'}видимым`;
          }),

          toggleAnchorInheritVisibility: modifyOrd((ord, { leadOrderTitle, inhi }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';

            ord._v ??= [];
            ord._v[inhi] = checkIsUndefined(ord._v[inhi]) ? 0 : undefined;

            clearNullableOrderInheritValues(ord, '_v');

            return `часть ссылки на ${leadOrderTitle} сделана ${checkIsNil(ord._v?.[inhi]) ? '' : 'не'}видимой`;
          }),

          moveOrdAfter: modifyCom((com, { insertAfterOrdwOrFirst, ordw, orderTitle }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';

            com.o ??= [];

            const movableOrdi = com.o.findIndex(o => o.w === ordw);
            const insertAfterOrdi = checkIsNil(insertAfterOrdwOrFirst)
              ? -1
              : com.o.findIndex(o => o.w === insertAfterOrdwOrFirst);

            if (movableOrdi < 0) throw new Error('Целевой порядковый блок не найден');

            const [ord] = com.o.splice(movableOrdi, 1);
            com.o.splice(insertAfterOrdi + (movableOrdi < insertAfterOrdi ? 0 : 1), 0, ord);

            return `перемещён порядковый блок ${orderTitle}`;
          }),

          remove: modifyOrd((ord, { ordw, isAnchor, orderTitle }, { auth }, com) => {
            if (
              (ord.cre ?? com.w) < Date.now() - 24 * 60 * 60 * 1000 &&
              throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'D')
            )
              throw '';

            com.o ??= [];
            com.o = com.o.filter(ord => ord.w !== ordw && ord.a !== ordw);

            return `${isAnchor ? 'удалена ссылка на' : 'удалён'} ${orderTitle}`;
          }),

          addAnchorOrder: modifyCom((com, { insertAfterOrdw, targetOrdw, orderTitle }, { auth }) => {
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
              cre: checkWhatOfUserScopeOperationAccessRight(auth, 'cm', 'COM_ORD').D ? undefined : Date.now(),
            });

            return `создана ссылка ${orderTitle}`;
          }),

          setTexti: modifyOrd((ord, { texti, orderTitle }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';

            ord.t = texti;

            return `к порядковому блоку ${orderTitle} прикреплён ${texti + 1} текст`;
          }),

          toggleVisibilityInMiniMode: modifyOrd((ord, { orderTitle }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';

            ord.o = ord.o ? undefined : 1;

            return `ссылка на блок ${orderTitle} сделана ${ord.o ? 'видимой' : 'невидимой'} в мини-режиме`;
          }),

          toggleTitleVisibility: modifyOrd((ord, { orderTitle }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';

            ord.e = ord.e ? undefined : 1;

            return `заголовок в порядковом блоке ${orderTitle} сделан ${ord.e ? 'видимым' : 'невидимым'}`;
          }),

          insertNewBlock: modifyCom((com, { insertAfterOrdwOrFirst, kind, chordi, texti, orderTitle }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'C')) throw '';

            com.o ??= [];
            const afterOrdi = checkIsNil(insertAfterOrdwOrFirst)
              ? -1
              : com.o.findIndex(ord => ord.w === insertAfterOrdwOrFirst);

            const ord: IExportableOrder = {
              w: getNextOrdWid(com.o),
              k: kind,
              c: chordi,
              t: texti,
              cre: checkWhatOfUserScopeOperationAccessRight(auth, 'cm', 'COM_ORD').D ? undefined : Date.now(),
            };

            com.o.splice(afterOrdi + 1, 0, ord);

            return `добавлен новый порядковый блок ${orderTitle}`;
          }),

          setPositionsLine: modifyOrd((ord, { linei, line, lineChangesText, orderTitle }, { auth }, com) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_APPS', 'U')) throw '';

            let targetOrd = ord;
            if (ord.a != null) {
              targetOrd = com.o?.find(o => o.w === ord.a) ?? ord;
              delete ord.p;
            }

            targetOrd.p ??= [];
            targetOrd.p[linei] = Array.from(new Set(line)).sort((a, b) => a - b);

            return `в блоке ${orderTitle} изменена аппликатура в ${linei + 1}-й строке: ${lineChangesText}`;
          }),

          trimOverPositions: modifyOrd((ord, { orderTitle }, { auth }, com) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_APPS', 'U')) throw '';

            if (checkIsNil(com.t)) throw 'В песне нет текстов';

            let targetOrd = ord;
            if (ord.a != null) {
              targetOrd = com.o?.find(o => o.w === ord.a) ?? ord;
              delete ord.p;
            }

            if (checkIsNil(targetOrd.t) || !com.t[targetOrd.t]) throw 'Текста нет';
            if (checkIsNil(targetOrd.p)) throw 'Аппликатура не обнаружена';

            const textLinesCount = objectLength(com.t[targetOrd.t].split(makeRegExp('/\n/')));
            if (textLinesCount < objectLength(targetOrd.p)) targetOrd.p.length = textLinesCount;

            return `в блоке ${orderTitle} удалены лишние строки аппликатуры`;
          }),

          setModulationValue: modifyOrd((ord, { value, orderTitle }) => {
            ord.md = value || undefined;

            return `установлено значение модулирования блока ${orderTitle} - ${value}`;
          }),

          removeRepeats: modifyOrd((ord, { orderTitle }) => {
            delete ord.r;

            return `убраны повторения в блоке ${orderTitle}`;
          }),
        },
      });
    }
  })();
