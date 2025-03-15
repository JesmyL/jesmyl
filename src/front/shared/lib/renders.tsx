import { StyledGlobalStyles } from 'front/styleds/styledGlobalStyles';
import { styledDefaultTheme } from 'front/styleds/styledTheme';
import { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { StyleSheetManager, ThemeProvider } from 'styled-components';

export const renderComponentInNewWindow = (
  reactNode: ReactNode | ((win: typeof window) => ReactNode),
  url?: string | URL,
  target?: string,
  features?: string,
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
    </ThemeProvider>,
  );
};
