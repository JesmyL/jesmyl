import React from 'react';
import { makeRegExp } from 'regexpert';
import { CmComTextSquareBracketsMode } from 'shared/api';
import { makeCmComTextInnerHtmlProp, ruConsonantLettersStr, ruLowerLettersStr } from 'shared/utils/cm/com/const';
import { squareBracketsReplacers } from 'shared/utils/cm/com/takeTextBlockIncorrects';
import { ICmComOrderLineAsComponentProps } from '../model/line';
import '../style/StyledComLine.styler.scss';

export const CmComOrderLine = (props: ICmComOrderLineAsComponentProps) => {
  const {
    chordedOrd,
    com,
    isJoinLetters,
    ord,
    ordi,
    line: textLine,
    linei,
    linesLen,
    wordCount,
    words,
    positions,
    prevLinesCount,
    setWordClass,
    solidLinei: solidTextLinei,
    chordHardLevel,
    ...attrs
  } = props;

  const line = textLine.includes(']')
    ? squareBracketsReplacers[CmComTextSquareBracketsMode.BrBrackets](textLine)
    : textLine;

  if (!chordedOrd)
    return (
      <div
        {...attrs}
        ord-linei={linei}
      >
        {words.map((word, wordi) => {
          return (
            <span
              key={wordi}
              className={setWordClass?.(props, wordi)}
              line-wordi={wordi}
            >
              {word && <span {...makeCmComTextInnerHtmlProp(word)} />}{' '}
            </span>
          );
        })}
      </div>
    );

  const vowelPositions = com.getVowelPositions(line);
  let chordIndex = 0;
  let points = vowelPositions;

  const chordsLabels = ord.lineChordLabels(chordHardLevel, linei, ordi);
  const linePositions = new Set(positions ?? ord.positions?.[linei]);

  if (isJoinLetters !== false)
    points = vowelPositions.filter((lett, letti) => !letti || linePositions.has(letti) || line[lett].includes(' '));

  const isHasPre = linePositions.has(-1);

  let wordBitNodes: React.ReactNode[] = [];
  const wordsNodes: React.ReactNode[] = [];
  let wholeWordi = 0;

  const pushWordNode = (index: number, isAddSpaceWord: boolean) => {
    wordsNodes.push(
      <span
        key={index}
        line-wordi={wholeWordi++}
        com-letter-index={isAddSpaceWord ? index : undefined}
      >
        {wordBitNodes}
      </span>,
      isAddSpaceWord && ' ',
    );
    wordBitNodes = [];
    usedChordi = -1;
  };

  let usedChordi = -1;

  for (let indexi = 0; indexi < points.length; indexi++) {
    const index = points[indexi];
    const isLast = indexi === points.length - 1;
    const isFirst = indexi === 0;
    const firstTextBit = isFirst ? line.slice(0, index) : '';
    const isFirstAndChorded = isFirst && isHasPre && firstTextBit === '';
    const isLastAndChorded = isLast && linePositions.has(-2);
    const isChorded = linePositions.has(vowelPositions.indexOf(index));
    const chordLabel = isChorded ? chordsLabels[chordIndex++ - (isHasPre ? -1 : 0)] || undefined : undefined;

    const chord = makeTaktedChord(isFirstAndChorded ? chordsLabels[0] : chordLabel);
    if ((isChorded && !firstTextBit) || (isFirst && isHasPre)) usedChordi++;
    const pchord = isLastAndChorded || (isHasPre && isFirst) ? chordsLabels[chordsLabels.length - 1] : null;

    const baseTextBitOriginal = line.slice(index, points[indexi + 1]);

    let firstBitNode: React.ReactNode = firstTextBit !== '' && (
      <span
        key={indexi + 100000}
        com-letter-chorded={isHasPre ? 'pre' : undefined}
        attr-chord={isHasPre ? makeTaktedChord(chordsLabels[0]) : undefined}
        attr-chordi={usedChordi < 0 ? undefined : usedChordi}
        {...makeCmComTextInnerHtmlProp(firstTextBit)}
      />
    );

    if (baseTextBitOriginal.startsWith(' ')) {
      pushWordNode(indexi, true);

      if (firstTextBit !== '') {
        wordBitNodes.push(firstBitNode, ' ');
        firstBitNode = null;
      }
    }

    const isSpaced = includeEmptyOrUnd(baseTextBitOriginal === ' ');
    const chordedState =
      isChorded || isFirstAndChorded || isLastAndChorded
        ? isLastAndChorded
          ? 'post'
          : isFirstAndChorded
            ? 'pre'
            : ''
        : undefined;

    if (isChorded && ((isSpaced === '' && chordedState === '') || firstBitNode)) usedChordi++;

    let nodeInner;

    if (isChorded || isLastAndChorded) {
      let inner;

      if (chord === undefined || chord.length < baseTextBitOriginal.length) {
        if (isChorded && usedChordi < 0) usedChordi++;

        inner = <span {...makeCmComTextInnerHtmlProp(baseTextBitOriginal)} />;
      } else inner = insertDividedBits(baseTextBitOriginal);

      nodeInner = (
        <span
          word-fragment=""
          attr-chord={chord}
          attr-pchord={isHasPre && isFirst && firstTextBit ? undefined : pchord}
        >
          {inner}
        </span>
      );
    } else {
      nodeInner = baseTextBitOriginal.split(makeRegExp('/ +/g')).map((txt, txti) => {
        return (
          txt && (
            <span
              key={txti}
              {...makeCmComTextInnerHtmlProp(txt)}
            />
          )
        );
      });
    }

    const node = (
      <span
        key={indexi}
        attr-chord={chord}
        attr-chordi={!isChorded || usedChordi < 0 ? undefined : usedChordi}
        attr-pchord={pchord}
        com-letter-index={indexi}
        com-letter-space-word={isSpaced}
        com-letter-spaced-word={includeEmptyOrUnd(baseTextBitOriginal.match(makeRegExp('/ /')))}
        com-letter-chorded={chordedState}
      >
        {nodeInner}
      </span>
    );

    wordBitNodes.push(
      firstBitNode ? (
        <React.Fragment key={indexi}>
          {firstBitNode}
          {node}
        </React.Fragment>
      ) : (
        node
      ),
    );

    if (points.length - 1 === indexi) {
      pushWordNode(indexi + 1, false);
    }
  }

  return (
    <div
      {...attrs}
      ord-linei={linei}
    >
      {wordsNodes}
    </div>
  );
};

