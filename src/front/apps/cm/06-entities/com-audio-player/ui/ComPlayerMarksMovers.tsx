import { Button } from '#shared/components/ui/button';
import { addEventListenerPipe, hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { cmIDB } from '$cm/shared/state';
import { cmTsjrpcClient } from '$cm/shared/tsjrpc';
import { Atom, useAtomValue } from 'atomaric';
import { useEffect, useRef } from 'react';
import { CmComOrderSelector, HttpLink } from 'shared/api';
import { emptyFunc } from 'shared/utils';
import { twMerge } from 'tailwind-merge';
import { CmCom } from '../../com/lib/Com';
import { cmComAudioPlayerHTMLElement, cmComAudioPlayerPlaySrcAtom } from '../state/current-play-com';

interface Props {
  src: HttpLink;
  com: CmCom;
  repeatButtonClassName?: string;
  preSwitchTimeAtom: Atom<number>;
}

const preSwitchTimeSelectItems = [-1, 0, 1, 2, 3, 4].map(id => ({
  id,
  title: <span className="w-[.7em]">{id < 0 ? '×' : id}</span>,
}));

const currentButtonClassName = 'text-x7';
const prevButtonClassName = 'text-x7/70';

export const CmComAudioPlayerMarksMovers = ({ src, com, repeatButtonClassName, preSwitchTimeAtom }: Props) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const repeatRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const playSrc = useAtomValue(cmComAudioPlayerPlaySrcAtom);
  const preSwitchTime = useAtomValue(preSwitchTimeAtom);

  const audioTrackMarks = cmIDB.useAudioTrackMarks(playSrc ?? src);

  useEffect(() => {
    if (com?.wid == null) return;

    return hookEffectPipe()
      .pipe(
        setTimeoutPipe(() => {
          com.audio.forEach(async src => {
            const markPack = await cmIDB.tb.audioTrackMarks.get(src);
            cmTsjrpcClient.takeFreshComAudioMarksPack({ lastModfiedAt: markPack?.m || 0, src });
          });
        }, 100),
      )
      .effect();
  }, [com.audio, com?.wid]);

  useEffect(() => {
    if (titleRef.current === null || audioTrackMarks == null) return;
    const audioMarkPack = audioTrackMarks.marks;

    const titleNode = titleRef.current;
    const marks = mylib.keys(audioMarkPack).map(Number);
    const selectorToTitleDict: PRecord<`${number}/${CmComOrderSelector}`, string> = {};
    const visibleOrders = com.visibleOrders() ?? [];

    let prevMarkTime = 0;
    let currentMarkTime = 0;
    let nextMarkTime = 0;

    let lastTitleSelector = '';
    let prevButton: Element | nil = null;
    let isInitialButtonClassNameSet = true;

    const findNextMarkTime = (num: number) => num > cmComAudioPlayerHTMLElement.currentTime;
    const findCurrentMarkTime = (num: number) => num <= cmComAudioPlayerHTMLElement.currentTime;

    const updateMarkBlockView =
      audioMarkPack == null || preSwitchTime < 0
        ? emptyFunc
        : () => {
            const actualMarkTime =
              preSwitchTime !== 0 &&
              cmComAudioPlayerHTMLElement.currentTime < nextMarkTime &&
              cmComAudioPlayerHTMLElement.currentTime > nextMarkTime - preSwitchTime
                ? nextMarkTime
                : currentMarkTime;

            const actualMarkSelector = audioMarkPack[actualMarkTime];

            if (mylib.isStr(actualMarkSelector)) {
              titleNode.innerText = actualMarkSelector;

              prevButton?.classList.remove(currentButtonClassName);
              if (actualMarkTime) prevButton?.classList.add(prevButtonClassName);
            } else if (actualMarkSelector != null) {
              const titleSelector = `${actualMarkTime}/${actualMarkSelector[0]}` as const;

              if (isInitialButtonClassNameSet || lastTitleSelector !== titleSelector) {
                isInitialButtonClassNameSet = false;
                const htmlButtonSelector = `[com-audio-mark-selector="${titleSelector}"]`;
                const block = document.querySelector(`.composition-block:has(${htmlButtonSelector})`);
                const button = (block ?? document)?.querySelector(htmlButtonSelector);

                if (+preSwitchTime >= 0) (block ?? button)?.scrollIntoView({ block: 'center', behavior: 'smooth' });

                prevButton?.classList.remove(currentButtonClassName, prevButtonClassName);
                prevButton = button;
              }

              prevButton?.classList.add(currentButtonClassName);

              lastTitleSelector = titleSelector;

              if (selectorToTitleDict[titleSelector] == null) {
                const ord = com.getOrderBySelector(actualMarkSelector[0]);

                if (ord != null) {
                  let blockRepeatsCount = 0;

                  mylib.keys(audioMarkPack).find(itTime => {
                    if (audioMarkPack[itTime] == null || mylib.isStr(audioMarkPack[itTime])) return false;

                    if (ord.isMySelector(audioMarkPack[itTime][0])) blockRepeatsCount++;
                    else blockRepeatsCount = 0;

                    return actualMarkTime === +itTime;
                  });

                  selectorToTitleDict[titleSelector] =
                    `#${visibleOrders.indexOf(ord) + 1} ${ord.me.header()} ${blockRepeatsCount > 1 ? `×${blockRepeatsCount}` : ''}`;
                }
              }

              titleNode.innerText = selectorToTitleDict[titleSelector] ?? '';
            } else titleNode.innerText = 'Начало';
          };

    const updatePoints = () => {
      const currentMarkTimei = marks.findLastIndex(findCurrentMarkTime);

      prevMarkTime = marks[currentMarkTimei - 1] ?? 0;
      currentMarkTime = marks[currentMarkTimei] ?? 0;
      nextMarkTime = marks.find(findNextMarkTime) ?? 0;

      if (nextRef.current !== null) {
        nextRef.current.disabled = currentMarkTimei === marks.length - 1;
      }

      if (prevRef.current !== null) {
        prevRef.current.disabled = currentMarkTimei === 0;
      }

      updateMarkBlockView();
    };

    updatePoints();
    cmComAudioPlayerPlaySrcAtom.set(src);

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(prevRef.current, 'click', () => {
          cmComAudioPlayerHTMLElement.play();
          cmComAudioPlayerHTMLElement.currentTime = prevMarkTime;
        }),
        addEventListenerPipe(repeatRef.current, 'click', () => {
          cmComAudioPlayerHTMLElement.play();
          cmComAudioPlayerHTMLElement.currentTime = currentMarkTime;
        }),
        addEventListenerPipe(nextRef.current, 'click', () => {
          cmComAudioPlayerHTMLElement.play();
          cmComAudioPlayerHTMLElement.currentTime = nextMarkTime;
        }),
        addEventListenerPipe(cmComAudioPlayerHTMLElement, 'timeupdate', updatePoints),
        addEventListenerPipe(cmComAudioPlayerHTMLElement, 'ended', () => {
          cmComAudioPlayerHTMLElement.currentTime = 0;
          updatePoints();
        }),
      )
      .effect(() => prevButton?.classList.remove('text-x7'));
  }, [audioTrackMarks, com, src, preSwitchTime]);

  if (audioTrackMarks == null) return null;

  return (
    <div className="flex gap-3 w-full">
      <Button
        icon="ArrowLeft02"
        ref={prevRef}
      />

      <Dropdown
        id={preSwitchTime}
        items={preSwitchTimeSelectItems}
        onSelectId={preSwitchTimeAtom.set}
        hiddenArrow
      />

      <Button
        ref={repeatRef}
        icon="Refresh"
        className={twMerge('w-full max-w-[calc(100vw-173px)]', repeatButtonClassName)}
      >
        <span
          className="ellipsis"
          ref={titleRef}
        />
      </Button>

      <Button
        ref={nextRef}
        icon="ArrowRight02"
      />
    </div>
  );
};
