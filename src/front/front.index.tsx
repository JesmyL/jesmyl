import { logFrontErrors } from '#basis/lib/error-catcher';
import { setPolyfills } from '#shared/lib/polyfills';
import { renderApplication } from '#shared/lib/renders';
import { App } from '$app/App';
import React from 'react';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

setPolyfills();
logFrontErrors();

renderApplication(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
