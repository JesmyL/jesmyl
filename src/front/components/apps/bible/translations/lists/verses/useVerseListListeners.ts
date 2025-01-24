import { mylib } from 'front/utils';
import { useEffect } from 'react';
import { bibleIDB } from '../../../_db/bibleIDB';
import { useBibleTranslationJoinAddress, useBibleTranslationJoinAddressSetter } from '../../../hooks/address/address';
import { useBibleAddressVersei } from '../../../hooks/address/verses';
import { useBibleTranslationSlideSyncContentSetter } from '../../../hooks/slide-sync';
import { BibleBooki, BibleChapteri, BibleTranslationJoinAddress } from '../../../model';
import { verseiIdPrefix } from './VerseList';

export const useVerseListListeners = (
  verseListNodeRef: { current: HTMLDivElement | null },
  currentBooki: BibleBooki,
  currentChapteri: BibleChapteri,
) => {
  const currentJoinAddress = useBibleTranslationJoinAddress();
  const syncSlide = useBibleTranslationSlideSyncContentSetter();
  const setJoin = useBibleTranslationJoinAddressSetter();
  const currentVersei = useBibleAddressVersei();
  const currentJoin = currentJoinAddress?.[currentBooki]?.[currentChapteri];

  useEffect(() => {
    if (verseListNodeRef.current === null) return;
    const verseListNode = verseListNodeRef.current;

    let clickTimeout: TimeOut;
    let isDblClick = false;

    return hookEffectLine()
      .addEventListener(verseListNode, 'mousedown', event => {
        const verseNode = event.target as HTMLDivElement | null;

        if (verseNode === null || !verseNode.id.startsWith(verseiIdPrefix)) return;
        const ctrlKey = event.ctrlKey;
        const shiftKey = event.shiftKey;
        const versei = +verseNode.id.slice(verseiIdPrefix.length);

        if (mylib.isNaN(versei)) return;

        clearTimeout(clickTimeout);
        if (isDblClick) {
          if (!currentJoin?.includes(versei)) {
            setJoin(null);
            bibleIDB.set.versei(versei);
          }
          syncSlide();
          isDblClick = false;
          return;
        }

        isDblClick = true;

        clickTimeout = setTimeout(() => {
          if (!ctrlKey && !shiftKey) {
            setJoin(null);
            bibleIDB.set.versei(versei);

            return;
          }

          let newJoin = { ...currentJoinAddress } as BibleTranslationJoinAddress;
          bibleIDB.set.versei(versei);

          if (currentJoinAddress == null) {
            const verses = ((newJoin[currentBooki] = {} as BibleTranslationJoinAddress[BibleBooki])[currentChapteri] =
              [] as number[]);

            if (ctrlKey) {
              if (currentVersei === versei) verses.push(versei);
              else verses.push(currentVersei, versei);
            } else if (shiftKey) {
              if (currentVersei === versei) verses.push(versei);
              else {
                const min = Math.min(currentVersei, versei);
                const max = Math.max(currentVersei, versei);

                for (let i = min; i <= max; i++) verses.push(i);
              }
            }
          } else {
            const verses = currentJoinAddress[currentBooki]?.[currentChapteri] ?? [];
            const versesSet = new Set(verses);

            if (ctrlKey) {
              if (versesSet.has(versei)) versesSet.delete(versei);
              else versesSet.add(versei);
            }

            if (shiftKey) {
              const min = Math.min(verses[verses.length - 1] ?? currentVersei, versei);
              const max = Math.max(verses[verses.length - 1] ?? currentVersei, versei);

              for (let i = min; i <= max; i++) versesSet.add(i);
            }
            const chapter = Array.from(versesSet);

            newJoin[currentBooki] = {
              ...currentJoinAddress[currentBooki],
              [currentChapteri]: chapter,
            };

            if (chapter.length === 0) {
              delete newJoin[currentBooki][currentChapteri];
              if (mylib.keys(newJoin[currentBooki]).length === 0) {
                delete newJoin[currentBooki];
                if (mylib.keys(newJoin).length === 0) newJoin = null!;
              }
            }
          }

          setJoin(newJoin);
        }, 150);
      })
      .clearTimeout(clickTimeout)
      .effect();
  }, [
    currentBooki,
    currentChapteri,
    currentJoin,
    currentJoinAddress,
    currentVersei,
    setJoin,
    syncSlide,
    verseListNodeRef,
  ]);
};
