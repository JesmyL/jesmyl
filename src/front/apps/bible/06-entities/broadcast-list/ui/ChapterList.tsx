import { bibleAddressWithForceJoinReset, useBibleAddressChapteri, useBibleAddressVersei } from '$bible/shared/hooks';
import { useBibleCurrentChapterList } from '$bible/shared/hooks/texts';
import { bibleBookiAtom, bibleJoinAddressAtom } from '$bible/shared/state/atoms';
import { Atom, atom } from 'atomaric';
import { useMemo } from 'react';
import { checkIsNil } from 'shared/utils/checkIs';
import { twJoin } from 'tailwind-merge';
import { bibleBroadcastListSetSingleAddress } from '../lib/hooks';
import { useBibleBroadcastListFaceClickListener } from '../lib/useBibleListFaceClickListener';

const faceClassName = 'bible-list-chapter-face';

let fastChaptersCountAtom: Atom<number>;

export function BibleBroadcastListChapters() {
  fastChaptersCountAtom ??= atom(0, 'bible:fastChaptersCount');
  const currentChapteri = useBibleAddressChapteri();
  const currentVersei = useBibleAddressVersei();

  const chapters = useBibleCurrentChapterList();

  const listRef = useBibleBroadcastListFaceClickListener('data-chapteri', faceClassName, (chapteri, event) => {
    if (event.ctrlKey) {
      if (checkIsNil(bibleJoinAddressAtom.get()[0])) {
        bibleJoinAddressAtom.set([{ [bibleBookiAtom.get()]: { [currentChapteri]: [currentVersei] } }]);
      }
    } else bibleAddressWithForceJoinReset(null, chapteri);
    bibleBroadcastListSetSingleAddress(null, chapteri);
  });

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
      title="Ctrl - добавить из главы"
    >
      {chapterNumbers?.map(chapteri => {
        return (
          <div
            key={chapteri}
            data-chapteri={chapteri}
            className={twJoin('bible-list-face pointer', faceClassName)}
          >
            {chapteri + 1}
          </div>
        );
      })}
    </div>
  );
}
