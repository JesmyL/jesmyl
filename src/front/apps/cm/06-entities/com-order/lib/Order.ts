import { mylib, MyLib } from '#shared/lib/my-lib';
import { SourceBased } from '#shared/lib/SourceBased';
import { CmCom } from '$cm/ext';
import { ChordVisibleVariant } from '$cm/shared/model';
import { makeRegExp } from 'regexpert';
import {
  CmComOrderSelector,
  CmComOrderWid,
  IExportableOrder,
  IExportableOrderFieldValues,
  InheritancableOrder,
  OrderRepeats,
  SpecialOrderRepeats,
} from 'shared/api';
import { itIt } from 'shared/utils';
import { chordInterpretedRegs } from 'shared/utils/cm/com/const';
import { transformToDisplayedText } from 'shared/utils/cm/com/transformToDisplayedText';
import { CmComOrderUtils } from 'shared/utils/cm/ComOrderUtils';
import { CmComOrderEditableRegion, ICmComOrderExportableMe } from '../model/Order.model';

export class CmComOrder extends SourceBased<IExportableOrder> {
  _regions?: CmComOrderEditableRegion<CmComOrder>[];
  com: CmCom;
  element?: HTMLDivElement;
  me: ICmComOrderExportableMe;

  constructor(me: ICmComOrderExportableMe, com: CmCom) {
    super(me.top);
    this.com = com;

    this.texti = mylib.isNum(me.top.t) ? me.top.t : undefined;

    this.fieldValues = me.top.f;
    this.me = me;
  }

  static getWithExtendableFields(
    source: ICmComOrderExportableMe | und,
    target: ICmComOrderExportableMe,
  ): ICmComOrderExportableMe {
    return { ...source, ...target, top: { ...source?.top, ...target.top } };
  }

  get isMin() {
    return this.top.m;
  }

  get wid(): CmComOrderWid {
    if (this.me.leadOrd != null && this.me.watchOrd != null)
      return this.me.leadOrd.me.top.w + this.me.watchOrd.me.top.w / 100;

    return this.me.source?.top.w ?? this.top.w;
  }

  get isModulated() {
    return !!this.me.source?.top.f?.md && !this.me.isAnchorInherit && !this.me.isAnchorInheritPlus;
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

  get kind() {
    return this.getBasic('k');
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
    return this.me.kind?.isHeaderNoneForce;
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
      return (this.me.leadOrd?.me.source?.top._r?.[this.me.anchorInheritIndex || 0] ?? 0) as never;
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

  get regions(): CmComOrderEditableRegion<CmComOrder>[] | und {
    if (this._regions === undefined) this.setRegions();

    return this._regions;
  }

  isCanShowChordsInText = (chordVisibleVariant: ChordVisibleVariant) => {
    return !!(
      (!this.chordsi || this.chordsi > -1) &&
      (chordVisibleVariant === 2 || (chordVisibleVariant === 1 && this.isMin))
    );
  };

  isInSolidLineWithInvisibles() {
    return (this.me.isInherit || this.me.isAnchorInherit || this.me.isAnchorInheritPlus) && this.isHeaderNoneForce;
  }

  getWatchInheritance = <Key extends keyof Required<InheritancableOrder>>(key: Key) => {
    return (
      this.me.isAnchorInherit
        ? (this.me.watchOrd?.me.source?.top[`_${key}`]?.[this.me.anchorInheritIndex || 0] ??
          this.me.watchOrd?.getBasic(key))
        : null
    ) as InheritancableOrder[Key] | nil;
  };

  getLeadInheritance = <Key extends keyof InheritancableOrder>(key: Key) => {
    return (
      this.me.isAnchorInherit ? this.me.leadOrd?.me.source?.top[`_${key}`]?.[this.me.anchorInheritIndex || 0] : null
    ) as InheritancableOrder[Key] | nil;
  };

  resetRegions = () => {
    delete this._regions;
  };

  comOrders = () => this.com.orders;

  self = <Ord extends CmComOrder>(): Ord => this as never;

  isRealText = () => !!(this.text && this.isVisible);

  lineChordLabels = (chordHardLevel: 2 | 1 | 3, specialLinei: number, specialOrdi: number) => {
    let chordsLabels = (this.chordLabels ?? this.com.chordLabels[specialOrdi])?.[specialLinei] ?? [];

    if (chordHardLevel < 3) {
      chordsLabels = chordsLabels.map(chord => {
        const chordsList = chord.split(makeRegExp('/(-| |\\.+)/'));

        if (chordsList === null) return chord;

        return chordsList
          .map(chord => {
            return chord.replace(chordInterpretedRegs.regExp, (...args) => {
              const chips = chordInterpretedRegs.transform(args);

              if (chordHardLevel === 1)
                return `${chips.simpleChord}${chips.simpleChord_bass ? '/' : ''}${chips.simpleChord_bass ?? ''}`;

              return `${chips.simpleChord}${chips.lightModificators}${chips.simpleChord_bass ? '/' : ''}${chips.simpleChord_bass ?? ''}${chips.lightModificators_bass ?? ''}`;
            });
          })
          .join('');
      });
    }

    return chordsLabels;
  };

  setRegions = <Ord extends CmComOrder>() =>
    (this._regions = CmComOrder.makeRegions(this.self<Ord>(), this.text, this.repeats, this.comOrders()));

  static makeRepeatsFromRegions = <Ord extends CmComOrder>(regions: CmComOrderEditableRegion<Ord>[] | und) => {
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
  };

  static makeRegions = <Ord extends CmComOrder>(
    self: Ord | null,
    text: string,
    repeats: OrderRepeats | nil,
    comOrders: CmComOrder[] | null,
  ) => {
    const txt = (text || '').split(makeRegExp('/\\n+/')).map((txt: string) => txt.split(makeRegExp('/\\s+/')));
    const lines = txt.length;

    return repeats === 0
      ? []
      : MyLib.entries(mylib.isNum(repeats) ? { '.': repeats } : repeats).map(
          ([key, count]: [string, number]): CmComOrderEditableRegion<Ord> => {
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
              const letter: string | undefined = (makeRegExp('/[a-z]/i').exec(key) ?? [])[0];

              if (letter !== undefined) {
                const [first, second, third] = key.split(makeRegExp('/[:a-z]/i')).map(num => parseInt(num));
                const isBeg = key.match(makeRegExp('/^[a-z]/i'));
                let others: number[] = [];
                let finishKey: string = '';

                const ord = comOrders?.find(
                  (ord: CmComOrder) =>
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
                ) as CmComOrderEditableRegion<Ord>;
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
  };

  repeatedText = (
    repeats: OrderRepeats | null = this.repeats,
    isSetFirstLetterUpperCase?: boolean,
    isHideNewLineSeparator?: boolean,
  ) => {
    return CmComOrderUtils.makeRepeatedText(
      this.transformedText(isSetFirstLetterUpperCase, isHideNewLineSeparator),
      repeats,
    );
  };

  transformedText = (isSetFirstLetterUpperCase?: boolean, isHideNewLineSeparator?: boolean) =>
    transformToDisplayedText(this.text, isSetFirstLetterUpperCase, isHideNewLineSeparator).text;

  makeSelector = (): CmComOrderSelector => this.wid;

  isMySelector = (selector: CmComOrderSelector) => this.wid === selector;

  isVisibleOrd = () => !this.isHeaderNoneForce && this.isVisible;
}
