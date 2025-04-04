import { mylib, MyLib } from '#shared/lib/my-lib';
import { SourceBased } from '#shared/lib/SourceBased';
import {
  CmComOrderWid,
  IExportableOrder,
  IExportableOrderFieldValues,
  InheritancableOrder,
  OrderRepeats,
  SpecialOrderRepeats,
} from 'shared/api';
import { emptyArray, itIt, makeRegExp } from 'shared/utils';
import { Com } from '../Com';
import { EditableOrderRegion, IExportableOrderMe } from './Order.model';

export class Order extends SourceBased<IExportableOrder> {
  _regions?: EditableOrderRegion<Order>[];
  com: Com;
  element?: HTMLDivElement;
  me: IExportableOrderMe;

  constructor(me: IExportableOrderMe, com: Com) {
    super(me.top);
    this.com = com;

    this.texti = mylib.isNum(me.top.t) ? me.top.t : undefined;

    this.fieldValues = me.top.f;
    this.me = me;
  }

  static getWithExtendableFields(source: IExportableOrderMe | und, target: IExportableOrderMe): IExportableOrderMe {
    return { ...source, ...target, top: { ...source?.top, ...target.top } };
  }

  get isMin() {
    return this.top.m;
  }

  get wid() {
    return this.me.source?.top.w || this.top.w;
  }
  set wid(val: CmComOrderWid) {
    if (this.me.source) this.me.source.top.w = val;
  }

  get isAnchor() {
    return this.getBasic('a') != null;
  }

  get anchor() {
    return this.getBasic('a');
  }
  set anchor(val) {
    this.setExportable('a', val);
  }

  get isEmptyHeader() {
    return this.getBasic('e');
  }
  set isEmptyHeader(val) {
    this.setExportable('e', val);
  }

  get isOpened() {
    return this.getBasic('o');
  }
  set isOpened(val) {
    this.setExportable('o', val);
  }

  get chordsi() {
    return this.getBasic('c') ?? this.me.watchOrd?.getBasic('c');
  }
  set chordsi(val) {
    this.setExportable('c', val);
  }

  get texti() {
    return this.getBasic('t');
  }
  set texti(val) {
    this.setExportable('t', val);
  }

  get positions(): (number[] | null)[] | nil {
    return (
      this.me.positions ??
      this.getWatchInheritance('p') ??
      this.getLeadInheritance('p') ??
      this.me.source?.top.p ??
      this.me.watchOrd?.me.source?.top.p ??
      this.me.targetOrd?.me.source?.top.p ??
      (this.me.source && (this.me.source.top.p = []))
    );
  }
  set positions(val) {
    this.setExportable('p', val);
  }

  get type() {
    return this.getBasic('s');
  }
  set type(val) {
    this.setExportable('s', val);
  }

  get text() {
    return this.me.text ?? ((this.texti != null && this.com.texts && this.com.texts[this.texti]) || '');
  }

  get chords() {
    return this.me.chords ?? ((this.chordsi != null && this.com.chords?.[this.chordsi]) || '');
  }

  get chordLabels() {
    return this.me.chordLabels;
  }

  get isVisible(): boolean {
    return this.me.isAnchorInheritPlus || this.me.isAnchorInherit
      ? !(
          !this.me.leadOrd?.isVisible ||
          (this.getWatchInheritance('v') ?? this.getLeadInheritance('v') ?? this.me.source?.top.v) === 0
        )
      : this.me.isInherit
        ? !(this.getBasic('v') === 0 || (this.me.leadOrd && !this.me.leadOrd.isVisible))
        : this.getBasic('v') !== 0;
  }
  set isVisible(val) {
    this.setExportable('v', val ? 1 : 0);
  }

  get isHeaderNoneForce() {
    return this.me.style?.isHeaderNoneForce;
  }

  get fieldValues(): IExportableOrderFieldValues | und {
    return this.getBasicOr('f', {});
  }
  set fieldValues(val) {
    this.setExportable('f', val);
  }

