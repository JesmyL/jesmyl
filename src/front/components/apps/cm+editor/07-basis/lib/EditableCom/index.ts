import { cmEditComClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { IExportableOrderMe } from '$cm/col/com/order/Order.model';
import { makeRegExp } from 'regexpert';
import { CmComUtils } from 'shared/utils/cm/ComUtils';
import { EditableComOrder } from '../EditableComOrder';
import { EditableComParseBlocks } from './complect/31-ParseBlocks';

export class EditableCom extends EditableComParseBlocks {
  orderConstructor(me: IExportableOrderMe) {
    return new EditableComOrder(me, this);
  }

  replaceBemoles(coli: number) {
    if (this.chords === undefined) return;

    const col = this.chords[coli];
    if (!col) return;

    const val = col.replace(CmComUtils.simpleBemoleChordReg_g, chord => CmComUtils.chordDiezEquivalent[chord] || chord);

    cmEditComClientTsjrpcMethods.changeChordBlock({ texti: coli, comw: this.wid, value: val });
  }

  getRegionNextLetter() {
    const chars = this.orders
      ?.map(ord => Object.keys(ord.repeats || {}).map(key => (key.match(makeRegExp('/[a-z]/i')) || [])[0]))
      .flat()
      .filter(s => s)
      .map(letter => letter?.charCodeAt(0));

    const next =
      chars &&
      '.'
        .repeat(26)
        .split('')
        .map((_, ci) => 97 + ci)
        .find(num => chars.indexOf(num) < 0);

    return next && String.fromCharCode(next);
  }
}
