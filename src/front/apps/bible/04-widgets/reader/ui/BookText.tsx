import { usePinchValue } from '#shared/lib/usePinchValue';
import { onChildInViewPort } from '#shared/lib/utils';
import { RolledContent } from '#shared/ui/fullscreen-content/RolledContent';
import { bibleTagControledContentGlobalCssNode } from '$bible/shared/const/bibleTagControledContentGlobalCssNode';
import { BibleBooki, BibleChapteri, BibleVersei } from '$bible/shared/model/base';
import { bibleChapteriAtom, bibleVerseiAtom } from '$bible/shared/state/atoms';
import styled from '@emotion/styled';
import { Atom, atom, useAtomValue } from 'atomaric';
import { useEffect, useRef, useState } from 'react';
import { BibleReaderChapterText } from './ChapterText';

interface Props {
  chapterList: (string[] | und)[] | nil;
  currentBooki: BibleBooki;
  currentChapteri?: BibleChapteri;
  currentVersei?: BibleVersei;
}

let speedKfAtom: Atom<number>;
let fontSizeAtom: Atom<number>;

export const BibleReaderBookText = ({ chapterList, currentChapteri, currentVersei, currentBooki }: Props) => {
  speedKfAtom ??= atom(10, 'bible:speedRollKf');
  fontSizeAtom ??= atom(30, {
    storageKey: 'bible:fontSize',
    map: val => Math.min(Math.max(Math.abs(Math.trunc(val)), 10), 50),
  });

  const listRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const [resizeNum, setResizeNum] = useState(0);
  const fontSizeReal = useAtomValue(fontSizeAtom);
  const fontSize = usePinchValue(
    listRef,
    fontSizeReal,
    fs => {
      fontSizeAtom.set(fs);
      setResizeNum(it => it + 1);

      if (listRef.current == null) return;

      const node = listRef.current.querySelector(
        `[attr-chapteri="${currentChapteri}"][attr-versen="${currentVersei! + 1}"]`,
      );
      node?.scrollIntoView({ block: 'start' });

      listRef.current.scrollTop += 3;
    },
    0.5,
  );

  useEffect(() => {
    if (
      isScrollingRef.current ||
      chapterList == null ||
      currentChapteri === undefined ||
      currentVersei === undefined ||
      listRef.current === null
    )
      return;
    const listNode = listRef.current;

    setTimeout(() => {
      const node = listNode.querySelector(`[attr-chapteri="${currentChapteri}"][attr-versen="${currentVersei + 1}"]`);
      node?.scrollIntoView({ block: 'start' });

      listNode.scrollTop += 3;
    }, 400);
  }, [currentChapteri, currentVersei, resizeNum, chapterList]);

  useEffect(() => {
    if (chapterList == null || listRef.current === null) return;

    return onChildInViewPort(
      listRef.current,
      isScrollingRef,
      setResizeNum,
      elem => elem.hasAttribute('attr-chapteri'),
      elem => {
        const chapteri = +elem.getAttribute('attr-chapteri')!;
        const versei = +elem.getAttribute('attr-versen')! - 1;

        bibleChapteriAtom.set(chapteri);
        bibleVerseiAtom.set(versei);
      },
    );
  }, [currentBooki, resizeNum, chapterList]);

  return (
    <>
      {bibleTagControledContentGlobalCssNode}
      <RolledContent
        speedKfAtom={speedKfAtom}
        elementRef={listRef}
        className="bible-tag-controled-content"
        style={{ fontSize }}
      >
        <List ref={listRef}>
          {chapterList?.map((chapterList, chapteri) => {
            return (
              chapterList && (
                <BibleReaderChapterText
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

  insertedtext,
  textinbrackets {
    opacity: 0.6;
    font-style: italic;
    pointer-events: none;
  }

  [attr-versen]::before {
    content: attr(attr-versen) '. ';
    color: var(--color-x7);
  }
`;

const BottomBox = styled.div`
  height: calc(100% - 1em);
`;
