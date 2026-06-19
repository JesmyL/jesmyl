import { ICmComOrderExportableMe } from '#shared/model/cm/order/regions';
import { CmComNewlinerLineTextSetHolder, CmComOrderWid, IExportableOrder } from 'shared/api';
import { cmComOrderListConstructor } from 'shared/utils/cm/com/orderListConstructor';
import { CmComOrder } from '../../order/Order';
import { CmComBasic } from './10-Basic';

export class CmComOrders extends CmComBasic {
  protected _o?: CmComOrder[] | nil;
  protected _ords?: ICmComOrderExportableMe<CmComOrder>[];

  get ords() {
    if (this._ords == null) this._ords = this.top.o?.map(this.mapTopOrdInOrdMe) ?? [];

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

  getOrd = (ordw: CmComOrderWid) => {
    let visibleOrdi = -1;

    const ord = this.orders?.find(ord => {
      if (ord.isVisibleOrd()) visibleOrdi++;

      return ord.wid === ordw;
    });

    return { ord, visibleOrdi };
  };

  getSolidOrdLine = (ordw: CmComOrderWid) => {
    let ord: CmComOrder | nil = this.orders?.find(ord => ord.wid === ordw);

    const ords: CmComOrder[] = ord ? [] : [];

    do {
      if (ord) {
        ords.push(ord);
        ord = ord.me.next;
      }
    } while (ord?.isAnyInherited);

    return ords;
  };

  setOrders = () =>
    (this._o = cmComOrderListConstructor(me => this.orderConstructor(me), this.ords, this.intp, this.langi));

  newlinerSetHolder: CmComNewlinerLineTextSetHolder = {};
}
