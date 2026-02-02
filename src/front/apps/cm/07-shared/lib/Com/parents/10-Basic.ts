import { IExportableCom, IExportableComInterpretation } from 'shared/api';
import { CmBroadcastSlideGrouperKind } from 'shared/model/cm/broadcast';
import { cmComLanguages } from 'shared/utils/cm/com/const';
import { BaseNamed } from '../../BaseNamed';

export class CmComBasic extends BaseNamed<IExportableCom> {
  initial: Partial<IExportableCom & { pos: number }>;
  ton?: number;
  intp: IExportableComInterpretation | nil;

  constructor(top: IExportableCom, interpretation?: IExportableComInterpretation | nil) {
    super(top);
    this.intp = interpretation;

    this.initial = {};

    this.transPosition = top.ton ?? interpretation?.p ?? top.p;
  }

  get mod() {
    return this.getBasic('m');
  }

  get texts() {
    return this.getBasic('t');
  }
  set texts(val) {
    this.setExportable('t', val);
  }

  get beatsPerMinute() {
    return this.getBasic('bpm');
  }

  get meterSize() {
    return this.getBasic('s');
  }

  get audio() {
    return this.getBasicOr('al', []);
  }

  broadcastPushKind(version: 'k' | 'k2', def: CmBroadcastSlideGrouperKind = 0) {
    return this.getBasicOr(version, def);
  }

  get initialTransPosition() {
    return this.initial.p ?? this.getBasic('p');
  }
  set initialTransPosition(val) {
    if (this.initial.p == null) this.initial.p = val || 0;
    this.initialTransPos = val || 0;
  }

  get initialTransPos() {
    return this.initial.pos ?? this.initial.p ?? this.getBasic('p');
  }
  set initialTransPos(val) {
    if (this.initial.pos == null) this.initial.pos = val || 0;
  }

  get transPosition() {
    return this.getBasic('p');
  }
  set transPosition(value) {
    const v = value || 0;
    const val = v > 11 ? v % 12 : v < 0 ? 12 + v : v;
    this.setExportable('p', val);
    this.initialTransPosition = val;
  }

  get langi() {
    return this.getBasicOr('l', 0);
  }

  get langn() {
    return cmComLanguages[this.langi || 0];
  }
  get nextLangn() {
    return cmComLanguages[(this.langi || 0) + 1] || cmComLanguages[0];
  }
}
