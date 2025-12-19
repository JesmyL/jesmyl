import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { Button } from '#shared/components/ui/button';
import { ModalBody, ModalFooter, ModalHeader } from '#shared/ui/modal';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { cmEditorComAudioMarksRedactorOpenTimeConfiguratorAtom } from '$cm+editor/entities/com-audio';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { cmComEditorAudioMarksEditPacksAtom } from '$cm+editor/shared/state/com';
import { cmComAudioPlayerHTMLElement, cmIDB, makeCmComAudioMarkTitleBySelector } from '$cm/ext';
import { useState } from 'react';
import { makeRegExp } from 'regexpert';
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
  const { title, ord, isMultilineTitle, fullTitle, isShortTime } = makeCmComAudioMarkTitleBySelector(
    time,
    com,
    selector,
    trackMarks?.marks,
  );
  const [currentTime, setCurrentTime] = useState(+time);
  const [isTextEdit, setIsTextEdit] = useState(false);

  const addMaker = (add: number) => () => {
    setCurrentTime(prev => {
      let result = (prev + add).toFixed(3);

      if (result.endsWith('.000')) {
        result = add > 0 ? `${result.slice(0, -4)}.100` : `${+result.slice(0, -4) - 1}.900`;
      }

      if (+result < 0) return prev;

      cmComAudioPlayerHTMLElement.pause();
      cmComAudioPlayerHTMLElement.currentTime = +result;
      setTimeout(() => cmComAudioPlayerHTMLElement.play(), 500);

      return +result;
    });
  };

  return (
    <>
      <ModalHeader className="flex w-full justify-between">
        <span className={isShortTime ? 'text-xKO' : undefined}>
          {isMultilineTitle ? title.split('\n', 1)[0] : title}
        </span>
        <span className="flex gap-3">
          {isTextEdit || (
            <Button
              icon="Edit01"
              onClick={() => setIsTextEdit(true)}
            />
          )}
          <TheIconButton
            icon="Delete02"
            className="text-xKO"
            confirm={<>Удалить точку {title}?</>}
            onClick={() => {
              cmComEditorAudioMarksEditPacksAtom.do.removeMark(src, time);
              cmEditorComAudioMarksRedactorOpenTimeConfiguratorAtom.reset();
            }}
          />
        </span>
      </ModalHeader>
      <ModalBody>
        <div className="flex justify-around">
          <Button
            icon="PlayCircle"
            onClick={() => {
              cmComAudioPlayerHTMLElement.currentTime = currentTime;
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
            <div className="flex justify-center text-2xl">{currentTime.toFixed(3)}</div>
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

        {isTextEdit ? (
          <InputWithLoadingIcon
            icon="TextAlignLeft"
            multiline
            defaultValue={isMultilineTitle ? fullTitle : ord?.transformedText().replace(makeRegExp('/&nbsp;/g'), '')}
            strongDefaultValue
            onChanged={value =>
              cmEditComExternalsClientTsjrpcMethods
                .updateAudioMarks({ src, marks: { [time]: value.trim() } })
                .then(() => setIsTextEdit(false))
            }
          />
        ) : isMultilineTitle ? (
          <div className="pre-text my-5">{fullTitle}</div>
        ) : (
          ord && (
            <CmEditorComAudioSolidOrdTextController
              com={com}
              ord={ord}
              selector={selector}
              src={src}
              time={time}
            />
          )
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          icon="CheckmarkCircle01"
          disabled={time === currentTime || currentTime < 0}
          onClick={() =>
            cmEditComExternalsClientTsjrpcMethods
              .changeAudioMarkTime({ newTime: currentTime, src, time })
              .then(() => cmEditorComAudioMarksRedactorOpenTimeConfiguratorAtom.reset())
          }
        >
          Применить
        </Button>
      </ModalFooter>
    </>
  );
};
