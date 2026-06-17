import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { makeRegExp } from 'regexpert';
import { OrderRepeats, SpecialOrderRepeats } from 'shared/api';
import { CmEditComOrderTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com-order.tsjrpc.model';
import { checkIsNil, checkIsNotNil, checkIsNotObject, checkIsObject } from 'shared/utils/checkIs';
import { checkIsEq } from 'shared/utils/checkIsEq';
import { nbsp } from 'shared/utils/cm/com/const';
import { cmComOrderMakeRegions } from 'shared/utils/cm/makeRegions';
import { cmComOrderMakeRepeatedText } from 'shared/utils/cm/makeRepeatedText';
import { takeCmComOrderRepeatPortalKeyLetter } from 'shared/utils/cm/repeat-keys';
import { objectKeys, objectLength } from 'shared/utils/object.utils';
import { clearNullableOrderInheritValues, modifyOrd, ModifyOrdParent } from './utils';

export const cmEditComOrderServerTsjrpcRepeats = {
  clearOwnRepeats: modifyOrd(ModifyOrdParent.LeadOrSelf, (ord, _, { auth }, com, getCmComOrd) => {
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

    const inhi = getCmComOrd().me.anchorInheritIndex;

    if (checkIsNil(inhi)) {
      removeAllJoinRepeats(ord.r);
      clearNullableOrderInheritValues(ord, '_r');

      delete ord.r;
    } else if (checkIsNotNil(ord._r?.[inhi])) {
      removeAllJoinRepeats(ord._r[inhi]);

      if (ord._r) {
        delete ord._r[inhi];

        clearNullableOrderInheritValues(ord, '_r');
      }
    }

    return `сброшено значение повторений для блока ${getCmComOrd().me.header()}`;
  }),

  setRepeats: modifyOrd(
    ModifyOrdParent.LeadOrSelf,
    (ord, { value }, { auth }, _com, getCmComOrd, _getCmCom, getCmComOrds) => {
      if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_REP', 'U')) throw '';

      const comOrd = getCmComOrd();
      const inhi = comOrd.me.anchorInheritIndex;

      const prevValue = checkIsNotNil(inhi) ? ord._r?.[inhi] : ord.r;
      const ordText = comOrd.text;

      const makeTitle = (value: OrderRepeats | nil) => {
        const regions = cmComOrderMakeRegions(comOrd, ordText, value, getCmComOrds());

        return ordText
          ? cmComOrderMakeRepeatedText(comOrd.transformedText(), regions).replace(makeRegExp(`/${nbsp}/g`), ' ')
          : comOrd.me.header({ repeats: comOrd.repeatsTitle });
      };

      let isDel = false;
      let newValueHolder;

      if (comOrd.me.isAnchorInherit) isDel = checkIsEq(value, comOrd.getWatchValue('r'));
      else if (comOrd.isAnchor) isDel = checkIsEq(value, comOrd.me.targetOrd?.repeats);
      else isDel = !value;

      if (value === 1) value = 0;

      if (checkIsNotNil(inhi)) {
        ord._r ??= [];

        if (isDel) delete ord._r[inhi];
        else ord._r[inhi] = value;

        clearNullableOrderInheritValues(ord, '_r');

        newValueHolder = { v: ord._r[inhi] };
      } else if (isDel) delete ord.r;
      else ord.r = value;

      newValueHolder ??= { v: ord.r };

      return `изменены повторения для блока ${comOrd.me.header()}:\n\n${makeTitle(newValueHolder.v)}\n\nбыло:\n${makeTitle(prevValue)}`;
    },
  ),

  removeRepeats: modifyOrd(ModifyOrdParent.Self, (ord, _, __, ___, getCmComOrd) => {
    delete ord.r;

    return `убраны повторения в блоке ${getCmComOrd().me.header()}`;
  }),
} satisfies ServerTsjrpcSatisfy<CmEditComOrderTsjrpcModel>;
