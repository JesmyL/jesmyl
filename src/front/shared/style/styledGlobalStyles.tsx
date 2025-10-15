import { createGlobalStyle, css } from 'styled-components';
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

const styles = css`
  ${initialStyles}

  html {
    ${htmlThemeStyles}
  }

  ${colorStyles}
  ${utilStyles}
  ${twStyles}
  ${resetStyles}
  ${fontStyles}
  ${otherStyles}
  ${svgUrlsVariables}
  ${attrStylerStyles}
`;

export const StyledGlobalStyles = createGlobalStyle`${styles}`;
