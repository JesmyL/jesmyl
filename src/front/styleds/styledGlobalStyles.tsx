import { createGlobalStyle, css } from 'styled-components';
import { globalThemeStyles } from './complect/bodyThemeStyles';
import { colorStyles } from './complect/colorStyles';
import { computedStyles } from './complect/computedStyles';
import { fontStyles } from './complect/fontStyles';
import { initialStyles } from './complect/initialStyles';
import { otherStyles } from './complect/otherStyles';
import { resetStyles } from './complect/resetStyles';
import { svgUrlsVariables } from './complect/svgUrlsVariables';
import { utilStyles } from './complect/utilStyles';

const styles = css`
  ${initialStyles}

  html {
    ${globalThemeStyles}
  }

  ${computedStyles}
  ${colorStyles}
  ${utilStyles}
  ${resetStyles}
  ${fontStyles}
  ${otherStyles}
  ${svgUrlsVariables}
`;

export const StyledGlobalStyles = createGlobalStyle`${styles}`;
