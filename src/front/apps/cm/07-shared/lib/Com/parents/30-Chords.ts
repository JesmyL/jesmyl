import { mylib } from '#shared/lib/my-lib';
import { CmComOrder, cmIDB } from '$cm/ext';
import { makeRegExp } from 'regexpert';
import {
  chordBemoleEquivalent,
  simpleHashChordReg_g,
  simpleHashChords,
  simpleHashedEachLetterChordReg_g,
} from 'shared/utils/cm/com/const';
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
    return this.getBasicOr('b', 0);
  }
  set isBemoled(val: num) {
    this.setExportable('b', val ? 1 : 0);
    this.resetChordLabels();
  }

  get chords() {
    return this.getBasic('c');
  }
  set chords(val: string[] | und) {
    this.setExportable('c', val);
    this.resetChordLabels();
  }

  get chordLabels(): string[][][] {
    if (this._chordLabels == null) this.updateChordLabels();

    return this._chordLabels as string[][][];
  }

  get usedChords() {
    if (this._usedChords == null) this.updateChordLabels();

    return this._usedChords;
  }

  turnBemoled() {
    this.isBemoled = this.isBemoled ? 0 : 1;
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

  async setChordsInitialTon() {
    const fixed = { ...(mylib.isNNlButUnd(this.wid) && (await cmIDB.tb.fixedComs.get(this.wid))) };
    delete fixed.ton;
    await cmIDB.tb.fixedComs.put(fixed);
  }

  transposeBlock(cblock: string, delta = this.transPosition) {
    return cblock?.replace(simpleHashChordReg_g, chord => this.transposeChord(chord, delta));
  }

  transposedBlocks(delta?: number) {
    return this.chords?.map((cblock: string) => this.transposeBlock(cblock, delta));
  }

  async transpose(delta: number) {
    if (this.transPosition !== undefined) this.transPosition -= -delta;
    else this.transPosition = delta;

    const isUpdated = await cmIDB.tb.fixedComs.update(this.wid, { ton: this.transPosition + delta });
    if (!isUpdated) await cmIDB.tb.fixedComs.put({ w: this.wid, ton: this.transPosition + delta });
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
        currTransPosition = currTransPosition + (ord.fieldValues?.md || 0);
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

  resetChordLabels() {
    delete this._usedChords;
    delete this._chordLabels;
  }

  actualChords(chordsScalar?: string | number, position = this.transPosition) {
    const chords = mylib.isStr(chordsScalar) ? (chordsScalar as string) : this.chords?.[chordsScalar as number];
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
