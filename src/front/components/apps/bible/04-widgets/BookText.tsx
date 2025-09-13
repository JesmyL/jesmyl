import { mylib } from '#shared/lib/my-lib';
import { RolledContent } from '#shared/ui/fullscreen-content/RolledContent';
import { BibleBooki, BibleChapteri, BibleVersei } from '$bible/basis/model/base';
import { useBibleSingleAddressSetter } from '$bible/translations/lists/atoms';
import { atom } from 'atomaric';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BibleChapterText } from './ChapterText';

interface Props {
  chapterList: (string[] | und)[] | nil;
  currentBooki: BibleBooki;
  currentChapteri?: BibleChapteri;
  currentVersei?: BibleVersei;
}

const speedKfAtom = atom(10, 'bible:speedRollKf');

export const BibleReaderBookText = ({ chapterList, currentChapteri, currentVersei, currentBooki }: Props) => {
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
      <RolledContent
        speedKfAtom={speedKfAtom}
        elementRef={listRef}
        className="bible-tag-controled-content"
      >
        <List ref={listRef}>
          {chapterList?.map((chapterList, chapteri) => {
            return (
              chapterList && (
                <BibleChapterText
                  key={chapteri}
                  chapteri={chapteri}
                  list={chapterList}
                />
              )
            );
          })}
          <BottomBox />
        </List>
      </RolledContent>
    </>
  );
};

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
