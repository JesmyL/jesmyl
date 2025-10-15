import { useSetBibleAddressWithForceJoinReset } from '$bible/shared/hooks';
import { useBibleBookList } from '$bible/shared/hooks/texts';
import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';
import { bibleBroadcastListBookiIdPrefix } from '../const/ids';
import { useBibleBroadcastListSingleAddressSetter } from '../lib/hooks';
import { useBibleBroadcastListFaceClickListener } from '../lib/useBibleListFaceClickListener';

const faceClassName = 'bible-list-chapter-face';

export function BibleBroadcastListBooks() {
  const books = useBibleBookList();
  const setValue = useBibleBroadcastListSingleAddressSetter();
  const setAddress = useSetBibleAddressWithForceJoinReset();
  const listRef = useBibleBroadcastListFaceClickListener(bibleBroadcastListBookiIdPrefix, faceClassName, booki =>
    setAddress(booki, 0, 0),
  );

  return (
    <Container ref={listRef}>
      {books.map((book, booki) => {
        return (
          <Face
            key={booki}
            id={bibleBroadcastListBookiIdPrefix + booki}
            className={twMerge('bible-list-face pointer', faceClassName)}
            onClick={() => setValue(booki, 0, 0)}
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
