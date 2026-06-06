import md5 from 'md5';
import { escapeRegExpSymbols, makeNamedRegExp, makeRegExp } from 'regexpert';
import { CmComAudioMarkPackTime, CmComOrderWid } from 'shared/api';
import { makeCmComAudioMarkTitleEmptySelector } from 'shared/const/cm/order/makeCmComAudioMarkTitleBySelector';
import { defaultTextCase } from 'shared/const/textCase';
import { CmBroadcastMonolineSlide, CmBroadcastSlideLine } from 'shared/model/cm/broadcast';
import { TextCase } from 'shared/model/common';
import { capitalizeSlavicText, itIt } from 'shared/utils';
import { checkIsString } from 'shared/utils/checkIs';
import { doubleQuotesStr, nbsp, slavicLowerLettersStr } from 'shared/utils/cm/com/const';
import { makeCmBroadcastMonolineSlideOrdLineId } from 'shared/utils/cm/com/makeCmBroadcastMonolineSlideOrdId';
import { takeTextBlockWithoutSquareBracketsContent } from 'shared/utils/cm/com/takeTextBlockIncorrects';
import { CmComOrder } from '../../order/Order';
import { CmComChords } from './30-Chords';

export class CmComTexts extends CmComChords {
  ordersWithFinalChordedOrd(isFinalChordedOrd: boolean) {
    const orders = this.orders;
    if (!isFinalChordedOrd || !orders?.at(-1)?.isRealText()) return orders ?? [];

    return orders.concat(
      new CmComOrder(
        {
          top: { w: CmComOrderWid.never, c: 0 },
          header: () =>
            makeCmComAudioMarkTitleEmptySelector(
              '',
              [0, CmComAudioMarkPackTime.def],
              CmComAudioMarkPackTime.def,
              this.langi,
            ),
        },
        this as never,
      ),
    );
  }

  makeExpandGroupedLines = (isFinalChordedOrd: boolean) => {
    let prevOrd: CmComOrder | null = null;
    let prevTotalLinei = -1;

    const slides: CmBroadcastSlideLine[][] = [];

    this.makeExpandLines(isFinalChordedOrd).forEach(slide => {
      if ((slide.ord !== prevOrd || slide.totalLinei < prevTotalLinei) && !slide.ord.isAnyInherited) slides.push([]);
      slides.at(-1)?.push(slide);

      prevOrd = slide.ord;
      prevTotalLinei = slide.totalLinei;
    });

    return slides;
  };

  static prepareEachTextLine = (() => {
    const preps = '.!?';
    const prepsSet = new Set(preps);
    const str = `/([|])|((?:[${doubleQuotesStr}]|[${preps}] |^—${nbsp})[${slavicLowerLettersStr}])/gi` as const;
    const reg = makeRegExp(str);
    const rep: StringReplacer = (all, $1, $2) =>
      $1 ? '' : checkIsString($2) ? $2.slice(0, -1) + $2.slice(-1).toUpperCase() : all;
    const mappers: Record<TextCase, (line: string) => string> = {
      [TextCase.Capitalize]: capitalizeSlavicText,
      [TextCase.Uppercase]: line => line.toUpperCase(),
      [TextCase.AsIs]: itIt,
    };

    return (lines: string[] | nil, textCase: TextCase | nil) => {
      if (!lines?.length) return [];
      const map = mappers[textCase ?? defaultTextCase];
      let lastSymbol = '';

      return lines.filter(itIt).map((line, linei) => {
        const result = (!linei || prepsSet.has(lastSymbol) ? capitalizeSlavicText : map)(
          takeTextBlockWithoutSquareBracketsContent(line),
        ).replace(reg, rep);
        lastSymbol = line.slice(-1);
        return result;
      });
    };
  })();

