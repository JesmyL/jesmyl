import { CmComOrder, CmComOrderEditableRegion, ICmComOrderExportableMe } from '$cm/ext';
import { InheritancableOrder } from 'shared/api';
import { EditableCom } from './EditableCom';

export class EditableComOrder extends CmComOrder {
  _regions?: CmComOrderEditableRegion<EditableComOrder>[];
  com: EditableCom;

  constructor(me: ICmComOrderExportableMe, com: EditableCom) {
    super(me, com);
    this.com = com;
  }

  comOrders = () => this.com.orders;

  get regions(): CmComOrderEditableRegion<EditableComOrder>[] | und {
    if (this._regions === undefined) this.setRegions();

    return this._regions;
  }

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
          this.me.leadOrd?.me.source?.top[`_${key}`]?.[this.me.anchorInheritIndex] == null
      : this.me.isAnchor && this.me.source?.top[key] == null;
  }

  makeCutChordPositions(linePositions: number[], textLine: string, linei: number) {
    const chords = this.chords.split('\n')[linei]?.split(' ') ?? [];
    let cutLine = linePositions;
    let diffCount = chords.length - cutLine.length;

    if (diffCount > 0) return { diffCount };

    const vowels = this.com.getVowelPositions(textLine);

    const overVowelsLen = cutLine.filter(num => num > vowels.length - 1).length;
    const overPositionsLen = cutLine.length - chords.length;

    diffCount = Math.max(overVowelsLen, overPositionsLen);
    cutLine = cutLine.slice();

    if (overVowelsLen && cutLine[0] === -2) {
      cutLine.shift();
      cutLine.splice(cutLine.length - overVowelsLen, 0, -2);
    }

    cutLine = cutLine.slice(0, -diffCount);

    return { cutLine: chords.length && !cutLine.length ? null : cutLine, diffCount };
  }
}
