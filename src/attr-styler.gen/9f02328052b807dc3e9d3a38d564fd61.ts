import('../front/app/App.scss');

import 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    'st-fullscreen'?: number | string;
    'st-hide-footer-menu'?: number | string;
    'st-no-scrollbar'?: '';
  }
}

