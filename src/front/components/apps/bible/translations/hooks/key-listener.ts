import { useEffect, useState } from 'react';
import mylib from '../../../../../complect/my-lib/MyLib';
import {
  useBibleTranslationAddressIndexesSetter,
  useBibleTranslationJoinAddress,
  useBibleTranslationJoinAddressSetter,
} from '../../hooks/address/address';
import { useBibleAddressBooki } from '../../hooks/address/books';
import { useBibleAddressChapteri } from '../../hooks/address/chapters';
import { useBibleTranslationSlideSyncContentSetter } from '../../hooks/slide-sync';
import { justBibleStorageSet } from '../../hooks/storage';
import { useBibleWholeChapterBookList } from '../../hooks/texts';
import { BibleTranslationJoinAddress } from '../../model';
import { useBibleTranslationAddToPlan } from '../archive/plan/hooks/plan';

const listenWindowKeyDownEffect = (onKeyDown: (event: KeyboardEvent) => void, win?: Window) => {
  (win ?? window).addEventListener('keydown', onKeyDown);
  return () => (win ?? window).removeEventListener('keydown', onKeyDown);
};

export const useBibleScreenTranslationKeyListener = (versei: number, win?: Window) => {
  const [numberCollection, setNumberCollection] = useState('');

  const currentBooki = useBibleAddressBooki();
  const currentChapteri = useBibleAddressChapteri();
  const chapters = useBibleWholeChapterBookList();
  const joinAddress = useBibleTranslationJoinAddress();
  const currentJoinAddress = useBibleTranslationJoinAddress();
  const syncSlide = useBibleTranslationSlideSyncContentSetter();
  const setJoin = useBibleTranslationJoinAddressSetter();
  const addToPlan = useBibleTranslationAddToPlan();
  const setAddress = useBibleTranslationAddressIndexesSetter();

  useEffect(() => {
    if (numberCollection === '') return;
    return setTimeoutEffect(() => {
      justBibleStorageSet('translationVersei', +numberCollection - 1);
      setNumberCollection('');
    }, 300);
  }, [numberCollection]);

  useEffect(() => {
    return listenWindowKeyDownEffect(event => {
      switch (event.code) {
        case 'F5':
        case 'Enter':
        case 'NumpadEnter':
          event.preventDefault();
          if (event.ctrlKey) addToPlan(joinAddress ?? [currentBooki, currentChapteri, versei]);
          else syncSlide();
          break;
        case 'KeyR':
          if (event.ctrlKey && win !== window) event.preventDefault();
          break;
      }
    }, win);
  }, [addToPlan, currentBooki, currentChapteri, joinAddress, syncSlide, versei, win]);

  useEffect(() => {
    return listenWindowKeyDownEffect(event => {
      if (event.code.startsWith('Numpad')) {
        setNumberCollection(collection => collection + event.code.slice(6));
        return;
      }
      if (event.code.startsWith('Digit')) {
        setNumberCollection(collection => collection + event.code.slice(5));
        return;
      }
    });
  }, []);

  useEffect(() => {
    return listenWindowKeyDownEffect(event => {
      const limitStepJump = (dir: 1 | -1) => {
        if (event.shiftKey || currentJoinAddress === null) {
          justBibleStorageSet('translationVersei', versei =>
            dir < 0
              ? versei > 0
                ? versei + dir
                : versei
              : chapters[currentBooki]?.[currentChapteri] !== undefined &&
                  versei === chapters[currentBooki][currentChapteri].length - 1
                ? versei
                : versei + dir,
          );
          return;
        }

        const mathMethod = dir < 0 ? 'min' : 'max';
        const booki = Math[mathMethod](...mylib.keys(currentJoinAddress));
        const chapteri = Math[mathMethod](...mylib.keys(currentJoinAddress[booki]));
        const verses = currentJoinAddress[booki][chapteri];

        setAddress(booki, chapteri, Math[mathMethod](...verses) + dir);
        setJoin(null);
      };

      switch (event.code) {
        case 'ArrowLeft':
          limitStepJump(-1);
          syncSlide(true);
          break;
        case 'ArrowRight':
          limitStepJump(1);
          syncSlide(true);
          break;
        case 'ArrowUp':
          limitStepJump(-1);
          break;
        case 'ArrowDown':
          limitStepJump(1);
          break;
      }

      if (!event.shiftKey) return;

      const currentVerses = currentJoinAddress?.[currentBooki]?.[currentChapteri];
      const verses = currentVerses === undefined ? new Set<number>() : new Set(currentVerses);

      verses.add(versei);

      if (event.code === 'ArrowDown' || event.code === 'ArrowRight') {
        if (
          chapters[currentBooki]?.[currentChapteri] !== undefined &&
          versei < chapters[currentBooki][currentChapteri].length - 1
        )
          verses.add(versei + 1);
      } else if (versei > 0) verses.delete(versei);

      const newJoin: BibleTranslationJoinAddress = {
        ...currentJoinAddress,
        [currentBooki]: { ...currentJoinAddress?.[currentBooki], [currentChapteri]: Array.from(verses) },
      };

      if (verses.size === 0) delete newJoin[currentBooki]?.[currentChapteri];
      if (mylib.keys(newJoin[currentBooki]).length === 0) delete newJoin[currentBooki];

      setJoin(mylib.keys(newJoin).length === 0 ? null : newJoin);
    }, win);
  }, [chapters, currentBooki, currentChapteri, currentJoinAddress, setAddress, setJoin, syncSlide, versei, win]);
};
