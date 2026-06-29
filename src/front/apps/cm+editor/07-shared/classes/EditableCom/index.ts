import { ICmComOrderExportableMe } from '#shared/model/cm/order/regions';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { makeRegExp } from 'regexpert';
import { itIt } from 'shared/utils';
import { checkIsNumber } from 'shared/utils/checkIs';
import { chordDiezEquivalent, simpleBemoleChordReg_g } from 'shared/utils/cm/com/const';
import { arrayByLength, objectKeys } from 'shared/utils/object.utils';
import { EditableComOrder } from '../EditableComOrder';
import { EditableComParseBlocks } from './lib/31-ParseBlocks';

export class EditableCom extends EditableComParseBlocks {
  orderConstructor = (me: ICmComOrderExportableMe<any>) => new EditableComOrder(me, this);

  replaceBemoles(coli: number) {
    if (this.chords === undefined) return;

    const col = this.chords[coli];
    if (!col) return;

    const val = col.replace(simpleBemoleChordReg_g, chord => chordDiezEquivalent()[chord] || chord);

    cmEditComClientTsjrpcMethods.changeChordBlock({ texti: coli, comw: this.wid, value: val });
  }

  getRegionNextLetter() {
    const chars = this.orders
      ?.map(ord =>
        checkIsNumber(ord.repeats) ? '' : objectKeys(ord.repeats).map(key => key.match(makeRegExp('/[a-z]/i'))?.[0]),
      )
      .flat()
      .filter(itIt)
      .map(letter => letter?.charCodeAt(0));

    if (!chars) return null;

    const next = arrayByLength(26, i => 97 + i).find(num => chars.indexOf(num) < 0);

    return next ? (String.fromCharCode(next) as 'a' | 'b') : null;
  }
}
