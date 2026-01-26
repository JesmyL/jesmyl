import { mylib } from '#shared/lib/my-lib';
import { CmComOrder } from '$cm/ext';
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

type Lines2selfRulesDict = Record<
  number,
  {
    rulesCount: number;
    ownRulesCount: number;
    rulesSet: Set<number>;
    ruleKeysSet: Set<keyof CmBroadcastSlideGrouperOrdCombiner>;
  }
> | null;

const enum RuleKind {
  Own,
  Default,
  Equivalent,
}

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
    monolineSlides: CmBroadcastMonolineSlide[][],
    ruleKind: CmBroadcastSlideGrouperKind,
    isNeedCheckSelfRuleUnnecessarySetting?: boolean,
  ): CmBroadcastGroupedSlide[] => {
    if (ruleKind == null) return [];

    const lines2selfRulesDict: Lines2selfRulesDict = isNeedCheckSelfRuleUnnecessarySetting ? {} : null;

    let str = '';
    let blockOwnRuleDict: CmBroadcastSlideGrouperOrdCombiner = {};

    if (mylib.isStr(ruleKind)) str = ruleKind;
    else if (mylib.isNum(ruleKind)) str = cmComLineGroupingDefaultKinds[ruleKind];
    else {
      if (mylib.isStr(ruleKind.s)) str = ruleKind.s;
      else str = cmComLineGroupingDefaultKinds[ruleKind.n || 0];

      blockOwnRuleDict = ruleKind.d;
    }

    if (!str) return [];

    const divDict: Record<string, string> = {};
    const ordwRepeatCountDict: PRecord<CmComOrderWid, number> = {};

    str.split(makeRegExp('/[ ,]+/')).forEach(str => {
      const [key, value] = str.split(':');

      if (!value) divDict[0] = key;
      else divDict[key] = value;
    });

    return monolineSlides.map((monolineSlideGroups): CmBroadcastGroupedSlide => {
      const ord = monolineSlideGroups[0].ord;
      const ordw = ord.wid;

      ordwRepeatCountDict[ordw] ??= 0;
      ordwRepeatCountDict[ordw]++;

      const repeat = ordwRepeatCountDict[ordw] < 2 ? ('' as const) : (`/${ordwRepeatCountDict[ordw]}` as const);

      let defaultRule = 0;
      let defaultDict: CmBroadcastGroupedSlide | null = null;

      if (lines2selfRulesDict) {
        const linesLen = monolineSlideGroups.length;
        lines2selfRulesDict[linesLen] ??= {
          rulesSet: new Set(),
          ruleKeysSet: new Set(),
          rulesCount: 0,
          ownRulesCount: 0,
        };

        lines2selfRulesDict[linesLen].rulesCount++;
      }

      for (let i = monolineSlideGroups.length; i >= 0; i--) {
        if (!divDict[i]) continue;
        const { slides, linesLen } = this.divideLinesByRule(
          ord,
          repeat,
          monolineSlideGroups,
          +divDict[i],
          lines2selfRulesDict,
          RuleKind.Default,
        );

        defaultRule = +divDict[i];
        defaultDict = {
          linesLen,
          slides,
          ord,
          rule: defaultRule,
          defaultRule,
          repeat,
        };

        break;
      }

      const combKey = `${ordw}${repeat}` as const;

      if (blockOwnRuleDict[combKey] != null) {
        return {
          ord,
          ...this.divideLinesByRule(
            ord,
            repeat,
            monolineSlideGroups,
            blockOwnRuleDict[combKey],
            lines2selfRulesDict,
            RuleKind.Own,
          ),
          rule: blockOwnRuleDict[combKey],
          ownRule: blockOwnRuleDict[combKey],
          defaultRule,
          repeat,
        };
      }

      if (divDict[`=${monolineSlideGroups.length}`] != null) {
        const rule = +divDict[`=${monolineSlideGroups.length}`];
        const { slides, linesLen } = this.divideLinesByRule(
          ord,
          repeat,
          monolineSlideGroups,
          rule,
          lines2selfRulesDict,
          RuleKind.Equivalent,
        );

        return { linesLen, slides, ord, rule, defaultRule, repeat };
      }

      return (
        defaultDict ?? {
          ord,
          slides: [monolineSlideGroups],
          rule: 0,
          defaultRule,
          repeat,
          linesLen: monolineSlideGroups.length,
        }
      );
    });
  };

  private divideLinesByRule = (
    ord: CmComOrder,
    repeat: '' | `/${number}`,
    lines: CmBroadcastMonolineSlide[],
    rule: number,
    lines2selfRulesDict: Lines2selfRulesDict,
    ruleKind: RuleKind,
  ) => {
    const ruleStr = `${rule}`;
    const slides: CmBroadcastMonolineSlide[][] = [];

    let takeSameGroupKeys: (() => (keyof CmBroadcastSlideGrouperOrdCombiner)[] | null) | und;
    const linesLen = lines.length;

    if (ruleStr.length === 1) {
      for (; lines.length; ) {
        if (!+rule) {
          slides.push(lines);
          break;
        }

        slides.push(lines.slice(0, rule));
        lines = lines.slice(rule);
      }
    } else {
      let index = 0;

      for (; lines.length; ) {
        if (!+ruleStr[index]) {
          slides.push(lines);
          break;
        }

        slides.push(lines.slice(0, +ruleStr[index]));
        lines = lines.slice(+ruleStr[index]);

        index++;
        if (index >= ruleStr.length) index = 0;
      }
    }

    if (lines2selfRulesDict) {
      const linesSelfRulesHolder = lines2selfRulesDict[linesLen];

      if (ruleKind === RuleKind.Own) {
        linesSelfRulesHolder.ownRulesCount++;
        linesSelfRulesHolder.rulesSet.add(rule);
        linesSelfRulesHolder.ruleKeysSet.add(`${ord.wid}${repeat}`);
      }

      takeSameGroupKeys = () => {
        return linesSelfRulesHolder.rulesSet.size < 2 &&
          linesSelfRulesHolder.rulesCount > 1 &&
          linesSelfRulesHolder.rulesCount === linesSelfRulesHolder.ownRulesCount
          ? Array.from(linesSelfRulesHolder.ruleKeysSet)
          : null;
      };
    }

    return { slides, takeSameGroupKeys, linesLen };
  };
}
