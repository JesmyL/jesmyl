import { currentBroadcastConfigiAtom } from '#features/broadcast/atoms';
import { BroadcastWindow } from '#features/broadcast/hooks/windows';
import { isShowBroadcastInitialSlideAtom, isShowBroadcastTextAtom } from '#features/broadcast/initial-slide-context';
import { ScreenBroadcastConfig } from '#features/broadcast/model';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { useEffect } from 'react';
import { itNNull } from 'shared/utils';

const invokeEach = (cb: () => void) => cb();

export const useScreenBroadcastFaceLineListeners = (
  configs: ScreenBroadcastConfig[],
  currentConfigi: number,
  updateConfig: (configi: number, config: Partial<ScreenBroadcastConfig> | null) => void,
  windows: readonly (nil | BroadcastWindow)[],
) => {
  const currentConfigiRef = useActualRef(currentConfigi);

  useEffect(() => {
    const listeners = windows
      .map((parentWin, wini) => {
        if (parentWin?.win == null) return null!;
        const win = parentWin.win;

        let timeout: TimeOut;

        const resize = () => updateConfig(wini, { proportion: win.innerWidth / win.innerHeight });

        win.onresize = () => {
          clearTimeout(timeout);
          timeout = setTimeout(resize);
        };

        const onKeyDown = (win.onkeydown = async event => {
          switch (event.code) {
            case 'Tab':
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

            case 'Enter':
              parentWin.focus();
              break;

            case 'Escape':
              parentWin.blur();
              break;

            case 'Space':
              isShowBroadcastTextAtom.do.toggle();
              break;

            case 'Backspace':
              isShowBroadcastInitialSlideAtom.do.toggle();
              break;
          }
        });

        win.onfocus = () => currentBroadcastConfigiAtom.set(wini);
        // eslint-disable-next-line @eslint-react/web-api/no-leaked-event-listener
        window.addEventListener('keydown', onKeyDown);

        return () => {
          win.onresize = null;
          win.onkeydown = null;
          win.onfocus = null;
          window.removeEventListener('keydown', onKeyDown);
        };
      })
      .filter(itNNull);

    return () => listeners.forEach(invokeEach);
  }, [configs, currentConfigiRef, updateConfig, windows]);
};
