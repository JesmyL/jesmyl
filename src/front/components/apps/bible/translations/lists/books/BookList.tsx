import styled from 'styled-components';
import { useSetBibleAddressWithForceJoinReset } from '../../../hooks/address/address';
import { useBibleBookList } from '../../../hooks/texts';
import { useBibleSingleAddressSetter } from '../atoms';
import { useBibleListFaceClickListener } from '../complect';

export const bookiIdPrefix = 'bible-booki-';
const faceClassName = 'bible-list-chapter-face';

export function BibleBookList() {
  const books = useBibleBookList();
  const setValue = useBibleSingleAddressSetter();
  const setAddress = useSetBibleAddressWithForceJoinReset();
  const listRef = useBibleListFaceClickListener(bookiIdPrefix, faceClassName, booki => setAddress(booki, 0, 0));

  return (
    <Container ref={listRef}>
      {books.map((book, booki) => {
        return (
          <Face
            key={booki}
            id={bookiIdPrefix + booki}
            className={`bible-list-face pointer ${faceClassName}`}
            onClick={() => setValue(booki, 0, 0)}
          >
            {booki + 1} <span className="title">{book[1]}</span>
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
