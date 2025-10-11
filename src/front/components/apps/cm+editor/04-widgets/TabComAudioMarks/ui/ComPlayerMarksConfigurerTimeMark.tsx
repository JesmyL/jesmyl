import { Button } from '#shared/components/ui/button';
import { mylib } from '#shared/lib/my-lib';
import { TextInput } from '#shared/ui/TextInput';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { cmComEditorAudioMarksEditPacksAtom } from '$cm+editor/basis/lib/atoms/com';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { comPlayerAudioElement } from '$cm/basis/lib/control/current-play-com';
import { cmIDB } from '$cm/basis/lib/store/cmIDB';
import { CmComAudioMarkSelector, HttpLink } from 'shared/api';
import { twMerge } from 'tailwind-merge';
import { useMakeMarkTitleBySelector } from '../lib/useMakeMarkTitleBySelector';
import { cmComEditorAudioMarksRedactorOpenTimeConfiguratorAtom } from '../state/atoms';

interface Props {
  time: number;
  com: EditableCom;
  selector: CmComAudioMarkSelector | nil;
  src: HttpLink;
  isRemoving: boolean;
  pinTime: RKey<number> | null;
  onPin: (time: RKey<number> | null) => void;
}

export const CmComPlayerMarksConfigurerTimeMark = ({ selector, time, src, com, isRemoving, onPin, pinTime }: Props) => {
  const trackMarks = cmIDB.useAudioTrackMarks(src);
  const { title } = useMakeMarkTitleBySelector(time, com, selector, trackMarks?.marks);

  return (
    <div className="py-3">
      <button className="text-x3 flex gap-2 mb-3">
        <span>
          {time} ({mylib.convertSecondsInStrTime(time)})
        </span>
      </button>

      <div className="flex gap-3 flex-wrap">
        <Button
          icon="Play"
          onClick={() => {
            comPlayerAudioElement.currentTime = time;
            comPlayerAudioElement.play();
          }}
        />
        <TextInput
          className={twMerge('w-auto', mylib.isArr(selector) && 'text-x7!')}
          defaultValue={title}
          strongDefaultValue
          maxLength={20}
          onChanged={value =>
            cmEditComExternalsClientTsjrpcMethods
              .updateAudioMarks({ src, marks: { [time]: value } })
              .then(() => onPin(null))
          }
        />
        {pinTime == time && (
          <Button
            icon="Cancel01"
            onClick={() => onPin(null)}
          />
        )}
        {pinTime == null && (
          <div className="flex gap-2">
            <Button
              icon="PinLocation01"
              onClick={() => onPin(time)}
            />
            <TheIconButton
              icon="Delete02"
              className="text-xKO"
              isLoading={isRemoving}
              confirm={<>Удалить точку {title}?</>}
              onClick={() => cmComEditorAudioMarksEditPacksAtom.do.removeMark(src, time)}
            />
            <Button
              icon="Settings01"
              onClick={() => cmComEditorAudioMarksRedactorOpenTimeConfiguratorAtom.set(time)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
