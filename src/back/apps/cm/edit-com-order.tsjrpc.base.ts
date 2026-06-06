import {
  checkWhatOfUserScopeOperationAccessRight,
  throwIfNoUserScopeAccessRight,
} from 'back/complect/throwIfNoUserScopeAccessRight';
import { ServerTSJRPCTool, TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { makeRegExp } from 'regexpert';
import {
  CmComMod,
  CmComOrderWid,
  CmComWid,
  IExportableOrder,
  IServerSideCom,
  OrderRepeats,
  SpecialOrderRepeats,
} from 'shared/api';
import { CmEditComOrderTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com-order.tsjrpc.model';
import { CmCom } from 'shared/const/cm/Com';
import { CmComOrder } from 'shared/const/cm/order/Order';
import { checkIsNil, checkIsNotObject, checkIsNull, checkIsObject, checkIsUndefined } from 'shared/utils/checkIs';
import { checkIsEq } from 'shared/utils/checkIsEq';
import { nbsp } from 'shared/utils/cm/com/const';
import { orderListConstructor } from 'shared/utils/cm/com/orderListConstructor';
import { cmComOrderMakeRegions } from 'shared/utils/cm/makeRegions';
import { takeCmComOrderRepeatPortalKeyLetter } from 'shared/utils/cm/repeat-keys';
import { objectKeys, objectLength } from 'shared/utils/object.utils';
import { modifyCom } from './edit-com.tsjrpc.base';

export const cmEditComOrderServerTsjrpcBase =
  new (class CmEditComOrder extends TsjrpcBaseServer<CmEditComOrderTsjrpcModel> {
    constructor() {
      super({
        scope: 'CmEditComOrder',
        methods: {
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

            const textValue = comOrd.text
              ? comOrd
                  .repeatedText(cmComOrderMakeRegions(comOrd, comOrd.text, value, (cmCom.setOrders() ?? []) as never))
                  .replace(makeRegExp(`/${nbsp}/g`), ' ')
              : comOrd.me.header({ repeats: comOrd.repeatsTitle });

            let isDel = false;

            if (comOrd.me.isAnchorInherit) isDel = checkIsEq(value, comOrd.getWatchValue('r'));
            else if (comOrd.isAnchor) isDel = checkIsEq(value, comOrd.me.targetOrd?.repeats);

            if (inhi != null) {
              ord._r ??= [];

              if (isDel) delete ord._r[inhi];
              else ord._r[inhi] = value;

              clearNullableOrderInheritValues(ord, '_r');
            } else if ((!value && checkIsNull(ord.a)) || isDel) delete ord.r;
            else ord.r = value;

            return `изменены повторения для блока ${comOrd.me.header()}:\n\n${textValue}`;
          }),
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

function modifyOrd<Props extends { ordw: CmComOrderWid; comw: CmComWid }>(
  modifier: (ord: IExportableOrder, props: Props, tool: ServerTSJRPCTool, com: IServerSideCom) => string | null,
) {
  return modifyCom<Props>((com, props, tool) => {
    const ord = com.o?.find(o => o.w === props.ordw);

    if (checkIsNil(ord)) throw new Error('Порядковый блок не найден');

    return modifier(ord, props, tool, com);
  });
}

const getNextOrdWid = (ords: { w: CmComOrderWid }[]) =>
  ords.reduce((max, curr) => (curr.w > max ? curr.w : max), CmComOrderWid.def) + 1;

const clearNullableOrderInheritValues = (ord: IExportableOrder, key: '_r' | '_v') => {
  if (checkIsNil(ord[key])) return;

  while (objectLength(ord[key]) && checkIsNil(ord[key][objectLength(ord[key]) - 1])) ord[key].pop();

  if (!objectLength(ord[key])) delete ord[key];
};
