import { JStorageSetOrArrayVal } from '#shared/lib/JSimpleStorage/exports/SetOrArray';
import { useBibleTranslatesContext } from '$bible/basis/lib/contexts/translates';
import { useBibleAddressBooki } from '$bible/basis/lib/hooks/address/books';
import { useBibleAddressChapteri } from '$bible/basis/lib/hooks/address/chapters';
import { useBibleShowTranslatesValue } from '$bible/basis/lib/hooks/translates';
import { JSX, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { bibleVerseiIdPrefix } from '../lib/consts';
import { useVerseListListeners } from './useVerseListListeners';

const fastVerses = new JStorageSetOrArrayVal<string[]>('bible', 'fastVerses', []);

export function BibleVerseList(): JSX.Element {
  const verseListRef = useRef<HTMLOListElement>(null);

  const currentBooki = useBibleAddressBooki();
  const currentChapteri = useBibleAddressChapteri();
  const showTranslates = useBibleShowTranslatesValue();
  const translates = useBibleTranslatesContext();

  const verses = translates[showTranslates[0]]?.chapters?.[currentBooki]?.[currentChapteri];

  useEffect(() => {
    if (verses === undefined || !verses.length) return;
    fastVerses.set(verses);
  }, [verses]);

  useVerseListListeners(verseListRef, currentBooki, currentChapteri);

  return (
    <StyledContainer ref={verseListRef}>
      {(verses ?? fastVerses.get())?.map((__html, versei) => {
        return (
          <StyledFace
            key={versei}
            id={bibleVerseiIdPrefix + versei}
            className="bible-list-face pointer"
            dangerouslySetInnerHTML={{ __html }}
          />
        );
      })}
    </StyledContainer>
  );
}

const StyledFace = styled.li`
  max-width: 100%;
  transition-property: background-color, color;
  transition-duration: 0.5s;

  &:nth-child(odd) {
    background-color: var(--color--2);
  }

  &:nth-child(10n):not(:last-child) {
    margin-bottom: 10px;
    position: relative;

    &:after {
      content: '';
      display: block;
      position: absolute;
      margin-top: 5px;
      height: 1px;
      width: 100%;
      background: red;
    }
  }
`;

const StyledContainer = styled.ol`
  overflow-y: auto;
  overflow-x: hidden;
  width: calc(100vw - 300px - 2.5em - 7em);
  list-style: decimal;
  list-style-position: inside;

  insertedtext,
  textinbrackets {
    opacity: 0.6;
    font-style: italic;
    pointer-events: none;
  }
`;
