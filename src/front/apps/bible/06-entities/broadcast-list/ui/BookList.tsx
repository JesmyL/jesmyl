import { takeBibleLangBooks } from '$bible/ext';
import { bibleAddressWithForceJoinReset, takeBibleSimpleCheckedSingleAddress } from '$bible/shared/hooks';
import { useBibleCurrentLangi } from '$bible/shared/lib/useBibleCurrentLangi';
import { bibleJoinAddressAtom } from '$bible/shared/state/atoms';
import styled from '@emotion/styled';
import { checkIsNil } from 'shared/utils/checkIs';
import { twJoin } from 'tailwind-merge';
import { bibleBroadcastListSetSingleAddress } from '../lib/hooks';
import { useBibleBroadcastListFaceClickListener } from '../lib/useBibleListFaceClickListener';

const faceClassName = 'bible-list-chapter-face';

export function BibleBroadcastListBooks() {
  const langi = useBibleCurrentLangi();

  const listRef = useBibleBroadcastListFaceClickListener('data-booki', faceClassName, (booki, event) => {
    if (event.ctrlKey) {
      if (checkIsNil(bibleJoinAddressAtom.get()[0])) {
        const [booki, chapteri, versei] = takeBibleSimpleCheckedSingleAddress(null, null, null, null);
        bibleJoinAddressAtom.set([{ [booki]: { [chapteri]: [versei] } }]);
      }
    } else bibleAddressWithForceJoinReset(booki);

    bibleBroadcastListSetSingleAddress(booki);
  });

  return (
    <StyledList
      ref={listRef}
      className="overflow-y-auto overflow-x-hidden"
      title="Ctrl - добавить из книги"
    >
      {takeBibleLangBooks(langi).map((book, booki) => {
        return (
          <div
            key={booki}
            data-booki={booki}
            className={twJoin('bible-list-face pointer w-[7em] min-w-[7em] text-x7', faceClassName)}
          >
            {book.short}
          </div>
        );
      })}
    </StyledList>
  );
}

const StyledList = styled.div`
  [data-booki] {
    counter-increment: book;

    &:before {
      content: counter(book) ' ';
      color: var(--color-x3);
    }
  }
`;
