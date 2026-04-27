import { appGlobalStyles } from '#shared/style/styledGlobalStyles';
import { styledDefaultTheme } from '#shared/style/styledTheme';
import createCache from '@emotion/cache';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { makeRegExp } from 'regexpert';
import { TWProvider } from './TWProvider';

const replacements: Record<string, string> = {
  0: 'z',
  1: 'o',
  2: 't',
  3: 'h',
  4: 'f',
  5: 'i',
  6: 's',
  7: 'e',
  8: 'g',
  9: 'n',
  '-': 'dash',
  '/': 'slash',
  '.': 'dot',
};

export const renderComponentInNewWindow = ({
  reactNode,
  features = `top=100,left=300,width=300,height=300,directories=no,titlebar=no,menubar=no,toolbar=no,location=no,status=no,scrollbars=no`,
  htmlNode,
  target,
  url,
}: {
  reactNode: ReactNode | ((win: typeof window) => ReactNode);
  target: string;
  url?: string | URL;
  features?: string;
  htmlNode?: HTMLElement;
}) => {
  const win = window.open(url, target, features);

  if (win) {
    const cache = createCache({
      key: target.toLowerCase().replace(makeRegExp('/[^a-z]/g'), all => replacements[all] || all),
      container: win.document.head,
    });

    const div = document.createElement('div');
    div.classList.add('above-container');
    win.document.body.appendChild(div);

    if (htmlNode !== undefined) div.appendChild(htmlNode);
    else
      renderApplication(
        <CacheProvider value={cache}>
          {appGlobalStyles}
          {typeof reactNode === 'function' ? reactNode(win as never) : reactNode}
          <TWProvider />
        </CacheProvider>,
        div,
      );
  }

  return win;
};

export const renderApplication = (reactNode: ReactNode, node: HTMLElement | null) => {
  createRoot(node).render(
    <ThemeProvider theme={styledDefaultTheme}>
      {appGlobalStyles}
      {reactNode}
      <TWProvider />
    </ThemeProvider>,
  );
};
