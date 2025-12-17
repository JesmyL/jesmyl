import { makeRegExp } from 'regexpert';

export const cmComLineGroupingDefaultKinds = [
  // цифра в ключе - меньше или равно количество реальных строк
  // =цифра в ключе - ровное количество реальных строк
  // 0 в ключе - все остальные значения

  // цифра в значении - разбиение на количество строк
  // цифра > 9 - сначала количество по первой цифре, остальные по последней (43 === 433333...)
  // =цифра > 9 - повторение схемы каждый шаг (43 === 43434343434343...)
  // 0 в значении - остаётся прежнее количество строк

  '6:6 8:4 10:5 4',
  '0',
  '5:5 =6:3 8:35 4',
  '6:6 8:4 10:46 4',
  '3:21 2',
  '3:3 5:23 7:23 9:23 11:23 2',
];

export class CmComLineGroupingKind {
  list: number[] = [];
  private rules: number[][] = [];

  constructor(rule: string) {
    this.rules = rule
      .split(makeRegExp('/[ ,]/'))
      .map(ruleStr => {
        const [keyStr, valStr] = ruleStr.split(':');
        const key = (keyStr.startsWith('=') ? -keyStr : +keyStr) || 0;

        if (!valStr) return [0, key];

        return [key, (valStr.startsWith('=') ? -valStr : +valStr) || 0];
      })
      .sort(([a], [b]) =>
        a === undefined || a === 0 ? 1 : b === undefined || b === 0 ? -1 : Math.abs(a) - Math.abs(b) || a - b,
      );
  }

  private pushToList = (num: number) => this.list.push(num) + 1;

  fix = (num: number) => {
    this.rules.some(([key, val]): number => {
      if (key === undefined || val === undefined || (key === 0 && val === 0)) return this.pushToList(num);

      if (key && val > 0 && val < 10) {
        if (num <= key || -key === num) {
          if (num <= val) return this.pushToList(num);
          else {
            let div = num;

            while (div >= val) {
              this.pushToList(val);
              div -= val;
            }

            return div ? this.pushToList(div) : 1;
          }
        }
      } else if (key === 0 || num <= key || -key === num) {
        const nums = `${Math.abs(val)}`.split('').map(v => +v);
        let parti = 0;
        let div = num;

        while (div >= nums[parti]) {
          this.pushToList(nums[parti]);
          div -= nums[parti];
          parti += nums.length - 1 === parti ? (val < 0 ? -parti : 0) : 1;
        }

        return div ? this.pushToList(div) : 1;
      }

      return 0;
    });
  };
}
