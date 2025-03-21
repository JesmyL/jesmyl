import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { MyLib } from '#shared/lib/my-lib';
import { BibleTranslatesContextProvider } from '$bible/basis/contexts/TranslatesContext';
import { useBibleTranslatesContext } from '$bible/basis/lib/contexts/translates';
import {
  useBibleTranslationJoinAddress,
  useGetterJoinedAddressMaxValues,
} from '$bible/basis/lib/hooks/address/address';
import { useBibleAddressBooki } from '$bible/basis/lib/hooks/address/books';
import { useBibleAddressChapteri } from '$bible/basis/lib/hooks/address/chapters';
import { useBibleAddressVersei } from '$bible/basis/lib/hooks/address/verses';
import { BibleBooki, BibleChapteri, BibleTranslationJoinAddress, BibleVersei } from '$bible/basis/model/base';
import { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { BibleBookList } from './books/BookList';
import { BibleChapterList } from './chapters/ChapterList';
import { bibleBookiIdPrefix, bibleChapteriIdPrefix, bibleVerseiIdPrefix } from './lib/consts';
import { BibleVerseList } from './verses/VerseList';

const scrollIntoViewBookAndChapterOptions = { block: 'center' } as const;
const scrollIntoViewVerseOptions = { block: 'center', behavior: 'smooth' } as const;

export function BibleLists() {
  const joinAddress = useBibleTranslationJoinAddress();
  const currentBooki = useBibleAddressBooki();
  const currentChapteri = useBibleAddressChapteri();
  const currentVersei = useBibleAddressVersei();
  const translates = useBibleTranslatesContext();
  const getJoinAddressMaxes = useGetterJoinedAddressMaxValues();

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        setTimeoutPipe(() => {
          let booki = currentBooki;
          let chapteri = currentChapteri;
          let versei = currentVersei;

          if (joinAddress != null) [booki, chapteri, versei] = getJoinAddressMaxes(joinAddress);

          document.getElementById(bibleBookiIdPrefix + booki)?.scrollIntoView(scrollIntoViewBookAndChapterOptions);
          document
            .getElementById(bibleChapteriIdPrefix + chapteri)
            ?.scrollIntoView(scrollIntoViewBookAndChapterOptions);
          document.getElementById(bibleVerseiIdPrefix + versei)?.scrollIntoView(scrollIntoViewVerseOptions);
        }, 100),
      )
      .effect();
  }, [translates, currentBooki, currentChapteri, currentVersei, joinAddress, getJoinAddressMaxes]);

  return (
    <Lists
      className="flex flex-gap custom-align-items over-hidden"
      $joinAddress={joinAddress}
      $booki={currentBooki}
      $chapteri={currentChapteri}
      $versei={currentVersei}
    >
      <BibleBookList />
      <BibleTranslatesContextProvider>
        <BibleChapterList />
        <BibleVerseList />
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
  $joinAddress: BibleTranslationJoinAddress | nil;
  $booki: BibleBooki;
  $chapteri: BibleChapteri;
  $versei: BibleVersei;
}>`
  ${props => {
    if (props.$joinAddress)
      return MyLib.entries(props.$joinAddress).map(([booki, book]) => {
        return css`
          #${bibleBookiIdPrefix}${booki} {
            ${selectedStyle}

            .title {
              color: var(--color--1);
            }
          }

          ${MyLib.entries(book).map(
            ([chapteri, chapter]) => css`
              #${bibleChapteriIdPrefix}${chapteri} {
                ${selectedStyle}
              }

              ${chapter.map(
                versei => css`
                  #${bibleVerseiIdPrefix}${versei} {
                    ${selectedStyle}
                  }
                `,
              )}
            `,
          )}
        `;
      });

    return css`
      #${bibleBookiIdPrefix}${props.$booki} {
        ${currentStyle}

        .title {
          color: var(--color--1);
        }
      }
      #${bibleChapteriIdPrefix}${props.$chapteri} {
        ${currentStyle}
      }
      #${bibleVerseiIdPrefix}${props.$versei} {
        ${currentStyle}
      }
    `;
  }}
`;
