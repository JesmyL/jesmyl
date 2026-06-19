import { ChordVisibleVariant } from '#shared/model/cm/Cm.model';
import { CmComOrderWidClass } from '#shared/model/cm/order/OrderWid';
import { CmComOrderEditableRegion, ICmComOrderExportableMe } from '#shared/model/cm/order/regions';
import { makeRegExp } from 'regexpert';
import {
  CmComLineText,
  CmComNewlinerLinei,
  CmComNewlinerRepeati,
  CmComTextSquareBracketsMode,
  InheritancableOrder,
  OrderRepeats,
  SpecialOrderRepeats,
} from 'shared/api';
import { TextCase } from 'shared/model/common';
import { checkIsNumber, checkIsObject } from 'shared/utils/checkIs';
import { cmComOrderCheckIsOrdVisibleInInterpretation } from 'shared/utils/cm/checkIs';
import { chordInterpretedRegs } from 'shared/utils/cm/com/const';
import { cmComNewlinerLineConfigToSet, cmComNewlinerSymbolFreeUpperCaseText } from 'shared/utils/cm/com/newliner';
import { cmComOrderMakeRegions } from 'shared/utils/cm/makeRegions';
import { cmComOrderMakeRepeatedText } from 'shared/utils/cm/makeRepeatedText';
import {
  cmComOrderCheckRepeatKeyIsFlag,
  cmComOrderCheckRepeatKeyIsPortal,
  cmComOrderCheckRepeatKeyIsPortalStart,
  cmComOrderMakeRepeatInnerDiapasonKey,
  cmComOrderMakeRepeatInnerEndKey,
  cmComOrderMakeRepeatInnerStartKey,
  cmComOrderMakeRepeatPortalKey,
  cmComOrderRepeatFlagKey,
  takeCmComOrderRepeatPortalKeyLetter,
} from 'shared/utils/cm/repeat-keys';
import { cmTransformToReadableText } from 'shared/utils/cm/transformToReadableText';
import { objectLength } from 'shared/utils/object.utils';
import { CmCom } from '../Com';

export class CmComOrder extends CmComOrderWidClass<CmComOrder> {
  _regions?: CmComOrderEditableRegion<CmComOrder>[];
  com: CmCom;
  element?: HTMLDivElement;

  constructor(me: ICmComOrderExportableMe<CmComOrder>, com: CmCom) {
    super(me);
    this.com = com;
  }

  get isMin() {
    return this.top.m;
  }

  get isModulated() {
    return !(!this.me.source?.top.md || this.me.isAnchorInherit || this.me.isAnchorInheritPlus);
  }

  get modulation() {
    return this.me.source?.top.md;
  }

  get isAnchor() {
    return this.top.a != null;
  }

  get anchor() {
    return this.top.a;
  }

  get isOpened() {
    return this.top.o;
  }

  get chordsi() {
    return this.top.c ?? this.me.watchOrd?.top.c;
  }

  get texti() {
    return this.top.t;
  }

  get isAnyInherited() {
    return this.me.isInherit || this.me.isAnchorInherit || this.me.isAnchorInheritPlus;
  }

  get positions(): (number[] | nil)[] | nil {
    return (
      this.getWatchInheritance('p') ??
      this.me.watchOrd?.me.source?.top.p ??
      this.me.source?.top.p ??
      this.me.targetOrd?.me.source?.top.p ??
      this.getLeadInheritance('p')
    );
  }

  get kind() {
    return this.top.k;
  }

  get text() {
    return (this.texti != null && this.com.texts && this.com.texts[this.texti]) || '';
  }

  get chords() {
    return (this.chordsi != null && this.com.chords?.[this.chordsi]) || '';
  }

  get isVisible(): boolean {
    if (this.me.isAnchorInheritPlus || this.me.isAnchorInherit)
      return !(
        !this.me.leadOrd?.isVisible ||
        (this.getWatchInheritance('v') ?? this.getLeadInheritance('v') ?? this.me.source?.top.v) === 0
      );

    if (this.me.isInherit) return !(this.top.v === 0 || (this.me.leadOrd && !this.me.leadOrd.isVisible));

    return cmComOrderCheckIsOrdVisibleInInterpretation(this.top, this.com.intp);
  }

  get isHeaderNoneForce() {
    return this.me.kind?.isHeaderNoneForce;
  }

  get repeatsTitle(): string {
    const repeats = this.repeats;

    if (!repeats) return '';
    if (typeof repeats === 'number') return repeats < 2 ? '' : repeats + '';
    if (repeats['.']) return repeats['.'] < 2 ? '' : repeats['.'] + '';
    const lastLineIndex = this.text.split(makeRegExp('/\\n/')).length - 1;
    const region = this.regions?.find(({ startLinei, finLinei }) => startLinei === 0 && finLinei === lastLineIndex);

    return region ? region.count + '' : '';
  }

  private _re: OrderRepeats | nil;
  get repeats(): OrderRepeats | nil {
    let repeatsResult = this._re;
    if (repeatsResult !== undefined) return repeatsResult;

    if (this.me.isAnchorInherit) {
      repeatsResult = this.getLeadInheritance('r') ?? this.getWatchValue('r') ?? 0;
    } else if (this.me && this.me.source && this.me.source.top.r != null) {
      repeatsResult = this.me.source.top.r;
    } else {
      const repeats = this.me?.targetOrd?.me.source?.top.r ?? this.getWatchInheritance('r') ?? this.top.r;

      if (checkIsNumber(repeats)) repeatsResult = repeats;
      else if (repeats == null) repeatsResult = 0;
      else {
        const reg = makeRegExp('/[a-z]/i', 0);
        repeatsResult = {};

        for (const key in repeats) if (!reg.exec(key)) repeatsResult[key as '.'] = repeats[key as '.'];
      }
    }

    if (checkIsObject(repeatsResult))
      if (!objectLength(repeatsResult)) repeatsResult = 0;
      else {
        const { '.': dotNum, ...reWODot } = repeatsResult;
        if (!objectLength(reWODot)) repeatsResult = dotNum;
      }

    return (this._re = repeatsResult);
  }

