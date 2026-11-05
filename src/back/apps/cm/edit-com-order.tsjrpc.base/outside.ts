import { backLocaleError } from 'back/locales/back';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
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
  insertNewBlock: modifyCom(
    ['COM_ORD', 'C'],
    async (com, { insertAfterOrdwOrFirst, kind, chordi, texti, orderTitle }, { auth }) => {
      com.o ??= [];
      const afterOrdi = checkIsNil(insertAfterOrdwOrFirst)
        ? -1
        : com.o.findIndex(ord => ord.w === insertAfterOrdwOrFirst);

      const ord: IExportableOrder = {
        w: getNextOrdWid(com.o),
        k: kind,
        c: chordi,
        t: texti,
        cre: (await checkWhatOfUserScopeOperationAccessRight(auth, 'cm', 'COM_ORD')).D ? undefined : Date.now(),
      };

      com.o.splice(afterOrdi + 1, 0, ord);

      return backLocaleError(BackLocaleKey.CmComOrdInserted, { b: orderTitle });
    },
  ),

  addAnchorOrder: modifyCom('COM_ORD', async (com, { insertAfterOrdw, targetOrdw, orderTitle }, { auth }) => {
    com.o ??= [];

    const targetOrdi = com.o.findIndex(o => o.w === targetOrdw);
    const insertAfterOrdi = com.o.findIndex(o => o.w === insertAfterOrdw);

    if (targetOrdi < 0) throw backLocaleError(BackLocaleKey.CmComOrderTargetNotFound);
    if (insertAfterOrdi < 0) throw backLocaleError(BackLocaleKey.CmComOrderAnchorNotFound);
    if (insertAfterOrdi < targetOrdi) throw backLocaleError(BackLocaleKey.CmComOrderTargetAboveAnchor);

    com.o.splice(insertAfterOrdi + 1, 0, {
      w: getNextOrdWid(com.o),
      a: targetOrdw,
      cre: (await checkWhatOfUserScopeOperationAccessRight(auth, 'cm', 'COM_ORD')).D ? undefined : Date.now(),
    });

    return backLocaleError(BackLocaleKey.CmComOrdRefCreated, { b: orderTitle });
  }),

  moveOrdAfter: modifyCom('COM_ORD', async (com, { insertAfterOrdwOrFirst, ordw, orderTitle }, { auth }) => {
    if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';

    com.o ??= [];

    const movableOrdi = com.o.findIndex(o => o.w === ordw);
    const insertAfterOrdi = checkIsNil(insertAfterOrdwOrFirst)
      ? -1
      : com.o.findIndex(o => o.w === insertAfterOrdwOrFirst);

    if (movableOrdi < 0) throw backLocaleError(BackLocaleKey.CmComOrderTargetNotFound);

    const [ord] = com.o.splice(movableOrdi, 1);
    com.o.splice(insertAfterOrdi + (movableOrdi < insertAfterOrdi ? 0 : 1), 0, ord);

    return backLocaleError(BackLocaleKey.CmComOrdMoved, { b: orderTitle });
  }),
} satisfies ServerTsjrpcSatisfy<CmEditComOrderTsjrpcModel>;
