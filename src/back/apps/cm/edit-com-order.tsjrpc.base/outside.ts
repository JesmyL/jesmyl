import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import {
  checkWhatOfUserScopeOperationAccessRight,
  throwIfNoUserScopeAccessRight,
} from 'back/complect/throwIfNoUserScopeAccessRight';
import { IExportableOrder } from 'shared/api';
import { CmEditComOrderTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com-order.tsjrpc.model';
import { checkIsNil } from 'shared/utils/checkIs';
import { modifyCom } from '../edit-com.tsjrpc.base';
import { getNextOrdWid } from './utils';

export const cmEditComOrderServerTsjrpcOutside = {
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
} satisfies ServerTsjrpcSatisfy<CmEditComOrderTsjrpcModel>;
