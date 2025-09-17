import { useSetBibleAddressWithForceJoinReset } from '$bible/basis/lib/hooks/address/address';
import { useBibleBookList } from '$bible/basis/lib/hooks/texts';
import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';
import { useBibleSingleAddressSetter } from '../atoms';
import { bibleBookiIdPrefix } from '../lib/consts';
import { useBibleListFaceClickListener } from '../lib/useBibleListFaceClickListener';

const faceClassName = 'bible-list-chapter-face';

export function BibleBookList() {
  const books = useBibleBookList();
  const setValue = useBibleSingleAddressSetter();
  const setAddress = useSetBibleAddressWithForceJoinReset();
  const listRef = useBibleListFaceClickListener(bibleBookiIdPrefix, faceClassName, booki => setAddress(booki, 0, 0));

  return (
    <Container ref={listRef}>
      {books.map((book, booki) => {
        return (
          <Face
            key={booki}
            id={bibleBookiIdPrefix + booki}
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
