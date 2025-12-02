import { mylib } from '#shared/lib/my-lib';
import { atom } from 'atomaric';

export const gamerMemoryGiantShownImageisAtom = atom(new Set<number>(), 'gamer:MemoryGiant:shownImageis');
export const gamerMemoryGiantGuessedImageisAtom = atom(new Set<number>(), 'gamer:MemoryGiant:guessedImageis');
export const gamerMemoryGiantUsedImagesAtom = atom<string[]>([], 'gamer:MemoryGiant:usedImages');

if (gamerMemoryGiantShownImageisAtom.get().size > 1) {
  gamerMemoryGiantShownImageisAtom.do.clear();
}

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

  setTimeout(() => {
    gamerMemoryGiantShownImageisAtom.reset();
  }, 1000);
});

export const gamerMemoryGiantBoardImageisAtom = atom(null as number[] | null, {
  storeKey: 'gamer:MemoryGiant:boardImageis',
  do: (set, get, self) => ({
    abort: () => {
      self.reset();
      gamerMemoryGiantShownImageisAtom.reset();
      gamerMemoryGiantGuessedImageisAtom.reset();
    },
    fillBoard: () => {
      if (get()) return;
      set(
        mylib.toRandomSorted(
          gamerMemoryGiantUsedImagesAtom
            .get()
            .map((_, i) => [i, i])
            .flat(),
        ),
      );
    },
  }),
});
