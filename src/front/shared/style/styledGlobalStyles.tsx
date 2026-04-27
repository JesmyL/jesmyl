import { css, Global, keyframes } from '@emotion/react';
import { makeStameskaIconStyledProvider } from 'stameska-icon/provider';
import { colorStyles } from './complect/colorStyles';
import { fontStyles } from './complect/fontStyles';
import { htmlThemeStyles } from './complect/htmlThemeStyles';
import { initialStyles } from './complect/initialStyles';
import { otherStyles } from './complect/otherStyles';
import { resetStyles } from './complect/resetStyles';
import { attrStylerStyles } from './complect/styles.styler';
import { svgUrlsVariables } from './complect/svgUrlsVariables';
import { twStyles } from './complect/twStyles';
import { utilStyles } from './complect/utilStyles';
import { cssVariableStyles } from './complect/variableStyles';

const iconsCss = makeStameskaIconStyledProvider(css, keyframes);

const styles = css`
  ${initialStyles}

  html {
    ${htmlThemeStyles}
  }

  body {
    ${cssVariableStyles}
  }

  ${colorStyles}
  ${utilStyles}
  ${twStyles}
  ${resetStyles}
  ${fontStyles}
  ${otherStyles}
  ${svgUrlsVariables}
  ${attrStylerStyles}
  ${iconsCss}
`;

export const appGlobalStyles = <Global styles={styles} />;
