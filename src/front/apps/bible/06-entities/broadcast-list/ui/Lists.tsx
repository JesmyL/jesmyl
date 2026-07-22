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
import {
  bibleBroadcastListBookiIdPrefix,
  bibleBroadcastListChapteriIdPrefix,
  bibleBroadcastListVerseiIdPrefix,
} from '../const/ids';
import { BibleBroadcastListBooks } from './BookList';
import { BibleBroadcastListChapters } from './ChapterList';
import { BibleBroadcastListVerseList } from './VerseList';

const scrollIntoViewBookAndChapterOptions = { block: 'center' } as const;
const scrollIntoViewVerseOptions = { block: 'center', behavior: 'smooth' } as const;

export function BibleBroadcastList() {
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

          document
            .getElementById(bibleBroadcastListBookiIdPrefix + booki)
            ?.scrollIntoView(scrollIntoViewBookAndChapterOptions);
          document
            .getElementById(bibleBroadcastListChapteriIdPrefix + chapteri)
            ?.scrollIntoView(scrollIntoViewBookAndChapterOptions);
          document
            .getElementById(bibleBroadcastListVerseiIdPrefix + versei)
            ?.scrollIntoView(scrollIntoViewVerseOptions);
        }, 100),
      )
      .effect();
  }, [translates, currentBooki, currentChapteri, currentVersei, joinAddress]);

  return (
    <Lists
      className="flex gap-2 custom-align-items over-hidden"
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
}

const selectedStyle = css`
  background-color: var(--color--7);
  color: var(--color--1);

  &.current {
    opacity: 0.7;
  }
`;

const currentStyle = css`
  background-color: var(--color--3);
  color: var(--color--1);
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
          #${bibleBroadcastListBookiIdPrefix}${booki} {
            ${selectedStyle}

            .title {
              color: var(--color--1);
            }
          }

          ${mapObjectEntries(
            book,
            (chapteri, chapter) => css`
              #${bibleBroadcastListChapteriIdPrefix}${chapteri} {
                ${selectedStyle}
              }

              ${chapter.map(
                versei => css`
                  #${bibleBroadcastListVerseiIdPrefix}${versei} {
                    ${selectedStyle}
                  }
                `,
              )}
            `,
          )}
        `;
      });

    return css`
      #${bibleBroadcastListBookiIdPrefix}${props.$booki} {
        ${currentStyle}

        .title {
          color: var(--color--1);
        }
      }
      #${bibleBroadcastListChapteriIdPrefix}${props.$chapteri} {
        ${currentStyle}
      }
      #${bibleBroadcastListVerseiIdPrefix}${props.$versei} {
        ${currentStyle}
      }
    `;
  }}
`;
