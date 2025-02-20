import { useCallback } from 'react';
import { bibleIDB } from '../../../_db/bibleIDB';
import { BibleVersei } from '../../../model';
import { useBibleTranslatesContext } from '../../../translates/TranslatesContext';
import { useBibleShowTranslatesValue } from '../../../translates/hooks';
import { useBibleVersei } from '../atoms';
import { useBibleTranslationJoinAddress } from './address';
import { useBibleCurrentBooki } from './books';
import { useBibleCurrentChapteri } from './chapters';
import { useBibleTranslationSlideSyncContentSetter } from './slide-sync';

const useBibleAddressCurrentVersei = () => useBibleVersei()[0];

export const useBibleAddressIsCurrentVersei = (versei: BibleVersei) => {
  const joinAddress = useBibleTranslationJoinAddress();
  const currentBooki = useBibleCurrentBooki();
  const currentChapteri = useBibleCurrentChapteri();
  const currentVersei = useBibleCurrentVersei();
  return joinAddress === null
    ? currentVersei === versei
    : joinAddress?.[currentBooki]?.[currentChapteri].includes(versei) ?? false;
};

export const useBibleCurrentVersei = (): BibleVersei => {
  const currentChapteri = useBibleCurrentChapteri();
  const currentBooki = useBibleCurrentBooki();
  const currentVersei = useBibleAddressCurrentVersei();
  const showTranslates = useBibleShowTranslatesValue();
  const chapter = useBibleTranslatesContext()[showTranslates[0]]?.chapters?.[currentBooki]?.[currentChapteri];

  return currentVersei < 0
    ? 0
    : chapter != null && currentVersei > chapter.length - 1
      ? chapter.length - 1
      : currentVersei;
};

export const usePutBibleAddressVerseiSetter = () => {
  const currentChapteri = useBibleCurrentChapteri();
  const currentBooki = useBibleCurrentBooki();
  const currentJoinAddress = useBibleTranslationJoinAddress();
  const syncSlide = useBibleTranslationSlideSyncContentSetter();

  return useCallback(
    (versei: BibleVersei, isDblClick: boolean): (() => void) | null => {
      if (isDblClick) syncSlide();
      else bibleIDB.set.joinAddress(null);

      bibleIDB.set.versei(versei);

      return () => {
        if (currentJoinAddress?.[currentBooki]?.[currentChapteri]?.includes(versei)) {
          bibleIDB.set.joinAddress(currentJoinAddress);
        }
      };
    },
    [currentBooki, currentChapteri, currentJoinAddress, syncSlide],
  );
};

export const usePutBibleJoinAddressSetter = () => {};
