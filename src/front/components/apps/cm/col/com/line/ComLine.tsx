import React, { ReactNode } from 'react';
import { makeRegExp } from 'shared/utils';
import styled from 'styled-components';
import { IComLineProps } from '../order/Order.model';

export function ComLine(props: IComLineProps) {
  const className = `composition-line line-num-${props.textLinei}`;

  if (!props.chordedOrd)
    return (
      <StyledLine
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
      </StyledLine>
    );

  const vowelPositions = props.com.getVowelPositions(props.textLine);
  let chordIndex = 0;
  let points = vowelPositions;

  const chordsLabels =
    (props.orderUnit.chordLabels ?? props.com.chordLabels[props.orderUniti])?.[props.textLinei] ?? [];
  const linePositions = props.positions ?? props.orderUnit.positions?.[props.textLinei] ?? [];

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
    <StyledLine
      className={className}
      onClick={props.onClick}
    >
      {wordsNodes}
    </StyledLine>
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

const StyledLine = styled.div`
  white-space: normal;

  * {
    font-size: 1em;

    &::before,
    &::after {
      font-size: 1em;
    }
  }

  .chorded {
    display: inline-block;
    position: relative;
    line-height: 1;
    white-space: pre;

    &.pre,
    &.post,
    &.spaced-word {
      &::before,
      &::after {
        color: color-mix(in lch, currentColor 50%, var(--color--7));
      }
    }

    &:not(.pre):not(.post) {
      &.spaced-word::before {
        left: -0.2em;
      }

      &::before {
        left: 0;
      }
    }

    &:not(.post) {
      &::before,
      &::after {
        position: absolute;
        top: -1em;
        z-index: 0;
        pointer-events: none;
        font-size: 1em;
      }

      .fragment {
        &::before {
          content: attr(attr-pchord);
          position: absolute;
          top: -1em;
          left: 100%;
        }

        &::after {
          content: attr(attr-chord);
          display: block;
          margin-top: -1em;
          color: transparent;
          margin-right: 0.2em;
        }
      }
    }

    &.spaced-word:not(.post)::after {
      content: '.';
      top: 0;
      width: 0.3em;
      color: transparent;
      left: -0.3em;
      height: 1.2em;
    }

    &.pre::before,
    &:not(.pre):not(.post)::before {
      content: attr(attr-chord);
      max-width: 500px;
      white-space: nowrap;
    }

    &.pre::before {
      left: -0.5em;
    }

    &.post {
      .fragment {
        display: inline-block;
        position: relative;

        &::before {
          content: attr(attr-chord);
          display: block;
          margin-top: -1em;
          height: 1em;
        }
      }

      &::before {
        position: absolute;
        top: -1em;
        right: 0;
      }

      &::after {
        content: attr(attr-pchord);
        display: inline-block;
        position: relative;
        top: -1em;
        margin-left: 0.2em;
      }
    }
  }

  .whole-word,
  .spaced-word {
    [dash-divider]::before {
      display: none;
    }
  }

  .whole-word {
    [attr-chord] {
      &:has(+ [attr-chord]) {
        .fragment {
          position: relative;

          > span:has(span) {
            display: inline-flex;
            justify-content: space-between;
            width: 100%;

            [dash-divider]::before {
              content: ' - ';
              display: inline-block;
              color: var(--color--7);
            }
          }
        }
      }

      + [attr-chord] {
        &:before {
          color: var(--color--3);
        }

        + [attr-chord] {
          &:before {
            color: var(--text-color);
          }

          + [attr-chord] {
            &:before {
              color: var(--color--3);
            }

            + [attr-chord] {
              &:before {
                color: var(--text-color);
              }
            }
          }
        }
      }
    }
  }
`;
