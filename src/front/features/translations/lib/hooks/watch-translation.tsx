import { base64Cursors } from '#shared/lib/base64Cursors';
import { renderComponentInNewWindow } from '#shared/lib/renders';
import { useCallback } from 'react';
import { createGlobalStyle, css } from 'styled-components';
import { TranslationScreen } from '../../ui/TranslationScreen';
import { useScreenTranslationConfigsValue } from '../atoms';
import { useCurrentForceViweAppContext } from '../Translation.contexts';
import { useGetScreenTranslationConfig } from './configs';
import { useScreenTranslationWindows, useUpdateScreenTranslationWindows } from './windows';

export const useWatchScreenTranslations = () => {
  const getCurrentConfig = useGetScreenTranslationConfig();
  const windows = useScreenTranslationWindows();
  const configs = useScreenTranslationConfigsValue();
  const updateWindows = useUpdateScreenTranslationWindows();
  const forceViewApp = useCurrentForceViweAppContext();

  const watchTranslation = useCallback(() => {
    if (configs.length === windows.length) return;
    const newWindows = [...windows];

    const watch = (windowi: number) =>
      renderComponentInNewWindow(
        win => {
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
              <TranslationScreen
                screeni={windowi}
                win={win}
                forceViewApp={forceViewApp}
              />
              <StyledTranslationGlobalStyles />
            </>
          );
        },
        undefined,
        undefined,
        `top=10000,left=30000,width=30000,height=30000,directories=no,titlebar=no,menubar=no,toolbar=no,location=no,status=no,scrollbars=no`,
      );

    const len = configs.length - windows.length;

    for (let windowi = 0; windowi < len; windowi++) watch(windowi);
    updateWindows(newWindows);
  }, [configs.length, forceViewApp, getCurrentConfig, updateWindows, windows]);

  return watchTranslation;
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
        ${base64Cursors.defaultLight}
      }
    }

    &:not(:fullscreen) * * * {
      filter: blur(50px);
      opacity: 0;
    }

    &:fullscreen * * * {
      filter: blur(0px);
      opacity: 1;
    }
  }
`;

const StyledTranslationGlobalStyles = createGlobalStyle`${styles}`;
