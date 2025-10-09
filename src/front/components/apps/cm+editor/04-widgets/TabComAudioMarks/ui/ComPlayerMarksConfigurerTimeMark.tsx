import { Button } from '#shared/components/ui/button';
import { mylib } from '#shared/lib/my-lib';
import { TextInput } from '#shared/ui/TextInput';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { cmComEditorAudioMarksEditPacksAtom } from '$cm+editor/basis/lib/atoms/com';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { useMemo, useState } from 'react';
import { CmComAudioMarkSelector, HttpLink } from 'shared/api';
import { twMerge } from 'tailwind-merge';

interface Props {
  time: number;
  selector: CmComAudioMarkSelector | nil;
  src: HttpLink;
  com: EditableCom;
  isRemoving: boolean;
  pinTime: RKey<number> | null;
  onPin: (time: RKey<number> | null) => void;
}

export const CmComPlayerMarksConfigurerTimeMark = ({ selector, time, src, com, isRemoving, onPin, pinTime }: Props) => {
  const defaultValue = useMemo(() => {
    if (mylib.isArr(selector)) {
      const ord = com.getOrderBySelector(selector[0]);

      return ord ? ord.me.header() + (mylib.isNum(selector[0]) ? '' : '+') : '?????';
    }

    return selector ?? '';
  }, [com, selector]);

  const [timeValue, setTimeValue] = useState('' + time);
  const [isRedactTime, setIsRedactTime] = useState(false);

  return (
    <div className="flex flex-wrap gap-2 py-3">
      {isRedactTime ? (
        <>
          <TextInput
            type="tel"
            className="bg-x2! text-x4! px-2 py-1 w-[7em]"
            value={timeValue}
            maxLength={10}
            onInput={value => setTimeValue(value)}
          />
          <TheIconButton
            icon="CheckmarkCircle01"
            className="text-xOK"
            onClick={async () => {
              setIsRedactTime(false);
              if (time === +timeValue) return;

              cmComEditorAudioMarksEditPacksAtom.do.removeMark(src, time);
              cmComEditorAudioMarksEditPacksAtom.do.putMarks(src, { [timeValue]: `+${+timeValue}+` });
            }}
          />
        </>
      ) : (
        <button
          className="text-x3 flex gap-2"
          onClick={() => setIsRedactTime(true)}
        >
          <span>
            {time} ({mylib.convertSecondsInStrTime(time)})
          </span>
          <LazyIcon icon="Edit02" />
        </button>
      )}
      <TextInput
        className={twMerge('w-auto', mylib.isArr(selector) && 'text-x7!')}
        defaultValue={defaultValue}
        strongDefaultValue
        maxLength={20}
        onChanged={value =>
          cmEditComExternalsClientTsjrpcMethods
            .updateAudioMarks({
              src,
              marks: { [time]: value },
            })
            .then(() => onPin(null))
        }
      />
      {pinTime == null && (
        <Button
          icon="PinLocation01"
          onClick={() => onPin(time)}
        />
      )}
      {pinTime == time && (
        <Button
          icon="Cancel01"
          onClick={() => onPin(null)}
        />
      )}
      {pinTime == null && (
        <TheIconButton
          icon="Delete02"
          className="text-xKO"
          isLoading={isRemoving}
          confirm={<>Удалить точку {time}?</>}
          onClick={() => cmComEditorAudioMarksEditPacksAtom.do.removeMark(src, time)}
        />
      )}
    </div>
  );
};
