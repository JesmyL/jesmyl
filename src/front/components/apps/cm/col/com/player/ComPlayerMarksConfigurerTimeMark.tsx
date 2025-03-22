import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { cmIDB } from '$cm/basis/lib/cmIDB';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

interface Props {
  time: number;
  text: string | und;
  src: string;
}

export const ComPlayerMarksConfigurerTimeMark = ({ text, time, src }: Props) => {
  const [value, setValue] = useState(text ?? '');
  const [timeValue, setTimeValue] = useState('' + time);
  const [isRedactTime, setIsRedactTime] = useState(false);

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        setTimeoutPipe(async () => {
          const prevMarks = await cmIDB.tb.audioTrackMarks.get({ src });
          cmIDB.tb.audioTrackMarks.put({ src, marks: { ...prevMarks?.marks, [time]: value } });
        }, 500),
      )
      .effect();
  }, [src, time, value]);

  return (
    <div className="flex flex-wrap gap-2 py-3">
      {isRedactTime ? (
        <>
          <input
            type="number"
            className="bg-x2! text-x4! px-2 py-1 w-[7em]"
            value={timeValue}
            maxLength={10}
            onInput={event => setTimeValue(event.currentTarget.value)}
          />
          <TheIconButton
            icon="CheckmarkCircle01"
            className="text-xOK"
            onClick={async () => {
              setIsRedactTime(false);
              if (time === +timeValue) return;

              await cmIDB.deleteAudioTrackMark(src, time);
              await cmIDB.addAudioTrackMark(src, +timeValue, value);
            }}
          />
        </>
      ) : (
        <Button
          color="x3"
          onClick={() => setIsRedactTime(true)}
          endIcon={<LazyIcon icon="Edit02" />}
        >
          {time} ({mylib.convertSecondsInStrTime(time)})
        </Button>
      )}
      <input
        className="bg-x2! text-x4! px-2 py-1"
        value={value}
        maxLength={20}
        onInput={event => setValue(event.currentTarget.value)}
      />
      <TheIconButton
        icon="Delete02"
        className="text-xKO"
        confirm={<>Удалить точку {time}?</>}
        onClick={() => cmIDB.deleteAudioTrackMark(src, time)}
      />
    </div>
  );
};
