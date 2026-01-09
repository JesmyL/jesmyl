import { IExportableCom } from 'shared/api';
import { cmComLanguages } from 'shared/utils/cm/com/const';
import { BaseNamed } from '../../BaseNamed';

export class CmComBasic extends BaseNamed<IExportableCom> {
  initial: Partial<IExportableCom & { pos: number }>;
  ton?: number;

  constructor(top: IExportableCom) {
    super(top);
    this.ton = top.ton;

    this.initial = {};

    this.pullTransPosition(top);
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
  set beatsPerMinute(val) {
    this.setExportable('bpm', val);
  }

  get meterSize() {
    return this.getBasic('s');
  }
  set meterSize(val) {
    this.setExportable('s', val);
  }

  get audio() {
    return this.getBasicOr('al', []);
  }
  set audio(val) {
    this.setExportable('al', val);
  }

  get chords() {
    return this.getBasic('c');
  }

  get broadcastPushKind() {
    return this.getBasicOr('k', 0);
  }
  set broadcastPushKind(val) {
    this.setExportable('k', val);
  }

  get isBemoled() {
    return this.getBasicOr('b', 0);
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
  set langi(val: number) {
    this.setExportable('l', val);
  }

  get langn() {
    return cmComLanguages[this.langi || 0];
  }
  get nextLangn() {
    return cmComLanguages[(this.langi || 0) + 1] || cmComLanguages[0];
  }

  pullTransPosition(obj: IExportableCom) {
    if (obj) {
      if (obj.ton != null) this.initialTransPosition = obj.p;
      this.transPosition = obj.ton ?? obj.p;
    }
  }
}
