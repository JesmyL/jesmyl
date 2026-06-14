import { ICmComOrderExportableMe } from '#shared/model/cm/order/regions';
import {
  CmComLineText,
  CmComNewlinerLinei,
  CmComNewlinerLineTextSetHolder,
  CmComNewlinerRepeati,
  CmComOrderSelector,
  CmComOrderWid,
  IExportableOrder,
} from 'shared/api';
import { cmComNewlinerLineConfigToSet, cmComNewlinerSymbolFreeUpperCaseText } from 'shared/utils/cm/com/newliner';
import { orderListConstructor } from 'shared/utils/cm/com/orderListConstructor';
import { CmComOrder } from '../../order/Order';
import { CmComBasic } from './10-Basic';

export class CmComOrders extends CmComBasic {
  protected _o?: CmComOrder[] | nil;
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

  getOrd = (ordw: CmComOrderSelector) => {
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

  setOrders = () => (this._o = orderListConstructor(me => this.orderConstructor(me), this.ords, this.intp, this.langi));

  makeNewlinerSet = (
    setHolder: CmComNewlinerLineTextSetHolder,
    ord: CmComOrder,
    line: CmComLineText,
    linei: CmComNewlinerLinei,
    repeati: CmComNewlinerRepeati,
  ) => {
    const ownSet = cmComNewlinerLineConfigToSet(this.top.nl?.[0][ord.wid], linei, repeati);
    let firstSet;
    let currentSet = ownSet;

    const upperLine = (setHolder[line] ??= cmComNewlinerSymbolFreeUpperCaseText(line));
    setHolder[upperLine] ??= ownSet;

    if (!ownSet.size) currentSet = firstSet = setHolder[upperLine];

    return { ownSet, firstSet, currentSet, holdSet: setHolder[upperLine], upperLine };
  };
}
