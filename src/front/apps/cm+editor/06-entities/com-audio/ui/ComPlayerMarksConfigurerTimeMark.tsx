import { Button } from '#shared/components/ui/button';
import { mylib } from '#shared/lib/my-lib';
import { TextInput } from '#shared/ui/TextInput';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { cmComAudioPlayerHTMLElement, cmIDB, makeCmComAudioMarkTitleBySelector } from '$cm/ext';
import { CmComAudioMarkSelector, HttpLink } from 'shared/api';
import { twMerge } from 'tailwind-merge';
import { cmEditorComAudioMarksRedactorOpenTimeConfiguratorAtom } from '../state/atoms';

interface Props {
  time: number;
  com: EditableCom;
  selector: CmComAudioMarkSelector | nil;
  src: HttpLink;
  pinTime: RKey<number> | null;
  onPin: (time: RKey<number> | null) => void;
}

export const CmEditorComAudioMarksConfigurerTimeMark = ({ selector, time, src, com, onPin, pinTime }: Props) => {
  const trackMarks = cmIDB.useAudioTrackMarks(src);

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
            cmComAudioPlayerHTMLElement.currentTime = time;
            cmComAudioPlayerHTMLElement.play();
          }}
        />
        <TextInput
          className={twMerge('w-auto', selector && (mylib.isArr(selector) || !mylib.isNaN(+selector)) && 'text-x7!')}
          defaultValue={
            makeCmComAudioMarkTitleBySelector(time, com, selector, trackMarks?.marks, (_, title) => title).title
          }
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
            {time === 0 || (
              <Button
                icon="Settings01"
                onClick={() => cmEditorComAudioMarksRedactorOpenTimeConfiguratorAtom.set(time)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
