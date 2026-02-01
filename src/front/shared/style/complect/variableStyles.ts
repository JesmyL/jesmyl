import { css } from 'styled-components';

export const appHeaderPaddingTop = 23;
export const appHeaderContentHeight = 50;
export const appHeaderHeight = appHeaderPaddingTop + appHeaderContentHeight;
export const appFooterInitialHeight = 85;

export const cssVariableStyles = css`
  --header-top: 0px;
  --header-padding-top: ${appHeaderPaddingTop}px;
  --header-height: ${appHeaderHeight}px;
  --header-padding: var(--header-padding-top) var(--main-gap) var(--main-gap) var(--main-gap);
  --header-content-height: ${appHeaderContentHeight}px;

  --footer-initial-height: ${appFooterInitialHeight}px;
  --footer-height: var(--footer-initial-height);
  --footer-opacity: 1;
  --footer-bottom: 20px;

  --fullscreen-transition: top 0.3s, bottom 0.3s, height 0.3s, margin-top 0.3s;
  --content-height: 100%;
  --content-top: var(--header-content-height);
  --phase-container-height: calc(100% - var(--header-height));
`;
