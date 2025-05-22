import { cmChordHardLevelAtom } from '$cm/atoms';
import { useAtomValue } from 'atomaric';
import React, { ReactNode } from 'react';
import { makeRegExp } from 'regexpert';
import { IComLineProps } from '../order/Order.model';
import { StyledComLine } from './StyledComLine';

export function ComLine(props: IComLineProps) {
  const className = `composition-line line-num-${props.textLinei}`;
  const chordHardLevel = useAtomValue(cmChordHardLevelAtom);

  if (!props.chordedOrd)
    return (
      <StyledComLine
        className={className}
        onClick={props.onClick}
      >
        {props.words.map((word, wordi) => {
          return (
            <span
              key={wordi}
              className={`com-word wordi_${wordi} ${props.setWordClass?.(props, wordi) ?? ''}`}
            >
              {word && <span dangerouslySetInnerHTML={{ __html: word }} />}
              <span
                key={wordi + 100000}
                className={`com-word wordi_${wordi} ${props.setWordClass?.(props, wordi) ?? ''}`}
              >
                {' '}
              </span>
            </span>
          );
        })}
      </StyledComLine>
    );

  const vowelPositions = props.com.getVowelPositions(props.textLine);
  let chordIndex = 0;
  let points = vowelPositions;

  const chordsLabels = props.ord.lineChordLabels(chordHardLevel, props.textLinei, props.ordi);
  const linePositions = props.positions ?? props.ord.positions?.[props.textLinei] ?? [];

  if (props.isJoinLetters !== false)
    points = vowelPositions.filter(
      (lett, letti) => !letti || linePositions.includes(letti) || props.textLine[lett].match(makeRegExp('/ /')),
    );

  const isHasPre = linePositions.includes(-1);
  const isHasPost = linePositions.includes(-2);

  let wordBitNodes: ReactNode[] = [];
  const wordsNodes: ReactNode[] = [];
  const pushWordNode = (index: number, isAddSpaceWord: boolean) => {
    wordsNodes.push(
      <span
        key={index}
        className="nowrap whole-word"
      >
        {wordBitNodes}
      </span>,
      isAddSpaceWord && (
        <span
          key={`other-index-${index}`}
          className={`com-letter space-word letteri_${index} ${props.setWordClass === undefined ? '' : props.setWordClass(props, index)}`}
        >
          {' '}
        </span>
      ),
    );
    wordBitNodes = [];
  };

  points.forEach((index, indexi, indexa) => {
    const isLast = indexi === indexa.length - 1;
    const firstTextBit = indexi === 0 ? props.textLine.slice(0, index) : '';
    const isChordedFirst = indexi === 0 && isHasPre && firstTextBit === '';
    const isChordedLast = isLast && isHasPost;
    const isChorded = linePositions.includes(vowelPositions.indexOf(index));
    const chordLabel = isChorded ? chordsLabels[chordIndex++ - (isHasPre ? -1 : 0)] || undefined : undefined;

    const chord = isChordedFirst ? chordsLabels[0] : chordLabel;
    const pchord = isLast && isHasPost ? chordsLabels[chordsLabels.length - 1] : null;

    const baseTextBitOriginal = props.textLine.slice(index, indexa[indexi + 1]);
    // const origWords = baseTextBitOriginal.split(makeRegExp('/ +/g')); // /([а-яё])/

    let firstBitNode: ReactNode = firstTextBit !== '' && (
      <span
        className={isHasPre ? 'chorded pre' : undefined}
        dangerouslySetInnerHTML={{ __html: firstTextBit }}
        attr-chord={isHasPre ? chordsLabels[0] : undefined}
      />
    );

    if (baseTextBitOriginal.startsWith(' ')) {
      pushWordNode(indexi, true);

      if (firstTextBit !== '') {
        wordBitNodes.push(<React.Fragment key={indexi + 100000}>{firstBitNode}</React.Fragment>, ' ');
        firstBitNode = null;
      }
    }

    const node = (
      <React.Fragment key={indexi}>
        {firstBitNode}
        <span
          attr-chord={chord}
          attr-pchord={pchord}
          className={
            `com-letter letteri_${indexi}` +
            (isChorded || isChordedFirst || isChordedLast ? ' chorded' : '') +
            (isChordedLast ? ' post' : '') +
            (isChordedFirst ? ' pre' : '') +
            (baseTextBitOriginal.match(makeRegExp('/ /')) ? ' spaced-word' : '') +
            (baseTextBitOriginal === ' ' ? ' space-word' : '') +
            (isChorded && isLast && isHasPost ? ' twice' : '')
          }
        >
          {isChorded || isChordedLast ? (
            <span
              className="fragment"
              attr-chord={chord}
              attr-pchord={pchord}
            >
              {insertDividedBits(baseTextBitOriginal, chord)}
            </span>
          ) : (
            baseTextBitOriginal.split(makeRegExp('/ +/g')).map((txt, txti) => {
              return (
                <React.Fragment key={txti}>{txt && <span dangerouslySetInnerHTML={{ __html: txt }} />}</React.Fragment>
              );
            })
          )}
        </span>
      </React.Fragment>
    );

    wordBitNodes.push(node);

    if (indexa.length - 1 === indexi) pushWordNode(indexi + 1, false);
  });

  return (
    <StyledComLine
      className={className}
      onClick={props.onClick}
    >
      {wordsNodes}
    </StyledComLine>
  );
}

const consonantLettersStr = '[йцкнгшщзхъфвпрлджчсмтьб]';
const splitLettersReg = makeRegExp(`/([а-яё](?:${consonantLettersStr}(?=${consonantLettersStr}{2}))?[?!,.)-:;]?)/`);

const insertDividedBits = (lettersText: string, chord: string | und) => {
  if (chord == null || chord.length < lettersText.length)
    return <span dangerouslySetInnerHTML={{ __html: lettersText }} />;

  const text = lettersText.split(splitLettersReg);
  const nodes = [];

  for (let txti = 0; txti < text.length; txti++) {
    if (text[txti] === ' ') break;
    if (text[txti] === '') continue;

    nodes.push(
      <span
        key={0}
        dangerouslySetInnerHTML={{
          __html: text[txti][text[txti].length - 1] === '-' ? text[txti].slice(0, -1) : text[txti],
        }}
      />,
      <span
        key={1}
        dash-divider=""
      />,
    );

    text[txti] = '';
    break;
  }

  return (
    <span>
      {nodes}
      <span dangerouslySetInnerHTML={{ __html: text.join('') }} />
    </span>
  );
};
