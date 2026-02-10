import React from 'react';
import { makeRegExp } from 'regexpert';
import { ICmComOrderLineProps } from '../model/line';
import '../style/StyledComLine.styler.scss';

export const CmComOrderLine = (props: ICmComOrderLineProps) => {
  const {
    chordedOrd,
    com,
    isJoinLetters,
    ord,
    ordi,
    textLine,
    textLinei,
    textLines,
    wordCount,
    words,
    positions,
    prevLinesCount,
    setWordClass,
    solidTextLinei,
    chordHardLevel,
    ...attrs
  } = props;

  const className = `composition-line line-num-${textLinei}`;

  if (!chordedOrd)
    return (
      <div
        {...attrs}
        className={className}
      >
        {words.map((word, wordi) => {
          return (
            <span
              key={wordi}
              className={setWordClass?.(props, wordi)}
              com-word-index={wordi}
            >
              {word && <span dangerouslySetInnerHTML={{ __html: word }} />}
              <span
                key={wordi + 100000}
                className={setWordClass?.(props, wordi)}
                com-word-index={wordi}
              >
                {' '}
              </span>
            </span>
          );
        })}
      </div>
    );

  const vowelPositions = com.getVowelPositions(textLine);
  let chordIndex = 0;
  let points = vowelPositions;

  const chordsLabels = ord.lineChordLabels(chordHardLevel, textLinei, ordi);
  const linePositions = new Set(positions ?? ord.positions?.[textLinei]);

  if (isJoinLetters !== false)
    points = vowelPositions.filter((lett, letti) => !letti || linePositions.has(letti) || textLine[lett].includes(' '));

  const isHasPre = linePositions.has(-1);

  let wordBitNodes: React.ReactNode[] = [];
  const wordsNodes: React.ReactNode[] = [];
  let wholeWordi = 0;

  const pushWordNode = (index: number, isAddSpaceWord: boolean) => {
    wordsNodes.push(
      <span
        key={index}
        whole-wordi={wholeWordi++}
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
    const firstTextBit = isFirst ? textLine.slice(0, index) : '';
    const isFirstAndChorded = isFirst && isHasPre && firstTextBit === '';
    const isLastAndChorded = isLast && linePositions.has(-2);
    const isChorded = linePositions.has(vowelPositions.indexOf(index));
    const chordLabel = isChorded ? chordsLabels[chordIndex++ - (isHasPre ? -1 : 0)] || undefined : undefined;

    const chord = makeTaktedChord(isFirstAndChorded ? chordsLabels[0] : chordLabel);
    if (isChorded || (isFirst && isHasPre)) usedChordi++;
    const pchord = isLastAndChorded || (isHasPre && isFirst) ? chordsLabels[chordsLabels.length - 1] : null;

    const baseTextBitOriginal = textLine.slice(index, points[indexi + 1]);

    let firstBitNode: React.ReactNode = firstTextBit !== '' && (
      <span
        key={indexi + 100000}
        com-letter-chorded={isHasPre ? 'pre' : undefined}
        dangerouslySetInnerHTML={{ __html: firstTextBit }}
        attr-chord={isHasPre ? makeTaktedChord(chordsLabels[0]) : undefined}
        attr-chordi={usedChordi < 0 ? undefined : usedChordi}
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

        inner = <span dangerouslySetInnerHTML={{ __html: baseTextBitOriginal }} />;
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
              dangerouslySetInnerHTML={{ __html: txt }}
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
      className={className}
    >
      {wordsNodes}
    </div>
  );
};

const consonantLettersStr = '[йцкнгшщзхъфвпрлджчсмтьб]';
const splitLettersReg = makeRegExp(`/([а-яё](?:${consonantLettersStr}(?=${consonantLettersStr}{2}))?[?!,.)-:;]?)/`);

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
          dangerouslySetInnerHTML={{ __html: letters[txti].slice(0, -1) }}
        />
      );
    else
      node = (
        <span
          dash-divider=""
          dangerouslySetInnerHTML={{ __html: letters[txti] }}
        />
      );

    letters[txti] = '';
    break;
  }

  return (
    <span dash-container="">
      {node}
      <span dangerouslySetInnerHTML={{ __html: letters.join('') }} />
    </span>
  );
};

const makeTaktedChord = (chord: string | und) =>
  chord?.endsWith('|') ? chord.slice(0, -1) : chord?.startsWith('|') ? chord.slice(1) : chord;

const includeEmptyOrUnd = (is: boolean | unknown) => (is ? '' : undefined);
