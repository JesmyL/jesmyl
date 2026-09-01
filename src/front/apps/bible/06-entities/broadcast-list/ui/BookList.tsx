import { takeBibleLangBooks } from '$bible/ext';
import { bibleAddressWithForceJoinReset } from '$bible/shared/hooks';
import { useBibleCurrentLangi } from '$bible/shared/state/atoms';
import styled from '@emotion/styled';
import { twMerge } from 'tailwind-merge';
import { bibleBroadcastListSingleAddressSet } from '../lib/hooks';
import { useBibleBroadcastListFaceClickListener } from '../lib/useBibleListFaceClickListener';

const faceClassName = 'bible-list-chapter-face';

export function BibleBroadcastListBooks() {
  const langi = useBibleCurrentLangi();
  const listRef = useBibleBroadcastListFaceClickListener('data-booki', faceClassName, booki =>
    bibleAddressWithForceJoinReset(booki, 0, 0),
  );

  return (
    <div
      ref={listRef}
      className="overflow-y-auto overflow-x-hidden"
    >
      {takeBibleLangBooks(langi).map((book, booki) => {
        return (
          <Face
            key={booki}
            data-booki={booki}
            className={twMerge('bible-list-face pointer w-[7em] min-w-[7em] ', faceClassName)}
            onClick={() => bibleBroadcastListSingleAddressSet(booki, 0, 0)}
          >
            {booki + 1} <span className="title">{book.short}</span>
          </Face>
        );
      })}
    </div>
  );
}

const Face = styled.div`
  .title {
    color: var(--color--7);
  }
`;
