import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { addEventListenerPipe, hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { bibleBroadcastPlanAddToPlan } from '$bible/entities/broadcast-plan';
import { useBibleTranslatesContext } from '$bible/shared/contexts/translates';
import {
  bibleBroadcastAddressSetIndexes,
  useBibleAddressBooki,
  useBibleAddressChapteri,
  useBibleAddressVersei,
  useBibleBroadcastJoinAddress,
} from '$bible/shared/hooks';
import { useBibleBroadcastSlideSyncContentSetter } from '$bible/shared/hooks/slide-sync';
import { useBibleShowTranslatesValue } from '$bible/shared/hooks/translates';
import { BibleBroadcastAddress, BibleBroadcastJoinAddress } from '$bible/shared/model/base';
import { bibleJoinAddressAtom, bibleVerseiAtom } from '$bible/shared/state/atoms';
import { useEffect, useState } from 'react';
import { checkIsNil, checkIsUndefined } from 'shared/utils/checkIs';
import { objectKeys } from 'shared/utils/object.utils';
import { BibleBroadcastKeyListenScope } from '../model/broadcast';
import { bibleBroadcastKeyListenScopeAtom } from '../state';

const checkIsNotMainProcess = () =>
  bibleBroadcastKeyListenScopeAtom.get() !== BibleBroadcastKeyListenScope.AAAddressNav;

export const useBibleBroadcastAddressKeyListener = (win: Window | nil) => {
  const [numberCollection, setNumberCollection] = useState('');
  const currentVersei = useBibleAddressVersei();
  const currentBooki = useBibleAddressBooki();
  const currentChapteri = useBibleAddressChapteri();
  const showTranslates = useBibleShowTranslatesValue();
  const htmlChapters = useBibleTranslatesContext()[showTranslates[0]]?.chapters;
  const currentJoinAddress = useBibleBroadcastJoinAddress();
  const syncSlide = useBibleBroadcastSlideSyncContentSetter();
  const joinAddress = useBibleBroadcastJoinAddress();
  const actualAddressRef = useActualRef<BibleBroadcastAddress>(
    joinAddress[0] ?? [currentBooki, currentChapteri, currentVersei],
  );

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(win ?? window, 'keydown', event => {
          if (checkIsNotMainProcess() || event.key === 'Shift' || event.key === 'Control' || event.key === 'Meta')
            return;

          const limitStepJump = (dir: 1 | -1) => {
            if (event.shiftKey || checkIsNil(currentJoinAddress[0])) {
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
              booki = Math[mathMethod](...objectKeys(currentJoinAddress[0]));
              chapteri = Math[mathMethod](...objectKeys(currentJoinAddress[0]?.[booki]));
            }

            const verses = currentJoinAddress[0][booki]?.[chapteri];
            if (verses == null) return;
            const versei = Math[mathMethod](...verses) + dir;

            bibleBroadcastAddressSetIndexes(booki, chapteri, versei);
            bibleJoinAddressAtom.reset();
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

          const currentVerses = currentJoinAddress[0]?.[currentBooki]?.[currentChapteri];
          const verses = checkIsUndefined(currentVerses) ? new Set<number>() : new Set(currentVerses);

          verses.add(currentVersei);

          if (event.code === 'ArrowDown' || event.code === 'ArrowRight') {
            const chapter = htmlChapters?.[currentBooki]?.[currentChapteri];

            if (chapter !== undefined && currentVersei < chapter.length - 1) verses.add(currentVersei + 1);
          } else if (currentVersei > 0) verses.delete(currentVersei);

          const newJoin: BibleBroadcastJoinAddress = {
            ...currentJoinAddress[0],
            [currentBooki]: { ...currentJoinAddress[0]?.[currentBooki], [currentChapteri]: Array.from(verses) },
          };

          if (verses.size === 0) delete newJoin[currentBooki]?.[currentChapteri];
          if (objectKeys(newJoin[currentBooki]).length === 0) delete newJoin[currentBooki];

          bibleJoinAddressAtom.set([objectKeys(newJoin).length === 0 ? null : newJoin]);
        }),
      )
      .effect();
  }, [htmlChapters, currentBooki, currentChapteri, currentJoinAddress, syncSlide, currentVersei, win]);

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
        addEventListenerPipe(window, 'keydown', event => {
          if (checkIsNotMainProcess()) return;

          if (event.code.startsWith('Numpad')) {
            setNumberCollection(collection => collection + event.code.slice('Numpad'.length));
            return;
          }
          if (event.code.startsWith('Digit')) {
            setNumberCollection(collection => collection + event.code.slice('Digit'.length));
            return;
          }
        }),
      )
      .effect();
  }, []);

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(win ?? window, 'keydown', event => {
          switch (event.code) {
            case 'F5':
            case 'NumpadEnter':
              event.preventDefault();
              if (event.ctrlKey) bibleBroadcastPlanAddToPlan(actualAddressRef.current);
              else syncSlide();
              break;
            case 'KeyR':
              if (event.ctrlKey && win !== window) event.preventDefault();
              break;
          }
        }),
      )
      .effect(
        ThrowEvent.listenKeyDown('Enter', event => {
          if (event.value.ctrlKey) bibleBroadcastPlanAddToPlan(actualAddressRef.current);
          else syncSlide();
        }),
      );
  }, [actualAddressRef, syncSlide, win]);
};
