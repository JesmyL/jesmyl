import { CmComOrder } from '$cm/ext';
import md5 from 'md5';
import { escapeRegExpSymbols, makeNamedRegExp, makeRegExp } from 'regexpert';
import { CmComAudioMarkPackTime, CmComOrderWid } from 'shared/api';
import { CmBroadcastMonolineSlide, CmBroadcastSlideLine } from 'shared/model/cm/broadcast';
import { capitalizeText, itIt } from 'shared/utils';
import { nbsp } from 'shared/utils/cm/com/const';
import { makeCmComAudioMarkTitleEmptySelector } from '../../makeCmComAudioMarkTitleBySelector';
import { CmComChords } from './30-Chords';

export class CmComTexts extends CmComChords {
  ordersWithFinalChordedOrd() {
    const orders = this.orders;
    if (orders == null || orders[orders.length - 1].texti == null) return orders;

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

  makeExpandGroupedLines = () => {
    let prevOrd: CmComOrder | null = null;
    let prevTotalLinei = -1;

    const slides: CmBroadcastSlideLine[][] = [];

    this.makeExpandLines().forEach(slide => {
      if (slide.ord !== prevOrd || slide.totalLinei < prevTotalLinei) slides.push([]);
      slides[slides.length - 1].push(slide);

      prevOrd = slide.ord;
      prevTotalLinei = slide.totalLinei;
    });

    return slides;
  };

  static prepareEachTextLine = (lines: string[] | nil, firstLineLetterToUpperCase = true) => {
    if (lines == null) return [];

    return firstLineLetterToUpperCase
      ? lines.map(line => (line?.length ? capitalizeText(line).replace(makeRegExp('/[|]/g'), '') : line)).filter(itIt)
      : lines;
  };

  makeExpandLines = () => {
    try {
      const comOrders = this.ordersWithFinalChordedOrd();
      if (comOrders == null) return [];
      let totalLinei = -1;
      let blocki = -1;
      const headSolidOrders: CmComOrder[] = [];

      const heapText = comOrders
        .map(ord => {
          if (!ord.isVisible) return;

          const ordLines = (ord.isRealText() ? ord.repeatedText(undefined, false, false) : ord.me.header()).split('\n');

          blocki++;
          headSolidOrders.push(ord);

          return ordLines
            .map(
              (line, linei) =>
                `\n${padStart(blocki)}${padStart(linei)}${padStart(linei)}${padStart(++totalLinei)}${line}`,
            )
            .flat()
            .join('\n');
        })
        .join('\n');

      const allRepeatedLines = this._expandRepeats(heapText).split(makeRegExp('/\\s*\n\\s*/'));
      const slides: CmBroadcastSlideLine[] = [];

      for (let i = 0; i < allRepeatedLines.length; i++) {
        const line = allRepeatedLines[i];
        if (!line) continue;
        const blocki = sliceDiapasoniNum(line, Diapasoni.Block);

        slides.push({
          line: sliceClearHeapLine(line),
          ord: headSolidOrders[blocki],
          totalLinei: sliceDiapasoniNum(line, Diapasoni.TotalLine),
          ordLinei: sliceDiapasoniNum(line, Diapasoni.Line),
          selfLinei: sliceDiapasoniNum(line, Diapasoni.SelfLine),
          blocki,
        });
      }

      let prevBlocki: number;
      let prevLinei: number;

      return slides.map(slide => {
        if (prevBlocki !== slide.blocki) prevLinei = 0;
        prevBlocki = slide.blocki;

        slide.selfLinei = prevLinei++;
        return slide;
      });
    } catch (_e) {
      return [];
    }
  };

  makeExpandSlides = (expandLines: CmBroadcastSlideLine[] = this.makeExpandLines()) => {
    const slides: CmBroadcastMonolineSlide[] = [];
    let prevSlide: CmBroadcastMonolineSlide | nil;
    let prevOrdLinei: number;
    let prevInitWordi: number;
    let isPrevChordedSlide = false;

    expandLines.forEach(({ line, ord, ordLinei, totalLinei, selfLinei }) => {
      const lineWords = line.split(' ');
      let prevWordi = 0;

      const fillSlide = () => {
        prevInitWordi = 0;

        prevSlide = {
          lines: [],
          ord,
          fromLinei: totalLinei,
          toLinei: totalLinei,
          textHash: '',
        };

        slides.push(prevSlide);

        return prevSlide;
      };

      if (!ord.isRealText()) {
        fillSlide().lines = lineWords;
        isPrevChordedSlide = true;
        return;
      }
      if (isPrevChordedSlide) fillSlide();

      isPrevChordedSlide = false;

      const { currentSet } = this.makeNewlinerSet(ord, ordLinei, selfLinei);
      currentSet.add(lineWords.length + 10);
      if (prevOrdLinei > ordLinei) prevSlide = fillSlide();
      prevOrdLinei = ordLinei;

      currentSet.forEach(initWordi => {
        if (prevInitWordi < 0 || !prevSlide) prevSlide = fillSlide();
        prevInitWordi = initWordi;

        const wordi = Math.abs(initWordi) - 1;
        if (!wordi) return;

        prevSlide.toLinei = totalLinei + 1;
        prevSlide.lines.push(lineWords.slice(prevWordi, wordi).join(' '));
        prevWordi = wordi;
      });
    });

    const fullSlides = slides.filter(({ lines }) => lines.length);

    for (let fullSlidei = fullSlides.length - 1; fullSlidei >= 0; fullSlidei--) {
      const fullSlide = fullSlides[fullSlidei];
      if (!fullSlide) continue;
      fullSlide.textHash = md5(fullSlide.lines.join('\n'));

      const nextFullSlide = fullSlides[fullSlidei + 1];

      if (nextFullSlide?.textHash === fullSlide.textHash) {
        fullSlide.repeats = (nextFullSlide.repeats ??= 1) + 1;
        nextFullSlide.lines = [];
      }

      if (fullSlide.repeats) {
        const lines = fullSlide.lines;

        if (lines[0]) {
          lines[0] = `${'/'.repeat(fullSlide.repeats)}${nbsp}${lines[0]}`;
        }
        const last = lines.length - 1;
        if (lines[last]) {
          lines[last] = `${lines[last]}${nbsp}${'\\'.repeat(fullSlide.repeats)}`;
        }
      }
    }

    return fullSlides.filter(({ lines }) => lines.length);
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
            const startRepeat = startSlashes.length + 1;

            return `\n${leadMark}${beforeContent}${startFlagContent.repeat(startRepeat)}${content}${endFlagContent.repeat(startRepeat)}${endSlashes}`;
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

const enum Diapasoni {
  Block = 0,
  Line = 1,
  SelfLine = 2,
  TotalLine = 3,
  Last,
}

const enum StartDigits {
  it = 5,
}

const digitDiapasons = [
  StartDigits.it * Diapasoni.Block,
  StartDigits.it * Diapasoni.Line,
  StartDigits.it * Diapasoni.SelfLine,
  StartDigits.it * Diapasoni.TotalLine,
  StartDigits.it * Diapasoni.Last,
] as const;

const padStart = (num: number) => `${num}`.padStart(StartDigits.it, '0');
const allStartDigits = digitDiapasons[Diapasoni.Last];

const sliceDiapasoniNum = (line: string | nil, diapasoni: Diapasoni) =>
  +(line?.slice(digitDiapasons[diapasoni], digitDiapasons[diapasoni + 1]) || 0);

const sliceClearHeapLine = (line: string | nil) => line?.slice(allStartDigits) || '';

const repeatsRegBox = makeNamedRegExp(
  // regexpert:
  // stringify $0
  `/(?<lead>(^|\\n)\\d{${allStartDigits}})(?<before>.*?)(?<start>/+)(?:&nbsp;)?(?<content>[^\\\\/]*?)(?:&nbsp;)?(?<end>\\\\+)(?<endNl>\\n?)/g`,
);
