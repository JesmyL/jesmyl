import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { useBibleSimpleCheckedSingleAddress } from '$bible/shared/hooks';
import { useBibleShowTranslatesValue } from '$bible/shared/hooks/translates';
import { makeBibleTbcvPrefix } from '$bible/shared/lib/tbcv.parser';
import { bibleTBCVTranslatesIDB } from '$bible/shared/state/bibleIDB';
import styled from '@emotion/styled';
import { useLiveQuery } from 'dexie-react-hooks';
import { JSX, useEffect, useRef } from 'react';
import { BibleTranslateName } from 'shared/model/bible';
import { useBibleBroadcastListVerseListeners } from '../lib/useVerseListListeners';

const scrollIntoViewVerseOptions = { block: 'center', behavior: 'smooth' } as const;

export function BibleBroadcastListVerseList(): JSX.Element {
  const verseListRef = useRef<HTMLOListElement>(null);

  const [currentBooki, currentChapteri, currentVersei] = useBibleSimpleCheckedSingleAddress();
  const showTranslates = useBibleShowTranslatesValue();
  const tName = showTranslates[0];
  const verses = useLiveQuery(
    () =>
      bibleTBCVTranslatesIDB.tb.list
        .where('k')
        .startsWith(makeBibleTbcvPrefix(tName, currentBooki, currentChapteri))
        .toArray(),
    [tName, currentBooki, currentChapteri],
  );

  useEffect(() => {
    if (!verses?.length) return;

    return hookEffectPipe()
      .pipe(
        setTimeoutPipe(() => {
          document.querySelector(`[data-versei='${currentVersei}']`)?.scrollIntoView(scrollIntoViewVerseOptions);
        }, 100),
      )
      .effect();
  }, [currentVersei, verses?.length]);

  useBibleBroadcastListVerseListeners(verseListRef);

  return (
    <StyledContainer
      className="w-full overflow-y-auto overflow-x-hidden list-decimal list-inside"
      ref={verseListRef}
      title="[0-9] - перейти к стиху; Shift+[@v>] - добавить диапазон стихов; Ctrl+@ - добавить/удалить один стих"
    >
      {verses?.map((verse, versei) => {
        return (
          <li
            key={versei}
            data-versei={versei}
            className="bible-list-face pointer max-w-full transition-colors duration-500 before:transition-colors before:duration-500 odd:bg-x2"
            dangerouslySetInnerHTML={{ __html: verse.v }}
          />
        );
      })}
      {verses?.length === 0 && <NoTranslationLabel tName={tName} />}
    </StyledContainer>
  );
}

const NoTranslationLabel = ({ tName }: { tName: BibleTranslateName }) => {
  const translation = useLiveQuery(
    () => bibleTBCVTranslatesIDB.tb.list.where('k').startsWith(makeBibleTbcvPrefix(tName)).first(),
    [tName],
  );

  if (!translation)
    return <div className="flex justify-center items-center size-full text-center">Перевод не загружен</div>;

  return <></>;
};

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
