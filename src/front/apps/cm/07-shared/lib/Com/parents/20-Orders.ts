import { CmComOrderTopHeaderBag } from '$cm/entities/com-order';
import { CmComOrder, ICmComOrderExportableMe } from '$cm/ext';
import { CmComOrderSelector, IExportableOrder } from 'shared/api';
import { comBlockKinds } from 'shared/values/cm/block-kinds/BlockKind';
import { KindBlock } from 'shared/values/cm/block-kinds/KindBlock';
import { CmComBasic } from './10-Basic';

export class CmComOrders extends CmComBasic {
  protected _o?: CmComOrder[];
  protected _ords?: ICmComOrderExportableMe[];

  get ords() {
    if (this._ords == null) this._ords = [...(this.getBasic('o') || [])].map(this.mapTopOrdInOrdMe);

    return this._ords;
  }

  get orders(): CmComOrder[] | null {
    return this._o || this.setOrders();
  }

  protected emptyOrderHeader = () => '';
  protected mapTopOrdInOrdMe = (top: IExportableOrder): ICmComOrderExportableMe => ({
    top,
    header: this.emptyOrderHeader,
  });

  orderConstructor(me: ICmComOrderExportableMe) {
    return new CmComOrder(me, this as never);
  }

  visibleOrders = () => {
    return this.orders?.filter((ord: CmComOrder) => ord.isVisibleOrd());
  };

  getOrderBySelector = (ordSelector: CmComOrderSelector) => {
    let visibleOrdi = -1;

    const ord = this.orders?.find(ord => {
      if (ord.isVisibleOrd()) visibleOrdi++;

      return ord.isMySelector(ordSelector);
    });

    return { ord, visibleOrdi };
  };

  setOrders() {
    if (!comBlockKinds) return null;
    const ords = this.ords;
    const orders: ReturnType<typeof this.orderConstructor>[] = [];
    let minimals: [number?, number?][] = [];
    const styles = comBlockKinds.kinds;
    const groups: Record<string, number> = {};
    let viewIndex = 0;
    let prev, prevOrd;

    const getStyle = (ord: ICmComOrderExportableMe | nil) => {
      return ord?.top.k != null ? styles.find((prop: KindBlock) => prop.key === ord.top.k) : null;
    };

    const setMin = (me: ICmComOrderExportableMe) => {
      const styleName = Math.abs(me.kind?.key ?? 0);
      if (me.top.f?.md) minimals = [];
      me.top.m = minimals.some(([s, c]) => styleName === s && me.top.c === c) ? undefined : 1;
      minimals.push([styleName, me.top.c]);
    };

    const header = (ord: ICmComOrderExportableMe, style: KindBlock, numered = true) => {
      const type = Math.abs(style.key);
      const number =
        numered && ord.top.v !== 0
          ? (groups[type] = groups[type] == null ? 1 : ord.top.a == null ? groups[type] + 1 : groups[type])
          : '';

      return (bag: CmComOrderTopHeaderBag | nil) => {
        bag ??= {};

        return (
          (style.title[this.langi] || style.title[0]) +
          (bag.isEdit
            ? ' №'
            : (numered ? (groups[type] < 2 ? '' : ` ${number}`) : '') +
              (bag.repeats ? ` ×  ${bag.repeats}р. ` : '') +
              (bag.isTexted ? ':' : ''))
        );
      };
    };

    for (let topi = 0; topi < ords.length; topi++) {
      const ordMe = ords[topi];
      if (ordMe == null) {
        orders.push(this.orderConstructor({ header: this.emptyOrderHeader, top: {} } as ICmComOrderExportableMe));
        continue;
      }
      const targetOrd: CmComOrder | nil = ordMe.top.a == null ? null : orders.find(o => o.wid === ordMe.top.a);
      const me = CmComOrder.getWithExtendableFields(targetOrd?.me, ordMe);

      const style = getStyle(me);

      if (!style) {
        orders.push(this.orderConstructor({ top: ordMe.top, source: ordMe, header: this.emptyOrderHeader }));
        continue;
      }

      if (style.isInherit) continue;

      me.kind = style;
      me.source = ordMe;
      me.isNextInherit = !!getStyle(ords[topi + 1])?.isInherit;
      me.isNextAnchorOrd = !!(ords[topi + 1] && ords[topi + 1].top.a === ordMe.top.w);
      me.isPrevTargetOrd = !!(targetOrd && ords[topi - 1] === targetOrd.me.source);
      me.targetOrd = targetOrd;
      me.watchOrd = targetOrd;
      me.isAnchor = ordMe.top.a != null;
      me.isTarget = ords.some(me => me.top.a === ordMe.top.w);
      me.viewIndex = viewIndex++;
      me.sourceIndex = ords.indexOf(ordMe);

      setMin(me);

      const newOrder = this.orderConstructor(me);
      orders.push(newOrder);

      me.header = newOrder.isEmptyHeader
        ? (bag, isRequired) => (isRequired ? header(ordMe, style, false)(bag) : '')
        : targetOrd && targetOrd.me.header! && !me.source.top.k
          ? targetOrd.me.header
          : header(ordMe, style);

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
          const ancMe = CmComOrder.getWithExtendableFields(targetOrd.me.source, anc);

          ancMe.isAnchorInherit = true;
          ancMe.isInherit = true;
          ancMe.kind = ancStyle;
          ancMe.source = anc;
          ancMe.header = me.header;
          ancMe.init = me.top;
          ancMe.targetOrd = targetOrd;
          ancMe.leadOrd = newOrder;
          ancMe.watchOrd = orders[srcIndex + anchorInheritIndex + 1];
          ancMe.isNextInherit = !!getStyle(ords[anci + 1])?.isInherit;
          ancMe.anchorInheritIndex = anchorInheritIndex++;
          ancMe.viewIndex = viewIndex++;
          ancMe.sourceIndex = ords.indexOf(targetOrd.me);

          setMin(ancMe);

          const newAncOrd = this.orderConstructor(ancMe);
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
        const nextMe = CmComOrder.getWithExtendableFields(targetOrd?.me.source, next);

        nextMe.isInherit = true;
        nextMe.kind = nextStyle;
        nextMe.leadOrd = newOrder;
        nextMe.prev = prev;
        nextMe.init = me.top;
        nextMe.isNextInherit = !!getStyle(ords[nexti + 1])?.isInherit;
        nextMe.isAnchorInheritPlus = isAnchorInheritPlus;
        nextMe.header = me.header;
        nextMe.source = next;
        nextMe.viewIndex = viewIndex++;
        nextMe.sourceIndex = ords.indexOf(next);

        setMin(nextMe);

        const newNextOrd = this.orderConstructor(nextMe);
        orders.push(newNextOrd);

        if (prev) prev.me.next = newNextOrd;
        prev = newNextOrd;

        next = ords[++nexti];
        nextStyle = getStyle(next);
      }
    }

    this._o = orders;
    return orders;
  }
}
