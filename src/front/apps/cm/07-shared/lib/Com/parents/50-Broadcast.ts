import { mylib } from '#shared/lib/my-lib';
import { makeRegExp } from 'regexpert';
import { CmComOrderWid } from 'shared/api';
import { cmComLineGroupingDefaultKinds } from 'shared/const/cm/comLineGroupingKind';
import {
  CmBroadcastGroupedSlide,
  CmBroadcastMonolineSlide,
  CmBroadcastSlideGrouperKind,
  CmBroadcastSlideGrouperOrdCombiner,
} from 'shared/model/cm/broadcast';
import { CmComTexts } from './40-Texts';

export class CmComBroadcast extends CmComTexts {
  groupSlideListByKind = (groupedLines: CmBroadcastGroupedSlide[] | und): CmBroadcastMonolineSlide[] => {
    return (
      groupedLines
        ?.map(({ slides, ord }, blocki) => {
          return slides.map((slides): CmBroadcastMonolineSlide => {
            const slide = slides[0];

            return {
              ord,
              blocki,
              lines: slides.map(slide => slide.lines.join('/***/')),
              fromLinei: slide.fromLinei,
              toLinei: slide.fromLinei + slides.length,
            };
          });
        })
        .flat() ?? []
    );
  };

  groupSlideLinesByKind = (
    slides: CmBroadcastMonolineSlide[][],
    ruleKind: CmBroadcastSlideGrouperKind,
  ): CmBroadcastGroupedSlide[] => {
    if (ruleKind == null) return [];

    let str = '';
    let ordComb: CmBroadcastSlideGrouperOrdCombiner = {};

    if (mylib.isStr(ruleKind)) str = ruleKind;
    else if (mylib.isNum(ruleKind)) str = cmComLineGroupingDefaultKinds[ruleKind];
    else {
      if (mylib.isStr(ruleKind.s)) str = ruleKind.s;
      else str = cmComLineGroupingDefaultKinds[ruleKind.n || 0];

      ordComb = ruleKind.d;
    }

    if (!str) return [];

    const divDict: Record<string, string> = {};
    const ordwRepeatCountDict: PRecord<CmComOrderWid, number> = {};

    str.split(makeRegExp('/[ ,]+/')).forEach(str => {
      const [key, value] = str.split(':');

      if (!value) divDict[0] = key;
      else divDict[key] = value;
    });

    return slides.map((slideGroup): CmBroadcastGroupedSlide => {
      const ord = slideGroup[0].ord;
      const ordw = ord.wid;

      ordwRepeatCountDict[ordw] ??= 0;
      ordwRepeatCountDict[ordw]++;

      const repeat = ordwRepeatCountDict[ordw] < 2 ? ('' as const) : (`/${ordwRepeatCountDict[ordw]}` as const);

      let defaultRule = 0;
      let defaultDict: CmBroadcastGroupedSlide | null = null;

      for (let i = slideGroup.length; i >= 0; i--) {
        if (!divDict[i]) continue;

        defaultRule = +divDict[i];
        defaultDict = {
          ord,
          slides: this.divideLinesByRule(slideGroup, +divDict[i]),
          rule: defaultRule,
          defaultRule,
          repeat,
        };

        break;
      }

      const combKey = `${ordw}${repeat}` as const;

      if (ordComb[combKey] != null)
        return {
          ord,
          slides: this.divideLinesByRule(slideGroup, ordComb[combKey]),
          rule: ordComb[combKey],
          defaultRule,
          repeat,
        };

      if (divDict[`=${slideGroup.length}`] != null) {
        const rule = +divDict[`=${slideGroup.length}`];

        return {
          ord,
          slides: this.divideLinesByRule(slideGroup, rule),
          rule,
          defaultRule,
          repeat,
        };
      }

      return defaultDict ?? { ord, slides: [slideGroup], rule: 0, defaultRule, repeat };
    });
  };

  private divideLinesByRule = (lines: CmBroadcastMonolineSlide[], rule: number): CmBroadcastMonolineSlide[][] => {
    const ruleStr = `${rule}`;
    const newLines: CmBroadcastMonolineSlide[][] = [];

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
