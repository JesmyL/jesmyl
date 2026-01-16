import { CmComOrder } from '$cm/ext';
import { escapeRegExpSymbols, makeNamedRegExp, makeRegExp } from 'regexpert';
import { CmComOrderWid } from 'shared/api';
import { CmBroadcastGroupedSlide } from 'shared/model/cm/broadcast';
import { itIt } from 'shared/utils';
import { doubleQuotesStr, nbsp, slavicLowerLettersStr } from 'shared/utils/cm/com/const';
import { CmComChords } from './30-Chords';

export class CmComTexts extends CmComChords {
  takeSolidTextLines = (isAddLastSlideStars = false) => {
    const ordLines: CmBroadcastGroupedSlide[] = [];
    let isLastTextedLinei = 0;
    let blocki = -1;
    let toLinei = 0;
    let currentLinesCount = 0;

    this.orders?.forEach(ord => {
      if (!ord.isVisible) return;

      if (ord.me.isInherit) {
        const lastOrdLinesi = ordLines.length - 1;
        ordLines[lastOrdLinesi].lines = ordLines[lastOrdLinesi].lines.concat(ord.repeatedText().split('\n'));
        return;
      }

      const isRealText = ord.isRealText();
      const lines = isRealText ? ord.repeatedText().split('\n') : [ord.me.header()];

      const preLinesCount = currentLinesCount;
      currentLinesCount += lines.flat().length;

      blocki++;
      if (isRealText) isLastTextedLinei = blocki;

      toLinei += lines.length;

      ordLines.push({
        ord,
        blocki,
        lines,
        preLinesCount,
        fromLinei: toLinei - lines.length,
        toLinei,
      });
    });

    if (ordLines[isLastTextedLinei] == null) return ordLines;

    ordLines[isLastTextedLinei].isLastSlide = true;

    if (isAddLastSlideStars) {
      const list = ordLines[isLastTextedLinei].lines;
      list[list.length - 1] += `\n* * *`;
    }

    return ordLines;
  };

  makeExpandedSolidFragmentedSlides = (expandedSlides: CmBroadcastGroupedSlide[]): CmBroadcastGroupedSlide[] => {
    const wordsSumReduce = (sum: number, word: string) => sum + word.length;

    return expandedSlides
      .map(({ lines, ord, ...props }): CmBroadcastGroupedSlide[] => {
        return lines.map((line): CmBroadcastGroupedSlide => {
          const beats = line.split(lineBeatsSplitReg).filter(itIt);
          let minDiff = line.length;
          let minDiffi = 1;

          for (let i = 1; i < beats.length; i++) {
            const beforeCount = beats.slice(0, i).reduce(wordsSumReduce, 0);
            const afterCount = beats.slice(i).reduce(wordsSumReduce, 0);

            if (minDiff >= Math.abs(beforeCount - afterCount)) {
              minDiff = Math.abs(beforeCount - afterCount);
              minDiffi = i;
            }
          }

          return {
            lines: [beats.slice(0, minDiffi).join(' '), beats.slice(minDiffi).join(' ')],
            ord,
            ...props,
          };
        });
      })
      .flat();
  };

  makeExpandedSolidTextLines = (): CmBroadcastGroupedSlide[] => {
    try {
      const comOrders = this.orders;
      if (comOrders == null) return [];
      let totalLinei = 0;
      let blocki = -1;
      let blockLength = 0;
      const solidOrderLinesCountDict: PRecord<CmComOrderWid, number> = {};
      const headSolidOrders: CmComOrder[] = [];

      const heapText = comOrders
        .map(ord => {
          if (!ord.isVisible) return;

          const ordLines = (ord.isRealText() ? ord.repeatedText(undefined, false) : ord.me.header()).split('\n');

          if (!ord.me.isInherit) {
            solidOrderLinesCountDict[ord.wid] = blockLength;
            blocki++;
            headSolidOrders.push(ord);
          }

          blockLength += ordLines.length;

          return ordLines
            .map(line => `\n${seperator}${blocki}${seperator}${totalLinei++}${seperator}${line}`)
            .join('\n');
        })
        .join('\n')
        .replace(makeRegExp(`/${nbsp}/g`), '');

      const allRepeatedLines = this._replaceRepeats(heapText).split(makeRegExp('/\\s*\n\\s*/'));
      const slides: CmBroadcastGroupedSlide[] = [];

      for (let i = 0; i < allRepeatedLines.length; i++) {
        if (!allRepeatedLines[i]) continue;
        const [, blockiStr, totalLineiStr, line] = allRepeatedLines[i].split(seperator);
        const ord = headSolidOrders[+blockiStr];

        slides.push({
          lines: [line.trim().replace(makeRegExp('/\\s{2,}/'), ' ')],
          ord,
          blocki: +blockiStr,
          fromLinei: +totalLineiStr,
          toLinei: +totalLineiStr + 1,
          preLinesCount: solidOrderLinesCountDict[ord.wid] ?? 0,
        });
      }

      return slides;
    } catch (_e) {
      return [];
    }
  };

