import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { makeRegExp } from 'regexpert';
import { CmEditComOrderTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com-order.tsjrpc.model';
import { CmComOrder } from 'shared/const/cm/order/Order';
import { checkIsNil, checkIsUndefined } from 'shared/utils/checkIs';
import { objectLength } from 'shared/utils/object.utils';
import { cmEditComOrderServerTsjrpcOutside } from './outside';
import { cmEditComOrderServerTsjrpcRepeats } from './repeats';
import { clearNullableOrderInheritValues, modifyOrd, ModifyOrdParent } from './utils';

export const cmEditComOrderServerTsjrpcBase =
  new (class CmEditComOrder extends TsjrpcBaseServer<CmEditComOrderTsjrpcModel> {
    constructor() {
      super({
        scope: 'CmEditComOrder',
        methods: {
          ...cmEditComOrderServerTsjrpcRepeats,
          ...cmEditComOrderServerTsjrpcOutside,

          setKind: modifyOrd(ModifyOrdParent.Self, (ord, { kind, newTypeTitle }, { auth }, _, getCmComOrd) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';
            if (kind == null) throw 'Неизвестный тип';

            ord.k = kind;

            return `название блока ${makeOrdTitle(getCmComOrd)} изменено на ${newTypeTitle}`;
          }),

          bindChordBlock: modifyOrd(ModifyOrdParent.Self, (ord, { chordi }, { auth }, _, getCmComOrd) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';

            ord.c = chordi;

            return `к ${getCmComOrd().isAnchor ? 'ссылке на блок' : 'блоку'} ${makeOrdTitle(getCmComOrd)} прикреплён ${chordi + 1}-й блок Аккордов`;
          }),

          toggleVisibility: modifyOrd(ModifyOrdParent.Self, (ord, _, { auth }, __, getCmComOrd) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'D')) throw '';

            ord.v ??= 1;
            ord.v = ord.v ? 0 : 1;
            if (ord.v) delete ord.v;

            return `порядковый блок ${makeOrdTitle(getCmComOrd)} сделан ${ord.v ? '' : 'не'}видимым`;
          }),

          toggleAnchorInheritVisibility: modifyOrd(ModifyOrdParent.Self, (ord, { leadOrderTitle, inhi }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';

            ord._v ??= [];
            ord._v[inhi] = checkIsUndefined(ord._v[inhi]) ? 0 : undefined;

            clearNullableOrderInheritValues(ord, '_v');

            return `часть ссылки на ${leadOrderTitle} сделана ${checkIsNil(ord._v?.[inhi]) ? '' : 'не'}видимой`;
          }),

          remove: modifyOrd(ModifyOrdParent.Self, (ord, { ordw }, { auth }, com, getCmComOrd) => {
            if (
              (ord.cre ?? com.w) < Date.now() - 24 * 60 * 60 * 1000 &&
              throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'D')
            )
              throw '';

            com.o ??= [];
            com.o = com.o.filter(ord => ord.w !== ordw && ord.a !== ordw);

            return `${getCmComOrd().isAnchor ? 'удалена ссылка на' : 'удалён'} ${makeOrdTitle(getCmComOrd)}`;
          }),

          setTexti: modifyOrd(ModifyOrdParent.Self, (ord, { texti }, { auth }, _, getCmComOrd) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';

            ord.t = texti;

            return `к порядковому блоку ${makeOrdTitle(getCmComOrd)} прикреплён ${texti + 1} текст`;
          }),

          toggleVisibilityInMiniMode: modifyOrd(ModifyOrdParent.Self, (ord, _, { auth }, __, getCmComOrd) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';

            ord.o = ord.o ? undefined : 1;

            return `ссылка на блок ${makeOrdTitle(getCmComOrd)} сделана ${ord.o ? 'видимой' : 'невидимой'} в мини-режиме`;
          }),

          toggleTitleVisibility: modifyOrd(ModifyOrdParent.Self, (ord, _, { auth }, __, getCmComOrd) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';

            ord.e = ord.e ? undefined : 1;

            return `заголовок в порядковом блоке ${makeOrdTitle(getCmComOrd)} сделан ${ord.e ? 'видимым' : 'невидимым'}`;
          }),

          setPositionsLine: modifyOrd(
            ModifyOrdParent.Watch,
            (ord, { linei, line, lineChangesText }, { auth }, _, getCmComOrd) => {
              if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_APPS', 'U')) throw '';

              ord.p ??= [];
              ord.p[linei] = Array.from(new Set(line)).sort((a, b) => a - b);

              return `в блоке ${makeOrdTitle(getCmComOrd)} изменена аппликатура в ${linei + 1}-й строке: ${lineChangesText}`;
            },
          ),

          trimOverPositions: modifyOrd(ModifyOrdParent.Target, (ord, _, { auth }, com, getCmComOrd) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_APPS', 'U')) throw '';

            if (checkIsNil(com.t)) throw 'В песне нет текстов';

            if (checkIsNil(ord.t) || !com.t[ord.t]) throw 'Текста нет';
            if (checkIsNil(ord.p)) throw 'Аппликатура не обнаружена';

            const textLinesCount = objectLength(com.t[ord.t].split(makeRegExp('/\n/')));
            if (textLinesCount < objectLength(ord.p)) ord.p.length = textLinesCount;

            return `в блоке ${makeOrdTitle(getCmComOrd)} удалены лишние строки аппликатуры`;
          }),

          setModulationValue: modifyOrd(ModifyOrdParent.Self, (ord, { value }, _, __, getCmComOrd) => {
            ord.md = value || undefined;

            return `установлено значение модулирования блока ${makeOrdTitle(getCmComOrd)} - ${value}`;
          }),
        },
      });
    }
  })();

const makeOrdTitle = (getCmComOrd: () => CmComOrder) => getCmComOrd().me.header();