  get repeatsTitle(): string {
    const repeats = this.repeats;

    if (!repeats) return '';
    if (typeof repeats === 'number') return repeats < 2 ? '' : repeats + '';
    if (repeats['.']) return repeats['.'] < 2 ? '' : repeats['.'] + '';
    const lastLineIndex = this.text.split(makeRegExp('/\\n/')).length - 1;
    const region = this.regions?.find(({ startLinei, endLinei }) => startLinei === 0 && endLinei === lastLineIndex);

    return region ? region.count + '' : '';
  }

  get repeats(): OrderRepeats | null {
    if (this.me.isAnchorInherit) {
      return (this.me.leadOrd?.me.source?.top.inh?.r?.[this.me.anchorInheritIndex || 0] ?? 0) as never;
    } else if (this.me && this.me.source && this.me.source.top.r != null) return this.me.source.top.r;
    else {
      const repeats =
        this.me.repeats ?? this.me?.targetOrd?.me.source?.top.r ?? this.getWatchInheritance('r') ?? this.top.r;

      const nrepeats = {} as SpecialOrderRepeats;
      const reg = makeRegExp('/[a-z]/i', true);

      return MyLib.entries((repeats && (mylib.isNum(repeats) ? { '.': repeats } : repeats)) || nrepeats).reduce(
        (acc, [key, val]) => {
          if (!reg.exec(key)) acc[key] = val;
          return acc;
        },
        nrepeats,
      );
    }
  }

  set repeats(val: OrderRepeats | null) {
    if (this.me.isAnchorInherit && this.me.leadOrd?.me.source) {
      const inh = this.me.leadOrd.me.source.top.inh || { r: {} };
      const repeats = (inh.r = (inh.r || {}) as Record<number, OrderRepeats | null>);

      if (this.me.anchorInheritIndex != null) repeats[this.me.anchorInheritIndex] = val;
      this.me.leadOrd.me.source.top.inh = inh as never;
    } else if (this.me.source) this.me.source.top.r = val;
  }

  setRepeats(val: OrderRepeats | null) {
    this.repeats = val;
  }

  get regions(): EditableOrderRegion<Order>[] | und {
    if (this._regions === undefined) this.setRegions();

    return this._regions;
  }

  getWatchInheritance<Key extends keyof InheritancableOrder>(fieldn: Key) {
    return (
      this.me.isAnchorInherit
        ? (this.me.watchOrd?.me.source?.top.inh?.[fieldn]?.[this.me.anchorInheritIndex || 0] ??
          this.me.watchOrd?.getBasic(fieldn))
        : null
    ) as InheritancableOrder[Key] | nil;
  }

  getLeadInheritance<Key extends keyof InheritancableOrder>(fieldn: Key) {
    return (
      this.me.isAnchorInherit ? this.me.leadOrd?.me.source?.top.inh?.[fieldn]?.[this.me.anchorInheritIndex || 0] : null
    ) as InheritancableOrder[Key] | nil;
  }

  resetRegions() {
    delete this._regions;
  }

  comOrders() {
    return this.com.orders;
  }

  self<Ord extends Order>(): Ord {
    return this as never;
  }

  isRealText() {
    return !!(this.text && this.isVisible);
  }

  openText() {
    if (!this.isRealText()) return '';

    return this.text;
  }

  setRegions = <Ord extends Order>() =>
    (this._regions = Order.makeRegions(this.self<Ord>(), this.text, this.repeats, this.comOrders()));

  static makeRepeatsFromRegions<Ord extends Order>(regions: EditableOrderRegion<Ord>[] | und) {
    const repeats = {} as SpecialOrderRepeats;

    regions?.forEach(re => {
      if (re.key === '.') {
        repeats[re.key] = re.count;
        return;
      }

      if (re.key.search(makeRegExp('/[a-z]/')) > -1) {
        const parts = re.key.split(makeRegExp('/\\d+/')).filter(itIt);

        if (parts[0] === ':') repeats[`${re.endLinei}:${re.endWordi}${parts[1]}`] = re.count;
        else repeats[`${parts[0]}${re.startLinei}:${re.startWordi}`] = re.count;

        return;
      }

      if (re.key.search(makeRegExp('/~/')) > -1) {
        repeats[`~${re.startLinei}:${re.startWordi}`] = re.count;
        return;
      }

      const startKey =
        re.startLinei === null
          ? ('' as const)
          : !re.startWordi
            ? (`${re.startLinei}` as const)
            : (`${re.startLinei}:${re.startWordi}` as const);

      const endKey =
        re.endLinei === null
          ? ('' as const)
          : !re.endWordi || re.isEndWordiLast
            ? (`${re.endLinei}` as const)
            : (`${re.endLinei === re.startLinei ? '' : re.endLinei}:${re.endWordi}` as const);

      const key = startKey && endKey && startKey !== endKey ? (`${startKey}-${endKey}` as const) : startKey || endKey;

      if (key) repeats[key] = re.count;
    });

    return repeats;
  }

