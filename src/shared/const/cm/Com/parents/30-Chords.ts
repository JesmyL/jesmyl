import { makeRegExp } from 'regexpert';
import { checkIsArray, checkIsNotNil, checkIsNumber, checkIsString } from 'shared/utils/checkIs';
import {
  aSharpToBChord,
  chordBemoleEquivalent,
  simpleHashChordReg_g,
  simpleHashChords,
  simpleHashedEachLetterChordReg_g,
} from 'shared/utils/cm/com/const';
import { objectLength } from 'shared/utils/object.utils';
import { TonType } from '../../enums';
import { CmComOrder } from '../../order/Order';
import { CmComOrders } from './20-Orders';

export class CmComChords extends CmComOrders {
  excludedModificateds = new Set<number>();
  protected _chordLabels?: string[][][];
  protected _usedChords?: Record<string, string>;

  static withBemoles(chords: string, tonType: TonType) {
    return tonType
      ? chords.replace(simpleHashedEachLetterChordReg_g, all => chordBemoleEquivalent[all] || all)
      : chords.replace(makeRegExp('/A#/g'), 'B');
  }

  get chords() {
    return this.top.c;
  }

  get chordLabels(): string[][][] {
    if (this._chordLabels == null) this.updateChordLabels();

    return this._chordLabels as string[][][];
  }

  get usedChords() {
    if (this._usedChords == null) this.updateChordLabels();

    return this._usedChords;
  }

  transposeChord(chord: string, delta: number | nil = this.transPosition) {
    const currentIndex = simpleHashChords.indexOf(chord);
    const di = currentIndex + (delta ?? 0);
    const len = objectLength(simpleHashChords);
    const nextIndex = di < 0 ? len - -di : di > len ? di % len : di === len || -di === len ? 0 : di;

    return simpleHashChords[nextIndex];
  }

  transposeBlock(cblock: string, delta?: number | nil) {
    return cblock?.replace(simpleHashChordReg_g, chord => this.transposeChord(chord, delta ?? this.transPosition));
  }

  transposedBlocks(delta?: number) {
    return this.chords?.map((cblock: string) => this.transposeBlock(cblock, delta));
  }

  private updateChordLabels() {
    this._chordLabels = [];
    this._usedChords = {};
    let currTransPosition = this.transPosition;
    let isBemoled = this.isBemoled;

    this.orders?.forEach(ord => {
      const ordLabels: string[][] = [];
      this._chordLabels?.push(ordLabels);
      const prevTransPosition = currTransPosition;

      if (!this.excludedModificateds.has(ord.wid)) {
        currTransPosition = currTransPosition + (ord?.modulation || 0);
        if (ord.isBemoledSwitch) isBemoled = +!isBemoled;
      }

      const chords = this.actualChords(
        isBemoled,
        ord.me.kind?.isModulation ? prevTransPosition : currTransPosition,
        ord.chordsi,
      );

      (chords || '').split(makeRegExp('/\\n/')).forEach(line => {
        const lineLabels: string[] = [];
        ordLabels.push(lineLabels);

        (line || '').split(makeRegExp('/ +/')).forEach(chordSchema => {
          chordSchema
            .split(makeRegExp('/[^#A-Z/0-9]+/i'))
            .forEach(chord => this._usedChords && (this._usedChords[chord.replace(makeRegExp('/B/'), 'A#')] = chord));
          lineLabels.push(chordSchema);
        });
      });
    });
  }

  actualChords(ordTonType: TonType, position: number, chordsScalar?: string | number | nil) {
    const chords = checkIsNumber(chordsScalar) ? this.chords?.[chordsScalar] : chordsScalar;
    return chords && CmComChords.withBemoles(this.transposeBlock(chords, position), ordTonType);
  }

  toggleModulationExclusion(order: CmComOrder) {
    this.excludedModificateds = new Set(this.excludedModificateds);

    if (this.excludedModificateds.has(order.wid)) this.excludedModificateds.delete(order.wid);
    else this.excludedModificateds.add(order.wid);

    this.updateChordLabels();

    return this.excludedModificateds;
  }

  private _tonicaParts?: [string, string, string];
  getTonicaMatch() {
    let tonicaParts = this._tonicaParts;
    if (checkIsArray(tonicaParts)) return tonicaParts;

    const chordi = this.top.o?.find(ord => ord.v !== 0 && checkIsNotNil(ord.c))?.c;
    const match = this.top.c[chordi ?? -1]?.match(makeRegExp('/([A-H]#?)(m?)/'));

    if (match && checkIsString(match[1]) && checkIsString(match[2])) tonicaParts = [match[0], match[1], match[2]];

    return (this._tonicaParts = tonicaParts ?? ['', '', '']);
  }

  getFixedTonica = () => {
    const match = this.getTonicaMatch();
    let resultTonica = this.transposeChord(match[1]);

    if (this.isBemoled) resultTonica = chordBemoleEquivalent[resultTonica] || resultTonica;
    else resultTonica = aSharpToBChord[resultTonica] || resultTonica;

    return `${resultTonica}${match[2]}`;
  };
}
