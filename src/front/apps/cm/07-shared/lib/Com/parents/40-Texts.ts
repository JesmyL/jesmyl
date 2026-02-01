import { CmComOrder } from '$cm/ext';
import { escapeRegExpSymbols, makeNamedRegExp, makeRegExp } from 'regexpert';
import { CmComAudioMarkPackTime, CmComOrderWid } from 'shared/api';
import { CmBroadcastMonolineSlide } from 'shared/model/cm/broadcast';
import { itIt } from 'shared/utils';
import { doubleQuotesStr, slavicLowerLettersStr } from 'shared/utils/cm/com/const';
import { makeCmComAudioMarkTitleEmptySelector } from '../../makeCmComAudioMarkTitleBySelector';
import { CmComChords } from './30-Chords';

export class CmComTexts extends CmComChords {
  get ordersWithFinalChordedOrd() {
    const orders = this.orders;
    if (orders == null || orders[orders.length - 1].texti == null) return orders;

    return orders.concat(
      new CmComOrder(
        {
          top: { w: CmComOrderWid.never, c: 0 },
          header: () =>
            makeCmComAudioMarkTitleEmptySelector('', [0, CmComAudioMarkPackTime.def], CmComAudioMarkPackTime.def),
        },
        this as never,
      ),
    );
  }

  makeExpandedSolidFragmentedSlides = (expandedSlides: CmBroadcastMonolineSlide[]): CmBroadcastMonolineSlide[] => {
    const wordsSumReduce = (sum: number, word: string) => sum + word.length;

    return expandedSlides
      .map(({ lines, ord, ...props }): CmBroadcastMonolineSlide[] => {
        return lines.map((line): CmBroadcastMonolineSlide => {
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

  makeExpandedSolidSlides = (): CmBroadcastMonolineSlide[][] => {
    let prevOrd: CmComOrder | null = null;
    let prevFromLinei = -1;

    const slides: CmBroadcastMonolineSlide[][] = [];

    this.makeExpandedSolidTextLines().forEach(slide => {
      if (slide.ord !== prevOrd || slide.fromLinei < prevFromLinei) slides.push([]);
      slides[slides.length - 1].push(slide);

      prevOrd = slide.ord;
      prevFromLinei = slide.fromLinei;
    });

    return slides;
  };

  static makeEachLineFirstLetterUpperCase = (lines: string[] | nil, firstLineLetterToUpperCase = true) => {
    if (lines == null) return [];
    if (!firstLineLetterToUpperCase) return lines;

    return lines
      .map(line => {
        if (line?.length) return `${line[0].toUpperCase()}${line.slice(1)}`;

        return line;
      })
      .filter(itIt);
  };

  makeExpandedSolidTextLines = (): CmBroadcastMonolineSlide[] => {
    try {
      const comOrders = this.ordersWithFinalChordedOrd;
      if (comOrders == null) return [];
      let totalLinei = -1;
      let blocki = -1;
      const headSolidOrders: CmComOrder[] = [];

      const heapText = comOrders
        .map(ord => {
          if (!ord.isVisible) return;

          const ordLines = (ord.isRealText() ? ord.repeatedText(undefined, false, false) : ord.me.header()).split('\n');

          if (!ord.me.isInherit) {
            blocki++;
            headSolidOrders.push(ord);
          }

          return ordLines
            .map(line => {
              totalLinei++;
              let prevVert = '';

              return line.split(makeRegExp('/ *((?:/+&nbsp;)? *[|]) */')).map(lineLn => {
                if (lineLn.trimEnd().endsWith('|')) {
                  prevVert = lineLn;
                  return '';
                }

                return lineLn && `\n${seperator}${blocki}${seperator}${totalLinei}${seperator}${prevVert}${lineLn}`;
              });
            })
            .flat()
            .join('\n');
        })
        .join('\n');

      const allRepeatedLines = this._replaceRepeats(heapText).split(makeRegExp('/\\s*\n\\s*/'));
      const slides: CmBroadcastMonolineSlide[] = [];

      for (let i = 0; i < allRepeatedLines.length; i++) {
        if (!allRepeatedLines[i]) continue;
        const [, blockiStr, totalLineiStr, line] = allRepeatedLines[i].split(seperator);
        const ord = headSolidOrders[+blockiStr];

        slides.push({
          lines: [line.trim().replace(makeRegExp('/\\s{2,}/'), ' ').replace(makeRegExp('/[|]+/g'), '')],
          ord,
          blocki: +blockiStr,
          fromLinei: +totalLineiStr,
          toLinei: +totalLineiStr + 1,
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

    const flagsReg = makeRegExp(
      `/(, ?)?((?:${escapedStartFlagContent})+)([\\w\\W]+?)((?:${escapedEndFlagContent})+)/g`,
    );
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
            flagedContent = flagedContent.replace(flagsReg, (_all, comma, start, content, end) => {
              start = start.slice(0, -startFlagContent.length);

              if (!start) return '';

              return `${comma ?? ''}${start}${content}${end.slice(0, -endFlagContent.length)}`;
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
  `/(?<lead>(^|\\n)${seperator}\\d+${seperator}\\d+${seperator})(?<before>.*?)(?<start>/+)(?:&nbsp;)?(?<content>[^\\\\/]*?)(?:&nbsp;)?(?<end>\\\\+)(?<endNl>\\n?)/g`,
);

const somePrep = `[.,:;!?${doubleQuotesStr}]*`;
const someRuBeat = `[${doubleQuotesStr}]*[${slavicLowerLettersStr}]{1,2}${somePrep}`;
const slavicLetter = `[${doubleQuotesStr}]*[${slavicLowerLettersStr}]+${somePrep}(?: \\d+|(?: [${slavicLowerLettersStr}—]{1,2}){1,2}$)?`;
const lineBeatsSplitReg = makeRegExp(
  `/([${slavicLowerLettersStr}]+-${slavicLetter})|(${someRuBeat} ${someRuBeat} ${slavicLetter})|(${someRuBeat} ${slavicLetter})|(${slavicLetter})|[ ]+/i`,
);
