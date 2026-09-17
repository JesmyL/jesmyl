import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { With3Atoms } from '#shared/ui/With3AtomsValue';
import { BibleAddressSingle } from '$bible/entities/address';
import { bibleBroadcastListSetSingleAddress } from '$bible/entities/broadcast-list';
import { takeBibleLangBooks } from '$bible/ext';
import { bibleTranslateFilter } from '$bible/shared/const/consts';
import { useBibleSimpleCheckedSingleAddress } from '$bible/shared/hooks';
import { useBibleShowTranslatesValue } from '$bible/shared/hooks/translates';
import { takeBibleTranslateBookSizesAtom } from '$bible/shared/lib/takeBibleTranslateBookSizesAtom';
import { useBibleCurrentLangi } from '$bible/shared/lib/useBibleCurrentLangi';
import styled from '@emotion/styled';
import { useAtomValue } from 'atomaric';
import { useEffect, useRef, useState } from 'react';
import { emptyFunc } from 'shared/utils';
import { arrayByLength } from 'shared/utils/object.utils';
import { twMerge } from 'tailwind-merge';

export const BibleReaderCurrentBookAddressSelector = () => {
  const [currentBooki, currentChapteri, currentVersei] = useBibleSimpleCheckedSingleAddress();

  const showTranslates = useBibleShowTranslatesValue();
  const tName = showTranslates[0];

  const [selectedBooki, setSelectedBooki] = useState(currentBooki);
  const [selectedChapteri, setSelectedChapteri] = useState(currentChapteri);
  const onBookCloseRef = useRef(emptyFunc);
  const onChapterCloseRef = useRef(emptyFunc);
  const langi = useBibleCurrentLangi();
  const chapters = useAtomValue(takeBibleTranslateBookSizesAtom(tName));

  useEffect(() => {
    if (currentBooki) setSelectedBooki(booki => booki || currentBooki);
    if (currentChapteri) setSelectedChapteri(chapteri => chapteri || currentChapteri);
  }, [currentBooki, currentChapteri]);

  return (
    <With3Atoms
      init={[false, false, false]}
      render={([isOpenBookSelectorAtom, isOpenChapterSelectorAtom, isOpenVerseSelectorAtom]) => (
        <>
          {' '}
          <span
            className="pointer"
            onClick={isOpenBookSelectorAtom.do.toggle}
          >
            <BibleAddressSingle />
          </span>
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
                  className={twMerge(
                    itemFaceClassName,
                    chapteri === selectedChapteri ? 'bg-x7 text-x1' : 'bg-x2 text-x3',
                    chapteri === currentChapteri && 'font-bold underline',
                  )}
                  chapter-length={chapter}
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
            {arrayByLength(chapters?.[selectedBooki]?.[selectedChapteri] ?? 0, versei => {
              return (
                <ItemFace
                  key={versei}
                  className={twMerge(itemFaceClassName, versei === currentVersei && 'text-x7 font-bold underline')}
                  onClick={() => {
                    bibleBroadcastListSetSingleAddress(selectedBooki, selectedChapteri, versei);
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
      )}
    />
  );
};

const itemFaceClassName = 'inline-flex relative m-[3px] center pointer bg-x2 text-x3 strong-size';

const ItemFace = styled.div`
  --strong-size: calc((100vw - 12 * 3px) / 5);

  &::before {
    content: attr(chapter-length);
    position: absolute;
    top: 0;
    right: 5px;
    color: var(--color--4);
    font-size: 0.8em;
  }
`;
