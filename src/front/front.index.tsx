import { logFrontErrors } from '#basis/lib/error-catcher';
import { renderApplication } from '#shared/lib/renders';
import { App } from '$app/App';
import React from 'react';
import { setSharedPolyfills } from 'shared/utils';
import reportWebVitals from './reportWebVitals';

// Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

setSharedPolyfills();
logFrontErrors();

document.getElementById('black-bg-style')?.remove();

renderApplication(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
