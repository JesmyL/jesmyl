import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmIDB } from '$cm/_db/cm-idb';
import { MenuItem } from '@mui/material';
import { useEffect, useRef } from 'react';

export const ComPlayerMarksMovers = ({
  src,
  audioRef,
}: {
  src: string;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLLIElement>(null);
  const repeatRef = useRef<HTMLLIElement>(null);
  const nextRef = useRef<HTMLLIElement>(null);

  const audioTrackMarks = cmIDB.useAudioTrackMarks(src);

  useEffect(() => {
    if (titleRef.current === null || audioRef.current === null || audioTrackMarks == null) return;

    const audioNode = audioRef.current;
    const titleNode = titleRef.current;
    const marks = mylib.keys(audioTrackMarks.marks).map(Number);

    let prev = 0;
    let repeat = 0;
    let next = 0;

    const findNextTime = (num: number) => num > audioNode.currentTime;
    const findRepeatTime = (num: number) => num <= audioNode.currentTime;

    const updatePoints = () => {
      const repeati = marks.findLastIndex(findRepeatTime);

      prev = marks[repeati - 1] ?? 0;
      repeat = marks[repeati] ?? 0;
      next = marks.find(findNextTime) ?? 0;

      titleNode.innerText = audioTrackMarks.marks[repeat] ?? 'Начало';

      if (repeat === marks[marks.length - 1]) {
        nextRef.current?.classList.add('Mui-disabled');
      } else nextRef.current?.classList.remove('Mui-disabled');
    };

    updatePoints();

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(prevRef.current, 'click', () => {
          audioNode.play();
          audioNode.currentTime = prev;
        }),
        addEventListenerPipe(repeatRef.current, 'click', () => {
          audioNode.play();
          audioNode.currentTime = repeat;
        }),
        addEventListenerPipe(nextRef.current, 'click', () => {
          audioNode.play();
          audioNode.currentTime = next;
        }),
        addEventListenerPipe(audioNode, 'timeupdate', () => {
          updatePoints();
        }),
      )
      .effect();
  }, [audioRef, audioTrackMarks]);

  if (audioTrackMarks == null) return null;

  return (
    <>
      <div
        className="ellipsis"
        ref={titleRef}
      />
      <div className="flex">
        <MenuItem ref={prevRef}>
          <LazyIcon icon="ArrowLeft02" />
        </MenuItem>

        <MenuItem ref={repeatRef}>
          <LazyIcon icon="Refresh" />
        </MenuItem>

        <MenuItem ref={nextRef}>
          <LazyIcon icon="ArrowRight02" />
        </MenuItem>
      </div>
    </>
  );
};
