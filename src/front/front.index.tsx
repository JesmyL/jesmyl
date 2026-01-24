import { logFrontErrors } from '#basis/lib/error-catcher';
import { PresentationPage } from '#features/broadcast/ui/Page';
import { environment } from '#shared/environment';
import { setPolyfills } from '#shared/lib/polyfills';
import { renderApplication } from '#shared/lib/renders';
import { App } from '$app/App';
import React from 'react';
import reportWebVitals from './reportWebVitals';

// Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

setPolyfills();
logFrontErrors();

if (environment.isPresentationMode) {
  renderApplication(
    <React.StrictMode>
      <PresentationPage />
    </React.StrictMode>,
    document.getElementById('root'),
  );
} else {
  document.getElementById('black-bg-style')?.remove();

  renderApplication(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
  );
}