const splitLettersReg = makeRegExp(
  `/([${ruLowerLettersStr}](?:[${ruConsonantLettersStr}](?=[${ruConsonantLettersStr}]{2}))?[?!,.)-:;]?)/`,
);

const insertDividedBits = (lettersText: string) => {
  const letters = lettersText.split(splitLettersReg);
  let node: React.ReactNode = null;

  for (let txti = 0; txti < letters.length; txti++) {
    if (letters[txti] === ' ') break;
    if (letters[txti] === '') continue;

    if (letters[txti].endsWith('-'))
      node = (
        <span
          dash-divider="-"
          {...makeCmComTextInnerHtmlProp(letters[txti].slice(0, -1))}
        />
      );
    else
      node = (
        <span
          dash-divider=""
          {...makeCmComTextInnerHtmlProp(letters[txti])}
        />
      );

    letters[txti] = '';
    break;
  }

  return (
    <span dash-container="">
      {node}
      <span {...makeCmComTextInnerHtmlProp(letters.join(''))} />
    </span>
  );
};

const makeTaktedChord = (chord: string | und) =>
  chord?.endsWith('|') ? chord.slice(0, -1) : chord?.startsWith('|') ? chord.slice(1) : chord;

const includeEmptyOrUnd = (is: boolean | unknown) => (is ? '' : undefined);
