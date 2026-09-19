import { currentBroadcastConfigiAtom, useScreenBroadcastConfigsValue } from '#features/broadcast/atoms';
import { useWatchScreenBroadcast } from '#features/broadcast/hooks/watch-broadcast';
import { useScreenBroadcastWindows } from '#features/broadcast/hooks/windows';
import { useUpdateScreenBroadcastConfig } from '#features/broadcast/hooks/with-config';
import { isShowBroadcastInitialSlideAtom, isShowBroadcastTextAtom } from '#features/broadcast/initial-slide-context';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { useEffect } from 'react';

export const useBroadcastListeners = (win: Window, configi: number, isCanBlurBroadcast: boolean) => {
  const currentConfigiRef = useActualRef(configi);
  const configs = useScreenBroadcastConfigsValue();
  const updateConfig = useUpdateScreenBroadcastConfig();
  const parentWinRef = useActualRef(useScreenBroadcastWindows().at(configi));
  const watchWindows = useWatchScreenBroadcast();

  useEffect(() => {
    let timeout: TimeOut;

    const resize = () => updateConfig(configi, { proportion: +(win.innerWidth / win.innerHeight).toFixed(2) });

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(win, 'focus', () => currentBroadcastConfigiAtom.set(configi)),
        addEventListenerPipe(win, 'resize', () => {
          clearTimeout(timeout);
          timeout = setTimeout(resize);
        }),
        addEventListenerPipe(win, 'keydown', async event => {
          switch (event.code) {
            case 'F5':
            case 'Enter':
              watchWindows();
              parentWinRef.current?.focus();
              return;

            case 'Escape':
              if (isCanBlurBroadcast) parentWinRef.current?.blur();
              return;

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
        }),
      )
      .effect();
  }, [configi, configs.length, currentConfigiRef, isCanBlurBroadcast, parentWinRef, updateConfig, watchWindows, win]);
};
