import { ICmComOrderExportableMe } from '$cm/ext';
import { makeRegExp } from 'regexpert';
import { SMyLib } from 'shared/utils';
import { chordBemoleEquivalent, simpleBemoleChordReg_g } from 'shared/utils/cm/com/const';
import { cmEditComClientTsjrpcMethods } from '../../lib/cm-editor.tsjrpc.methods';
import { EditableComOrder } from '../EditableComOrder';
import { EditableComParseBlocks } from './lib/31-ParseBlocks';

export const chordDiezEquivalent = SMyLib.entries(chordBemoleEquivalent).reduce(
  (acc, [key, val]) => ({ ...acc, [val]: key }),
  {
    Bb: 'A#',
    Hb: 'A#',
  } as Record<string, string>,
);

export class EditableCom extends EditableComParseBlocks {
  orderConstructor = (me: ICmComOrderExportableMe<any>) => new EditableComOrder(me, this);

  replaceBemoles(coli: number) {
    if (this.chords === undefined) return;

    const col = this.chords[coli];
    if (!col) return;

    const val = col.replace(simpleBemoleChordReg_g, chord => chordDiezEquivalent[chord] || chord);

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
