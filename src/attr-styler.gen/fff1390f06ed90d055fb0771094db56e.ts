import('../front/styleds/complect/styles.styler');

import 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    'st-mood'?: 1 | '1' | 2 | '2' | 'ko';
    'st-no-scrollbar'?: '';
  }
}

