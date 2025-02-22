import { logFrontErrors } from '#basis/lib/error-catcher';
import { setPolyfills } from '#shared/lib/polyfills';
import React, { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './app/App';
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
