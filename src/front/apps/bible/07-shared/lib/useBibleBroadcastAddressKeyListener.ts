import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { addEventListenerPipe, hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { bibleBroadcastListSetSingleAddress } from '$bible/entities/broadcast-list';
import { bibleBroadcastPlanAddToPlan } from '$bible/entities/broadcast-plan';
import { useBibleTranslatesContext } from '$bible/shared/contexts/translates';
import {
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
import { emptyFunc } from 'shared/utils';
import { checkIsNil } from 'shared/utils/checkIs';
import { objectKeys } from 'shared/utils/object.utils';
import { BibleBroadcastKeyListenScope } from '../model/broadcast';
import { bibleBroadcastKeyListenScopeAtom } from '../state';

const checkIsNotMainProcess = () =>
  bibleBroadcastKeyListenScopeAtom.get() !== BibleBroadcastKeyListenScope.AAAddressNav;

export const useBibleBroadcastAddressKeyListener = (win: Window) => {
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
  const isSubWindow = win !== window;

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(win, 'keydown', event => {
          if (checkIsNotMainProcess() || event.key === 'Shift' || event.key === 'Control' || event.key === 'Meta')
            return;

          const currentChapter = htmlChapters?.[currentBooki]?.[currentChapteri];

          const limitStepJump = (dir: number) => {
            const makeCorrectVersei = (versei: number) => {
              return dir < 0 ? Math.max(0, versei + dir) : Math.min((currentChapter?.length ?? 1) - 1, versei + dir);
            };

            if (event.shiftKey || checkIsNil(currentJoinAddress[0])) {
              bibleVerseiAtom.set(makeCorrectVersei);
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
            const versei = makeCorrectVersei(Math[mathMethod](...verses) + dir);

            bibleBroadcastListSetSingleAddress(booki, chapteri, versei);
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
              limitStepJump(event.ctrlKey ? -Infinity : -1);
              break;
            case 'ArrowDown':
              limitStepJump(event.ctrlKey ? Infinity : 1);
              break;
          }

          if (!event.shiftKey) return;

          const verses = new Set(currentJoinAddress[0]?.[currentBooki]?.[currentChapteri] ?? []);

          verses.add(currentVersei);

          if (event.code === 'ArrowDown' || event.code === 'ArrowRight') {
            if (currentChapter)
              if (event.ctrlKey) {
                for (let versei = currentVersei; versei < currentChapter.length; versei++) {
                  verses.add(versei);
                }
              } else if (currentVersei < currentChapter.length - 1) verses.add(currentVersei + 1);
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

    const currentChapter = htmlChapters?.[currentBooki]?.[currentChapteri];

    return hookEffectPipe()
      .pipe(
        setTimeoutPipe(() => {
          bibleVerseiAtom.set(Math.min(+numberCollection - 1, (currentChapter?.length ?? 1) - 1));
          setNumberCollection('');
        }, 300),
      )
      .effect();
  }, [currentBooki, currentChapteri, htmlChapters, numberCollection]);

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(win, 'keydown', event => {
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
  }, [win]);

  useEffect(() => {
    const onEnter = (isCtrlKey: boolean) => {
      if (isCtrlKey) bibleBroadcastPlanAddToPlan(actualAddressRef.current);
      else syncSlide();
    };

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(win, 'keydown', event => {
          switch (event.code) {
            case 'F5':
            case 'NumpadEnter':
              event.preventDefault();
              if (event.ctrlKey) bibleBroadcastPlanAddToPlan(actualAddressRef.current);
              else {
                syncSlide();
              }
              break;

            case 'KeyR':
              if (event.ctrlKey && isSubWindow) event.preventDefault();
              break;

            case 'Enter':
              if (isSubWindow) onEnter(event.ctrlKey);
              break;
          }
        }),
      )
      .effect(isSubWindow ? emptyFunc : ThrowEvent.listenKeyDown('Enter', event => onEnter(event.value.ctrlKey)));
  }, [actualAddressRef, syncSlide, win, isSubWindow]);
};
