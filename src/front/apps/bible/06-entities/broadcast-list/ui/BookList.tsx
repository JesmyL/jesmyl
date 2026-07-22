import { bibleAddressWithForceJoinReset } from '$bible/shared/hooks';
import { useBibleBookList } from '$bible/shared/hooks/texts';
import styled from '@emotion/styled';
import { twMerge } from 'tailwind-merge';
import { bibleBroadcastListBookiIdPrefix } from '../const/ids';
import { bibleBroadcastListSingleAddressSet } from '../lib/hooks';
import { useBibleBroadcastListFaceClickListener } from '../lib/useBibleListFaceClickListener';

const faceClassName = 'bible-list-chapter-face';

export function BibleBroadcastListBooks() {
  const books = useBibleBookList();
  const listRef = useBibleBroadcastListFaceClickListener(bibleBroadcastListBookiIdPrefix, faceClassName, booki =>
    bibleAddressWithForceJoinReset(booki, 0, 0),
  );

  return (
    <Container ref={listRef}>
      {books.map((book, booki) => {
        return (
          <Face
            key={booki}
            id={bibleBroadcastListBookiIdPrefix + booki}
            className={twMerge('bible-list-face pointer', faceClassName)}
            onClick={() => bibleBroadcastListSingleAddressSet(booki, 0, 0)}
          >
            {booki + 1} <span className="title">{book.short}</span>
          </Face>
        );
      })}
    </Container>
  );
}

const Face = styled.div`
  width: 7em;

  .title {
    color: var(--color--7);
  }
`;

const Container = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
`;
