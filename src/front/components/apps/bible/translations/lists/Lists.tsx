import { MyLib } from '#shared/lib/my-lib';
import { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { hookEffectPipe, setTimeoutPipe } from '../../../../../shared/lib/hookEffectPipe';
import { useBibleTranslationJoinAddress, useGetterJoinedAddressMaxValues } from '../../hooks/address/address';
import { useBibleAddressBooki } from '../../hooks/address/books';
import { useBibleAddressChapteri } from '../../hooks/address/chapters';
import { useBibleAddressVersei } from '../../hooks/address/verses';
import { BibleBooki, BibleChapteri, BibleTranslationJoinAddress, BibleVersei } from '../../model';
import { BibleTranslatesContextProvider, useBibleTranslatesContext } from '../../translates/TranslatesContext';
import { BibleBookList, bookiIdPrefix } from './books/BookList';
import { BibleChapterList, chapteriIdPrefix } from './chapters/ChapterList';
import { BibleVerseList, verseiIdPrefix } from './verses/VerseList';

const scrollIntoViewBookAndChapterOptions = { block: 'center' } as const;
const scrollIntoViewVerseOptions = { block: 'center', behavior: 'smooth' } as const;

export const BibleLists = () => {
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

          document.getElementById(bookiIdPrefix + booki)?.scrollIntoView(scrollIntoViewBookAndChapterOptions);
          document.getElementById(chapteriIdPrefix + chapteri)?.scrollIntoView(scrollIntoViewBookAndChapterOptions);
          document.getElementById(verseiIdPrefix + versei)?.scrollIntoView(scrollIntoViewVerseOptions);
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
};

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
          #${bookiIdPrefix}${booki} {
            ${selectedStyle}

            .title {
              color: var(--color--1);
            }
          }

          ${MyLib.entries(book).map(
            ([chapteri, chapter]) => css`
              #${chapteriIdPrefix}${chapteri} {
                ${selectedStyle}
              }

              ${chapter.map(
                versei => css`
                  #${verseiIdPrefix}${versei} {
                    ${selectedStyle}
                  }
                `,
              )}
            `,
          )}
        `;
      });

    return css`
      #${bookiIdPrefix}${props.$booki} {
        ${currentStyle}

        .title {
          color: var(--color--1);
        }
      }
      #${chapteriIdPrefix}${props.$chapteri} {
        ${currentStyle}
      }
      #${verseiIdPrefix}${props.$versei} {
        ${currentStyle}
      }
    `;
  }}
`;
