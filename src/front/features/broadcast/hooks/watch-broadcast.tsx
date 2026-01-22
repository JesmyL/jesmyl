import { cursors } from '#shared/const/cursorsBase64';
import { renderComponentInNewWindow } from '#shared/lib/renders';
import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { useAtomValue } from 'atomaric';
import { useCallback } from 'react';
import { toast } from 'sonner';
import { createGlobalStyle, css } from 'styled-components';
import { broadcastFirstPresentationModeAtom, useScreenBroadcastConfigsValue } from '../atoms';
import { useCurrentForceViweAppContext } from '../Broadcast.contexts';
import { BroadcastFirstPresentationMode } from '../Broadcast.model';
import { BroadcastScreen } from '../BroadcastScreen';
import { broadcastConnectionDto } from '../lib/connection.dto';
import { useGetScreenBroadcastConfig } from './configs';
import { useScreenBroadcastWindows, useUpdateScreenBroadcastWindows } from './windows';

export const useWatchScreenBroadcast = () => {
  const getCurrentConfig = useGetScreenBroadcastConfig();
  const windows = useScreenBroadcastWindows();
  const configs = useScreenBroadcastConfigsValue();
  const updateWindows = useUpdateScreenBroadcastWindows();
  const forceViewApp = useCurrentForceViweAppContext();
  const firstPresentationMode = useAtomValue(broadcastFirstPresentationModeAtom);

  const watchBroadcast = useCallback(async () => {
    if (configs.length === windows.length) return;

    const newWindows = [...windows];

    const watch = (windowi: number) =>
      renderComponentInNewWindow({
        target: `cm/broadcast/${windowi}`,
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

    for (let windowi = 0; windowi < len; windowi++) {
      if (windowi === 0 && firstPresentationMode !== BroadcastFirstPresentationMode.None) {
        try {
          newWindows[windowi] = await broadcastConnectionDto.init();

          continue;
        } catch (_) {
          toast('Не удалось подключить режим презентации', makeToastKOMoodConfig());
        }
      }
      watch(windowi);
    }

    updateWindows(newWindows);
  }, [configs.length, firstPresentationMode, forceViewApp, getCurrentConfig, updateWindows, windows]);

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
      filter: blur(0px);
      opacity: 1;
    }
  }
`;

const StyledBroadcastGlobalStyles = createGlobalStyle`${styles}`;
