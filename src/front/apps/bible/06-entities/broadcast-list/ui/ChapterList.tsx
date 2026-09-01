import { bibleAddressWithForceJoinReset } from '$bible/shared/hooks';
import { useBibleCurrentChapterList } from '$bible/shared/hooks/texts';
import { Atom, atom } from 'atomaric';
import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { useBibleBroadcastListFaceClickListener } from '../lib/useBibleListFaceClickListener';

const faceClassName = 'bible-list-chapter-face';

let fastChaptersCountAtom: Atom<number>;

export function BibleBroadcastListChapters() {
  fastChaptersCountAtom ??= atom(0, 'bible:fastChaptersCount');

  const chapters = useBibleCurrentChapterList();

  const listRef = useBibleBroadcastListFaceClickListener('data-chapteri', faceClassName, chapteri =>
    bibleAddressWithForceJoinReset(undefined, chapteri, 0),
  );

  const chapterNumbers = useMemo(() => {
    const chaptersCount = chapters?.length ?? fastChaptersCountAtom.get();
    const numbers: number[] = [];

    for (let i = 0; i < chaptersCount; i++) numbers.push(i);

    fastChaptersCountAtom.set(chaptersCount);
    return numbers;
  }, [chapters?.length]);

  return (
    <div
      ref={listRef}
      className="w-[2.5em] min-w-[2.5em] overflow-y-auto overflow-x-hidden"
    >
      {chapterNumbers?.map(chapteri => {
        return (
          <div
            key={chapteri}
            data-chapteri={chapteri}
            className={twMerge('bible-list-face pointer', faceClassName)}
          >
            {chapteri + 1}
          </div>
        );
      })}
    </div>
  );
}
