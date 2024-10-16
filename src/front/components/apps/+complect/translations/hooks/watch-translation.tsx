import { useCallback } from 'react';
import { css } from 'styled-components';
import { renderComponentInNewWindow } from '../../../../..';
import { cursors } from '../../../../../cursorsBase64';
import { useScreenTranslationConfigsValue } from '../molecules';
import { useCurrentForceViweAppContext } from '../Translation.contexts';
import { TranslationScreen } from '../TranslationScreen';
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

          const style = win.document.createElement('style');
          win.document.body.appendChild(style);
          style.innerHTML = newWindowBaseStyle;

          const closeWin = () => win.close();

          window.addEventListener('unload', closeWin);
          win.addEventListener('unload', () => {
            window.removeEventListener('unload', closeWin);
            const newWindows = [...windows];

            newWindows[windowi] = null;
            updateWindows(newWindows);
          });

          return (
            <TranslationScreen
              screeni={windowi}
              win={win}
              forceViewApp={forceViewApp}
            />
          );
        },
        undefined,
        undefined,
        `top=10000,left=30000,width=30000,height=30000,directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no`,
        undefined,
        css`
          body {
            * {
              transition: filter 0.3s;
              transition-delay: 0.2s;

              &:not(.any) {
                ${cursors.defaultLight}
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
        `,
      );

    const len = configs.length - windows.length;

    for (let windowi = 0; windowi < len; windowi++) watch(windowi);
    updateWindows(newWindows);
  }, [configs.length, forceViewApp, getCurrentConfig, updateWindows, windows]);

  return watchTranslation;
};

const newWindowBaseStyle =
  '' +
  css`
    body {
      margin: 0;
      padding: 0;
      user-select: none;
    }
  `;
