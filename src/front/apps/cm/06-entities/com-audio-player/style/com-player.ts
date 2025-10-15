import { css } from 'styled-components';

export const cmComAudioPlayerHeaderStickyCss = css`
  .composition-player {
    --transition-speed: 0.2s;

    transition:
      width var(--transition-speed),
      background var(--transition-speed),
      margin var(--transition-speed),
      margin-top var(--transition-speed),
      opacity var(--transition-speed);
  }
`;
