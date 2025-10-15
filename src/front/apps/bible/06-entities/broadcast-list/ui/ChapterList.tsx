import { useSetBibleAddressWithForceJoinReset } from '$bible/shared/hooks';
import { useBibleCurrentChapterList } from '$bible/shared/hooks/texts';
import { atom } from 'atomaric';
import { useMemo } from 'react';
import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';
import { bibleBroadcastListChapteriIdPrefix } from '../const/ids';
import { useBibleBroadcastListFaceClickListener } from '../lib/useBibleListFaceClickListener';

const faceClassName = 'bible-list-chapter-face';

const fastChaptersCountAtom = atom(0, 'bible:fastChaptersCount');

export function BibleBroadcastListChapters() {
  const chapters = useBibleCurrentChapterList();
  const setAddress = useSetBibleAddressWithForceJoinReset();

  const listRef = useBibleBroadcastListFaceClickListener(bibleBroadcastListChapteriIdPrefix, faceClassName, chapteri =>
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
            id={bibleBroadcastListChapteriIdPrefix + chapteri}
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
