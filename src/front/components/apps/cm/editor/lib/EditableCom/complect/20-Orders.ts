import { IExportableOrderMe } from '@cm/col/com/order/Order.model';
import { EditableComOrder } from '../../EditableComOrder';
import { EditableComCorrects } from './10-Corrects';

export class EditableComOrders extends EditableComCorrects {
  protected _o?: EditableComOrder[];

  get ords() {
    if (this._ords == null) this._ords = this.getBasic('o')?.map(this.mapTopOrdInOrdMe) ?? [];

    return this._ords as IExportableOrderMe[];
  }

  get orders(): EditableComOrder[] | null {
    return this._o || (this.setOrders() as []);
  }

  afterOrderChange() {
    delete this._ords;
    this.setOrders();
    this.resetChordLabels();
  }
}
