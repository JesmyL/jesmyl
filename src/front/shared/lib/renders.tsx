import { StyledGlobalStyles } from '#shared/style/styledGlobalStyles';
import { styledDefaultTheme } from '#shared/style/styledTheme';
import { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { StyleSheetManager, ThemeProvider } from 'styled-components';
import { TWProvider } from './TWProvider';

export const renderComponentInNewWindow = (
  reactNode: ReactNode | ((win: typeof window) => ReactNode),
  url?: string | URL,
  target?: string,
  features = `top=100,left=300,width=300,height=300,directories=no,titlebar=no,menubar=no,toolbar=no,location=no,status=no,scrollbars=no`,
  htmlNode?: HTMLElement,
) => {
  const win = window.open(url, target, features);
  if (win) {
    const div = document.createElement('div');
    div.classList.add('above-container');
    win.document.body.appendChild(div);

    if (htmlNode !== undefined) div.appendChild(htmlNode);
    else
      renderApplication(
        <StyleSheetManager target={win.document.head}>
          <StyledGlobalStyles />
          {typeof reactNode === 'function' ? reactNode(win as never) : reactNode}
          <TWProvider />
        </StyleSheetManager>,
        div,
      );
  }

  return win;
};

export const renderApplication = (reactNode: ReactNode, node: HTMLElement | null) => {
  createRoot(node).render(
    <ThemeProvider theme={styledDefaultTheme}>
      <StyledGlobalStyles />
      {reactNode}
      <TWProvider />
    </ThemeProvider>,
  );
};
