import { mylib } from '#shared/lib/my-lib';
import { CmComOrder, ICmComOrderExportableMe } from '$cm/ext';
import { makeRegExp } from 'regexpert';
import { CmComOrderSelector, IExportableOrder } from 'shared/api';
import { cmComNewlinerLineNewlinerConfigToSet } from 'shared/utils/cm/com/newliner';
import { orderListConstructor } from 'shared/utils/cm/com/orderListConstructor';
import { CmComBasic } from './10-Basic';

export class CmComOrders extends CmComBasic {
  protected _o?: CmComOrder[];
  protected _ords?: ICmComOrderExportableMe<CmComOrder>[];

  get ords() {
    if (this._ords == null) this._ords = [...(this.getBasic('o') || [])].map(this.mapTopOrdInOrdMe);

    return this._ords;
  }

  get orders(): CmComOrder[] | nil {
    return this._o || this.setOrders();
  }

  protected mapTopOrdInOrdMe = (top: IExportableOrder): ICmComOrderExportableMe<CmComOrder> => ({
    top,
    header: () => '',
  });

  orderConstructor = (me: ICmComOrderExportableMe<CmComOrder>) => new CmComOrder(me, this as never);
  visibleOrders = () => this.orders?.filter((ord: CmComOrder) => ord.isVisibleOrd());

  getOrderBySelector = (ordSelector: CmComOrderSelector) => {
    let visibleOrdi = -1;

    const ord = this.orders?.find(ord => {
      if (ord.isVisibleOrd()) visibleOrdi++;

      return ord.isMySelector(ordSelector);
    });

    return { ord, visibleOrdi };
  };

  setOrders() {
    return (this._o =
      orderListConstructor(me => this.orderConstructor(me), this.ords, this.intp, this.langi) ?? this._o);
  }

  makeNewlinerSet = (ord: CmComOrder, linei: number, selfLinei: number) => {
    let watchSet;
    let watchOrd;

    const ordNl = this.top.nl?.[0][ord.wid];
    const selfSet = cmComNewlinerLineNewlinerConfigToSet(ordNl, selfLinei);
    const ordSet = cmComNewlinerLineNewlinerConfigToSet(ordNl, linei);

    const isFreeRepeats = !ord.repeats || mylib.isNum(ord.repeats);
    const repeatsJson = isFreeRepeats ? NaN : JSON.stringify(ord.repeats);
    const orders = this.orders;

    if (orders)
      for (const o of orders) {
        if (o.wid === ord.wid) break;

        if (
          o.texti === ord.texti &&
          (!o.repeats ||
            mylib.isNum(o.repeats) ||
            mylib.keys(o.repeats).join('|').search(makeRegExp('/:[1-9]/')) < 0 ||
            repeatsJson === JSON.stringify(o.repeats))
        ) {
          watchOrd = o;
          break;
        }
      }

    const set = cmComNewlinerLineNewlinerConfigToSet(
      watchOrd && watchOrd.wid !== ord.wid ? this.top.nl?.[0][watchOrd.wid] : null,
      linei,
    );

    if (watchOrd && set.size) watchSet = set;

    const nearSet = ordSet?.size && watchSet && linei !== selfLinei ? ordSet : watchSet;

    return {
      watchSet,
      ordSet,
      selfSet,
      nearSet,
      currentSet: (selfSet.size ? selfSet : nearSet?.size ? nearSet : ordSet) ?? new Set(),
    };
  };
}
