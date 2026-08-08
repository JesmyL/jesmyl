import { CmComBracketLevelHolder, IExportableCom, IExportableComInterpretation, IFixedCom, Langi } from 'shared/api';
import { checkIsNowInCurrentDay } from 'shared/const/ms';
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
    return this.top.al;
  }

  get transPosition() {
    return this.fix?.ton ?? this.intp?.p ?? this.top.p ?? 0;
  }

  get langi() {
    return this.top.l ?? Langi.Ru;
  }

  get langn() {
    return cmComLanguages[this.langi];
  }
  get nextLangn() {
    return cmComLanguages[this.langi + 1] || cmComLanguages[Langi.Ru];
  }

  isDayFromCreate = (createdAt?: number | nil) => checkIsNowInCurrentDay(createdAt ?? this.wid);
}
