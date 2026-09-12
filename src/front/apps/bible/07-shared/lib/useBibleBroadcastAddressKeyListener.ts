import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { addEventListenerPipe, hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { bibleBroadcastListSetSingleAddress } from '$bible/entities/broadcast-list';
import { bibleBroadcastPlanAddToPlan } from '$bible/entities/broadcast-plan';
import { takeBibleSimpleCheckedSingleAddress } from '$bible/shared/hooks';
import { bibleBroadcastSyncSlide } from '$bible/shared/hooks/slide-sync';
import { useBibleShowTranslatesValue } from '$bible/shared/hooks/translates';
import { BibleBroadcastJoinAddress } from '$bible/shared/model/base';
import { useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { emptyFunc, itNumSort } from 'shared/utils';
import { checkIsNil } from 'shared/utils/checkIs';
import { objectKeys, objectLength } from 'shared/utils/object.utils';
import { BibleBroadcastKeyListenScope } from '../model/broadcast';
import { bibleBroadcastKeyListenScopeAtom } from '../state';
import { bibleJoinAddressAtom, bibleVerseiAtom } from '../state/atoms';
import { takeBibleTranslateBookSizesAtom } from './takeBibleTranslateBookSizesAtom';

const checkIsNotMainProcess = () =>
  bibleBroadcastKeyListenScopeAtom.get() !== BibleBroadcastKeyListenScope.AAAddressNav;

const takeActuals = () => {
  const join = bibleJoinAddressAtom.get();
  const single = takeBibleSimpleCheckedSingleAddress(null, null, null, null);
  const [currentBooki, currentChapteri, currentVersei] = single;

  return { currentBooki, currentChapteri, currentVersei, join, current: join[0] ?? single };
};

export const useBibleBroadcastAddressKeyListener = (win: Window) => {
  const [numberCollection, setNumberCollection] = useState('');
  const showTranslates = useBibleShowTranslatesValue();
  const bookSizes = useAtomValue(takeBibleTranslateBookSizesAtom(showTranslates[0]));

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(win, 'keydown', event => {
          if (checkIsNotMainProcess() || event.key === 'Shift' || event.key === 'Control' || event.key === 'Meta')
            return;
          const { currentBooki, currentChapteri, currentVersei, join } = takeActuals();

          const currentChapterLen = bookSizes?.[currentBooki]?.[currentChapteri];

          const limitStepJump = (dir: number) => {
            const makeCorrectVersei = (versei: number) => {
              return dir < 0 ? Math.max(0, versei + dir) : Math.min((currentChapterLen ?? 1) - 1, versei + dir);
            };

            if (event.shiftKey || checkIsNil(join?.[0])) {
              bibleVerseiAtom.set(makeCorrectVersei);
              return;
            }

            const mathMethod = dir < 0 ? 'min' : 'max';
            let booki = currentBooki;
            let chapteri = currentChapteri;

            if (event.ctrlKey) {
              booki = Math[mathMethod](...objectKeys(join[0]));
              chapteri = Math[mathMethod](...objectKeys(join[0]?.[booki]));
            }

            const verses = join[0][booki]?.[chapteri];
            if (!verses) return;
            const versei = makeCorrectVersei(Math[mathMethod](...verses));

            bibleBroadcastListSetSingleAddress(booki, chapteri, versei);
            bibleJoinAddressAtom.reset();
          };

          switch (event.code) {
            case 'ArrowLeft':
              bibleBroadcastSyncSlide(true);
              limitStepJump(event.ctrlKey ? -Infinity : -1);
              break;
            case 'ArrowRight':
              bibleBroadcastSyncSlide(true);
              limitStepJump(event.ctrlKey ? Infinity : 1);
              break;
            case 'ArrowUp':
              limitStepJump(event.ctrlKey ? -Infinity : -1);
              break;
            case 'ArrowDown':
              limitStepJump(event.ctrlKey ? Infinity : 1);
              break;
          }

          if (!event.shiftKey) return;

          const verses = new Set(join[0]?.[currentBooki]?.[currentChapteri] ?? []);

          verses.add(currentVersei);

          if (event.code === 'ArrowDown' || event.code === 'ArrowRight') {
            if (currentChapterLen)
              if (event.ctrlKey) {
                for (let versei = currentVersei; versei < currentChapterLen; versei++) {
                  verses.add(versei);
                }
              } else if (currentVersei < currentChapterLen - 1) verses.add(currentVersei + 1);
          } else if (currentVersei > 0) verses.delete(currentVersei);

          const newJoin: BibleBroadcastJoinAddress = {
            ...join[0],
            [currentBooki]: { ...join[0]?.[currentBooki], [currentChapteri]: Array.from(verses).sort(itNumSort) },
          };

          if (verses.size === 0) delete newJoin[currentBooki]?.[currentChapteri];
          if (objectLength(newJoin[currentBooki]) === 0) delete newJoin[currentBooki];

          bibleJoinAddressAtom.set([objectLength(newJoin) === 0 ? null : newJoin]);
        }),
      )
      .effect();
  }, [bookSizes, win]);

  useEffect(() => {
    if (numberCollection === '') return;

    const { currentBooki, currentChapteri } = takeActuals();
    const versei = bookSizes?.[currentBooki]?.[currentChapteri] ?? 1;
    const num = +numberCollection;

    const isFinalMatch = num === 0 || num * 10 > versei;

    const jump = () => {
      bibleVerseiAtom.set(Math.min(num - 1, versei - 1));
      setNumberCollection('');
    };

    if (isFinalMatch) {
      jump();
      return;
    }

    return hookEffectPipe().pipe(setTimeoutPipe(jump, 300)).effect();
  }, [bookSizes, numberCollection]);

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(win, 'keydown', event => {
          if (checkIsNotMainProcess() || event.altKey || event.ctrlKey || event.shiftKey) return;

          const match = event.code.match(/(Numpad|Digit)(\d)/);

          if (match) {
            setNumberCollection(collection => collection + match[2]);
          }
        }),
      )
      .effect();
  }, [win]);

  useEffect(() => {
    const onEnter = (isCtrlKey: boolean) => {
      if (isCtrlKey) bibleBroadcastPlanAddToPlan(takeActuals().current);
      else bibleBroadcastSyncSlide();
    };

    const [onWinEnter, onEffectEnter, onWinKeyR] =
      win === window
        ? [emptyFunc, ThrowEvent.listenKeyDown('Enter', event => onEnter(event.value.ctrlKey)), emptyFunc]
        : [onEnter, emptyFunc, (event: KeyboardEvent) => event.ctrlKey && event.preventDefault()];

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(win, 'keydown', event => {
          switch (event.code) {
            case 'F5':
            case 'NumpadEnter':
              event.preventDefault();
              if (event.ctrlKey) bibleBroadcastPlanAddToPlan(takeActuals().current);
              else bibleBroadcastSyncSlide();
              break;

            case 'KeyR':
              onWinKeyR(event);
              break;

            case 'Enter':
              onWinEnter(event.ctrlKey);
              break;
          }
        }),
      )
      .effect(onEffectEnter);
  }, [win]);
};
