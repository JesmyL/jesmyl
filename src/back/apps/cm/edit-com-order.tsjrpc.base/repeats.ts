import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { makeRegExp } from 'regexpert';
import { CmComMod, CmComWid, OrderRepeats, SpecialOrderRepeats } from 'shared/api';
import { CmEditComOrderTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com-order.tsjrpc.model';
import { CmCom } from 'shared/const/cm/Com';
import { CmComOrder } from 'shared/const/cm/order/Order';
import { checkIsNil, checkIsNotNil, checkIsNotObject, checkIsObject } from 'shared/utils/checkIs';
import { checkIsEq } from 'shared/utils/checkIsEq';
import { nbsp } from 'shared/utils/cm/com/const';
import { orderListConstructor } from 'shared/utils/cm/com/orderListConstructor';
import { cmComOrderMakeRegions } from 'shared/utils/cm/makeRegions';
import { cmComOrderMakeRepeatedText } from 'shared/utils/cm/makeRepeatedText';
import { takeCmComOrderRepeatPortalKeyLetter } from 'shared/utils/cm/repeat-keys';
import { objectKeys, objectLength } from 'shared/utils/object.utils';
import { clearNullableOrderInheritValues, modifyOrd } from './utils';

export const cmEditComOrderServerTsjrpcRepeats = {
  clearOwnRepeats: modifyOrd((ord, { orderTitle, inhi }, { auth }, com) => {
    if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_REP', 'U')) throw '';

    const removeAllJoinRepeats = (ordRepeats: OrderRepeats | nil) => {
      if (checkIsNotObject(ordRepeats)) return;

      objectKeys(ordRepeats).forEach(repeatKey => {
        const letter = takeCmComOrderRepeatPortalKeyLetter(repeatKey);

        if (!letter) return;

        const deleteKeysWithLetter = (reps: SpecialOrderRepeats | nil) => {
          if (checkIsNotObject(reps)) return;

          objectKeys(reps).forEach(key => {
            if (takeCmComOrderRepeatPortalKeyLetter(key) === letter) delete reps[key];
          });
        };

        com.o?.forEach(ord => {
          if (checkIsObject(ord.r)) {
            deleteKeysWithLetter(ord.r);

            if (!objectLength(ord.r)) delete ord.r;
          }

          if (ord._r) {
            const inheritRepeats = ord._r;
            ord._r.forEach((inheritReps, inheritRepsi) => {
              if (checkIsNotObject(inheritReps)) return;

              deleteKeysWithLetter(inheritReps);

              if (!objectLength(inheritReps)) {
                delete inheritRepeats[inheritRepsi];
              }
            });

            while (objectLength(ord._r) && ord._r[objectLength(ord._r) - 1] == null) {
              ord._r.pop();
            }

            if (!objectLength(ord._r)) delete ord._r;
          }
        });
      });
    };

    if (inhi == null) {
      removeAllJoinRepeats(ord.r);
      clearNullableOrderInheritValues(ord, '_r');

      delete ord.r;
    } else if (ord._r?.[inhi] != null) {
      removeAllJoinRepeats(ord._r[inhi]);

      if (ord._r) {
        delete ord._r[inhi];

        clearNullableOrderInheritValues(ord, '_r');
      }
    }

    return `сброшено значение повторений для блока ${orderTitle}`;
  }),

  setRepeats: modifyOrd((ord, { value, selfOrdw }, { auth }, com) => {
    if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_REP', 'U')) throw '';
    const cmCom = new CmCom({ ...com, m: CmComMod.def, w: CmComWid.def, al: [] }, null, null);

    const ords = orderListConstructor(me => new CmComOrder(me as never, cmCom), cmCom.ords, null, 0);

    const comOrd = ords?.find(ord => ord.wid === selfOrdw);

    if (!comOrd) throw 'Self Ord is not found';
    const inhi = comOrd.me.anchorInheritIndex;

    const prevValue = checkIsNotNil(inhi) ? ord._r?.[inhi] : ord.r;
    const ordText = comOrd.text;
    const orders = cmCom.setOrders() ?? [];

    const makeTitle = (value: OrderRepeats | nil) => {
      const regions = cmComOrderMakeRegions(comOrd, ordText, value, orders);

      return ordText
        ? cmComOrderMakeRepeatedText(comOrd.transformedText(), regions).replace(makeRegExp(`/${nbsp}/g`), ' ')
        : comOrd.me.header({ repeats: comOrd.repeatsTitle });
    };

    let isDel = false;

    if (comOrd.me.isAnchorInherit) isDel = checkIsEq(value, comOrd.getWatchValue('r'));
    else if (comOrd.isAnchor) isDel = checkIsEq(value, comOrd.me.targetOrd?.repeats);
    let newValueHolder;

    if (checkIsNotNil(inhi)) {
      ord._r ??= [];

      if (isDel) delete ord._r[inhi];
      else ord._r[inhi] = value;

      clearNullableOrderInheritValues(ord, '_r');

      newValueHolder = { v: ord._r[inhi] };
    } else if ((!value && checkIsNil(ord.a)) || isDel) delete ord.r;
    else ord.r = value;

    newValueHolder ??= { v: ord.r };

    return `изменены повторения для блока ${comOrd.me.header()}:\n\n${makeTitle(newValueHolder.v)}\n\nбыло:\n${makeTitle(prevValue)}`;
  }),
} satisfies ServerTsjrpcSatisfy<CmEditComOrderTsjrpcModel>;
