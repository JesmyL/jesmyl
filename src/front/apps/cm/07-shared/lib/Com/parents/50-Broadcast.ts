import { mylib } from '#shared/lib/my-lib';
import { makeRegExp } from 'regexpert';
import { cmComLineGroupingDefaultKinds } from 'shared/const/cm/comLineGroupingKind';
import {
  CmBroadcastGroupedSlide,
  CmBroadcastSlideGrouperOrdCombiner,
  CmBroadcastSlideGrouperOrdWithListAndRule,
} from 'shared/model/cm/broadcast';
import { CmComTexts } from './40-Texts';

export class CmComBroadcast extends CmComTexts {
  groupSlideListByKind = (
    groupedLines: CmBroadcastSlideGrouperOrdWithListAndRule[] | und,
  ): CmBroadcastGroupedSlide[] => {
    let toLinei = 0;
    let currentLinesCount = 0;

    return (
      groupedLines
        ?.map(({ lines, ord }, blocki) => {
          const preLinesCount = currentLinesCount;
          currentLinesCount += lines.flat().length;

          return lines.map((lines): CmBroadcastGroupedSlide => {
            toLinei += lines.length;

            return {
              ord,
              blocki,
              lines,
              fromLinei: toLinei - lines.length,
              toLinei,
              preLinesCount,
            };
          });
        })
        .flat() ?? []
    );
  };

  groupTextLinesByKind = (
    slides: CmBroadcastGroupedSlide[],
    rule = this.broadcastPushKind,
  ): CmBroadcastSlideGrouperOrdWithListAndRule[] => {
    if (rule == null) return [];

    let str = '';
    let ordComb: CmBroadcastSlideGrouperOrdCombiner = {};

    if (mylib.isStr(rule)) str = rule;
    else if (mylib.isNum(rule)) str = cmComLineGroupingDefaultKinds[rule];
    else {
      if (mylib.isStr(rule.s)) str = rule.s;
      else str = cmComLineGroupingDefaultKinds[rule.n || 0];

      ordComb = rule.d;
    }

    if (!str) return [];

    const divDict: Record<string, string> = {};

    str.split(makeRegExp('/[ ,]+/')).forEach(str => {
      const [key, value] = str.split(':');

      if (!value) divDict[0] = key;
      else divDict[key] = value;
    });

    return slides.map(({ lines, ord }) => {
      const ordw = ord.wid;

      let defaultRule = 0;
      let defaultDict: CmBroadcastSlideGrouperOrdWithListAndRule | null = null;

      for (let i = lines.length; i >= 0; i--) {
        if (!divDict[i]) continue;

        defaultRule = +divDict[i];
        defaultDict = {
          ord,
          lines: this.divideLinesByRule(lines, +divDict[i]),
          rule: defaultRule,
          defaultRule,
        };

        break;
      }

      if (ordComb[ordw] != null)
        return {
          ord,
          lines: this.divideLinesByRule(lines, ordComb[ordw]),
          rule: ordComb[ordw],
          defaultRule,
        };

      if (divDict[`=${lines.length}`] != null) {
        const rule = +divDict[`=${lines.length}`];

        return {
          ord,
          lines: this.divideLinesByRule(lines, rule),
          rule,
          defaultRule,
        };
      }

      return defaultDict ?? { ord, lines: [lines], rule: 0, defaultRule };
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
