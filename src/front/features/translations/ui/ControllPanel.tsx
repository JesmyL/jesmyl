import { LazyIcon } from '#shared/ui/icon';
import { memo } from 'react';
import styled from 'styled-components';
import {
  useScreenTranslationConfigsValue,
  useTranslationIsInitialSlideShow,
  useTranslationIsInitialSlideShowSet,
} from '../lib/atoms';
import { useWatchScreenTranslations } from '../lib/hooks/watch-translation';
import { useScreenTranslationCurrentWindow, useScreenTranslationWindows } from '../lib/hooks/windows';
import { AlertLineInput } from './alert-line/AlertLineInput';
import { ScreenTranslationControlPanelShowMdButton } from './ShowMdButton';

interface Props {
  onPrev: () => void;
  onNext: () => void;
}

export const ScreenTranslationControlPanel = memo(function ControlPanel({ onNext, onPrev }: Props) {
  const configs = useScreenTranslationConfigsValue();
  const windows = useScreenTranslationWindows();
  const currWin = useScreenTranslationCurrentWindow();
  const watchTranslation = useWatchScreenTranslations();
  const setIsInitialSlideShow = useTranslationIsInitialSlideShowSet();
  const isInitialSlideShow = useTranslationIsInitialSlideShow();

  return (
    <div>
      <div className="flex flex-gap between">
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
          className="start-translation flex pointer"
          disabled={!configs.length}
          onClick={watchTranslation}
        >
          {windows.length ? <LazyIcon icon="Computer" /> : <LazyIcon icon="Play" />}
        </ControlButton>
        <ScreenTranslationControlPanelShowMdButton Parent={ControlButton} />
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

  &.start-translation {
    --icon-color: var(--color--5);

    background-color: var(--color--7);
    min-width: 40vw;
  }
`;
