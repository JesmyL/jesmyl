import { cmComOrderClientInvocatorMethods } from '$cm+editor/basis/lib/cm-editor-invocator.methods';
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

  // todo: remove
  async setChordPosition(linei: number, pos: number) {
    const prev = [...(this.positions?.[linei] || [])].sort((a: number, b: number) => a - b);
    const line = this.positions?.[linei] || [];
    const posi = line.indexOf(pos);
    const textLines = (this.text || '').split('\n');
    const textLine = textLines[linei];
    const lineSplitted = textLine.split('');
    const vowels = this.com.getVowelPositions(textLine);

    if (posi < 0) line.push(pos);
    else line.splice(posi, 1);

    const positions = line.sort((a, b) => a - b);
    if (this.positions) this.positions[linei] = positions;

    positions.forEach(pos => {
      const vowel = lineSplitted[vowels[pos]];

      if (vowel && vowel.length === 1) lineSplitted[vowels[pos]] = `[${vowel}]`;
    });

    prev.concat(positions).forEach((pos: number) => {
      const vowel = lineSplitted[vowels[pos]];
      if (!vowel || vowel.length !== 1) return;

      const inPos = positions.indexOf(pos) > -1;
      const inPrev = prev.indexOf(pos) > -1;
      const [lbr, rbr] = inPos && inPrev ? ['[', ']'] : !inPrev && inPos ? ['{', '}'] : ['<', '>'];

      lineSplitted[vowels[pos]] = lbr + vowel + rbr;
    });

    const preInPos = line.indexOf(-1) > -1;
    const preInPrev = prev.indexOf(-1) > -1;
    const postInPos = line.indexOf(-2) > -1;
    const postInPrev = prev.indexOf(-2) > -1;
    const preLabel =
      preInPos && preInPrev ? ['●'] : preInPos && !preInPrev ? ['★'] : !preInPos && preInPrev ? ['☆'] : [];
    const postLabel =
      postInPos && postInPrev ? ['●'] : postInPos && !postInPrev ? ['★'] : !postInPos && postInPrev ? ['☆'] : [];

    const lineChangesText = preLabel.concat(lineSplitted).concat(postLabel).join('');

    return cmComOrderClientInvocatorMethods.setPositionsLine(
      null,
      this.com.wid,
      this.me.header(),
      this.getTargetFirst('w'),
      linei,
      line,
      lineChangesText,
    );
  }

  cutChordPositions(line: string, linei: number) {
    const letters = this.com.getVowelPositions(line);

    this.positions?.[linei]?.reduceRight((stub, pos) => {
      if (pos > letters.length - 1) {
        this.setChordPosition(linei, pos);
      }
      return stub;
    }, 0);
  }
}
