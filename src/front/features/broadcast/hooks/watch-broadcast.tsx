import { cursors } from '#shared/const/cursorsBase64';
import { renderComponentInNewWindow } from '#shared/lib/renders';
import { useCallback } from 'react';
import { createGlobalStyle, css } from 'styled-components';
import { useScreenBroadcastConfigsValue } from '../atoms';
import { useCurrentForceViweAppContext } from '../Broadcast.contexts';
import { BroadcastScreen } from '../BroadcastScreen';
import { useGetScreenBroadcastConfig } from './configs';
import { useScreenBroadcastWindows, useUpdateScreenBroadcastWindows } from './windows';

export const useWatchScreenBroadcast = () => {
  const getCurrentConfig = useGetScreenBroadcastConfig();
  const windows = useScreenBroadcastWindows();
  const configs = useScreenBroadcastConfigsValue();
  const updateWindows = useUpdateScreenBroadcastWindows();
  const forceViewApp = useCurrentForceViweAppContext();

  const watchBroadcast = useCallback(() => {
    if (configs.length === windows.length) return;
    const newWindows = [...windows];

    const watch = (windowi: number) =>
      renderComponentInNewWindow({
        target: `cm/broadcast/${windowi}`,
        features: `top=10000,left=30000,width=30000,height=30000,directories=no,titlebar=no,menubar=no,toolbar=no,location=no,status=no,scrollbars=no`,
        reactNode: win => {
          newWindows[windowi] = {
            win,
            blur: () => win.document.exitFullscreen(),
            focus: () => {
              if (win.innerWidth === win.screen.width && win.innerHeight === win.screen.height) return;
              win.focus();
              win.document.body.requestFullscreen();
            },
          };

          win.document.title = getCurrentConfig(windowi)?.title ?? win.document.title;

          const closeWin = () => win.close();

          window.addEventListener('unload', closeWin);
          win.addEventListener('unload', () => {
            window.removeEventListener('unload', closeWin);
            const newWindows = [...windows];

            newWindows[windowi] = null;
            updateWindows(newWindows);
          });

          return (
            <>
              <BroadcastScreen
                screeni={windowi}
                win={win}
                forceViewApp={forceViewApp}
              />
              <StyledBroadcastGlobalStyles />
            </>
          );
        },
      });

    const len = configs.length - windows.length;

    for (let windowi = 0; windowi < len; windowi++) watch(windowi);
    updateWindows(newWindows);
  }, [configs.length, forceViewApp, getCurrentConfig, updateWindows, windows]);

  return watchBroadcast;
};

const styles = css`
  body {
    margin: 0;
    padding: 0;
    user-select: none;

    * {
      transition: filter 0.3s;
      transition-delay: 0.2s;

      &:not(.any) {
        ${cursors.defaultLight}
      }
    }

    &:not(:fullscreen) * * * {
      filter: blur(50px) !important;
      opacity: 0 !important;
    }

    &:fullscreen * * * {
      filter: blur(0px) !important;
      opacity: 1 !important;
    }
  }
`;

const StyledBroadcastGlobalStyles = createGlobalStyle`${styles}`;