  get regions(): CmComOrderEditableRegion<CmComOrder>[] | und {
    return (this._regions ??= this.setRegions());
  }

  isCanShowChordsInText = (chordVisibleVariant: ChordVisibleVariant) => {
    return !!(
      (!this.chordsi || this.chordsi > -1) &&
      (chordVisibleVariant === 2 || (chordVisibleVariant === 1 && this.isMin))
    );
  };

  isInSolidLineWithInvisibles = () => this.isAnyInherited && this.isHeaderNoneForce;

  isDayFromCreate = () => this.com.isDayFromCreate(this.top.cre);

  getWatchValue = <Key extends keyof Required<InheritancableOrder>>(key: Key) => {
    return (this.me.isAnchorInherit ? this.me.watchOrd?.top[key] : null) as InheritancableOrder[Key] | nil;
  };

  getWatchInheritance = <Key extends keyof Required<InheritancableOrder>>(key: Key) => {
    return (
      this.me.isAnchorInherit
        ? (this.me.watchOrd?.me.source?.top[`_${key}`]?.[this.me.anchorInheritIndex || 0] ?? this.me.watchOrd?.top[key])
        : null
    ) as InheritancableOrder[Key] | nil;
  };

  getLeadInheritance = <Key extends keyof InheritancableOrder>(key: Key) => {
    return (
      this.me.isAnchorInherit ? this.me.leadOrd?.me.source?.top[`_${key}`]?.[this.me.anchorInheritIndex || 0] : null
    ) as InheritancableOrder[Key] | nil;
  };

  comOrders = () => this.com.orders;

  self = <Ord extends CmComOrder>(): Ord => this as never;

  isRealText = () => !!(this.text && this.isVisible);
  isChBlock = () => this.texti == null;

  lineChordLabels = (chordHardLevel: 2 | 1 | 3, specialLinei: number, specialOrdi: number) => {
    let chordsLabels = this.com.chordLabels[specialOrdi]?.[specialLinei] ?? [];

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
    (this._regions = cmComOrderMakeRegions<Ord>(this.self<Ord>(), this.text, this.repeats, this.comOrders() as Ord[]));

  static makeRepeatsFromRegions = <Ord extends CmComOrder>(regions: CmComOrderEditableRegion<Ord>[] | und) => {
    const repeats = {} as SpecialOrderRepeats;

    regions?.forEach(({ count, key, finLinei, finWordi, isFinWordiLast, startLinei, startWordi }) => {
      if (key === '.') {
        repeats[key] = count;
        return;
      }

      if (cmComOrderCheckRepeatKeyIsPortal(key)) {
        const portalKey = cmComOrderMakeRepeatPortalKey(
          finLinei,
          finWordi,
          takeCmComOrderRepeatPortalKeyLetter(key),
          cmComOrderCheckRepeatKeyIsPortalStart(key),
        );

        if (portalKey) repeats[portalKey] = count;

        return;
      }

      if (cmComOrderCheckRepeatKeyIsFlag(key)) {
        const flagKey = cmComOrderRepeatFlagKey(startLinei, startWordi);
        if (flagKey) repeats[flagKey] = count;

        return;
      }

      const resultKey = cmComOrderMakeRepeatInnerDiapasonKey(
        cmComOrderMakeRepeatInnerStartKey(startLinei, startWordi),
        cmComOrderMakeRepeatInnerEndKey(startLinei, isFinWordiLast, finLinei, finWordi),
      );

      if (resultKey) repeats[resultKey] = count;
    });

    return repeats;
  };

  private _rt: string | nil;
  repeatedText = (
    squareBracketsMode: CmComTextSquareBracketsMode,
    regions: CmComOrderEditableRegion<CmComOrder>[] | nil = this.regions,
    textCase?: TextCase | nil,
  ) => (this._rt ??= cmComOrderMakeRepeatedText(this.transformedText(squareBracketsMode, textCase), regions));

  transformedText = (squareBracketsMode: CmComTextSquareBracketsMode, textCase?: TextCase | nil) =>
    cmTransformToReadableText(this.text, textCase, squareBracketsMode).text;

  isVisibleOrd = () => !this.isHeaderNoneForce && this.isVisible;

  makeNewlinerSets = (line: CmComLineText, linei: CmComNewlinerLinei, repeati: CmComNewlinerRepeati) => {
    const setHolder = this.com.newlinerSetHolder;
    const ownSet = cmComNewlinerLineConfigToSet(this.com.top.nl?.[0][this.wid], linei, repeati);
    let firstSet;
    let currentSet = ownSet;

    const upperLine = (setHolder[line] ??= cmComNewlinerSymbolFreeUpperCaseText(line));
    setHolder[upperLine] ??= ownSet;

    if (!ownSet.size) currentSet = firstSet = setHolder[upperLine];

    return { ownSet, firstSet, currentSet, holdSet: setHolder[upperLine], upperLine };
  };
}
