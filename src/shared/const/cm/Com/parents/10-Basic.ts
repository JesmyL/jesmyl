import {
  CmComBracketLevelHolder,
  CmComLangi,
  IExportableCom,
  IExportableComInterpretation,
  IFixedCom,
} from 'shared/api';
import { takeCorrectMetronomeBpm } from 'shared/utils/cm';
import { cmComLanguages } from 'shared/utils/cm/com/const';
import { BaseNamed } from '../../BaseNamed';

export class CmComBasic extends BaseNamed<IExportableCom> {
  ton?: number;
  bracketLevelHolder: CmComBracketLevelHolder = { level: 0 };

  constructor(
    top: IExportableCom,
    public fix: IFixedCom | nil,
    public intp: IExportableComInterpretation | nil,
  ) {
    super(top);

    this.transPosition = this.fix?.ton ?? this.intp?.p ?? top.p;
  }

  get mod() {
    return this.top.m;
  }

  get texts() {
    return this.top.t;
  }

  get beatsPerMinute() {
    return takeCorrectMetronomeBpm(this.intp?.bpm ?? this.bpm);
  }

  get bpm() {
    return this.top.bpm;
  }

  get meterSize() {
    return this.top.s;
  }

  get audio() {
    return this.top.al ?? [];
  }

  get transPosition() {
    return this.top.p;
  }
  set transPosition(value) {
    const v = value || 0;
    const val = v > 11 ? v % 12 : v < 0 ? 12 + v : v;
    this.top.p = val;
  }

  get langi() {
    return this.top.l ?? CmComLangi.Ru;
  }

  get langn() {
    return cmComLanguages[this.langi];
  }
  get nextLangn() {
    return cmComLanguages[this.langi + 1] || cmComLanguages[CmComLangi.Ru];
  }

  isDayFromCreate = (createdAt: number = this.wid) => createdAt > Date.now() - 24 * 60 * 60 * 1000;
}