  makeExpandLines = (isFinalChordedOrd: boolean) => {
    try {
      const comOrders = this.ordersWithFinalChordedOrd(isFinalChordedOrd);
      let totalLinei = -1;
      let blocki = -1;
      const headSolidOrders: CmComOrder[] = [];

      const heapText = comOrders
        .map(ord => {
          if (!ord.isVisible) return;

          const ordLines = (ord.isRealText() ? ord.repeatedText(undefined, false) : ord.me.header()).split('\n');

          blocki++;
          headSolidOrders.push(ord);

          return ordLines
            .map(
              (line, linei) => `\n${padStart(blocki)}${padStart(linei)}${padStart(0)}${padStart(++totalLinei)}${line}`,
            )
            .flat()
            .join('\n');
        })
        .join('\n');

      const allRepeatedLines = this._expandRepeats(heapText).split('\n');
      const slides: CmBroadcastSlideLine[] = [];

      for (let linei = 0; linei < allRepeatedLines.length; linei++) {
        const line = allRepeatedLines.at(linei)?.trim();
        if (!line) continue;
        const blocki = sliceDiapasoniNum(line, Diapasoni.Block);

        slides.push({
          line: sliceClearHeapLine(line),
          ord: headSolidOrders[blocki],
          totalLinei: sliceDiapasoniNum(line, Diapasoni.TotalLine),
          linei: sliceDiapasoniNum(line, Diapasoni.Line),
          repeati: sliceDiapasoniNum(line, Diapasoni.Repeat),
          blocki,
        });
      }

      return slides;
    } catch (_e) {
      return [];
    }
  };

  makeExpandSlides = (
    isFinalChordedOrd: boolean,
    expandLines: CmBroadcastSlideLine[] = this.makeExpandLines(isFinalChordedOrd),
  ) => {
    let slides: CmBroadcastMonolineSlide[] = [];
    let prevSlide: CmBroadcastMonolineSlide | nil;
    let prevOrdLinei: number;
    let prevOrdw: CmComOrderWid;
    let prevInitWordi: number;
    let isPrevChordedSlide = false;
    const filterFullSlides = () => slides.filter(({ lines }) => lines.length);

    expandLines.forEach(({ line, ord, linei, totalLinei, repeati }) => {
      const lineWords = line.split(' ');
      let prevWordi = 0;

      const fillSlide = () => {
        prevInitWordi = 0;
        const zeroSameId = makeCmBroadcastMonolineSlideOrdLineId(ord.wid, linei, repeati, 0);
        const samei = prevSlide?.lines.length && prevSlide?._id === zeroSameId ? (prevSlide?.samei ?? 0) + 1 : 0;
        const id = makeCmBroadcastMonolineSlideOrdLineId(ord.wid, linei, repeati, samei);

        prevSlide = {
          id,
          ids: new Set([id]),
          lines: [],
          ord,
          linei,
          repeati,
          samei,
          fromLinei: totalLinei,
          toLinei: totalLinei + 1,
          _textHash: '',
          _id: zeroSameId,
        };

        slides.push(prevSlide);

        return prevSlide;
      };

      if (!ord.isRealText()) {
        fillSlide().lines = lineWords;
        isPrevChordedSlide = true;
        return;
      }

      if (
        //
        isPrevChordedSlide ||
        ((prevOrdLinei > linei || prevOrdw !== ord.wid) && !ord.isAnyInherited)
      )
        fillSlide();

      isPrevChordedSlide = false;
      prevOrdw = ord.wid;
      prevOrdLinei = linei;

      let samei = 0;
      const { currentSet } = this.makeNewlinerSet(ord, linei, repeati);
      currentSet.add(lineWords.length + 10);

      currentSet.forEach(initWordi => {
        if (prevInitWordi < 0 || !prevSlide) prevSlide = fillSlide();
        prevInitWordi = initWordi;

        const wordi = Math.abs(initWordi) - 1;
        if (!wordi) return;

        const line = lineWords.slice(prevWordi, wordi).join(' ').trim();
        prevWordi = wordi;

        if (line) {
          prevSlide.toLinei = totalLinei + 1;
          prevSlide.lines.push(line);
          prevSlide.ids.add(makeCmBroadcastMonolineSlideOrdLineId(ord.wid, linei, repeati, samei++));
        }
      });
    });

    slides = filterFullSlides();

    for (let slidei = slides.length - 1; slidei >= 0; slidei--) {
      const slide = slides[slidei];
      if (!slide) continue;
      slide._textHash = md5(slide.lines.join('\n'));

      const nextSlide = slides[slidei + 1];

      if (nextSlide?._textHash === slide._textHash) {
        slide.repeats = (nextSlide.repeats ??= 1) + 1;
        nextSlide.lines = [];
      }

      if (slide.repeats) {
        const lines = slide.lines;

        if (lines[0]) {
          lines[0] = `${'/'.repeat(slide.repeats)}${nbsp}${lines[0]}`;
        }
        const lasti = lines.findLastIndex(itIt);

        if (lines[lasti]) {
          lines[lasti] = `${lines[lasti]}${nbsp}${'\\'.repeat(slide.repeats)}`;
        }
      }
    }

    return filterFullSlides();
  };

