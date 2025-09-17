import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BibleTranslatesContextProvider } from '$bible/basis/contexts/TranslatesContext';
import { useBibleTranslatesContext } from '$bible/basis/lib/contexts/translates';
import { useBibleAddressBooki } from '$bible/basis/lib/hooks/address/books';
import { useBibleAddressChapteri } from '$bible/basis/lib/hooks/address/chapters';
import { useBibleAddressVersei } from '$bible/basis/lib/hooks/address/verses';
import { useBibleBookList } from '$bible/basis/lib/hooks/texts';
import { useBibleShowTranslatesValue } from '$bible/basis/lib/hooks/translates';
import { BibleAddressSingle } from '$bible/entities/BibleAddressSingle';
import { BibleModulesTranslationsControl } from '$bible/entities/ModulesTranslationsControl';
import { useBibleSingleAddressSetter } from '$bible/translations/lists/atoms';
import { BibleReaderBookText } from '$bible/widgets/BookText';
import { atom } from 'atomaric';
import { useEffect, useRef, useState } from 'react';
import { emptyFunc } from 'shared/utils';
import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';

export function BibleReaderCurrentBookPage() {
  return (
    <BibleTranslatesContextProvider>
      <Content />
    </BibleTranslatesContextProvider>
  );
}

const isOpenBookSelectorAtom = atom(false);
const isOpenChapterSelectorAtom = atom(false);
const isOpenVerseSelectorAtom = atom(false);

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
  const onBookCloseRef = useRef(emptyFunc);
  const onChapterCloseRef = useRef(emptyFunc);

  useEffect(() => {
    if (currentBooki) setSelectedBooki(booki => booki || currentBooki);
    if (currentChapteri) setSelectedChapteri(chapteri => chapteri || currentChapteri);
  }, [currentBooki, currentChapteri]);

  return (
    <PageContainerConfigurer
      className=""
      withoutBackButton
      headTitle={
        <span
          className="pointer"
          onClick={isOpenBookSelectorAtom.do.toggle}
        >
          <BibleAddressSingle />
        </span>
      }
      head={<BibleModulesTranslationsControl isHideEmptyBook />}
      content={
        <>
          {chapters && (
            <BibleReaderBookText
              chapterList={chapters[currentBooki]}
              currentChapteri={currentChapteri}
              currentVersei={currentVersei}
              currentBooki={currentBooki}
            />
          )}

          <FullContent openAtom={isOpenBookSelectorAtom}>
            {bookTitles.map(({ full: bookTitle }, booki) => {
              return (
                <div
                  key={bookTitle}
                  className={twMerge(
                    'my-5 ml-2 pointer',
                    booki === selectedBooki ? 'text-x7' : '',
                    booki === currentBooki ? 'underline' : '',
                    booki === 38 ? 'mb-10' : '',
                  )}
                  onClick={() => {
                    setSelectedBooki(booki);
                    isOpenChapterSelectorAtom.set(true);
                  }}
                >
                  {bookTitle}
                </div>
              );
            })}
          </FullContent>

          <FullContent openAtom={isOpenChapterSelectorAtom}>
            {chapters?.[selectedBooki]?.map((chapter, chapteri) => {
              return (
                <ItemFace
                  key={chapteri}
                  className={
                    'inline-flex center pointer' +
                    (chapteri === selectedChapteri ? ' bg-x7 text-x1' : ' bg-x2 text-x3') +
                    (chapteri === currentChapteri ? ' font-bold underline' : '')
                  }
                  chapter-length={chapter?.length}
                  onClick={() => {
                    setSelectedChapteri(chapteri);
                    isOpenVerseSelectorAtom.set(true);
                  }}
                >
                  {chapteri + 1}
                </ItemFace>
              );
            })}
          </FullContent>

          <FullContent openAtom={isOpenVerseSelectorAtom}>
            {chapters?.[selectedBooki]?.[selectedChapteri]?.map((_, versei) => {
              return (
                <ItemFace
                  key={versei}
                  className={
                    'inline-flex center pointer bg-x2 text-x3' +
                    (versei === currentVersei ? ' text-x7 font-bold underline' : '')
                  }
                  onClick={() => {
                    setAddress(selectedBooki, selectedChapteri, versei);
                    onBookCloseRef.current();
                    onChapterCloseRef.current();

                    isOpenBookSelectorAtom.reset();
                    isOpenChapterSelectorAtom.reset();
                    isOpenVerseSelectorAtom.reset();
                  }}
                >
                  {versei + 1}
                </ItemFace>
              );
            })}
          </FullContent>
        </>
      }
    />
  );
}

const ItemFace = styled.div`
  --size: calc((100vw - var(--main-5-gap) * 2 - 12 * 3px) / 5);

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
