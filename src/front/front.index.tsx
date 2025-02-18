import { logFrontErrors } from '#shared/lib/error-catcher';
import { setPolyfills } from '#shared/lib/polyfills';
import React, { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StyleSheetManager, ThemeProvider } from 'styled-components';
import { App } from './01-app';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { StyledGlobalStyles } from './styleds/styledGlobalStyles';
import { styledDefaultTheme } from './styleds/styledTheme';

export const renderApplication = (reactNode: ReactNode, node: HTMLElement | null) => {
  createRoot(node).render(
    <React.StrictMode>
      <ThemeProvider theme={styledDefaultTheme}>
        <StyledGlobalStyles />
        {reactNode}
      </ThemeProvider>
    </React.StrictMode>,
  );
};

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(conso le.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

setPolyfills();
logFrontErrors();

renderApplication(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
