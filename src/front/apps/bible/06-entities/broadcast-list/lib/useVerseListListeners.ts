import { addEventListenerPipe, clearTimeoutPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { useBibleAddressVersei, useBibleBroadcastJoinAddress } from '$bible/shared/hooks';
import { useBibleBroadcastSlideSyncContentSetter } from '$bible/shared/hooks/slide-sync';
import { BibleBooki, BibleBroadcastJoinAddress, BibleChapteri } from '$bible/shared/model/base';
import { bibleJoinAddressAtom, bibleVerseiAtom } from '$bible/shared/state/atoms';
import { useEffect } from 'react';
import { checkIsNaN, checkIsNil } from 'shared/utils/checkIs';
import { objectLength } from 'shared/utils/object.utils';

export const useBibleBroadcastListVerseListeners = (
  verseListNodeRef: { current: HTMLOListElement | null },
  currentBooki: BibleBooki,
  currentChapteri: BibleChapteri,
) => {
  const currentJoinAddress = useBibleBroadcastJoinAddress();
  const syncSlide = useBibleBroadcastSlideSyncContentSetter();
  const currentVersei = useBibleAddressVersei();
  const currentJoin = currentJoinAddress[0]?.[currentBooki]?.[currentChapteri];

  useEffect(() => {
    if (verseListNodeRef.current === null) return;
    const verseListNode = verseListNodeRef.current;

    let clickTimeout: TimeOut;
    let isDblClick = false;

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(verseListNode, 'mousedown', event => {
          const versei = +((event.target as HTMLDivElement | null)?.getAttribute?.('data-versei') as string);

          if (checkIsNaN(versei)) return;

          const ctrlKey = event.ctrlKey;
          const shiftKey = event.shiftKey;

          clearTimeout(clickTimeout);
          if (isDblClick) {
            if (!currentJoin?.includes(versei)) {
              bibleJoinAddressAtom.reset();
              bibleVerseiAtom.set(versei);
            }
            syncSlide();
            isDblClick = false;
            return;
          }

          isDblClick = true;

          clickTimeout = setTimeout(() => {
            if (!ctrlKey && !shiftKey) {
              bibleJoinAddressAtom.reset();
              bibleVerseiAtom.set(versei);

              return;
            }

            let newJoin: BibleBroadcastJoinAddress = { ...currentJoinAddress[0] };
            bibleVerseiAtom.set(versei);

            if (checkIsNil(currentJoinAddress[0])) {
              const verses = ((newJoin[currentBooki] ??= {})[currentChapteri] ??= []);

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
              const verses = currentJoinAddress[0][currentBooki]?.[currentChapteri] ?? [];
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

              newJoin[currentBooki] = { ...currentJoinAddress[0][currentBooki], [currentChapteri]: chapter };

              if (chapter.length === 0) {
                delete newJoin[currentBooki][currentChapteri];
                if (objectLength(newJoin[currentBooki]) === 0) {
                  delete newJoin[currentBooki];
                  if (objectLength(newJoin) === 0) newJoin = null!;
                }
              }
            }

            bibleJoinAddressAtom.set([newJoin]);
          }, 150);
        }),
        clearTimeoutPipe(clickTimeout),
      )
      .effect();
  }, [currentBooki, currentChapteri, currentJoin, currentJoinAddress, currentVersei, syncSlide, verseListNodeRef]);
};
