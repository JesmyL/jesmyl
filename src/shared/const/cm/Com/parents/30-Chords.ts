import { makeRegExp } from 'regexpert';
import { checkIsString } from 'shared/utils/checkIs';
import {
  chordBemoleEquivalent,
  simpleHashChordReg_g,
  simpleHashChords,
  simpleHashedEachLetterChordReg_g,
} from 'shared/utils/cm/com/const';
import { CmComOrder } from '../../order/Order';
import { CmComOrders } from './20-Orders';

export class CmComChords extends CmComOrders {
  excludedModulations = new Set<number>();
  protected _chordLabels?: string[][][];
  protected _usedChords?: Record<string, string>;

  static withBemoles(chords?: string, isSet: num = 0) {
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

  getFirstSimpleChord() {
    return (this.chordLabels?.[0]?.[0]?.[0] ?? this.orders?.[0]?.chords ?? this.chords?.[0])?.match(
      makeRegExp('/[A-H]#?m?/'),
    )?.[0];
  }

  transposeChord(chord: string, delta: number = 1) {
    const currentIndex = simpleHashChords.indexOf(chord);
    const di = currentIndex + delta;
    const len = simpleHashChords.length;
    const nextIndex = di < 0 ? len - -di : di > len ? di % len : di === len || -di === len ? 0 : di;

    return simpleHashChords[nextIndex];
  }

  transposeBlock(cblock: string, delta = this.transPosition) {
    return cblock?.replace(simpleHashChordReg_g, chord => this.transposeChord(chord, delta));
  }

  transposedBlocks(delta?: number) {
    return this.chords?.map((cblock: string) => this.transposeBlock(cblock, delta));
  }

  private updateChordLabels() {
    this._chordLabels = [];
    this._usedChords = {};
    let currTransPosition = this.transPosition || 0;

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

  actualChords(chordsScalar?: string | number, position = this.transPosition) {
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
}
