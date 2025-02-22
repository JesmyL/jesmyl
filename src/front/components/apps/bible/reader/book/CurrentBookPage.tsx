import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { PhaseContainerConfigurer } from '#shared/ui/phase-container/PhaseContainerConfigurer';
import { useBibleAddressBooki } from '@bible/hooks/address/books';
import { useBibleAddressChapteri } from '@bible/hooks/address/chapters';
import { useBibleAddressVersei } from '@bible/hooks/address/verses';
import { useBibleBookList } from '@bible/hooks/texts';
import { BibleAddressSingle } from '@bible/texts/BibleAddressSingle';
import { useBibleShowTranslatesValue } from '@bible/translates/hooks';
import { BibleTranslatesContextProvider, useBibleTranslatesContext } from '@bible/translates/TranslatesContext';
import { BibleModulesTranslations } from '@bible/translates/Translations';
import { useBibleSingleAddressSetter } from '@bible/translations/lists/atoms';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BibleReaderBook } from './BookPage';

export function BibleReaderCurrentBookPage() {
  return (
    <BibleTranslatesContextProvider>
      <Content />
    </BibleTranslatesContextProvider>
  );
}

function Content() {
  const currentBooki = useBibleAddressBooki();
  const currentChapteri = useBibleAddressChapteri();
  const currentVersei = useBibleAddressVersei();
  const bookTitles = useBibleBookList();
  const showTranslates = useBibleShowTranslatesValue();
  const chapters = useBibleTranslatesContext()[showTranslates[0]]?.chapters;
  const [selectedBooki, setSelectedBooki] = useState(currentBooki);
  const [selectedChapteri, setSelectedChapteri] = useState(currentChapteri);
  const setAddress = useBibleSingleAddressSetter();

  const [isOpenBookSelector, setIsOpenBookSelector] = useState(false);
  const [isOpenChapterSelector, setIsOpenChapterSelector] = useState(false);
  const [isOpenVerseSelector, setIsOpenVerseSelector] = useState(false);

  useEffect(() => {
    if (currentBooki) setSelectedBooki(booki => booki || currentBooki);
    if (currentChapteri) setSelectedChapteri(chapteri => chapteri || currentChapteri);
  }, [currentBooki, currentChapteri]);

  return (
    <PhaseContainerConfigurer
      className=""
      withoutBackButton
      headTitle={
        <span
          className="pointer"
          onClick={() => setIsOpenBookSelector(true)}
        >
          <BibleAddressSingle />
        </span>
      }
      head={<BibleModulesTranslations isHideEmptyBook />}
      content={
        <>
          {chapters && (
            <BibleReaderBook
              chapterList={chapters[currentBooki]}
              currentChapteri={currentChapteri}
              currentVersei={currentVersei}
              currentBooki={currentBooki}
            />
          )}

          {isOpenBookSelector && (
            <FullContent onClose={setIsOpenBookSelector}>
              {bookTitles.map(([bookTitle], booki) => {
                return (
                  <div
                    key={bookTitle}
                    className={
                      'margin-big-gap-v margin-gap-l pointer' +
                      (booki === selectedBooki ? ' color--7' : '') +
                      (booki === currentBooki ? ' text-underline' : '') +
                      (booki === 38 ? ' margin-giant-gap-b' : '')
                    }
                    onClick={() => {
                      setSelectedBooki(booki);
                      setIsOpenChapterSelector(true);
                    }}
                  >
                    {bookTitle}
                  </div>
                );
              })}
            </FullContent>
          )}

          {isOpenChapterSelector && (
            <FullContent onClose={setIsOpenChapterSelector}>
              {chapters?.[selectedBooki]?.map((chapter, chapteri) => {
                return (
                  <ItemFace
                    key={chapteri}
                    className={
                      'inline-flex center pointer' +
                      (chapteri === selectedChapteri ? ' bgcolor--7 color--1' : ' bgcolor--2 color--3') +
                      (chapteri === currentChapteri ? ' text-bold text-underline' : '')
                    }
                    chapter-length={chapter?.length}
                    onClick={() => {
                      setSelectedChapteri(chapteri);
                      setIsOpenVerseSelector(true);
                    }}
                  >
                    {chapteri + 1}
                  </ItemFace>
                );
              })}
            </FullContent>
          )}

          {isOpenVerseSelector && (
            <FullContent onClose={setIsOpenVerseSelector}>
              {chapters?.[selectedBooki]?.[selectedChapteri]?.map((_, versei) => {
                return (
                  <ItemFace
                    key={versei}
                    className={
                      'inline-flex center pointer bgcolor--2 color--3' +
                      (versei === currentVersei ? ' color--7 text-bold  text-underline' : '')
                    }
                    onClick={() => {
                      setAddress(selectedBooki, selectedChapteri, versei);
                      setIsOpenBookSelector(false);
                      setIsOpenChapterSelector(false);
                      setIsOpenVerseSelector(false);
                    }}
                  >
                    {versei + 1}
                  </ItemFace>
                );
              })}
            </FullContent>
          )}
        </>
      }
    />
  );
}

const ItemFace = styled.div`
  --size: calc((100vw - var(--main-big-gap) * 2 - 12 * 3px) / 5);

  position: relative;

  min-width: var(--size);
  max-width: var(--size);
  width: var(--size);

  min-height: var(--size);
  max-height: var(--size);
  height: var(--size);

  margin: 3px;

  &::before {
    content: attr(chapter-length);
    position: absolute;
    top: 0;
    right: 5px;
    color: var(--color--4);
    font-size: 0.8em;
  }
`;
