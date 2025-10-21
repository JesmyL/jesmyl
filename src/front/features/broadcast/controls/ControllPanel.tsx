import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { memo } from 'react';
import styled from 'styled-components';
import { useScreenBroadcastConfigsValue } from '../atoms';
import { useWatchScreenBroadcast } from '../hooks/watch-broadcast';
import { useScreenBroadcastCurrentWindow, useScreenBroadcastWindows } from '../hooks/windows';
import { useBroadcastIsInitialSlideShow, useBroadcastIsInitialSlideShowSet } from '../initial-slide-context';
import { AlertLineInput } from './alert-line/AlertLineInput';
import { ScreenBroadcastControlPanelShowMdButton } from './ShowMdButton';

interface Props {
  onPrev: () => void;
  onNext: () => void;
}

export const ScreenBroadcastControlPanel = memo(function ControlPanel({ onNext, onPrev }: Props) {
  const configs = useScreenBroadcastConfigsValue();
  const windows = useScreenBroadcastWindows();
  const currWin = useScreenBroadcastCurrentWindow();
  const watchBroadcast = useWatchScreenBroadcast();
  const setIsInitialSlideShow = useBroadcastIsInitialSlideShowSet();
  const isInitialSlideShow = useBroadcastIsInitialSlideShow();

  return (
    <div>
      <div className="flex gap-2 between">
        <ControlButton
          className="pointer"
          onClick={onPrev}
        >
          <LazyIcon icon="ArrowLeft01" />
        </ControlButton>
        <ControlButton
          className="pointer"
          onClick={onNext}
        >
          <LazyIcon icon="ArrowRight01" />
        </ControlButton>
        <ControlButton
          title={currWin ? undefined : 'Enter'}
          className="start-broadcast flex pointer"
          disabled={!configs.length}
          onClick={watchBroadcast}
        >
          {windows.length ? <LazyIcon icon="Computer" /> : <LazyIcon icon="Play" />}
        </ControlButton>
        <ScreenBroadcastControlPanelShowMdButton Parent={ControlButton} />
        <ControlButton
          className="pointer"
          title="Backspace"
          onClick={() => setIsInitialSlideShow(is => !is)}
        >
          {isInitialSlideShow ? (
            <LazyIcon
              icon="QrCode"
              kind="SolidRounded"
            />
          ) : (
            <LazyIcon icon="QrCode" />
          )}
        </ControlButton>
      </div>

      <AlertLineInput />
    </div>
  );
});

const ControlButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: var(--color--1);
  width: 100%;
  height: 30px;
  color: var(--color--4);

  &.start-broadcast {
    --icon-color: var(--color--5);

    background-color: var(--color--7);
    min-width: 40vw;
  }
`;
