import { useSetBibleAddressWithForceJoinReset } from '$bible/basis/lib/hooks/address/address';
import { useBibleCurrentChapterList } from '$bible/basis/lib/hooks/texts';
import { atom } from 'atomaric';
import { useMemo } from 'react';
import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';
import { bibleChapteriIdPrefix } from '../lib/consts';
import { useBibleListFaceClickListener } from '../lib/useBibleListFaceClickListener';

const faceClassName = 'bible-list-chapter-face';

const fastChaptersCountAtom = atom(0, 'bible:fastChaptersCount');

export function BibleChapterList() {
  const chapters = useBibleCurrentChapterList();
  const setAddress = useSetBibleAddressWithForceJoinReset();

  const listRef = useBibleListFaceClickListener(bibleChapteriIdPrefix, faceClassName, chapteri =>
    setAddress(undefined, chapteri, 0),
  );

  const chapterNumbers = useMemo(() => {
    const chaptersCount = chapters?.length ?? fastChaptersCountAtom.get();
    const numbers: number[] = [];

    for (let i = 0; i < chaptersCount; i++) numbers.push(i);

    fastChaptersCountAtom.set(chaptersCount);
    return numbers;
  }, [chapters?.length]);

  return (
    <Container ref={listRef}>
      {chapterNumbers?.map(chapteri => {
        return (
          <div
            key={chapteri}
            id={bibleChapteriIdPrefix + chapteri}
            className={twMerge('bible-list-face pointer', faceClassName)}
          >
            {chapteri + 1}
          </div>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  width: 2.5em;

  overflow-y: auto;
  overflow-x: hidden;
`;
