import { makeRegExp } from 'regexpert';
import { checkIsArray, checkIsNotNil, checkIsString } from 'shared/utils/checkIs';
import {
  aSharpToBChord,
  chordBemoleEquivalent,
  simpleHashChordReg_g,
  simpleHashChords,
  simpleHashedEachLetterChordReg_g,
} from 'shared/utils/cm/com/const';
import { objectLength } from 'shared/utils/object.utils';
import { CmComOrder } from '../../order/Order';
import { CmComOrders } from './20-Orders';

export class CmComChords extends CmComOrders {
  excludedModulations = new Set<number>();
  protected _chordLabels?: string[][][];
  protected _usedChords?: Record<string, string>;

  static withBemoles(chords?: string, isSet?: boolean | num | nil) {
    return (
      isSet ? chords?.replace(simpleHashedEachLetterChordReg_g, all => chordBemoleEquivalent[all] || all) : chords
    )?.replace(makeRegExp('/A#/g'), 'B');
  }

  get isBemoled() {
    return this.intp?.b ?? this.top.b ?? 0;
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

    this.orders?.forEach(ord => {
      const ordLabels: string[][] = [];
      this._chordLabels?.push(ordLabels);
      const prevTransPosition = currTransPosition;

      if (!this.excludedModulations.has(ord.wid) && ord.isModulated) {
        currTransPosition = currTransPosition + (ord?.modulation || 0);
      }

      const chords = this.actualChords(ord.chordsi, ord.me.kind?.isModulation ? prevTransPosition : currTransPosition);

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

  actualChords(chordsScalar?: string | number | nil, position = this.transPosition) {
    const chords = checkIsString(chordsScalar) ? (chordsScalar as string) : this.chords?.[chordsScalar as number];
    return chords && CmComChords.withBemoles(this.transposeBlock(chords, position), this.isBemoled);
  }

  toggleModulationExclusion(order: CmComOrder) {
    this.excludedModulations = new Set(this.excludedModulations);

    if (this.excludedModulations.has(order.wid)) this.excludedModulations.delete(order.wid);
    else this.excludedModulations.add(order.wid);

    this.updateChordLabels();

    return this.excludedModulations;
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
