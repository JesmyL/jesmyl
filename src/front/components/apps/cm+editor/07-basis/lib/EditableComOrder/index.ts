import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { Order } from '$cm/col/com/order/Order';
import { EditableOrderRegion, IExportableOrderMe } from '$cm/col/com/order/Order.model';
import { InheritancableOrder, OrderRepeats } from 'shared/api';
import { EditableCom } from '../EditableCom';

export class EditableComOrder extends Order {
  _regions?: EditableOrderRegion<EditableComOrder>[];
  com: EditableCom;

  constructor(me: IExportableOrderMe, com: EditableCom) {
    super(me, com);
    this.com = com;
  }

  comOrders() {
    return this.com.orders;
  }

  get regions(): EditableOrderRegion<EditableComOrder>[] | und {
    if (this._regions === undefined) this.setRegions();

    return this._regions;
  }

  setRepeats(_val?: OrderRepeats | null) {}

  get fieldValues() {
    return this.getBasicOr('f', {});
  }
  set fieldValues(val) {
    this.setExportable('f', val);
  }

  isWithHead() {
    return (
      !this.me.isInherit &&
      !this.me.isAnchorInheritPlus &&
      (this.texti != null || this.chordsi != null) &&
      !this.isEmptyHeader
    );
  }

  isInheritValue<Key extends keyof InheritancableOrder>(key: Key) {
    return this.me.isAnchorInherit
      ? this.me.anchorInheritIndex != null &&
          this.me.leadOrd?.me.source?.top.inh?.[key]?.[this.me.anchorInheritIndex] == null
      : this.me.isAnchor && this.me.source?.top[key] == null;
  }

  async cutChordPositions(textLine: string, linei: number) {
    const chords = this.chords.split('\n')[linei]?.split(' ') ?? 0;
    const line = [...(this.positions?.[linei] ?? [])];

    if (chords.length >= line.length) return;
    const postChordi = line.indexOf(-2);
    if (postChordi >= 0) line.splice(postChordi, 1);
    line.length = chords.length;

    await cmEditComOrderClientTsjrpcMethods.setPositionsLine({
      comw: this.com.wid,
      orderTitle: this.me.header(),
      ordw: this.wid,
      linei,
      line,
      lineChangesText: textLine,
    });
  }

  async trimOverPositions() {
    await cmEditComOrderClientTsjrpcMethods.trimOverPositions({
      comw: this.com.wid,
      orderTitle: this.me.header({ isEdit: true }),
      ordw: this.wid,
    });
  }
}
