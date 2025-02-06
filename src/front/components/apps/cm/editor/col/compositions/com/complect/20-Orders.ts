import { IExportableOrderMe } from '../../../../../col/com/order/Order.model';
import { EditableOrder } from '../../complect/orders/EditableOrder';
import { EditableComCorrects } from './10-Corrects';

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
}
