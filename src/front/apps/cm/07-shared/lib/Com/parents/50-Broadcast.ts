import { mylib } from '#shared/lib/my-lib';
import { makeRegExp } from 'regexpert';
import { cmComLineGroupingDefaultKinds } from 'shared/const/cm/comLineGroupingKind';
import {
  CmBroadcastSlideGrouperOrdCombiner,
  CmBroadcastSlideGrouperOrdWithList,
  CmBroadcastSlideGrouperOrdWithListAndRule,
} from 'shared/model/cm/broadcast';
import { CmComTexts } from './40-Texts';

export class CmComBroadcast extends CmComTexts {
  groupSlideLinesByKind = (ordLines: CmBroadcastSlideGrouperOrdWithList, rule = this.broadcastPushKind) => {
    if (rule == null) return [];

    let str = '';
    let ordComb: CmBroadcastSlideGrouperOrdCombiner = {};

    if (mylib.isStr(rule)) str = rule;
    else if (mylib.isNum(rule)) str = cmComLineGroupingDefaultKinds[rule];
    else {
      if (mylib.isStr(rule.s)) str = rule.s;
      else if (mylib.isNum(rule.n)) str = cmComLineGroupingDefaultKinds[rule.n];

      ordComb = rule.d;
    }

    if (!str) return [];

    const divDict: Record<string, string> = {};

    str.split(makeRegExp('/[ ,]+/')).forEach(str => {
      const [key, value] = str.split(':');

      if (!value) divDict[0] = key;
      else divDict[key] = value;
    });

    return ordLines.map(({ list, ord }): CmBroadcastSlideGrouperOrdWithListAndRule[number] => {
      const ordw = ord.wid;

      let defaultRule = 0;
      let defaultDict: CmBroadcastSlideGrouperOrdWithListAndRule[number] | null = null;

      for (let i = list.length; i >= 0; i--) {
        if (!divDict[i]) continue;

        defaultRule = +divDict[i];
        defaultDict = {
          ord,
          list: this.divideLinesByRule(list, +divDict[i]),
          rule: defaultRule,
          defaultRule,
        };

        break;
      }

      if (ordComb[ordw] != null)
        return {
          ord,
          list: this.divideLinesByRule(list, ordComb[ordw]),
          rule: ordComb[ordw],
          defaultRule,
        };

      if (divDict[`=${list.length}`] != null) {
        const rule = +divDict[`=${list.length}`];

        return {
          ord,
          list: this.divideLinesByRule(list, rule),
          rule,
          defaultRule,
        };
      }

      return defaultDict ?? { ord, list: [list], rule: 0, defaultRule };
    });
  };

  private divideLinesByRule = (lines: string[], rule: number) => {
    const ruleStr = `${rule}`;
    const newLines: string[][] = [];

    if (ruleStr.length === 1) {
      for (; lines.length; ) {
        if (!+rule) {
          newLines.push(lines);
          break;
        }

        newLines.push(lines.slice(0, rule));
        lines = lines.slice(rule);
      }
    } else {
      let index = 0;

      for (; lines.length; ) {
        if (!+ruleStr[index]) {
          newLines.push(lines);
          break;
        }

        newLines.push(lines.slice(0, +ruleStr[index]));
        lines = lines.slice(+ruleStr[index]);

        index++;
        if (index >= ruleStr.length) index = 0;
      }
    }

    return newLines;
  };
}
