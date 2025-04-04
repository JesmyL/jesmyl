import { css } from 'styled-components';

export const comPlayerHeaderStickyCss = css`
  .composition-player {
    --transition-speed: 0.2s;

    position: fixed;
    top: var(--header-height);
    right: 0;
    left: 0;
    z-index: 1;
    transition:
      width var(--transition-speed),
      background var(--transition-speed),
      margin var(--transition-speed),
      margin-top var(--transition-speed),
      opacity var(--transition-speed);
  }
`;
