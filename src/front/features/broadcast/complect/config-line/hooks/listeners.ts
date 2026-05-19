import { currentBroadcastConfigiAtom, useScreenBroadcastConfigsValue } from '#features/broadcast/atoms';
import { useScreenBroadcastWindows } from '#features/broadcast/hooks/windows';
import { useUpdateScreenBroadcastConfig } from '#features/broadcast/hooks/with-config';
import { isShowBroadcastInitialSlideAtom, isShowBroadcastTextAtom } from '#features/broadcast/initial-slide-context';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { itInvokeIt, itNNil } from 'shared/utils';

export const useScreenBroadcastFaceLineListeners = () => {
  const currentConfigi = useAtomValue(currentBroadcastConfigiAtom);
  const currentConfigiRef = useActualRef(currentConfigi);
  const configs = useScreenBroadcastConfigsValue();
  const updateConfig = useUpdateScreenBroadcastConfig();
  const windows = useScreenBroadcastWindows();

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
              return;

            case 'Escape':
              parentWin.blur();
              return;
          }

          onKeyDown(event);
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
      listeners.forEach(itInvokeIt);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [configs, currentConfigiRef, updateConfig, windows]);
};
