import { mylib } from '#shared/lib/my-lib';
import { CmComOrder, ICmComOrderExportableMe } from '$cm/ext';
import { makeRegExp } from 'regexpert';
import {
  CmComNewlinerLinei,
  CmComNewlinerRepeati,
  CmComOrderSelector,
  CmComOrderWid,
  IExportableOrder,
} from 'shared/api';
import { cmComNewlinerLineConfigToSet } from 'shared/utils/cm/com/newliner';
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

  setOrders() {
    return (this._o =
      orderListConstructor(me => this.orderConstructor(me), this.ords, this.intp, this.langi) ?? this._o);
  }

  makeNewlinerSet = (ord: CmComOrder, linei: CmComNewlinerLinei, repeati: CmComNewlinerRepeati) => {
    let watchOrd;

    const ordNl = this.top.nl?.[0][ord.wid];
    const ownSet = cmComNewlinerLineConfigToSet(ordNl, linei, repeati);
    const rootSet = !repeati ? new Set<number>() : cmComNewlinerLineConfigToSet(ordNl, linei, 0);

    let repeatsJson;

    if (!ord.repeats || mylib.isNum(ord.repeats)) repeatsJson = NaN;
    else {
      const { '.': self, ...restRepeats } = ord.repeats;
      repeatsJson = JSON.stringify(restRepeats);
    }

    const orders = this.orders;

    if (orders)
      for (const o of orders) {
        if (o.wid === ord.wid) break;
        if (o.texti !== ord.texti) continue;

        if (
          !o.repeats ||
          mylib.isNum(o.repeats) ||
          mylib.keys(o.repeats).join('|').search(makeRegExp('/:[1-9]/')) < 0
        ) {
          watchOrd = o;
          break;
        }

        const { '.': self, ...restRepeats } = o.repeats;

        if (repeatsJson === JSON.stringify(restRepeats)) {
          watchOrd = o;
          break;
        }
      }

    const watchNl = watchOrd ? this.top.nl?.[0][watchOrd.wid] : null;

    const watchOwnSet = cmComNewlinerLineConfigToSet(watchNl, linei, repeati);
    const watchRootSet = !repeati ? new Set<number>() : cmComNewlinerLineConfigToSet(watchNl, linei, 0);

    const nearSet = [rootSet, watchOwnSet, watchRootSet].find(set => set.size);

    return {
      watchSet: watchOwnSet.size ? watchOwnSet : watchRootSet,
      ownSet,
      nearSet,
      currentSet: (ownSet.size ? ownSet : nearSet?.size ? nearSet : rootSet) ?? new Set(),
    };
  };
}
