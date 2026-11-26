import { ICmComOrderExportableMe } from '#shared/model/cm/order/regions';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { makeRegExp } from 'regexpert';
import { itIt } from 'shared/utils';
import { checkIsNil, checkIsNumber } from 'shared/utils/checkIs';
import { replaceBemoleChords } from 'shared/utils/cm/com/replaceBemoleChords';
import { arrayByLength, objectKeys } from 'shared/utils/object.utils';
import { EditableComOrder } from '../EditableComOrder';
import { EditableComParseBlocks } from './lib/31-ParseBlocks';

export class EditableCom extends EditableComParseBlocks {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orderConstructor = (me: ICmComOrderExportableMe<any>) => new EditableComOrder(me, this);

  replaceBemoles(coli: number) {
    if (checkIsNil(this.chords)) return;

    const col = this.chords[coli];
    if (!col) return;

    const val = replaceBemoleChords(col);

    cmEditComClientTsjrpcMethods.changeChordBlock({
      texti: coli,
      comw: this.wid,
      value: val,
      isHard: this.isHardChords,
    });
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