  private _expandRepeats = (() => {
    const startFlagContent = '[*{' as const;
    const endFlagContent = ']*}' as const;

    const escapedStartFlagContent = escapeRegExpSymbols(startFlagContent);
    const escapedEndFlagContent = escapeRegExpSymbols(endFlagContent);

    const flagsReg = makeRegExp(
      `/(, ?)?((?:${escapedStartFlagContent})+)([\\w\\W]+?)((?:${escapedEndFlagContent})+)/g`,
    );
    const startEndFlagReg = makeRegExp(`/${escapedStartFlagContent}|${escapedEndFlagContent}/g`);

    return (text: string) => {
      let isReplaced = false;
      text = `${text}\n`;

      do {
        isReplaced = false;

        text = text.replace(repeatsRegBox.regExp, (...args) => {
          isReplaced = true;

          const {
            lead,
            before: beforeContent,
            content,
            end: endSlashes,
            start: startSlashes,
            endNl,
          } = repeatsRegBox.transform(args);
          const leadMark = lead.trim();

          if (startSlashes.length !== endSlashes.length) {
            const startRepeat = startSlashes.length + 1;

            return `\n${leadMark}${beforeContent}${startFlagContent.repeat(startRepeat)}${content}${endFlagContent.repeat(startRepeat)}${endSlashes}`;
          }

          let repeatedContent = '';
          let flagedContent = content;
          const isNlStart = (!beforeContent && endNl) || content.includes('\n');

          for (let i = startSlashes.length; i > 0; i--) {
            flagedContent = flagedContent.replace(flagsReg, (_all, comma, start, content, end) => {
              start = start.slice(0, -startFlagContent.length);

              return !start || !content
                ? ''
                : `${comma ?? ''}${start}${content}${end.slice(0, -endFlagContent.length)}`;
            });
            const repeati = sliceDiapasoniNum(leadMark, Diapasoni.Repeat) + Math.abs(i - startSlashes.length);

            flagedContent = flagedContent
              .split(makeRegExp('/\\n+/'))
              .map((line, linei) =>
                linei
                  ? setDiapasoniNum(line, Diapasoni.Repeat, repeati + sliceDiapasoniNum(line, Diapasoni.Repeat))
                  : line,
              )
              .join('\n');
            const before =
              i !== startSlashes.length && isNlStart ? `\n${setDiapasoniNum(leadMark, Diapasoni.Repeat, repeati)}` : '';

            repeatedContent += `${before}${flagedContent} `;
          }

          repeatedContent = repeatedContent.replace(startEndFlagReg, '');

          return `\n${leadMark}${beforeContent}${repeatedContent.trim()}${endNl}`;
        });
      } while (isReplaced);

      return text;
    };
  })();
}

const enum Diapasoni {
  Block = 0,
  Line = 1,
  Repeat = 2,
  TotalLine = 3,
  Last,
}

const enum StartDigits {
  it = 5,
}

const digitDiapasons = [
  StartDigits.it * Diapasoni.Block,
  StartDigits.it * Diapasoni.Line,
  StartDigits.it * Diapasoni.Repeat,
  StartDigits.it * Diapasoni.TotalLine,
  StartDigits.it * Diapasoni.Last,
] as const;

const padStart = (num: number) => `${num}`.padStart(StartDigits.it, '0');
const allStartDigits = digitDiapasons[Diapasoni.Last];

const sliceDiapasoniNum = (line: string | nil, diapasoni: Diapasoni) =>
  +(line?.slice(digitDiapasons[diapasoni], digitDiapasons[diapasoni + 1]) || 0);

const setDiapasoniNum = (line: string, diapasoni: Diapasoni, num: number) => {
  return `${line.slice(0, digitDiapasons[diapasoni])}${padStart(num)}${line.slice(digitDiapasons[diapasoni + 1])}`;
};

const sliceClearHeapLine = (line: string | nil) => line?.slice(allStartDigits) || '';

const repeatsRegBox = makeNamedRegExp(
  // regexpert:
  // stringify $0
  `/(?<lead>(^|\\n)\\d{${allStartDigits}})(?<before>.*?)(?<start>/+)(?:&nbsp;)?(?<content>[^\\\\/]*?)(?:&nbsp;)?(?<end>\\\\+)(?<endNl>\\n?)/g`,
);
