import { chordDiezEquivalent, gSimpleBemoleChordReg } from '@cm/col/com/Com.complect';
import { IExportableOrderMe } from '@cm/col/com/order/Order.model';
import { cmComClientInvocatorMethods } from '@cm/editor/lib/cm-editor-invocator.methods';
import { makeRegExp } from 'shared/utils';
import { EditableComOrder } from '../EditableComOrder';
import { EditableComParseBlocks } from './complect/31-ParseBlocks';

export class EditableCom extends EditableComParseBlocks {
  orderConstructor(me: IExportableOrderMe) {
    return new EditableComOrder(me, this);
  }

  get name() {
    return this?.getBasic('n') || '';
  }
  set name(value) {
    this.setExportable('n', value);
  }

  replaceBemoles(coli: number) {
    if (this.chords === undefined) return;

    const col = this.chords[coli];
    if (!col) return;

    const val = col.replace(gSimpleBemoleChordReg, chord => chordDiezEquivalent[chord] || chord);

    cmComClientInvocatorMethods.changeChordBlock(null, coli, this.wid, val);
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
