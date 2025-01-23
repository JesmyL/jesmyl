import { mylib } from 'front/utils';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BibleBooki, BibleChapteri, BibleVersei } from '../../model';
import { useBibleSingleAddressSetter } from '../../translations/lists/atoms';
import BibleReaderChapter from './complect/Chapter';

// String.fromCharCode(i + 162)

interface Props {
  chapterList: { __html: string }[][] | und;
  currentBooki: BibleBooki;
  currentChapteri?: BibleChapteri;
  currentVersei?: BibleVersei;
}

export default function BibleReaderBook({
  chapterList,
  currentChapteri,
  currentVersei,
  currentBooki,
}: Props): JSX.Element {
  const listRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const [resizeNum, setResizeNum] = useState(0);
  const setAddress = useBibleSingleAddressSetter();

  useEffect(() => {
    if (
      chapterList == null ||
      currentChapteri === undefined ||
      currentVersei === undefined ||
      isScrollingRef.current ||
      listRef.current === null
    )
      return;
    const listNode = listRef.current;

    setTimeout(() => {
      const node = listNode.querySelector(`[attr-chapteri="${currentChapteri}"][attr-versei="${currentVersei}"]`);
      node?.scrollIntoView({ block: 'start' });

      listNode.scrollTop += 3;
    }, 400);
  }, [currentChapteri, currentVersei, resizeNum, chapterList]);

  useEffect(() => {
    if (chapterList == null || listRef.current === null) return;

    return mylib.onChildInViewPort(
      listRef.current,
      isScrollingRef,
      setResizeNum,
      elem => elem.hasAttribute('attr-chapteri'),
      elem => {
        const chapteri = +elem.getAttribute('attr-chapteri')!;
        const versei = +elem.getAttribute('attr-versei')!;

        setAddress(undefined, chapteri, versei);
      },
    );
  }, [currentBooki, resizeNum, setAddress, chapterList]);

  return (
    <>
      <List ref={listRef}>
        {chapterList?.map((chapterList, chapteri) => {
          return (
            <BibleReaderChapter
              key={chapteri}
              chapteri={chapteri}
              list={chapterList}
            />
          );
        })}
        <BottomBox />
      </List>
    </>
  );
}

const List = styled.div`
  position: relative;
  height: 100%;
  overflow: auto;
  font-size: 2em;

  insertedtext,
  textinbrackets {
    opacity: 0.6;
    font-style: italic;
    pointer-events: none;
  }
`;

const BottomBox = styled.div`
  height: calc(100% - 1em);
`;
