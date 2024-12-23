import { Executer } from 'back/complect/executer/Executer';
import { IExportableOrder } from 'shared/api';
import { cmExer } from '../../../../../CmExer';
import { IExportableOrderMe, INewExportableOrder } from '../../../../../col/com/order/Order.model';
import { EditableOrder } from '../../complect/orders/EditableOrder';
import { EditableComCorrects } from './10-Corrects';

const keysIExportableOrderTop: (keyof IExportableOrder)[] = ['t', 's', 'a', 'u', 'c'];

export class EditableComOrders extends EditableComCorrects {
  protected _o?: EditableOrder[];

  get ords() {
    if (this._ords == null) this._ords = this.getBasic('o')?.map(this.mapTopOrdInOrdMe) ?? [];

    return this._ords as IExportableOrderMe[];
  }

  get orders(): EditableOrder[] | null {
    return this._o || (this.setOrders() as []);
  }

  afterOrderChange() {
    delete this._ords;
    this.setOrders();
    this.resetChordLabels();
  }

  addOrders(orderDicts: INewExportableOrder[] = []) {
    orderDicts.forEach(dict => this.addOrder(dict, false));
    this.afterOrderChange();
  }

  addOrder(topOrd: INewExportableOrder, refresh = true, insertBeforeOrdw?: number) {
    const w = this.getNextOrdWid();

    const findAfterOrder = insertBeforeOrdw == null ? null : ['w', '===', insertBeforeOrdw];

    const exec = {
      action: 'comAddOrderBlock',
      method: 'insert_before_item_or_push',
      args: {
        ordw: w,
        texti: topOrd.t,
        type: topOrd.s,
        chordsi: topOrd.c,
        anchor: topOrd.a,
        uniq: topOrd.u,
        positions: topOrd.p,
        findAfterOrder,
      },
    } as const;

    this.exec(exec);

    const ord: IExportableOrderMe = { top: { w }, header: this.emptyOrderHeader };

    keysIExportableOrderTop.forEach(key => {
      if (topOrd[key as never] != null) ord.top[key] = topOrd[key as never];
    });

    Executer.doIt({
      method: 'insert_before_item_or_push',
      value: { insertValue: { ...topOrd, w }, findAfterItem: findAfterOrder },
      lastTrace: 'o',
      penultimate: this.top,
      target: this.top.o,
    });

    if (refresh) this.afterOrderChange();
  }

  isOrdWithHead(ord: EditableOrder) {
    return !ord.me.isInherit && !ord.me.isAnchorInheritPlus && !ord.isEmptyHeader;
  }

  getOrdersOnBlockDeletion(coln: 'texts' | 'chords', coli: number) {
    if (!this.orders) return {};
    const indexes: { ordi: number; ord: EditableOrder }[] = [];
    const containers = this.orders.filter((ord, ordi) => {
      const isContains = (coln === 'texts' ? ord.texti : ord.chordsi) === coli;
      if (isContains) indexes.push({ ordi, ord });
      return isContains;
    });
    let anchors: EditableOrder[] = [];

    if (coln === 'texts') {
      anchors = this.orders.filter((ord, ordi) => {
        return containers.some(contOrd => {
          const isAnch = ord.isAnchor && contOrd.top.u === ord.top.a;
          if (isAnch) indexes.push({ ordi, ord });
          return isAnch;
        });
      });
    }

    return {
      containers,
      anchors,
      indexes: indexes.sort((a, b) => b.ordi - a.ordi),
    };
  }

  isImpossibleToMigrateOrder(ord: EditableOrder, ordi: number, ords: EditableOrder[]) {
    let isSelfOrd = false;

    return (
      ord.me.isAnchorInherit ||
      ordi === ords.length - 1 ||
      !ords.some(currOrd => {
        if (currOrd === ord) {
          isSelfOrd = true;
          return false;
        }
        if (!isSelfOrd) return false;
        return !currOrd.me.isAnchorInherit;
      })
    );
  }

  isCantResortOrder(ord: EditableOrder, ordi: number) {
    return (
      (!ordi && ord.me.isNextInherit) ||
      ord.me.isNextAnchorOrd ||
      (ord.me.isNextAnchorOrd && !ordi) ||
      (index => !(index < 0 || index === cmExer.execs.length - 1))(
        cmExer.execs.findIndex(exec => exec.action === 'comResortOrders' && exec.args?.comw === this.wid),
      )
    );
  }

  resortOrder(topOrd: EditableOrder) {
    const orders = this.ords;

    if (!orders) return;

    const basei = orders.findIndex(ord => ord.top.w === topOrd.wid);
    const prev = orders.map(ord => ord.top.w);

    [orders[basei], orders[basei + 1]] = [orders[basei + 1], orders[basei]];

    const value = orders.map(ord => ord.top.w);
    this.top.o?.sort((a, b) => value.indexOf(a.w) - value.indexOf(b.w));

    this.exec({
      value,
      prev,
      method: 'resort',
      action: 'comResortOrders',
      args: { value, prev },
    });

    this.afterOrderChange();
  }

  removeOrderBlock({ wid, isAnchor, me }: EditableOrder) {
    this.exec({
      action: 'removeOrderBlock',
      uniq: wid,
      method: 'remove',
      args: {
        ordw: wid,
        isAnchor: +isAnchor,
        blockn: me.header(),
      },
      anti: ({ action, args, args: { comw } = {} }) => {
        if (action === 'comAddOrderBlock' && comw === this.wid && wid === args?.wid)
          return strategy => strategy.RememberNew;
      },
    });

    const index = this.ords.findIndex(o => o.top.w === wid);

    if (index < 0) return;

    this.top.o?.splice(index, 1);
    this.afterOrderChange();

    this.resetChordLabels();
  }

  getNextOrdWid() {
    return (this.top.o?.reduce((w, ord) => (ord.w == null || ord.w < w ? w : ord.w), -1) ?? -1) - -1;
  }

  addOrderAnchor(ord: EditableOrder) {
    if (ord.isAnchor) {
      console.error('Не возможно ссылаться на ссылку');
      return;
    }

    const anchor = ord.takeUniq();
    const nextWid = this.getNextOrdWid();

    this.top.o?.push({ a: anchor, w: nextWid });
    this.afterOrderChange();

    return this.exec({
      action: 'comAddOrderAnchorBlock',
      method: 'push',
      args: {
        ordw: nextWid,
        anchor,
        blockn: ord.me.header(),
      },
    });
  }

  updateOrderSticks(coln: 'texts' | 'chords', coli: number, delta: number, isReset?: boolean) {
    const ccoln = coln === 'texts' ? 't' : 'c';
    this.ords.forEach((ord, ordi) => {
      const colIndex = ord.top[ccoln] || 0;
      if (isReset ? colIndex >= coli : colIndex > coli) {
        const value = isReset && ord.top[ccoln] === coli ? -1 : colIndex - -delta;

        this.exec({
          uniq: [ordi, coln],
          prev: 0 - -colIndex,
          value,
          method: 'set',
          action: 'updateOrderStick',
          args: {
            coln: coln === 'texts' ? 't' : 'c',
            value,
            ordi,
            ordw: ord.top.w,
          },
        });
        ord.top[ccoln] = value;
      }
    });
    this.afterOrderChange();
  }
}
