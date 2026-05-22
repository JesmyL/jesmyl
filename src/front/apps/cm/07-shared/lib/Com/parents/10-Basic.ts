import { IExportableCom, IExportableComInterpretation } from 'shared/api';
import { takeCorrectMetronomeBpm } from 'shared/utils/cm';
import { cmComLanguages } from 'shared/utils/cm/com/const';
import { BaseNamed } from '../../BaseNamed';

export class CmComBasic extends BaseNamed<IExportableCom> {
  initial: Partial<IExportableCom & { pos: number }>;
  ton?: number;

  constructor(
    top: IExportableCom,
    public intp: IExportableComInterpretation | nil,
  ) {
    super(top);

    this.initial = {};

    this.transPosition = top.ton ?? intp?.p ?? top.p;
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
    return takeCorrectMetronomeBpm(this.intp?.bpm ?? this.getBasic('bpm'));
  }

  get meterSize() {
    return this.getBasic('s');
  }

  get audio() {
    return this.getBasicOr('al', []);
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

  isDayFromCreate = (createdAt: number = this.wid) => createdAt > Date.now() - 24 * 60 * 60 * 1000;
}
