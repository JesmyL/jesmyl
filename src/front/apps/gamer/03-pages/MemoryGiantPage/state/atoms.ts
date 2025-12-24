import { mylib } from '#shared/lib/my-lib';
import { atom } from 'atomaric';

export const gamerMemoryGiantShowAllImagesAtom = atom(false);
export const gamerMemoryGiantGuessedImageisAtom = atom(new Set<number>(), 'gamer:MemoryGiant:guessedImageis');
export const gamerMemoryGiantUsedImagesAtom = atom<string[]>([], 'gamer:MemoryGiant:usedImages');
export const gamerMemoryGiantShowTimeSecondsAtom = atom(1, 'gamer:MemoryGiant:showTimeSeconds');
export const gamerMemoryGiantCurrentKeyNumberAtom = atom('');

export const gamerMemoryGiantShownImageisAtom = atom(new Set<number>(), {
  do: (_, __, self) => ({
    touch: (index: number) => {
      if (
        mylib.isNaN(index) ||
        index < 0 ||
        self.get().size > 1 ||
        gamerMemoryGiantGuessedImageisAtom.get().has(index)
      ) {
        return;
      }

      self.do.toggle(index);
    },
  }),
});

gamerMemoryGiantShownImageisAtom.subscribe(shownImagesSet => {
  if (shownImagesSet.size < 2) return;
  const shownImages = Array.from(shownImagesSet);
  const boardImageis = gamerMemoryGiantBoardImageisAtom.get();

  if (boardImageis && boardImageis[shownImages[0]] === boardImageis[shownImages[1]]) {
    gamerMemoryGiantShownImageisAtom.reset();
    gamerMemoryGiantGuessedImageisAtom.do.add(shownImages[0]);
    gamerMemoryGiantGuessedImageisAtom.do.add(shownImages[1]);
    return;
  }

  startShowTimer();
});

let showTimeout: TimeOut | null = null;

const startShowTimer = () => {
  const showTime = gamerMemoryGiantShowTimeSecondsAtom.get();

  showTimeout = setTimeout(() => {
    gamerMemoryGiantShownImageisAtom.reset();
    showTimeout = null;
  }, showTime * 1000);
};

gamerMemoryGiantShowTimeSecondsAtom.subscribe(() => {
  if (showTimeout !== null) startShowTimer();
});

export const gamerMemoryGiantBoardImageisAtom = atom(null as number[] | null, {
  storeKey: 'gamer:MemoryGiant:boardImageis',
  do: (set, get, self) => ({
    abort: () => {
      self.reset();
      gamerMemoryGiantShownImageisAtom.reset();
      gamerMemoryGiantGuessedImageisAtom.reset();
      gamerMemoryGiantShowAllImagesAtom.reset();
    },
    fillBoard: () => {
      if (get()) return;

      const indexes = gamerMemoryGiantUsedImagesAtom.get().map((_, i) => i);
      set(mylib.toRandomSorted(indexes.concat(indexes)));
    },
  }),
});
