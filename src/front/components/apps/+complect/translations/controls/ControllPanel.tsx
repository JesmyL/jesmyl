import { memo } from 'react';
import styled from 'styled-components';
import { IconArrowLeft01StrokeRounded } from '../../../../../complect/the-icon/icons/arrow-left-01';
import { IconArrowRight01StrokeRounded } from '../../../../../complect/the-icon/icons/arrow-right-01';
import { IconComputerStrokeRounded } from '../../../../../complect/the-icon/icons/computer';
import { IconPlayStrokeRounded } from '../../../../../complect/the-icon/icons/play';
import { IconQrCodeSolidRounded, IconQrCodeStrokeRounded } from '../../../../../complect/the-icon/icons/qr-code';
import { useScreenTranslationConfigsValue } from '../atoms';
import { useWatchScreenTranslations } from '../hooks/watch-translation';
import { useScreenTranslationCurrentWindow, useScreenTranslationWindows } from '../hooks/windows';
import { useTranslationIsInitialSlideShow, useTranslationIsInitialSlideShowSet } from '../initial-slide-context';
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
    <div className="flex flex-gap between margin-big-gap-t">
      <ControlButton
        className="pointer"
        onClick={onPrev}
      >
        <IconArrowLeft01StrokeRounded />
      </ControlButton>
      <ControlButton
        className="pointer"
        onClick={onNext}
      >
        <IconArrowRight01StrokeRounded />
      </ControlButton>
      <ControlButton
        title={currWin ? '' : 'Enter'}
        className="start-translation flex pointer"
        disabled={!configs.length}
        onClick={watchTranslation}
      >
        {windows.length ? <IconComputerStrokeRounded /> : <IconPlayStrokeRounded />}
      </ControlButton>
      <ScreenTranslationControlPanelShowMdButton Parent={ControlButton} />
      <ControlButton
        className="pointer"
        title="Backspace"
        onClick={() => setIsInitialSlideShow(is => !is)}
      >
        {isInitialSlideShow ? <IconQrCodeSolidRounded /> : <IconQrCodeStrokeRounded />}
      </ControlButton>
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
