import {
  addEventListenerPipe,
  addEventListenerWithDelayPipe,
  hookEffectPipe,
  setTimeoutPipe,
} from '#shared/lib/hookEffectPipe';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { mylib } from '#shared/lib/my-lib';
import { useBibleTranslatesContext } from '$bible/basis/lib/contexts/translates';
import {
  useBibleTranslationAddressIndexesSetter,
  useBibleTranslationJoinAddress,
} from '$bible/basis/lib/hooks/address/address';
import { useBibleAddressBooki } from '$bible/basis/lib/hooks/address/books';
import { useBibleAddressChapteri } from '$bible/basis/lib/hooks/address/chapters';
import { useBibleTranslationSlideSyncContentSetter } from '$bible/basis/lib/hooks/slide-sync';
import { useBibleShowTranslatesValue } from '$bible/basis/lib/hooks/translates';
import { bibleJoinAddressAtom, bibleVerseiAtom } from '$bible/basis/lib/store/atoms';
import { BibleTranslationAddress, BibleTranslationJoinAddress, BibleVersei } from '$bible/basis/model/base';
import { useEffect, useState } from 'react';
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
    return hookEffectPipe()
      .pipe(
        setTimeoutPipe(() => {
          bibleVerseiAtom.set(+numberCollection - 1);
          setNumberCollection('');
        }, 300),
      )
      .effect();
  }, [numberCollection]);

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(win ?? window, 'keydown', event => {
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
        }),
      )
      .effect();
  }, [actualAddressRef, addToPlan, syncSlide, win]);

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        addEventListenerWithDelayPipe(
          100,
          () => window,
          'keydown',
          event => {
            if (event.code.startsWith('Numpad')) {
              setNumberCollection(collection => collection + event.code.slice('Numpad'.length));
              return;
            }
            if (event.code.startsWith('Digit')) {
              setNumberCollection(collection => collection + event.code.slice('Digit'.length));
              return;
            }
          },
        ),
      )
      .effect();
  }, []);

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(win ?? window, 'keydown', event => {
          if (event.key === 'Shift' || event.key === 'Control') return;

          const limitStepJump = (dir: 1 | -1) => {
            if (event.shiftKey || currentJoinAddress == null) {
              const chapter = htmlChapters?.[currentBooki]?.[currentChapteri];

              bibleVerseiAtom.set(versei =>
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
            bibleJoinAddressAtom.set(null);
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

          bibleJoinAddressAtom.set(mylib.keys(newJoin).length === 0 ? null : newJoin);
        }),
      )
      .effect();
  }, [htmlChapters, currentBooki, currentChapteri, currentJoinAddress, setAddress, syncSlide, versei, win]);
};
