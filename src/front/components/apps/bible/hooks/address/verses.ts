import { useCallback } from 'react';
import { bibleIDB } from '../../_db/bibleIDB';
import { BibleVersei } from '../../model';
import { useBibleTranslatesContext } from '../../translates/TranslatesContext';
import { useBibleShowTranslatesValue } from '../../translates/hooks';
import { useBibleVersei } from '../../translations/lists/atoms';
import { useBibleTranslationSlideSyncContentSetter } from '../slide-sync';
import { useBibleTranslationJoinAddress, useBibleTranslationJoinAddressSetter } from './address';
import { useBibleAddressBooki } from './books';
import { useBibleAddressChapteri } from './chapters';

const useBibleAddressCurrentVersei = () => useBibleVersei()[0];

export const useBibleAddressIsCurrentVersei = (versei: BibleVersei) => {
  const joinAddress = useBibleTranslationJoinAddress();
  const currentBooki = useBibleAddressBooki();
  const currentChapteri = useBibleAddressChapteri();
  const currentVersei = useBibleAddressVersei();
  return joinAddress === null
    ? currentVersei === versei
    : joinAddress?.[currentBooki]?.[currentChapteri].includes(versei) ?? false;
};

export const useBibleAddressVersei = (): BibleVersei => {
  const currentChapteri = useBibleAddressChapteri();
  const currentBooki = useBibleAddressBooki();
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
  const currentChapteri = useBibleAddressChapteri();
  const currentBooki = useBibleAddressBooki();
  const currentJoinAddress = useBibleTranslationJoinAddress();
  const syncSlide = useBibleTranslationSlideSyncContentSetter();
  const setJoin = useBibleTranslationJoinAddressSetter();

  return useCallback(
    (versei: BibleVersei, isDblClick: boolean): (() => void) | null => {
      if (isDblClick) syncSlide();
      else setJoin(null);

      bibleIDB.set.versei(versei);

      return () => {
        if (currentJoinAddress?.[currentBooki]?.[currentChapteri]?.includes(versei)) {
          setJoin(currentJoinAddress);
        }
      };
    },
    [currentBooki, currentChapteri, currentJoinAddress, setJoin, syncSlide],
  );
};

export const usePutBibleJoinAddressSetter = () => {};
