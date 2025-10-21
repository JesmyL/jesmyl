import { useBibleTranslatesContext } from '$bible/shared/contexts/translates';
import { BibleVersei } from '$bible/shared/model/base';
import { useAtomValue } from 'atomaric';
import { useCallback } from 'react';
import { bibleJoinAddressAtom, bibleVerseiAtom } from '../../state/atoms';
import { useBibleBroadcastSlideSyncContentSetter } from '../slide-sync';
import { useBibleShowTranslatesValue } from '../translates';
import { useBibleBroadcastJoinAddress } from './address';
import { useBibleAddressBooki } from './books';
import { useBibleAddressChapteri } from './chapters';

export const useBibleAddressIsCurrentVersei = (versei: BibleVersei) => {
  const joinAddress = useBibleBroadcastJoinAddress();
  const currentBooki = useBibleAddressBooki();
  const currentChapteri = useBibleAddressChapteri();
  const currentVersei = useBibleAddressVersei();
  return joinAddress === null
    ? currentVersei === versei
    : (joinAddress?.[currentBooki]?.[currentChapteri].includes(versei) ?? false);
};

export const useBibleAddressVersei = (): BibleVersei => {
  const currentChapteri = useBibleAddressChapteri();
  const currentBooki = useBibleAddressBooki();
  const currentVersei = useAtomValue(bibleVerseiAtom);
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
  const currentJoinAddress = useBibleBroadcastJoinAddress();
  const syncSlide = useBibleBroadcastSlideSyncContentSetter();

  return useCallback(
    (versei: BibleVersei, isDblClick: boolean): (() => void) | null => {
      if (isDblClick) syncSlide();
      else bibleJoinAddressAtom.set(null);

      bibleVerseiAtom.set(versei);

      return () => {
        if (currentJoinAddress?.[currentBooki]?.[currentChapteri]?.includes(versei)) {
          bibleJoinAddressAtom.set(currentJoinAddress);
        }
      };
    },
    [currentBooki, currentChapteri, currentJoinAddress, syncSlide],
  );
};

export const usePutBibleJoinAddressSetter = () => {};
