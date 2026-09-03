import { useBibleTranslatesContext } from '$bible/shared/contexts/translates';
import { useBibleAddressBooki, useBibleAddressChapteri } from '$bible/shared/hooks';
import { useBibleShowTranslatesValue } from '$bible/shared/hooks/translates';
import styled from '@emotion/styled';
import { Atom, atom } from 'atomaric';
import { JSX, useEffect, useRef } from 'react';
import { useBibleBroadcastListVerseListeners } from '../lib/useVerseListListeners';

let fastVersesAtom: Atom<string[]>;

export function BibleBroadcastListVerseList(): JSX.Element {
  fastVersesAtom ??= atom<string[]>([], 'bible:fastVerses');

  const verseListRef = useRef<HTMLOListElement>(null);

  const currentBooki = useBibleAddressBooki();
  const currentChapteri = useBibleAddressChapteri();
  const showTranslates = useBibleShowTranslatesValue();
  const translates = useBibleTranslatesContext();

  const verses = translates[showTranslates[0]]?.chapters?.[currentBooki]?.[currentChapteri];

  useEffect(() => {
    if (verses?.length) fastVersesAtom.set(verses);
  }, [verses]);

  useBibleBroadcastListVerseListeners(verseListRef, currentBooki, currentChapteri);

  return (
    <StyledContainer
      className="w-full overflow-y-auto overflow-x-hidden list-decimal list-inside"
      ref={verseListRef}
      title="[0-9] - перейти к стиху; Shift+[@v>] - добавить диапазон стихов; Ctrl+@ - добавить/удалить один стих"
    >
      {(verses ?? fastVersesAtom.get())?.map((__html, versei) => {
        return (
          <li
            key={versei}
            data-versei={versei}
            className="bible-list-face pointer max-w-full transition-colors duration-500 before:transition-colors before:duration-500 odd:bg-x2"
            dangerouslySetInnerHTML={{ __html }}
          />
        );
      })}
    </StyledContainer>
  );
}

const StyledContainer = styled.ol`
  [data-versei] {
    counter-increment: verse;

    &:before {
      content: counter(verse) '. ';
      color: var(--color-x7);
    }
  }

  .bible-list-face:nth-of-type(10n):not(:last-child) {
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

  insertedtext,
  textinbrackets,
  godswords {
    opacity: 0.6;
    font-style: italic;
    pointer-events: none;
  }
`;
