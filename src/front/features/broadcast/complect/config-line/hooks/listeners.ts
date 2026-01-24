import { currentBroadcastConfigiAtom } from '#features/broadcast/atoms';
import { BroadcastWindow } from '#features/broadcast/hooks/windows';
import { isShowBroadcastInitialSlideAtom, isShowBroadcastTextAtom } from '#features/broadcast/initial-slide-context';
import { ScreenBroadcastConfig } from '#features/broadcast/model';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { useEffect } from 'react';
import { itNNil } from 'shared/utils';

const invokeEach = (cb: () => void) => cb();

export const useScreenBroadcastFaceLineListeners = (
  configs: ScreenBroadcastConfig[],
  currentConfigi: number,
  updateConfig: (configi: number, config: Partial<ScreenBroadcastConfig> | null) => void,
  windows: readonly (nil | BroadcastWindow)[],
) => {
  const currentConfigiRef = useActualRef(currentConfigi);

  useEffect(() => {
    const onKeyDown = async (event: KeyboardEvent) => {
      switch (event.code) {
        case 'Tab':
          event.preventDefault();
          currentBroadcastConfigiAtom.set(
            event.shiftKey
              ? currentConfigiRef.current === 0
                ? configs.length - 1
                : currentConfigiRef.current - 1
              : currentConfigiRef.current === configs.length - 1
                ? 0
                : currentConfigiRef.current + 1,
          );
          break;

        case 'Space':
          event.preventDefault();
          isShowBroadcastTextAtom.do.toggle();
          break;

        case 'Backspace':
          event.preventDefault();
          isShowBroadcastInitialSlideAtom.do.toggle();
          break;
      }
    };

    const listeners = windows
      .map((parentWin, wini) => {
        if (parentWin == null) return null;

        const onSubWinKeyDown = async (event: KeyboardEvent) => {
          switch (event.code) {
            case 'Enter':
              parentWin.focus();
              break;

            case 'Escape':
              parentWin.blur();
              break;
          }
        };

        // eslint-disable-next-line @eslint-react/web-api/no-leaked-event-listener
        window.addEventListener('keydown', onSubWinKeyDown);

        if (parentWin.win == null) return;

        const win = parentWin.win;

        let timeout: TimeOut;

        const resize = () => updateConfig(wini, { proportion: win.innerWidth / win.innerHeight });

        win.onresize = () => {
          clearTimeout(timeout);
          timeout = setTimeout(resize);
        };

        win.onfocus = () => currentBroadcastConfigiAtom.set(wini);
        win.onkeydown = onSubWinKeyDown;

        return () => {
          win.onresize = null;
          win.onkeydown = null;
          win.onfocus = null;
          window.removeEventListener('keydown', onSubWinKeyDown);
        };
      })
      .filter(itNNil);

    window.addEventListener('keydown', onKeyDown);

    return () => {
      listeners.forEach(invokeEach);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [configs, currentConfigiRef, updateConfig, windows]);
};
