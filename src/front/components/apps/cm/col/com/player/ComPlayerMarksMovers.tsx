import { Button } from '#shared/components/ui/button';
import { addEventListenerPipe, hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { comPlayerAudioElement, comPlayerPlaySrcAtom } from '$cm/basis/lib/control/current-play-com';
import { cmIDB } from '$cm/basis/lib/store/cmIDB';
import { cmTsjrpcClient } from '$cm/tsjrpc/basic.tsjrpc.methods';
import { useAtomValue } from 'atomaric';
import { useEffect, useRef } from 'react';
import { CmComOrderSelector, HttpLink } from 'shared/api';
import { twMerge } from 'tailwind-merge';
import { Com } from '../Com';

interface Props {
  src: HttpLink;
  com: Com;
  repeatButtonClassName?: string;
}

export const ComPlayerMarksMovers = ({ src, com, repeatButtonClassName }: Props) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const repeatRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const playSrc = useAtomValue(comPlayerPlaySrcAtom);

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

    const titleNode = titleRef.current;
    const marks = mylib.keys(audioTrackMarks.marks).map(Number);
    const selectorToTitleDict: PRecord<CmComOrderSelector, string> = {};
    const visibleOrders = com.visibleOrders() ?? [];

    let prev = 0;
    let repeat = 0;
    let next = 0;

    const findNextTime = (num: number) => num > comPlayerAudioElement.currentTime;
    const findRepeatTime = (num: number) => num <= comPlayerAudioElement.currentTime;

    const updatePoints = () => {
      const repeati = marks.findLastIndex(findRepeatTime);

      prev = marks[repeati - 1] ?? 0;
      repeat = marks[repeati] ?? 0;
      next = marks.find(findNextTime) ?? 0;

      if (audioTrackMarks.marks != null) {
        const repeatMark = audioTrackMarks.marks[repeat];

        if (mylib.isStr(repeatMark)) {
          titleNode.innerText = repeatMark ?? '';
        } else if (repeatMark != null) {
          if (selectorToTitleDict[repeatMark[0]] == null) {
            const ord = com.getOrderBySelector(repeatMark[0]);
            if (ord != null) {
              selectorToTitleDict[repeatMark[0]] = `#${visibleOrders.indexOf(ord) + 1} ${ord.me.header()}`;
            }
          }

          titleNode.innerText = selectorToTitleDict[repeatMark[0]] ?? '';
        } else titleNode.innerText = 'Начало';
      }

      if (nextRef.current !== null)
        if (repeat === marks[marks.length - 1]) {
          nextRef.current.disabled = true;
        } else nextRef.current.disabled = false;
    };

    updatePoints();
    comPlayerPlaySrcAtom.set(src);

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(prevRef.current, 'click', () => {
          comPlayerAudioElement.play();
          comPlayerAudioElement.currentTime = prev;
        }),
        addEventListenerPipe(repeatRef.current, 'click', () => {
          comPlayerAudioElement.play();
          comPlayerAudioElement.currentTime = repeat;
        }),
        addEventListenerPipe(nextRef.current, 'click', () => {
          comPlayerAudioElement.play();
          comPlayerAudioElement.currentTime = next;
        }),
        addEventListenerPipe(comPlayerAudioElement, 'timeupdate', updatePoints),
      )
      .effect();
  }, [audioTrackMarks, com, src]);

  if (audioTrackMarks == null) return null;

  return (
    <div className="flex gap-3 w-full">
      <Button
        icon="ArrowLeft02"
        ref={prevRef}
      />

      <Button
        ref={repeatRef}
        icon="Refresh"
        className={twMerge('w-full max-w-[calc(100vw-115px)]', repeatButtonClassName)}
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
