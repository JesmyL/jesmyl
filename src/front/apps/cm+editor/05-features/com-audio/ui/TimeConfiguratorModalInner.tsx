import { Button } from '#shared/components/ui/button';
import { ModalBody, ModalFooter, ModalHeader } from '#shared/ui/modal';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { cmEditorComAudioMarksRedactorOpenTimeConfiguratorAtom } from '$cm+editor/entities/com-audio';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { cmComEditorAudioMarksEditPacksAtom } from '$cm+editor/shared/state/com';
import { cmComAudioPlayerHTMLElement, cmIDB, makeCmComAudioMarkTitleBySelector } from '$cm/ext';
import { useState } from 'react';
import { HttpLink } from 'shared/api';
import { CmEditorComAudioSolidOrdTextController } from './SolidOrdText';

interface Props {
  time: number;
  com: EditableCom;
  src: HttpLink;
}

export const CmEditorComAudioMarksRedactorOpenTimeConfiguratorModalInner = ({ time, com, src }: Props) => {
  const trackMarks = cmIDB.useAudioTrackMarks(src);
  const selector = trackMarks?.marks?.[time];
  const { title, ord } = makeCmComAudioMarkTitleBySelector(time, com, selector, trackMarks?.marks);
  const [currentTime, setCurrentTime] = useState('' + time);

  const addMaker = (add: number) => () => {
    setCurrentTime(prev => {
      let result = (+prev + add).toFixed(3);

      if (result.endsWith('.000')) {
        result =
          add > 0
            ? `${result.slice(0, -4)}${Math.abs(add) === 0.1 ? `.100` : Math.abs(add) === 0.01 ? `.010` : `.001`}`
            : `${+result.slice(0, -4) - 1}${Math.abs(add) === 0.1 ? `.900` : Math.abs(add) === 0.01 ? `.990` : `.999`}`;
      }

      if (+result < 0) return prev;

      cmComAudioPlayerHTMLElement.pause();
      cmComAudioPlayerHTMLElement.currentTime = +result;
      setTimeout(() => cmComAudioPlayerHTMLElement.play(), 500);

      return result;
    });
  };

  return (
    <>
      <ModalHeader className="flex w-full justify-between">
        {title}
        <TheIconButton
          icon="Delete02"
          className="text-xKO"
          confirm={<>Удалить точку {title}?</>}
          onClick={() => {
            cmComEditorAudioMarksEditPacksAtom.do.removeMark(src, time);
            cmEditorComAudioMarksRedactorOpenTimeConfiguratorAtom.reset();
          }}
        />
      </ModalHeader>
      <ModalBody>
        <div className="flex justify-around">
          <Button
            icon="PlayCircle"
            onClick={() => {
              cmComAudioPlayerHTMLElement.currentTime = +currentTime;
              cmComAudioPlayerHTMLElement.play();
            }}
          />
          <div>
            <div className="flex gap-2 justify-center">
              <Button
                icon="PlusSign"
                onClick={addMaker(1)}
              />
              .
              <Button
                icon="PlusSign"
                onClick={addMaker(0.1)}
              />
              <Button
                icon="PlusSign"
                onClick={addMaker(0.01)}
              />
              <Button
                icon="PlusSign"
                onClick={addMaker(0.001)}
              />
            </div>
            <div className="flex justify-center text-2xl">{currentTime}</div>
            <div className="flex gap-2 justify-center">
              <Button
                icon="MinusSign"
                onClick={addMaker(-1)}
              />
              .
              <Button
                icon="MinusSign"
                onClick={addMaker(-0.1)}
              />
              <Button
                icon="MinusSign"
                onClick={addMaker(-0.01)}
              />
              <Button
                icon="MinusSign"
                onClick={addMaker(-0.001)}
              />
            </div>
          </div>
        </div>

        {ord && (
          <CmEditorComAudioSolidOrdTextController
            com={com}
            ord={ord}
            selector={selector}
            src={src}
            time={time}
          />
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          icon="CheckmarkCircle01"
          disabled={time === +currentTime || +currentTime < 0}
          onClick={() =>
            cmEditComExternalsClientTsjrpcMethods
              .changeAudioMarkTime({ newTime: +currentTime, src, time })
              .then(() => cmEditorComAudioMarksRedactorOpenTimeConfiguratorAtom.reset())
          }
        >
          Применить
        </Button>
      </ModalFooter>
    </>
  );
};
