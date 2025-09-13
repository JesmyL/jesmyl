import { mylib, MyLib } from '#shared/lib/my-lib';
import { SourceBased } from '#shared/lib/SourceBased';
import { ChordVisibleVariant } from '$cm/Cm.model';
import { makeRegExp } from 'regexpert';
import {
  IExportableOrder,
  IExportableOrderFieldValues,
  InheritancableOrder,
  OrderRepeats,
  SpecialOrderRepeats,
} from 'shared/api';
import { emptyArray, itIt } from 'shared/utils';
import { CmComOrderUtils } from 'shared/utils/cm/ComOrderUtils';
import { CmComUtils } from 'shared/utils/cm/ComUtils';
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
    return this.me.source?.top.w ?? this.top.w;
  }

  get isAnchor() {
    return this.getBasic('a') != null;
  }

  get anchor() {
    return this.getBasic('a');
  }

  get isEmptyHeader() {
    return this.getBasic('e');
  }

  get isOpened() {
    return this.getBasic('o');
  }

  get chordsi() {
    return this.getBasic('c') ?? this.me.watchOrd?.getBasic('c');
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

  get type() {
    return this.getBasic('s');
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
      const reg = makeRegExp('/[a-z]/i', 0);

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

  isCanShowChordsInText(chordVisibleVariant: ChordVisibleVariant) {
    return !!(
      (!this.chordsi || this.chordsi > -1) &&
      (chordVisibleVariant === 2 || (chordVisibleVariant === 1 && this.isMin))
    );
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

  lineChordLabels(chordHardLevel: 2 | 1 | 3, specialLinei: number, specialOrdi: number) {
    let chordsLabels = (this.chordLabels ?? this.com.chordLabels[specialOrdi])?.[specialLinei] ?? [];

    if (chordHardLevel < 3) {
      chordsLabels = chordsLabels.map(chord => {
        const chordsList = chord.split(makeRegExp('/(-| |\\.+)/'));

        if (chordsList === null) return chord;

        return chordsList
          .map(chord => {
            return chord.replace(CmComUtils.chordInterpretedRegs.regExp, (...args) => {
              const chips = CmComUtils.chordInterpretedRegs.transform(args);

              if (chordHardLevel === 1)
                return `${chips.simpleChord}${chips.simpleChord_bass ? '/' : ''}${chips.simpleChord_bass ?? ''}`;

              return `${chips.simpleChord}${chips.lightModificators}${chips.simpleChord_bass ? '/' : ''}${chips.simpleChord_bass ?? ''}${chips.lightModificators_bass ?? ''}`;
            });
          })
          .join('');
      });
    }

    return chordsLabels;
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
                  if (mylib.isNaN(endLinei)) endLinei = startLinei;
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

  repeatedText(repeats: OrderRepeats | null = this.repeats) {
    return CmComOrderUtils.makeRepeatedText(CmComUtils.transformToDisplayedText(this.text).text, repeats);
  }
}
