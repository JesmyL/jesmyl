import { mylib } from 'front/utils';
import { useEffect, useState } from 'react';
import { useActualRef } from '../../../../../07-shared/hooks/useActualRef';
import { bibleIDB } from '../../_db/bibleIDB';
import { useBibleTranslationAddressIndexesSetter, useBibleTranslationJoinAddress } from '../../hooks/address/address';
import { useBibleAddressBooki } from '../../hooks/address/books';
import { useBibleAddressChapteri } from '../../hooks/address/chapters';
import { useBibleTranslationSlideSyncContentSetter } from '../../hooks/slide-sync';
import { BibleTranslationAddress, BibleTranslationJoinAddress, BibleVersei } from '../../model';
import { useBibleTranslatesContext } from '../../translates/TranslatesContext';
import { useBibleShowTranslatesValue } from '../../translates/hooks';
import { useBibleTranslationAddToPlan } from '../archive/plan/hooks/plan';

export const useBibleScreenTranslationKeyListener = (versei: BibleVersei, win?: Window) => {
  const [numberCollection, setNumberCollection] = useState('');

  const currentBooki = useBibleAddressBooki();
  const currentChapteri = useBibleAddressChapteri();
  const showTranslates = useBibleShowTranslatesValue();
  const htmlChapters = useBibleTranslatesContext()[showTranslates[0]]?.chapters;
  const joinAddress = useBibleTranslationJoinAddress();
  const currentJoinAddress = useBibleTranslationJoinAddress();
  const syncSlide = useBibleTranslationSlideSyncContentSetter();
  const addToPlan = useBibleTranslationAddToPlan();
  const setAddress = useBibleTranslationAddressIndexesSetter();
  const actualAddressRef = useActualRef<BibleTranslationAddress>(
    joinAddress ?? [currentBooki, currentChapteri, versei],
  );

  useEffect(() => {
    if (numberCollection === '') return;
    return hookEffectLine()
      .setTimeout(() => {
        bibleIDB.set.versei(+numberCollection - 1);
        setNumberCollection('');
      }, 300)
      .effect();
  }, [numberCollection]);

  useEffect(() => {
    return hookEffectLine()
      .addEventListener(win ?? window, 'keydown', event => {
        switch (event.code) {
          case 'F5':
          case 'Enter':
          case 'NumpadEnter':
            event.preventDefault();
            if (event.ctrlKey) addToPlan(actualAddressRef.current);
            else syncSlide();
            break;
          case 'KeyR':
            if (event.ctrlKey && win !== window) event.preventDefault();
            break;
        }
      })
      .effect();
  }, [actualAddressRef, addToPlan, syncSlide, win]);

  useEffect(() => {
    return hookEffectLine()
      .addEventDebouncedListener(100, window, 'keydown', event => {
        if (event.code.startsWith('Numpad')) {
          setNumberCollection(collection => collection + event.code.slice('Numpad'.length));
          return;
        }
        if (event.code.startsWith('Digit')) {
          setNumberCollection(collection => collection + event.code.slice('Digit'.length));
          return;
        }
      })
      .effect();
  }, []);

  useEffect(() => {
    return hookEffectLine()
      .addEventListener(win ?? window, 'keydown', event => {
        if (event.key === 'Shift' || event.key === 'Control') return;

        const limitStepJump = (dir: 1 | -1) => {
          if (event.shiftKey || currentJoinAddress == null) {
            const chapter = htmlChapters?.[currentBooki]?.[currentChapteri];

            bibleIDB.set.versei(versei =>
              dir < 0
                ? versei > 0
                  ? versei + dir
                  : versei
                : chapter !== undefined && versei === chapter.length - 1
                  ? versei
                  : versei + dir,
            );
            return;
          }

          const mathMethod = dir < 0 ? 'min' : 'max';
          let booki = currentBooki;
          let chapteri = currentChapteri;

          if (event.ctrlKey) {
            booki = Math[mathMethod](...mylib.keys(currentJoinAddress));
            chapteri = Math[mathMethod](...mylib.keys(currentJoinAddress[booki]));
          }

          const verses = currentJoinAddress[booki]?.[chapteri] as BibleVersei[] | nil;
          if (verses == null) return;
          const versei = Math[mathMethod](...verses) + dir;

          setAddress(booki, chapteri, versei)();
          bibleIDB.set.joinAddress(null);
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
          const chapter = htmlChapters?.[currentBooki]?.[currentChapteri];

          if (chapter !== undefined && versei < chapter.length - 1) verses.add(versei + 1);
        } else if (versei > 0) verses.delete(versei);

        const newJoin: BibleTranslationJoinAddress = {
          ...currentJoinAddress,
          [currentBooki]: { ...currentJoinAddress?.[currentBooki], [currentChapteri]: Array.from(verses) },
        } as never;

        if (verses.size === 0) delete newJoin[currentBooki]?.[currentChapteri];
        if (mylib.keys(newJoin[currentBooki]).length === 0) delete newJoin[currentBooki];

        bibleIDB.set.joinAddress(mylib.keys(newJoin).length === 0 ? null : newJoin);
      })
      .effect();
  }, [htmlChapters, currentBooki, currentChapteri, currentJoinAddress, setAddress, syncSlide, versei, win]);
};
