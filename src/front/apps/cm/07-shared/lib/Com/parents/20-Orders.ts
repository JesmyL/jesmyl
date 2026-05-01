import { CmComOrder, ICmComOrderExportableMe } from '$cm/ext';
import { CmComOrderSelector, IExportableOrder } from 'shared/api';
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

  orderConstructor(me: ICmComOrderExportableMe<CmComOrder>) {
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
    return (this._o =
      orderListConstructor(me => this.orderConstructor(me), this.ords, this.intp, this.langi) ?? this._o);
  }
}
