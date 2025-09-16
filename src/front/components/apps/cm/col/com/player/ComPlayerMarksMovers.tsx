import { DropdownMenu } from '#shared/components/ui/dropdown-menu';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmIDB } from '$cm/basis/lib/store/cmIDB';
import { useAtomValue } from 'atomaric';
import { useEffect, useRef } from 'react';
import { comPlayerAudioElement, comPlayerPlaySrcAtom } from './controls';

export const ComPlayerMarksMovers = ({ src }: { src: string }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const repeatRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const playSrc = useAtomValue(comPlayerPlaySrcAtom);

  const audioTrackMarks = cmIDB.useAudioTrackMarks(playSrc ?? src);

  useEffect(() => {
    if (titleRef.current === null || audioTrackMarks == null) return;

    const titleNode = titleRef.current;
    const marks = mylib.keys(audioTrackMarks.marks).map(Number);

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

      titleNode.innerText = audioTrackMarks.marks[repeat] ?? 'Начало';

      if (repeat === marks[marks.length - 1]) {
        nextRef.current?.classList.add('disabled');
      } else nextRef.current?.classList.remove('disabled');
    };

    updatePoints();

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
        addEventListenerPipe(comPlayerAudioElement, 'timeupdate', () => {
          updatePoints();
        }),
      )
      .effect();
  }, [audioTrackMarks]);

  if (audioTrackMarks == null) return null;

  return (
    <>
      <div
        className="ellipsis"
        ref={titleRef}
      />
      <div className="flex justify-around w-full">
        <DropdownMenu.Item ref={prevRef}>
          <LazyIcon icon="ArrowLeft02" />
        </DropdownMenu.Item>

        <DropdownMenu.Item ref={repeatRef}>
          <LazyIcon icon="Refresh" />
        </DropdownMenu.Item>

        <DropdownMenu.Item ref={nextRef}>
          <LazyIcon icon="ArrowRight02" />
        </DropdownMenu.Item>
      </div>
    </>
  );
};
