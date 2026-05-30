import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useAtomValue } from 'atomaric';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import { useScreenBroadcastConfigsValue } from '../atoms';
import { useWatchScreenBroadcast } from '../hooks/watch-broadcast';
import { useScreenBroadcastCurrentWindow, useScreenBroadcastWindows } from '../hooks/windows';
import { isShowBroadcastInitialSlideAtom } from '../initial-slide-context';
import { AlertLineInput } from './alert-line/AlertLineInput';
import { ScreenBroadcastControlPanelShowMdButton } from './ShowMdButton';

export const ScreenBroadcastControlPanel = memo(function ControlPanel({
  onChange,
}: {
  onChange: (dir: 1 | -1) => void;
}) {
  const configs = useScreenBroadcastConfigsValue();
  const windows = useScreenBroadcastWindows();
  const currWin = useScreenBroadcastCurrentWindow();
  const watchBroadcast = useWatchScreenBroadcast();
  const isInitialSlideShow = useAtomValue(isShowBroadcastInitialSlideAtom);
  const buttonClassName = 'pointer flex justify-center items-center rounded-[15px] bg-x1 text-x4 w-full h-[30px]';

  return (
    <div>
      <div className="flex gap-2 between">
        <button
          className={buttonClassName}
          onClick={() => onChange(-1)}
        >
          <LazyIcon icon="ArrowLeft01" />
        </button>
        <button
          className={buttonClassName}
          onClick={() => onChange(1)}
        >
          <LazyIcon icon="ArrowRight01" />
        </button>
        <button
          title={currWin ? 'Enter' : undefined}
          className={twMerge(buttonClassName, 'bg-x7 text-x5 min-w-[40vw]')}
          disabled={!configs.length}
          onClick={watchBroadcast}
        >
          {windows.length ? <LazyIcon icon="Computer" /> : <LazyIcon icon="Play" />}
        </button>
        <ScreenBroadcastControlPanelShowMdButton />
        <button
          className={buttonClassName}
          title="Backspace"
          onClick={isShowBroadcastInitialSlideAtom.do.toggle}
        >
          {isInitialSlideShow ? (
            <LazyIcon
              icon="QrCode"
              kind="SolidRounded"
            />
          ) : (
            <LazyIcon icon="QrCode" />
          )}
        </button>
      </div>

      <AlertLineInput />
    </div>
  );
});