  private _replaceRepeats = (() => {
    const startFlagContent = '[*{';
    const endFlagContent = ']*}';

    const escapedStartFlagContent = escapeRegExpSymbols(startFlagContent);
    const escapedEndFlagContent = escapeRegExpSymbols(endFlagContent);

    const flagsReg = makeRegExp(`/((?:${escapedStartFlagContent})+)([\\w\\W]+?)((?:${escapedEndFlagContent})+)/g`);
    const startEndFlagReg = makeRegExp(`/${escapedStartFlagContent}|${escapedEndFlagContent}/g`);

    return (text: string) => {
      let isReplaced = false;

      do {
        isReplaced = false;

        text = text.replace(repeatsRegBox.regExp, (...args) => {
          const {
            lead,
            before: beforeContent,
            content,
            end: endSlashes,
            start: startSlashes,
            endNl,
          } = repeatsRegBox.transform(args);

          isReplaced = true;
          const leadMark = lead.trim();

          if (startSlashes.length !== endSlashes.length) {
            if (startSlashes.length + 1 === endSlashes.length) {
              return `\n${leadMark}${beforeContent}${startFlagContent.repeat(startSlashes.length + 1)}${content}${endFlagContent.repeat(startSlashes.length + 1)}${endSlashes}`;
            }

            throw '';
          }

          let repeatedContent = '';
          let flagedContent = content;
          const isNlStart = (!beforeContent && endNl) || content.includes('\n');

          for (let i = startSlashes.length; i > 0; i--) {
            flagedContent = flagedContent.replace(flagsReg, (_all, start, content, end) => {
              start = start.slice(0, -startFlagContent.length);

              if (!start) return '';

              return `${start}${content}${end.slice(0, -endFlagContent.length)}`;
            });

            repeatedContent += `${i !== startSlashes.length && isNlStart ? `\n${leadMark}` : ''}${flagedContent} `;
          }

          repeatedContent = repeatedContent.replace(startEndFlagReg, '');

          return `\n${leadMark}${beforeContent}${repeatedContent}${endNl}`;
        });
      } while (isReplaced);

      return text;
    };
  })();
}

const seperator = `#@>`;

const repeatsRegBox = makeNamedRegExp(
  // regexpert:
  // stringify $0
  `/(?<lead>(^|\\n)${seperator}\\d+${seperator}\\d+${seperator})(?<before>.*?)(?<start>/+)(?<content>[^\\\\/]*?)(?<end>\\\\+)(?<endNl>\\n?)/g`,
);

const somePrep = `[.,:;!?${doubleQuotesStr}]*`;
const someRuBeat = `[${doubleQuotesStr}]*[${slavicLowerLettersStr}]{1,2}${somePrep}`;
const slavicLetter = `[${doubleQuotesStr}]*[${slavicLowerLettersStr}]+${somePrep}(?: \\d+)?`;
const lineBeatsSplitReg = makeRegExp(
  `/([${slavicLowerLettersStr}]+-${slavicLetter})|(${someRuBeat} ${someRuBeat} ${slavicLetter})|(${someRuBeat} ${slavicLetter})|(${slavicLetter})|[ ]+/i`,
);
