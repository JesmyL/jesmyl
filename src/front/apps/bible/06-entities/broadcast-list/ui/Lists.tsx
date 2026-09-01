import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { useBibleTranslatesContext } from '$bible/shared/contexts/translates';
import {
  takeJoinedAddressMaxValues,
  useBibleAddressBooki,
  useBibleAddressChapteri,
  useBibleAddressVersei,
  useBibleBroadcastJoinAddress,
} from '$bible/shared/hooks';
import { BibleBooki, BibleBroadcastJoinAddress, BibleChapteri, BibleVersei } from '$bible/shared/model/base';
import { BibleTranslatesContextProvider } from '$bible/shared/state/TranslatesContext';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { mapObjectEntries } from 'shared/utils/object.utils';
import { BibleBroadcastListBooks } from './BookList';
import { BibleBroadcastListChapters } from './ChapterList';
import { BibleBroadcastListVerseList } from './VerseList';

const scrollIntoViewBookAndChapterOptions = { block: 'center' } as const;
const scrollIntoViewVerseOptions = { block: 'center', behavior: 'smooth' } as const;

export const BibleBroadcastList = () => {
  const joinAddress = useBibleBroadcastJoinAddress();
  const currentBooki = useBibleAddressBooki();
  const currentChapteri = useBibleAddressChapteri();
  const currentVersei = useBibleAddressVersei();
  const translates = useBibleTranslatesContext();

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        setTimeoutPipe(() => {
          let booki = currentBooki;
          let chapteri = currentChapteri;
          let versei = currentVersei;

          if (joinAddress != null) [booki, chapteri, versei] = takeJoinedAddressMaxValues(joinAddress);

          document.querySelector(`[data-booki='${booki}']`)?.scrollIntoView(scrollIntoViewBookAndChapterOptions);
          document.querySelector(`[data-chapteri='${chapteri}']`)?.scrollIntoView(scrollIntoViewBookAndChapterOptions);
          document.querySelector(`[data-versei='${versei}']`)?.scrollIntoView(scrollIntoViewVerseOptions);
        }, 100),
      )
      .effect();
  }, [translates, currentBooki, currentChapteri, currentVersei, joinAddress]);

  return (
    <Lists
      className="flex gap-2 custom-align-items over-hidden h-full"
      $joinAddress={joinAddress}
      $booki={currentBooki}
      $chapteri={currentChapteri}
      $versei={currentVersei}
    >
      <BibleBroadcastListBooks />
      <BibleTranslatesContextProvider>
        <BibleBroadcastListChapters />
        <BibleBroadcastListVerseList />
      </BibleTranslatesContextProvider>
    </Lists>
  );
};

const color = css`
  &,
  &::before {
    color: var(--color-x1) !important;
  }
`;

const selectedStyle = css`
  background-color: var(--color-x7);
  ${color}

  &.current {
    opacity: 0.7;
  }
`;

const currentStyle = css`
  background-color: var(--color-x3);
  ${color}
`;

const Lists = styled.div<{
  $joinAddress: BibleBroadcastJoinAddress | nil;
  $booki: BibleBooki;
  $chapteri: BibleChapteri;
  $versei: BibleVersei;
}>`
  ${props => {
    if (props.$joinAddress)
      return mapObjectEntries(props.$joinAddress, (booki, book) => {
        return css`
          [data-booki='${booki}'] {
            ${selectedStyle}

            .title {
              color: var(--color-x1);
            }
          }

          ${mapObjectEntries(
            book,
            (chapteri, chapter) => css`
              [data-chapteri='${chapteri}'] {
                ${selectedStyle}
              }

              ${chapter.map(
                versei => css`
                  [data-versei='${versei}'] {
                    border-top: 1px solid var(--color-x1);
                    ${selectedStyle}
                  }
                `,
              )}
            `,
          )}
        `;
      });

    return css`
      [data-booki='${props.$booki}'] {
        ${currentStyle}

        .title {
          color: var(--color-x1);
        }
      }

      [data-chapteri='${props.$chapteri}'],
      [data-versei='${props.$versei}'] {
        ${currentStyle}
      }
    `;
  }}
`;
