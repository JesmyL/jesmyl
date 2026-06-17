import { CmComOrderWidClass } from '#shared/model/cm/order/OrderWid';
import { CmComOrderTopHeaderBag, ICmComOrderExportableMe } from '#shared/model/cm/order/regions';
import { CmComLangi, IExportableComInterpretation } from 'shared/api';
import { checkIsNil, checkIsNotNil } from 'shared/utils/checkIs';
import { comBlockKinds } from 'shared/values/cm/block-kinds/BlockKind';
import { KindBlock } from 'shared/values/cm/block-kinds/KindBlock';
import { cmComOrderCheckIsOrdVisibleInInterpretation, cmComOrderGetWithExtendableFields } from '../checkIs';

export const cmComOrderListConstructor = <OrderConstructor extends CmComOrderWidClass<OrderConstructor>>(
  orderConstructor: (me: ICmComOrderExportableMe<OrderConstructor>) => OrderConstructor,
  ords: ICmComOrderExportableMe<OrderConstructor>[],
  intp: IExportableComInterpretation | nil,
  langi: CmComLangi,
) => {
  if (!comBlockKinds) return null;
  const orders: OrderConstructor[] = [];
  let minimals: [number?, number?][] = [];
  const styles = comBlockKinds.kinds;
  const groups: Record<number, number> = {};
  const anchorGroups: Record<number, 1> = {};
  let prev, prevOrd;

  const getStyle = (ord: ICmComOrderExportableMe<OrderConstructor> | nil) => {
    return ord?.top.k != null ? styles.find((prop: KindBlock) => prop.key === ord.top.k) : null;
  };

  const setMin = (me: ICmComOrderExportableMe<OrderConstructor>) => {
    const styleName = Math.abs(me.kind?.key ?? 0);
    if (me.top?.md) minimals = [];
    me.top.m = minimals.some(([s, c]) => styleName === s && me.top.c === c) ? undefined : 1;
    minimals.push([styleName, me.top.c]);
  };

  const headerMaker = (ordMe: ICmComOrderExportableMe<OrderConstructor>, style: KindBlock, numered: boolean) => {
    const type = Math.abs(style.key);
    let number: number | und;

    if (numered) {
      groups[type] ??= 0;

      if (numered && cmComOrderCheckIsOrdVisibleInInterpretation(ordMe.top, intp)) {
        if (checkIsNil(ordMe.top.a)) groups[type] += 1;
        else if (checkIsNotNil(ordMe.top.a) && ordMe.top.v === 1 && !anchorGroups[type]) {
          const leadOrd = ords.find(o => o.top.w === ordMe.top.a);

          if (leadOrd?.top.v === 0) {
            if (!anchorGroups[type]) groups[type] += 1;
            anchorGroups[type] = 1;
          }
        }

        number = groups[type];
      } else number = 0;
    }

    return (bag: CmComOrderTopHeaderBag | nil) => {
      bag ??= {};

      return (
        (style.title[langi] || style.title[CmComLangi.Ru]) +
        (bag.isEdit
          ? ' №'
          : (bag.numered !== false && numered ? (groups[type] < 2 || !number ? '' : ` ${number}`) : '') +
            (bag.repeats ? ` ×  ${bag.repeats}р. ` : '') +
            (bag.isTexted ? ':' : ''))
      );
    };
  };

  for (let topi = 0; topi < ords.length; topi++) {
    const ordMe = ords[topi];
    if (ordMe == null) {
      orders.push(orderConstructor({ header: () => '', top: {} } as ICmComOrderExportableMe<OrderConstructor>));
      continue;
    }
    const targetOrd: OrderConstructor | nil = ordMe.top.a == null ? null : orders.find(o => o.wid === ordMe.top.a);
    const me = cmComOrderGetWithExtendableFields(targetOrd?.me, ordMe);

    const style = getStyle(me);

    if (!style) {
      orders.push(orderConstructor({ top: ordMe.top, source: ordMe, header: () => '' }));
      continue;
    }

    if (style.isInherit) continue;

    me.kind = style;
    me.source = ordMe;
    me.isNextInherit = !!getStyle(ords[topi + 1])?.isInherit;
    me.targetOrd = targetOrd;
    me.watchOrd = targetOrd;
    me.isAnchor = ordMe.top.a != null;
    me.isTarget = ords.some(me => me.top.a === ordMe.top.w);
    me.sourceIndex = ords.indexOf(ordMe);

    setMin(me);

    const newOrder = orderConstructor(me);
    orders.push(newOrder);

    me.header = newOrder.isEmptyHeader
      ? (bag, isRequired) => (isRequired ? headerMaker(ordMe, style, false)(bag) : '')
      : targetOrd && targetOrd.me.header! && !me.source.top.k
        ? targetOrd.me.header
        : headerMaker(ordMe, style, true);

    me.prev = prev || null;

    if (prev) prev.me.next = newOrder;
    prev = newOrder;

    if (!me.isAnchor) {
      me.prevOrd = prevOrd || null;
      if (prevOrd) prevOrd.me.nextOrd = newOrder;
      prevOrd = newOrder;
    }

    let isAnchorInheritPlus = me.top.a != null;

    if (targetOrd && me.top.a != null) {
      const srcIndex = targetOrd.me.sourceIndex || 0;
      let anci = srcIndex + 1;
      let anc = ords[anci];
      let ancStyle = getStyle(anc);
      let anchorInheritIndex = 0;

      while (ancStyle?.isInherit) {
        isAnchorInheritPlus = true;
        const ancMe = cmComOrderGetWithExtendableFields(targetOrd.me.source, anc);

        ancMe.isAnchorInherit = true;
        ancMe.isInherit = true;
        ancMe.kind = ancStyle;
        ancMe.source = anc;
        ancMe.header = me.header;
        ancMe.targetOrd = targetOrd;
        ancMe.leadOrd = newOrder;
        ancMe.watchOrd = orders[srcIndex + anchorInheritIndex + 1];
        ancMe.isNextInherit = !!getStyle(ords[anci + 1])?.isInherit;
        ancMe.anchorInheritIndex = anchorInheritIndex++;
        ancMe.sourceIndex = ords.indexOf(targetOrd.me);

        setMin(ancMe);

        const newAncOrd = orderConstructor(ancMe);
        orders.push(newAncOrd);

        if (prev) prev.me.next = newAncOrd;
        prev = newAncOrd;

        anc = ords[++anci];
        ancStyle = getStyle(anc);
      }
    }

    let nexti = topi + 1;
    let next = ords[nexti];
    let nextStyle = getStyle(next);

    while (nextStyle?.isInherit) {
      const nextMe = cmComOrderGetWithExtendableFields(targetOrd?.me.source, next);

      nextMe.isInherit = true;
      nextMe.kind = nextStyle;
      nextMe.leadOrd = newOrder;
      nextMe.prev = prev;
      nextMe.isNextInherit = !!getStyle(ords[nexti + 1])?.isInherit;
      nextMe.isAnchorInheritPlus = isAnchorInheritPlus;
      nextMe.header = me.header;
      nextMe.source = next;
      nextMe.sourceIndex = ords.indexOf(next);

      setMin(nextMe);

      const newNextOrd = orderConstructor(nextMe);
      orders.push(newNextOrd);

      if (prev) prev.me.next = newNextOrd;
      prev = newNextOrd;

      next = ords[++nexti];
      nextStyle = getStyle(next);
    }
  }

  orders.forEach(setIndex);
  return orders;
};

const setIndex = (ord: { i?: number }, ordi: number) => (ord.i = ordi);
