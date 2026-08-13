import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { makeRegExp } from 'regexpert';
import { CmEditComOrderTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com-order.tsjrpc.model';
import { CmComOrder } from 'shared/const/cm/order/Order';
import { checkIsNowInCurrentDay } from 'shared/const/ms';
import { checkIsNil } from 'shared/utils/checkIs';
import { objectLength } from 'shared/utils/object.utils';
import { removeEmptyRightValues } from 'shared/utils/removeEmptyRightValues';
import { updateCmComOrderModulationValue, updateCmComOrderTonTypeSwitcherValue } from '../utils';
import { cmEditComOrderServerTsjrpcOutside } from './outside';
import { cmEditComOrderServerTsjrpcRepeats } from './repeats';
import { modifyOrd, ModifyOrdParent } from './utils';

export const cmEditComOrderServerTsjrpcBase =
  new (class CmEditComOrder extends TsjrpcBaseServer<CmEditComOrderTsjrpcModel> {
    constructor() {
      super({
        scope: 'CmEditComOrder',
        methods: {
          ...cmEditComOrderServerTsjrpcRepeats,
          ...cmEditComOrderServerTsjrpcOutside,

          setKind: modifyOrd(ModifyOrdParent.Self, 'COM_ORD', (ord, getCmComOrd, { kind, newTypeTitle }) => {
            if (kind == null) throw 'Неизвестный тип';

            ord.k = kind;

            return `название блока ${makeOrdTitle(getCmComOrd)} изменено на ${newTypeTitle}`;
          }),

          bindChordBlock: modifyOrd(ModifyOrdParent.Self, 'COM_ORD', (ord, getCmComOrd, { chordi }) => {
            ord.c = chordi;

            return `к ${getCmComOrd().isAnchor ? 'ссылке на блок' : 'блоку'} ${makeOrdTitle(getCmComOrd)} прикреплён ${chordi + 1}-й блок Аккордов`;
          }),

          toggleVisibility: modifyOrd(ModifyOrdParent.Self, ['COM_ORD', 'D'], (ord, getCmComOrd) => {
            const isVisible = getCmComOrd().isVisible;
            const targetOrd = getCmComOrd().me.targetOrd;

            if (!targetOrd) ord.v = undefined;

            if (isVisible === getCmComOrd().isVisible) {
              if (targetOrd) ord.v = targetOrd.isVisible ? (isVisible ? 0 : undefined) : isVisible ? undefined : 1;
              else ord.v = +!isVisible;
            }

            if (checkIsNil(ord.v)) delete ord.v;

            return `порядковый блок ${makeOrdTitle(getCmComOrd)} сделан ${ord.v ? '' : 'не'}видимым`;
          }),

          toggleAnchorInhVis: modifyOrd(ModifyOrdParent.Lead, 'COM_ORD', (leadOrd, getCmComOrd) => {
            const cmOrd = getCmComOrd();
            const inhi = cmOrd.me.anchorInheritIndex;

            if (checkIsNil(inhi) || checkIsNil(cmOrd.me.leadOrd)) throw 'Продолжение блока не найдено';

            const isVisible = cmOrd.isVisible;
            leadOrd._v ??= [];
            leadOrd._v[inhi] = undefined;

            if (isVisible === getCmComOrd().isVisible) leadOrd._v[inhi] = isVisible ? 0 : 1;

            if (removeEmptyRightValues(leadOrd._v, (it, size) => checkIsNil(it) || !size)) delete leadOrd._v;

            return `часть ссылки на ${cmOrd.me.leadOrd.me.header()} сделана ${checkIsNil(leadOrd._v?.[inhi]) ? '' : 'не'}видимой`;
          }),

          remove: modifyOrd(ModifyOrdParent.Self, 'COM_ORD', async (ord, getCmComOrd, { ordw }, { auth }, com) => {
            if (
              !checkIsNowInCurrentDay(ord.cre ?? com.w) &&
              (await throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'D'))
            )
              throw '';

            const description = `${getCmComOrd().isAnchor ? 'удалена ссылка на' : 'удалён'} ${makeOrdTitle(getCmComOrd)}`;

            com.o ??= [];
            com.o = com.o.filter(ord => ord.w !== ordw && ord.a !== ordw);

            return description;
          }),

          setTexti: modifyOrd(ModifyOrdParent.Self, 'COM_ORD', (ord, getCmComOrd, { texti }) => {
            ord.t = texti;

            return `к порядковому блоку ${makeOrdTitle(getCmComOrd)} прикреплён ${texti + 1} текст`;
          }),

          toggleVisibilityInMiniMode: modifyOrd(ModifyOrdParent.Self, 'COM_ORD', (ord, getCmComOrd) => {
            ord.o = ord.o ? undefined : 1;

            return `ссылка на блок ${makeOrdTitle(getCmComOrd)} сделана ${ord.o ? 'видимой' : 'невидимой'} в мини-режиме`;
          }),

          toggleTitleVisibility: modifyOrd(ModifyOrdParent.Self, 'COM_ORD', (ord, getCmComOrd) => {
            ord.e = ord.e ? undefined : 1;

            return `заголовок в порядковом блоке ${makeOrdTitle(getCmComOrd)} сделан ${ord.e ? 'видимым' : 'невидимым'}`;
          }),

          setPositionsLine: modifyOrd(
            ModifyOrdParent.WatchOrSelf,
            'COM_APPS',
            (ord, getCmComOrd, { linei, line, lineChangesText }) => {
              ord.p ??= [];
              ord.p[linei] = Array.from(new Set(line)).sort((a, b) => a - b);

              return `в блоке ${makeOrdTitle(getCmComOrd)} изменена аппликатура в ${linei + 1}-й строке: ${lineChangesText}`;
            },
          ),

          trimOverPositions: modifyOrd(ModifyOrdParent.TargetOrSelf, 'COM_APPS', (ord, getCmComOrd, _, __, com) => {
            if (checkIsNil(com.t)) throw 'В песне нет текстов';

            if (checkIsNil(ord.t) || !com.t[ord.t]) throw 'Текста нет';
            if (checkIsNil(ord.p)) throw 'Аппликатура не обнаружена';

            const textLinesCount = objectLength(com.t[ord.t].split(makeRegExp('/\n/')));
            if (textLinesCount < objectLength(ord.p)) ord.p.length = textLinesCount;

            return `в блоке ${makeOrdTitle(getCmComOrd)} удалены лишние строки аппликатуры`;
          }),

          setModulationValue: modifyOrd(ModifyOrdParent.Self, 'COM_ORD', (ord, getCmComOrd, { value }) => {
            updateCmComOrderModulationValue(ord, value);

            return `установлено значение модулирования блока ${makeOrdTitle(getCmComOrd)} - ${value}`;
          }),

          isBmSwitch: modifyOrd(ModifyOrdParent.Self, 'COM_ORD', (ord, getCmComOrd) => {
            const isAdd = updateCmComOrderTonTypeSwitcherValue(ord);

            return `${isAdd ? 'установлена' : 'снята'} смена тональности в блоке ${makeOrdTitle(getCmComOrd)}`;
          }),
        },
      });
    }
  })();

const makeOrdTitle = (getCmComOrd: () => CmComOrder) => getCmComOrd().me.header();
