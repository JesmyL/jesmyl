import { makeRegExp } from 'regexpert';

export interface ScheduleWidgetRightTexts<Right> {
  id: Right;
  title: string;
  description?: [string, string?];
  always?: boolean;
  hidden?: boolean;
  role?: string[];
}

export class ScheduleWidgetRightsCtrl<Right extends number = number> {
  texts: ScheduleWidgetRightTexts<Right>[];
  enumOrder: Right[];

  constructor(texts: ScheduleWidgetRightTexts<Right>[], enumOrder?: Right[]) {
    if (enumOrder === undefined) enumOrder = texts.map(({ id }) => id);
    this.enumOrder = enumOrder;

    this.texts = [
      {
        id: texts.length + 30,
        title: '',
        hidden: true,
      } as ScheduleWidgetRightTexts<Right>,
    ]
      .concat(texts)
      .sort((a, b) => this.enumOrder.indexOf(a.id) - this.enumOrder.indexOf(b.id));
  }

  getAllRights = () => {
    return parseInt(Array(this.texts.length).fill('1').join(''), 2);
  };

  rightLevel = (ruleKey: Right) => this.enumOrder.indexOf(ruleKey);

  collectRights = (...args: Right[]) => {
    let R = 1;
    args.forEach(ruleKey => (R = this.switchRights(R, ruleKey, '1')));
    return R;
  };

  includeRightsReversed = (ruleKey: Right) => {
    let R = 1;
    const ind = this.enumOrder.indexOf(ruleKey);

    for (let i = this.enumOrder.length - 1; i >= ind; i--) {
      R = this.switchRights(R, this.enumOrder[i], '1');
    }

    return R;
  };

  includeRights = (ruleKey: Right) => {
    let R = 1;
    const ind = this.enumOrder.indexOf(ruleKey);

    for (let i = 0; i <= ind; i++) {
      R = this.switchRights(R, this.enumOrder[i], '1');
    }

    return R;
  };

  checkIsCan = (R: number | nil, rightR: number | nil) => {
    return this.rightsBalance(R) >= this.rightsBalance(rightR);
  };

  checkInvertIsCan = (R: number | nil, rightR: number | nil) => {
    return this.rightsBalance(R) > this.rightsBalance(rightR);
  };

  rightsBalance = (R: number | nil): number => {
    if (isEmptyR(R)) return -1;
    const rstr = R.toString(2);

    for (let i = 0; i < this.enumOrder.length; i++) {
      if (rstr[this.enumOrder[i] as never] !== '1') return i;
    }

    return this.enumOrder.length;
  };

  checkIsHasIndividualRights = (R: number | nil, ruleKey: Right) => {
    if (isEmptyR(R)) return false;
    return R.toString(2)[ruleKey] === '1';
  };

  checkIsHasRights = (R: number | nil, ruleKey: Right) => {
    if (isEmptyR(R)) return false;
    const rstr = R.toString(2);
    const ind = this.enumOrder.indexOf(ruleKey);

    if (ind < 0) return false;

    for (let i = 0; i <= ind; i++) {
      if (rstr[this.enumOrder[i]] !== '1') return false;
    }

    return true;
  };

  switchRights = (R: number | nil, ruleKey: Right, set?: '1' | '0' | nil) => {
    const arr = (R || 1).toString(2).split('');

    if (set == null) arr[ruleKey] = '' + +!+arr[ruleKey];
    else arr[ruleKey] = set;

    const bin = this.texts
      .map((_, i) => (arr[i] === '1' ? '1' : '0'))
      .join('')
      .replace(makeRegExp('/0+$/'), '');
    return parseInt(bin || '1', 2);
  };

  static switchRights = (R: number | nil, ruleKey: number, len: number) => {
    const arr = (R || 1).toString(2).split('');

    arr[ruleKey + 1] = '' + +!+arr[ruleKey + 1];

    const bin = Array(len + 1)
      .fill('')
      .map((_, i) => (arr[i] === '1' ? '1' : '0'))
      .join('')
      .replace(makeRegExp('/0+$/'), '');

    return parseInt(bin || '1', 2);
  };

  static checkIsHasIndividualRights = (R: number | nil, ruleKey: number) => {
    if (isEmptyR(R)) return false;
    return R.toString(2)[ruleKey + 1] === '1';
  };
}

const isEmptyR = (R: number | nil): R is nil => R === undefined || R === null || R < 2;
