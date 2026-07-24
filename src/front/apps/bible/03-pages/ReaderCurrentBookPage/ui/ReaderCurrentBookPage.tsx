import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BibleAddressSingle } from '$bible/entities/address';
import { bibleBroadcastListSingleAddressSet } from '$bible/entities/broadcast-list';
import { BibleTranslateModulesControl } from '$bible/entities/translate';
import { BibleTranslatesContextProvider, takeBibleLangBooks, useBibleTranslatesContext } from '$bible/ext';
import { bibleTranslateFilter } from '$bible/shared/const/consts';
import { useBibleAddressBooki, useBibleAddressChapteri, useBibleAddressVersei } from '$bible/shared/hooks';
import { useBibleShowTranslatesValue } from '$bible/shared/hooks/translates';
import { useBibleCurrentLangi } from '$bible/shared/state/atoms';
import { BibleReaderBookText } from '$bible/widgets/reader';
import styled from '@emotion/styled';
import { Atom, atom } from 'atomaric';
import { useEffect, useRef, useState } from 'react';
import { emptyFunc } from 'shared/utils';
import { twMerge } from 'tailwind-merge';

export function BibleReaderCurrentBookPage() {
  return (
    <BibleTranslatesContextProvider>
      <Content />
    </BibleTranslatesContextProvider>
  );
}

let isOpenBookSelectorAtom: Atom<boolean>;
let isOpenChapterSelectorAtom: Atom<boolean>;
let isOpenVerseSelectorAtom: Atom<boolean>;

function Content() {
  isOpenVerseSelectorAtom ??= atom(false);
  isOpenChapterSelectorAtom ??= atom(false);
  isOpenBookSelectorAtom ??= atom(false);

  const currentBooki = useBibleAddressBooki();
  const currentChapteri = useBibleAddressChapteri();
  const currentVersei = useBibleAddressVersei();
  const showTranslates = useBibleShowTranslatesValue();
  const chapters = useBibleTranslatesContext()[showTranslates[0]]?.chapters;
  const [selectedBooki, setSelectedBooki] = useState(currentBooki);
  const [selectedChapteri, setSelectedChapteri] = useState(currentChapteri);
  const onBookCloseRef = useRef(emptyFunc);
  const onChapterCloseRef = useRef(emptyFunc);
  const langi = useBibleCurrentLangi();

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
      head={<BibleTranslateModulesControl isHideEmptyBook />}
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

          <FullContent
            openAtom={isOpenBookSelectorAtom}
            containerClassName="p-0 pt-15"
          >
            <div className="grid grid-cols-6 gap-1 @container h-full">
              {takeBibleLangBooks(langi).map(({ color, short }, booki) => {
                return (
                  <div
                    key={short}
                    className={twMerge(
                      'flex justify-center h-[calc(100cvh/11)] bg-x2 pointer',

                      booki === selectedBooki ? 'text-[black]' : color,
                      booki === currentBooki && 'bg-x7',
                      bibleTranslateFilter[showTranslates[0]](booki) && 'disabled',
                    )}
                    onClick={() => {
                      setSelectedBooki(booki);
                      isOpenChapterSelectorAtom.set(true);
                    }}
                  >
                    {short}
                  </div>
                );
              })}
            </div>
          </FullContent>

          <FullContent
            openAtom={isOpenChapterSelectorAtom}
            containerClassName="p-0 pt-15"
          >
            {chapters?.[selectedBooki]?.map((chapter, chapteri) => {
              return (
                <ItemFace
                  key={chapteri}
                  className={
                    'inline-flex center pointer strong-size' +
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

          <FullContent
            openAtom={isOpenVerseSelectorAtom}
            containerClassName="p-0 pt-15"
          >
            {chapters?.[selectedBooki]?.[selectedChapteri]?.map((_, versei) => {
              return (
                <ItemFace
                  key={versei}
                  className={
                    'inline-flex center pointer bg-x2 text-x3 strong-size' +
                    (versei === currentVersei ? ' text-x7 font-bold underline' : '')
                  }
                  onClick={() => {
                    bibleBroadcastListSingleAddressSet(selectedBooki, selectedChapteri, versei);
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
  --strong-size: calc((100vw - 12 * 3px) / 5);

  position: relative;
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
