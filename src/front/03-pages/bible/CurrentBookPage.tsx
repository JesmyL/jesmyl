import BibleTranslatesContextProvider, { useBibleTranslatesContext } from '#basis/lib/contexts/bible/TranslatesContext';
import { FullScreenContent } from '#shared/ui/fullscreen-content';
import PhaseContainerConfigurer from 'front/08-shared/ui/phase-container/PhaseContainerConfigurer';
import { useBibleAddressBooki } from 'front/components/apps/bible/hooks/address/books';
import { useBibleAddressChapteri } from 'front/components/apps/bible/hooks/address/chapters';
import { useBibleAddressVersei } from 'front/components/apps/bible/hooks/address/verses';
import { useBibleBookList } from 'front/components/apps/bible/hooks/texts';
import { BibleAddressSingle } from 'front/components/apps/bible/texts/BibleAddressSingle';
import { useBibleShowTranslatesValue } from 'front/components/apps/bible/translates/hooks';
import { BibleModulesTranslations } from 'front/components/apps/bible/translates/Translations';
import { useBibleSingleAddressSetter } from 'front/components/apps/bible/translations/lists/atoms';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import BibleReaderBook from './BookPage';

export default function BibleReaderCurrentBookPage() {
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
            <FullScreenContent onClose={setIsOpenBookSelector}>
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
            </FullScreenContent>
          )}

          {isOpenChapterSelector && (
            <FullScreenContent onClose={setIsOpenChapterSelector}>
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
            </FullScreenContent>
          )}

          {isOpenVerseSelector && (
            <FullScreenContent onClose={setIsOpenVerseSelector}>
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
            </FullScreenContent>
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
