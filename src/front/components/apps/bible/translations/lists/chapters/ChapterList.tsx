import { JStorageNumberVal } from '#shared/lib/JSimpleStorage/exports/Number';
import { useSetBibleAddressWithForceJoinReset } from '@bible/hooks/address/address';
import { useBibleCurrentChapterList } from '@bible/hooks/texts';
import { useMemo } from 'react';
import styled from 'styled-components';
import { bibleChapteriIdPrefix } from '../lib/consts';
import { useBibleListFaceClickListener } from '../lib/useBibleListFaceClickListener';

const faceClassName = 'bible-list-chapter-face';

const fastChaptersCount = new JStorageNumberVal('bible', 'fastChaptersCount', 0);

export function BibleChapterList() {
  const chapters = useBibleCurrentChapterList();
  const setAddress = useSetBibleAddressWithForceJoinReset();

  const listRef = useBibleListFaceClickListener(bibleChapteriIdPrefix, faceClassName, chapteri =>
    setAddress(undefined, chapteri, 0),
  );

  const chapterNumbers = useMemo(() => {
    const chaptersCount = chapters?.length ?? fastChaptersCount.get();
    const numbers: number[] = [];

    for (let i = 0; i < chaptersCount; i++) numbers.push(i);

    fastChaptersCount.set(chaptersCount);
    return numbers;
  }, [chapters?.length]);

  return (
    <Container ref={listRef}>
      {chapterNumbers?.map(chapteri => {
        return (
          <div
            key={chapteri}
            id={bibleChapteriIdPrefix + chapteri}
            className={`bible-list-face pointer ${faceClassName}`}
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
