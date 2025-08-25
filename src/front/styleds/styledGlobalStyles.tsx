import { createGlobalStyle, css } from 'styled-components';
import { colorStyles } from './complect/colorStyles';
import { computedStyles } from './complect/computedStyles';
import { fontStyles } from './complect/fontStyles';
import { htmlThemeStyles } from './complect/htmlThemeStyles';
import { initialStyles } from './complect/initialStyles';
import { otherStyles } from './complect/otherStyles';
import { resetStyles } from './complect/resetStyles';
import { attrStylerStyles } from './complect/styles.styler';
import { svgUrlsVariables } from './complect/svgUrlsVariables';
import { utilStyles } from './complect/utilStyles';

const styles = css`
  ${initialStyles}

  html {
    ${htmlThemeStyles}
  }

  ${computedStyles}
  ${colorStyles}
  ${utilStyles}
  ${resetStyles}
  ${fontStyles}
  ${otherStyles}
  ${svgUrlsVariables}
  ${attrStylerStyles}
`;

export const StyledGlobalStyles = createGlobalStyle`${styles}`;