  static makeRegions<Ord extends Order>(
    self: Ord | null,
    text: string,
    repeats: OrderRepeats | nil,
    comOrders: Order[] | null,
  ) {
    const txt = (text || '').split(makeRegExp('/\\n+/')).map((txt: string) => txt.split(makeRegExp('/\\s+/')));
    const lines = txt.length;

    return repeats === 0
      ? []
      : MyLib.entries(mylib.isNum(repeats) ? { '.': repeats } : repeats).map(
          ([key, count]: [string, number]): EditableOrderRegion<Ord> => {
            if (key === '.')
              return {
                startLinei: 0,
                startWordi: 0,
                endLinei: lines - 1,
                endWordi: (txt[txt.length - 1] || '').length - 1,
                isEndWordiLast: true,
                startOrd: self,
                endOrd: self,
                others: null,
                key,
                startKey: key,
                endKey: key,
                count,
              };
            else if (key.startsWith('~')) {
              const [, linei, wordi] = key.split(makeRegExp('/[~:]/'));

              return {
                startLinei: +linei,
                startWordi: +wordi,
                endLinei: null,
                endWordi: null,
                isEndWordiLast: false,
                startOrd: self,
                endOrd: self,
                others: null,
                key,
                startKey: key,
                endKey: key,
                count,
              };
            } else {
              const letter: string | undefined = (makeRegExp('/[a-z]/i').exec(key) ?? emptyArray)[0];

              if (letter !== undefined) {
                const [first, second, third] = key.split(makeRegExp('/[:a-z]/i')).map(num => parseInt(num));
                const isBeg = key.match(makeRegExp('/^[a-z]/i'));
                let others: number[] = [];
                let finishKey: string = '';

                const ord = comOrders?.find(
                  (ord: Order) =>
                    !mylib.isNum(ord.repeats) &&
                    Object.keys(ord.repeats || {}).some(key => {
                      if (key[!isBeg ? 'startsWith' : 'endsWith'](letter)) {
                        others = key.split(makeRegExp('/[:a-z]/i')).filter(itIt).map(Number);
                        finishKey = key;
                        return true;
                      }
                      return false;
                    }),
                );

                return (
                  isBeg
                    ? {
                        startLinei: second,
                        startWordi: third,
                        endLinei: null,
                        endWordi: null,
                        startOrd: self,
                        endOrd: ord,
                        others,
                        key,
                        startKey: key,
                        endKey: finishKey,
                        count,
                      }
                    : {
                        startLinei: null,
                        startWordi: null,
                        endLinei: first,
                        endWordi: second,
                        startOrd: ord,
                        endOrd: self,
                        others,
                        key,
                        startKey: key,
                        endKey: finishKey,
                        count,
                      }
                ) as EditableOrderRegion<Ord>;
              } else {
                const [beg, end] = key.split('-');
                const [startLinei, startWordi = 0] = beg.split(':').map(num => parseInt(num));
                let endLinei = 0;
                let endWordi = 0;
                let isEndWordiLast = false;

                if (end) {
                  [endLinei, endWordi] = (end || '').split(':').map(num => parseInt(num));
                  if (isNaN(endLinei)) endLinei = startLinei;
                  if (endWordi == null) {
                    endWordi = (txt[endLinei] || '').length - 1;
                    isEndWordiLast = true;
                  }
                } else [endLinei, endWordi] = [startLinei, (txt[startLinei] || '').length - 1];

                return {
                  startLinei,
                  startWordi,
                  endLinei,
                  endWordi,
                  isEndWordiLast,
                  startOrd: self,
                  endOrd: self,
                  others: null,
                  key,
                  startKey: key,
                  endKey: key,
                  count,
                };
              }
            }
          },
        );
  }

