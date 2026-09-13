import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { useBibleBroadcastJoinAddress, useBibleSimpleCheckedSingleAddress } from '$bible/shared/hooks';
import { BibleBooki, BibleBroadcastJoinAddress, BibleChapteri, BibleVersei } from '$bible/shared/model/base';
import { BibleBroadcastKeyListenScope } from '$bible/shared/model/broadcast';
import { bibleBroadcastKeyListenScopeAtom } from '$bible/shared/state';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { extractNumber } from 'shared/utils';
import { mapObjectEntries } from 'shared/utils/object.utils';
import { twJoin } from 'tailwind-merge';
import { BibleBroadcastListBooks } from './BookList';
import { BibleBroadcastListChapters } from './ChapterList';
import { BibleBroadcastListVerseList } from './VerseList';

const scrollIntoViewBookAndChapterOptions = { block: 'center' } as const;

export const BibleBroadcastList = () => {
  const joinAddress = useBibleBroadcastJoinAddress();
  const [currentBooki, currentChapteri, currentVersei] = useBibleSimpleCheckedSingleAddress();
  const listenScope = useAtomValue(bibleBroadcastKeyListenScopeAtom);

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        setTimeoutPipe(() => {
          document.querySelector(`[data-booki='${currentBooki}']`)?.scrollIntoView(scrollIntoViewBookAndChapterOptions);
          document
            .querySelector(`[data-chapteri='${currentChapteri}']`)
            ?.scrollIntoView(scrollIntoViewBookAndChapterOptions);
        }, 100),
      )
      .effect();
  }, [currentBooki, currentChapteri]);

  return (
    <Lists
      className={twJoin(
        'flex gap-2 custom-align-items over-hidden h-full',
        listenScope === BibleBroadcastKeyListenScope.AAAddressNav && 'bg-x3/10',
      )}
      $joinAddress={joinAddress[0]}
      $booki={currentBooki}
      $chapteri={currentChapteri}
      $versei={currentVersei}
      onClick={() => {
        bibleBroadcastKeyListenScopeAtom.set(BibleBroadcastKeyListenScope.AAAddressNav);
      }}
    >
      <BibleBroadcastListBooks />
      <BibleBroadcastListChapters />
      <BibleBroadcastListVerseList />
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
    return mapObjectEntries(props.$joinAddress, (booki, book) => {
      return css`
        [data-booki='${booki}'] {
          ${selectedStyle}
        }

        ${extractNumber(booki) === props.$booki &&
        mapObjectEntries(
          book,
          (chapteri, chapter) => css`
            [data-chapteri='${chapteri}'] {
              ${selectedStyle}
            }

            ${extractNumber(chapteri) === props.$chapteri &&
            chapter?.map(
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
  }}

  ${({ $booki, $chapteri, $joinAddress: j, $versei }) => [
    css`
      [data-booki='${$booki}'],
      [data-chapteri='${$chapteri}'] {
        ${currentStyle}
      }
    `,

    (!j || j[$booki]?.[$chapteri]) &&
      css`
        [data-versei='${$versei}'] {
          ${currentStyle}
        }
      `,
  ]}
`;
