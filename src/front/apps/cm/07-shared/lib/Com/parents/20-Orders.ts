import { mylib } from '#shared/lib/my-lib';
import { CmComOrder, ICmComOrderExportableMe } from '$cm/ext';
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

  makeNewlinerSet = (ord: CmComOrder, linei: number) => {
    let watchOrdConfigSet;
    let resultWatchOrd;
    const ordConfigSet = cmComNewlinerLineNewlinerConfigToSet(this.top.nl?.[0][ord.wid], linei);

    if (!ordConfigSet.size) {
      const isFreeRepeats = !ord.repeats || mylib.isNum(ord.repeats);
      const repeatsJson = isFreeRepeats ? null : JSON.stringify(ord.repeats);
      const watchOrd = this.orders?.find(
        o =>
          o.texti === ord.texti &&
          (isFreeRepeats ? !o.repeats || mylib.isNum(o.repeats) : repeatsJson === JSON.stringify(o.repeats)),
      );
      const set = cmComNewlinerLineNewlinerConfigToSet(
        watchOrd != null && watchOrd.wid !== ord.wid ? this.top.nl?.[0][watchOrd.wid] : null,
        linei,
      );

      if (watchOrd && set.size) {
        resultWatchOrd = watchOrd;
        watchOrdConfigSet = set;
      }
    }

    return {
      watchOrdConfigSet,
      configSet: watchOrdConfigSet ?? ordConfigSet,
      ordConfigSet,
      watchOrd: resultWatchOrd,
    };
  };
}
