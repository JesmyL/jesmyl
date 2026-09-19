import { translateDynamic } from '#basis/locale';
import { usePinchValue } from '#shared/lib/usePinchValue';
import { onChildInViewPort } from '#shared/lib/utils';
import { RolledContent } from '#shared/ui/fullscreen-content/RolledContent';
import { bibleTagControledContentGlobalCssNode } from '$bible/shared/const/bibleTagControledContentGlobalCssNode';
import { bibleTranslateLanguage } from '$bible/shared/const/consts';
import { useBibleShowTranslatesValue } from '$bible/shared/hooks/translates';
import { BibleBooki, BibleChapteri, BibleVersei } from '$bible/shared/model/base';
import { bibleChapteriAtom, bibleVerseiAtom } from '$bible/shared/state/atoms';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Atom, atom, useAtomValue } from 'atomaric';
import React, { useEffect, useRef, useState } from 'react';
import { Langi } from 'shared/api';
import { checkIsNil } from 'shared/utils/checkIs';
import { BibleReaderChapterText } from './ChapterText';

interface Props {
  chapterList: (string[] | und)[];
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

  const showTranslates = useBibleShowTranslatesValue();
  const tName = showTranslates[0];

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

      if (!listRef.current) return;

      const node = listRef.current.querySelector(
        `[attr-chapteri="${currentChapteri}"][data-versen="${currentVersei! + 1}"]`,
      );
      node?.scrollIntoView({ block: 'start' });

      listRef.current.scrollTop += 3;
    },
    0.5,
  );

  useEffect(() => {
    if (
      isScrollingRef.current ||
      checkIsNil(currentChapteri) ||
      checkIsNil(currentVersei) ||
      checkIsNil(listRef.current)
    )
      return;
    const listNode = listRef.current;

    setTimeout(() => {
      const node = listNode.querySelector(`[attr-chapteri="${currentChapteri}"][data-versen="${currentVersei + 1}"]`);
      node?.scrollIntoView({ block: 'start' });

      listNode.scrollTop += 3;
    }, 400);
  }, [currentChapteri, currentVersei, resizeNum, chapterList]);

  useEffect(() => {
    if (checkIsNil(listRef.current)) return;

    return onChildInViewPort(
      listRef.current,
      isScrollingRef,
      setResizeNum,
      elem => elem.hasAttribute('attr-chapteri'),
      elem => {
        const chapteri = +elem.getAttribute('attr-chapteri')!;
        const versei = +elem.getAttribute('data-versen')! - 1;

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
        <List
          ref={listRef}
          $langi={bibleTranslateLanguage[tName]}
          $booki={currentBooki}
          className="relative h-full overflow-auto"
        >
          {chapterList?.map((chapterList, chapteri) => {
            return (
              <React.Fragment key={chapteri}>
                <div data-chaptern={chapteri + 1} />
                {chapterList && (
                  <BibleReaderChapterText
                    chapteri={chapteri}
                    list={chapterList}
                  />
                )}
              </React.Fragment>
            );
          })}
          <div className="h-[calc(100%-1.2em)]" />
        </List>
      </RolledContent>
    </>
  );
};

const List = styled.div<{ $langi: Langi; $booki: BibleBooki }>`
  insertedtext,
  textinbrackets {
    opacity: 0.6;
    font-style: italic;
    pointer-events: none;
  }

  [data-versen]::before {
    content: attr(data-versen) '. ';
    color: var(--color-x7);
  }

  ${props => css`
    [data-chaptern] {
      font-size: 1.5em;
      margin-block: 0.5em;
      font-weight: bold;
      color: var(--color-x3);

      &::before {
        content: '${translateDynamic(props.$langi)(it => it.bible.chapterNum, {
          c: "'attr(data-chaptern)'",
          b: `${props.$booki}`,
        })}';
      }
    }
  `}
`;
