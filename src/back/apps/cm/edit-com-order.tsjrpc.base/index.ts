import { backLocaleError } from 'back/locales/back';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { makeRegExp } from 'regexpert';
import { CmEditComOrderTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com-order.tsjrpc.model';
import { CmComOrder } from 'shared/const/cm/order/Order';
import { checkIsNowInCurrentDay } from 'shared/const/ms';
import { checkIsNil, checkIsNotNil } from 'shared/utils/checkIs';
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
            if (kind == null) throw backLocaleError(BackLocaleKey.CmComOrderUnknownKind);

            ord.k = kind;

            return backLocaleError(BackLocaleKey.CmComOrdKindSet, {
              b: makeOrdTitle(getCmComOrd),
              v: newTypeTitle,
            });
          }),

          bindChordBlock: modifyOrd(ModifyOrdParent.Self, 'COM_ORD', (ord, getCmComOrd, { chordi }) => {
            ord.c = chordi;

            return backLocaleError(
              getCmComOrd().isAnchor
                ? BackLocaleKey.CmComOrdRefChordAttached
                : BackLocaleKey.CmComOrdChordAttached,
              { b: makeOrdTitle(getCmComOrd), i: chordi + 1 },
            );
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

            return backLocaleError(
              ord.v ? BackLocaleKey.CmComOrdMadeVisible : BackLocaleKey.CmComOrdMadeInvisible,
              { b: makeOrdTitle(getCmComOrd) },
            );
          }),

          toggleAnchorInhVis: modifyOrd(ModifyOrdParent.Lead, 'COM_ORD', (leadOrd, getCmComOrd) => {
            const cmOrd = getCmComOrd();
            const inhi = cmOrd.me.anchorInheritIndex;

            if (checkIsNil(inhi) || checkIsNil(cmOrd.me.leadOrd)) throw backLocaleError(BackLocaleKey.CmComOrderContinuationNotFound);

            const isVisible = cmOrd.isVisible;
            leadOrd._v ??= [];
            leadOrd._v[inhi] = undefined;

            if (isVisible === getCmComOrd().isVisible) leadOrd._v[inhi] = isVisible ? 0 : 1;

            if (removeEmptyRightValues(leadOrd._v, (it, size) => checkIsNil(it) || !size)) delete leadOrd._v;

            return backLocaleError(
              checkIsNil(leadOrd._v?.[inhi])
                ? BackLocaleKey.CmComOrdRefPartMadeVisible
                : BackLocaleKey.CmComOrdRefPartMadeInvisible,
              { b: cmOrd.me.leadOrd.me.header() },
            );
          }),

          remove: modifyOrd(ModifyOrdParent.Self, 'COM_ORD', async (ord, getCmComOrd, { ordw }, { auth }, com) => {
            if (
              !checkIsNowInCurrentDay(ord.cre ?? com.w) &&
              (await throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'D'))
            )
              throw '';

            const description = backLocaleError(
              getCmComOrd().isAnchor ? BackLocaleKey.CmComOrdRefRemoved : BackLocaleKey.CmComOrdRemoved,
              { b: makeOrdTitle(getCmComOrd) },
            );

            com.o ??= [];
            com.o = com.o.filter(ord => ord.w !== ordw && ord.a !== ordw);

            return description;
          }),

          setTexti: modifyOrd(ModifyOrdParent.Self, 'COM_ORD', (ord, getCmComOrd, { texti }) => {
            ord.t = texti;

            return backLocaleError(BackLocaleKey.CmComOrdTextAttached, {
              b: makeOrdTitle(getCmComOrd),
              i: texti + 1,
            });
          }),

          toggleVisibilityInMiniMode: modifyOrd(ModifyOrdParent.Self, 'COM_ORD', (ord, getCmComOrd) => {
            ord.o = ord.o ? undefined : 1;

            return backLocaleError(BackLocaleKey.CmComOrdMiniLinkVisible, {
              b: makeOrdTitle(getCmComOrd),
              v: !!ord.o,
            });
          }),

          toggleTitleVisibility: modifyOrd(ModifyOrdParent.Self, 'COM_ORD', (ord, getCmComOrd) => {
            ord.e = ord.e ? undefined : 1;

            return backLocaleError(BackLocaleKey.CmComOrdTitleVisible, {
              b: makeOrdTitle(getCmComOrd),
              v: !!ord.e,
            });
          }),

          setPositionsLine: modifyOrd(
            ModifyOrdParent.WatchOrSelf,
            'COM_APPS',
            (ord, getCmComOrd, { linei, line, lineChangesText }, _tool, _com, _, getCmComOrds) => {
              if (checkIsNotNil(ord.a)) {
                const targetOrd = getCmComOrds().find(o => o.wid === ord.a)?.me.source?.top;

                if (!targetOrd) throw backLocaleError(BackLocaleKey.CmComOrderBlockNotFound);
                ord = targetOrd;
              }

              ord.p ??= [];
              ord.p[linei] = Array.from(new Set(line)).sort((a, b) => a - b);

              return backLocaleError(BackLocaleKey.CmComOrdApplikaturaChanged, {
                b: makeOrdTitle(getCmComOrd),
                i: linei + 1,
                v: lineChangesText,
              });
            },
          ),

          trimOverPositions: modifyOrd(ModifyOrdParent.TargetOrSelf, 'COM_APPS', (ord, getCmComOrd, _, __, com) => {
            if (checkIsNil(com.t)) throw backLocaleError(BackLocaleKey.CmComNoTexts);

            if (checkIsNil(ord.t) || !com.t[ord.t]) throw backLocaleError(BackLocaleKey.CmComTextMissing);
            if (checkIsNil(ord.p)) throw backLocaleError(BackLocaleKey.CmComApplikaturaMissing);

            const textLinesCount = objectLength(com.t[ord.t].split(makeRegExp('/\n/')));
            if (textLinesCount < objectLength(ord.p)) ord.p.length = textLinesCount;

            return backLocaleError(BackLocaleKey.CmComOrdApplikaturaTrimmed, {
              b: makeOrdTitle(getCmComOrd),
            });
          }),

          setModulationValue: modifyOrd(ModifyOrdParent.Self, 'COM_ORD', (ord, getCmComOrd, { value }) => {
            updateCmComOrderModulationValue(ord, value);

            return backLocaleError(BackLocaleKey.CmComOrdModulationSet, {
              b: makeOrdTitle(getCmComOrd),
              v: value,
            });
          }),

          isBmSwitch: modifyOrd(ModifyOrdParent.Self, 'COM_ORD', (ord, getCmComOrd) => {
            const isAdd = updateCmComOrderTonTypeSwitcherValue(ord);

            return backLocaleError(
              isAdd ? BackLocaleKey.CmComOrdTonSet : BackLocaleKey.CmComOrdTonRemoved,
              { b: makeOrdTitle(getCmComOrd) },
            );
          }),
        },
      });
    }
  })();

const makeOrdTitle = (getCmComOrd: () => CmComOrder) => getCmComOrd().me.header();
