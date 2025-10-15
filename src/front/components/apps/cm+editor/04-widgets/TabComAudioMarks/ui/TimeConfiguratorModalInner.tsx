import { Button } from '#shared/components/ui/button';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalFooter } from '#shared/ui/modal/Modal/ModalFooter';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { cmComEditorAudioMarksEditPacksAtom } from '$cm+editor/basis/lib/atoms/com';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { cmComAudioPlayerHTMLElement } from 'front/apps/cm/06-entities/com-audio-player/state/current-play-com';
import { TheCmComOrder } from 'front/apps/cm/06-entities/com-order/ui/TheOrder';
import { ChordVisibleVariant } from 'front/apps/cm/07-shared/model/Cm.model';
import { cmIDB } from 'front/apps/cm/07-shared/state/cmIDB';
import { useState } from 'react';
import { HttpLink } from 'shared/api';
import { useMakeMarkTitleBySelector } from '../lib/useMakeMarkTitleBySelector';
import { cmComEditorAudioMarksRedactorOpenTimeConfiguratorAtom } from '../state/atoms';

interface Props {
  time: number;
  com: EditableCom;
  src: HttpLink;
}

export const CmComEditorAudioMarksRedactorOpenTimeConfiguratorModalInner = ({ time, com, src }: Props) => {
  const trackMarks = cmIDB.useAudioTrackMarks(src);
  const selector = trackMarks?.marks?.[time];
  const { title, ord } = useMakeMarkTitleBySelector(time, com, selector, trackMarks?.marks);
  const [currentTime, setCurrentTime] = useState('' + time);

  const addMaker = (add: number) => () => {
    setCurrentTime(prev => {
      let result = (+prev + add).toFixed(3);

      if (result.endsWith('.000')) result = add > 0 ? `${result.slice(0, -4)}.001` : `${+result.slice(0, -4) - 1}.999`;

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
          onClick={() => cmComEditorAudioMarksEditPacksAtom.do.removeMark(src, time)}
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
          <TheCmComOrder
            chordVisibleVariant={ChordVisibleVariant.None}
            com={com}
            ord={ord}
            ordi={0}
            asHeaderComponent={() => null}
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
              .then(() => cmComEditorAudioMarksRedactorOpenTimeConfiguratorAtom.reset())
          }
        >
          Применить
        </Button>
      </ModalFooter>
    </>
  );
};
