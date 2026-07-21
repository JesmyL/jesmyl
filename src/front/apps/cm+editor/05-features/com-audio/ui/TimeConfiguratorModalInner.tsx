import { Button } from '#shared/components/ui/button';
import { useDebounceValue } from '#shared/lib/hooks/useDebounceValue';
import { ModalBody, ModalFooter, ModalHeader, usePrompt } from '#shared/ui/modal';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { cmEditorComAudioMarksRedactorOpenTimeConfiguratorAtom } from '$cm+editor/entities/com-audio';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { cmComEditorAudioMarksEditPacksAtom } from '$cm+editor/shared/state/com';
import {
  cmComAudioPlayerIsPlayAtom,
  cmComAudioPlayerSwitchIsPlay,
  cmComAudioPlayerUpdateCurrentTime,
  cmIDB,
  useCmComMarkTextValuesMaker,
} from '$cm/ext';
import { Atom, useAtomValue } from 'atomaric';
import { useState } from 'react';
import { CmComAudioMarkPackTime, HttpNumLeadLink } from 'shared/api';
import { makeCmComAudioMarkTitleBySelector } from 'shared/const/cm/order/makeCmComAudioMarkTitleBySelector';
import { extractNumber } from 'shared/utils';
import { checkIsArray, checkIsNil } from 'shared/utils/checkIs';
import { makeCmComTextInnerHtmlProp } from 'shared/utils/cm/com/const';

interface Props {
  time: CmComAudioMarkPackTime;
  com: EditableCom;
  src: HttpNumLeadLink;
  pinTimeAtom: Atom<CmComAudioMarkPackTime | null>;
}

export const CmEditorComAudioMarksRedactorOpenTimeConfiguratorModalInner = ({ time, com, src, pinTimeAtom }: Props) => {
  const prompt = usePrompt();
  const deltaButton = (delta: number, isAdd?: 1) => (
    <Button
      icon={isAdd ? 'PlusSign' : 'MinusSign'}
      onClick={addMaker(delta)}
      disabled={isPause}
      disabledReason="Песня не проигрывается"
    />
  );

  const trackMarks = cmIDB.useAudioTrackMarks(com.wid);
  const selector = trackMarks?.marks?.[src]?.[time];
  const { title, isShortTime } = makeCmComAudioMarkTitleBySelector(time, com, selector, trackMarks?.marks?.[src]);
  const [currentTime, setCurrentTime] = useState(() => extractNumber(time));
  const isPlayState = useAtomValue(cmComAudioPlayerIsPlayAtom);
  const isPause = useDebounceValue(!isPlayState, 500);

  const { timeSlideDict } = useCmComMarkTextValuesMaker(com, src);

  const addMaker = (add: number) => () => {
    setCurrentTime(prev => {
      let result = (prev + add).toFixed(2);

      if (result.endsWith('.00')) {
        result = add > 0 ? `${result.slice(0, -3)}.10` : `${+result.slice(0, -3) - 1}.90`;
      }

      if (+result < 0) return prev;

      cmComAudioPlayerSwitchIsPlay(false);
      cmComAudioPlayerUpdateCurrentTime(+result);
      setTimeout(cmComAudioPlayerSwitchIsPlay, 500, true);

      return +result as CmComAudioMarkPackTime;
    });
  };

  return (
    <>
      <ModalHeader className="flex w-full justify-between">
        <span className={isShortTime ? 'text-xKO' : ''}>{title}</span>
        <span className="flex gap-3">
          <Button
            icon="Edit01"
            onClick={async () => {
              const newTitle = await prompt(
                checkIsArray(selector) ? 'При переименовании привязка к блоку будет утеряна' : '',
                'Новое значение',
                checkIsArray(selector) ? '' : selector || title,
                { multiline: true },
              );

              if (checkIsNil(newTitle)) return;

              cmComEditorAudioMarksEditPacksAtom.do.renameMark(com.wid, src, time, newTitle);
            }}
          />

          {(checkIsArray(selector) || !selector) && (
            <Button
              icon="PinLocation02"
              onClick={() => {
                cmEditorComAudioMarksRedactorOpenTimeConfiguratorAtom.reset();
                pinTimeAtom.set(time);
              }}
            />
          )}

          <TheIconButton
            icon="Delete02"
            className="text-xKO"
            confirm={<>Удалить точку {title}?</>}
            onClick={() => {
              cmComEditorAudioMarksEditPacksAtom.do.removeMark(com.wid, src, time);
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
              cmComAudioPlayerUpdateCurrentTime(currentTime);
              cmComAudioPlayerSwitchIsPlay(true);
            }}
          />
          <div>
            <div className="flex gap-2 justify-center">
              {deltaButton(1, 1)}.{deltaButton(0.1, 1)}
              {deltaButton(0.01, 1)}
            </div>
            <div className="flex justify-center text-2xl">{currentTime.toFixed(2)}</div>
            <div className="flex gap-2 justify-center">
              {deltaButton(-1)}.{deltaButton(-0.1)}
              {deltaButton(-0.01)}
            </div>
          </div>
        </div>

        <div
          className="white-pre"
          {...makeCmComTextInnerHtmlProp(timeSlideDict[time]?.lines.join('\n'))}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          icon="CheckmarkCircle01"
          disabled={time === currentTime || currentTime < 0}
          onClick={() =>
            cmEditComExternalsClientTsjrpcMethods
              .changeAudioMarkTime_v1({ newTime: currentTime, src, time, comw: com.wid })
              .then(() => cmEditorComAudioMarksRedactorOpenTimeConfiguratorAtom.reset())
          }
        >
          Применить
        </Button>
      </ModalFooter>
    </>
  );
};