  private static _insertRepeats(
    txt: string,
    repeatsCount: number,
    insetrStartRepeatSign: boolean,
    insetrFinishRepeatSign: boolean,
  ) {
    return `${!insetrStartRepeatSign || repeatsCount < 1 ? '' : `${'/'.repeat(repeatsCount)}&nbsp;`}${txt || ''}${
      !insetrFinishRepeatSign || repeatsCount < 2 ? '' : `&nbsp;${'\\'.repeat(repeatsCount)}`
    }`;
  }

  repeatedText(repeats: OrderRepeats | null = this.repeats) {
    return Order.makeRepeatedText(Com.bracketsTransformed(this.text).text, repeats);
  }

  static makeRepeatedText(text: string, repeats: OrderRepeats | nil = null) {
    if (!repeats) return text;

    if (mylib.isNum(repeats)) return this._insertRepeats(text, repeats, true, true);
    else {
      const poss: PRecord<number, PRecord<number, number[]>> = {};

      mylib
        .keys(repeats)
        .sort((a, b) => {
          let acount = 0,
            bcount = 0;
          const [abeg = '', aend = ''] = a.split('-');
          const [, abegWord] = abeg.split(':');
          const [aendLine, aendWord] = aend.split(':');

          const [bbeg = '', bend = ''] = b.split('-');
          const [, bbegWord] = bbeg.split(':');
          const [bendLine, bendWord] = bend.split(':');

          if (abegWord) acount++;
          if (aendWord) acount++;
          if (aendLine) acount++;

          if (bbegWord) bcount++;
          if (bendWord) bcount++;
          if (bendLine) bcount++;

          return acount - bcount;
        })
        .forEach(key => {
          if (key === '.') return;

          const pushRep = (linei: number, wordi: number, fix = 1) => {
            const tr = (poss[linei] = mylib.typ({}, poss[linei]));
            const td = (tr[wordi] = mylib.typ([], tr[wordi]));
            td.push(fix * repeats[key]);
          };

          if (key.match(makeRegExp('/[a-z]$/i'))) {
            const [linei, wordi] = key.split(makeRegExp('/[:a-z]/i'));
            pushRep(+linei, +wordi, -1);
            return;
          }

          if (key.startsWith('~') || key.match(makeRegExp('/^[a-z]/i'))) {
            const [, linei, wordi] = key.split(makeRegExp('/[~:a-z]/i'));
            pushRep(+linei, +wordi);
            return;
          }

          const [beg = '', end = ''] = key.split('-');
          const [begLine, begWord = -1] = beg.split(':');
          const [endSplitLine, endWord = -2] = end.split(':');
          const endLine = endSplitLine || begLine;

          if (begLine) pushRep(+begLine, +begWord);
          if (endLine) pushRep(+endLine, +endWord, -1);
        });

      const repld = text
        .split(makeRegExp('/\\n+/'))
        .map((line, linei) => {
          const words = line.split(makeRegExp('/ +/'));

          const repldLine = words
            .map((word, wordi) => {
              const counts = poss[linei]?.[wordi] ?? emptyArray;

              return counts.length === 0
                ? word
                : counts.reduce(
                    (prev, count) => this._insertRepeats(prev, Math.abs(count), count > 0, count < 0),
                    word,
                  );
            })
            .join(' ');

          const counts = ((poss[linei] ?? emptyArray)[-1] ?? emptyArray).concat(
            (poss[linei] ?? emptyArray)[-2] ?? emptyArray,
          );

          return counts.length > 0
            ? counts.reduce(
                (prev, count) => this._insertRepeats(prev, Math.abs(count), count > 0, count < 0),
                repldLine,
              )
            : repldLine;
        })
        .join('\n');

      return mylib.isNum(repeats['.']) ? this._insertRepeats(repld, repeats['.'], true, true) : repld;
    }
  }
}
