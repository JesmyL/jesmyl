import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { CmComTextSquareBracketsMode, OrderRepeats, SpecialOrderRepeats } from 'shared/api';
import { CmEditComOrderTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com-order.tsjrpc.model';
import { CmCom } from 'shared/const/cm/Com';
import { extractNumber } from 'shared/utils';
import { checkIsNil, checkIsNotNil, checkIsNotObject, checkIsObject } from 'shared/utils/checkIs';
import { checkIsEq } from 'shared/utils/checkIsEq';
import { comNbspReg } from 'shared/utils/cm/com/const';
import { cmComOrderMakeRegions } from 'shared/utils/cm/makeRegions';
import { cmComOrderMakeRepeatedText } from 'shared/utils/cm/makeRepeatedText';
import { takeCmComOrderRepeatPortalKeyLetter } from 'shared/utils/cm/repeat-keys';
import { forEachObjectEntries, objectKeys, objectLength } from 'shared/utils/object.utils';
import { modifyCom } from '../edit-com.tsjrpc.base';
import { clearNullableOrderInheritValues, modifyOrd, ModifyOrdParent } from './utils';

export const cmEditComOrderServerTsjrpcRepeats = {
  clearOwnRepeats: modifyOrd(ModifyOrdParent.LeadOrSelf, 'COM_REP', (ord, getCmComOrd, _, __, com) => {
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

  setRepeats_v1: modifyCom('COM_REP', (icom, { upd }) => {
    const com = new CmCom(icom, null, null);
    const ords = com.setOrders();
    const titles: string[] = [];

    if (ords)
      forEachObjectEntries(upd, (ordwStr, value) => {
        const ordw = extractNumber(ordwStr);
        const comOrd = ords.find(ord => ord.wid === ordw);
        const ord = comOrd?.me.leadOrd?.me.source?.top ?? comOrd?.me.source?.top;

        if (!comOrd || !ord) throw 'Блок не найден';

        const inhi = comOrd.me.anchorInheritIndex;

        const prevValue = checkIsNotNil(inhi) ? ord._r?.[inhi] : ord.r;
        const ordText = comOrd.text;

        const makeTitle = (value: OrderRepeats | nil) => {
          const regions = cmComOrderMakeRegions(comOrd, ordText, value, ords);

          return ordText
            ? cmComOrderMakeRepeatedText(comOrd.transformedText(CmComTextSquareBracketsMode.AsIs), regions).replace(
                comNbspReg,
                ' ',
              )
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

        titles.push(`${comOrd.me.header()}:\n${makeTitle(newValueHolder.v)}\n\nбыло:\n${makeTitle(prevValue)}`);
      });

    return `изменены повторения для блок${titles.length > 1 ? 'ов' : 'а'} ${titles.join('\n\n')}`;
  }),

  removeRepeats: modifyOrd(ModifyOrdParent.Self, 'COM_REP', (ord, getCmComOrd) => {
    delete ord.r;

    return `убраны повторения в блоке ${getCmComOrd().me.header()}`;
  }),
} satisfies ServerTsjrpcSatisfy<CmEditComOrderTsjrpcModel>;
