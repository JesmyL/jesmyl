import('../front/apps/cm/06-entities/com-order-line/style/StyledComLine.styler.scss');

import 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    'com-letter-chorded'?: '' | 'post' | 'pre';
    'com-letter-index'?: number | string;
    'com-letter-space-word'?: number | string;
    'com-letter-spaced-word'?: number | string;
    'com-word-index'?: number | string;
  }
}

