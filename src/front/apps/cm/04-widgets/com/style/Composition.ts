import {
  PageContainerConfigurer,
  StyledPhaseContainerConfigurerHead,
  StyledPhaseContainerConfigurerHeadTitle,
} from '#shared/ui/phase-container/PageContainerConfigurer';
import { cmComAudioPlayerHeaderStickyCss } from '$cm/entities/com-audio-player';
import styled, { css } from 'styled-components';

export const StyledCmComCompositionContainer = styled(PageContainerConfigurer)<{ $isInLaterList: boolean }>`
  ${props =>
    props.$isInLaterList &&
    css`
      ${StyledPhaseContainerConfigurerHeadTitle} {
        font-weight: bold;
      }
    `}

  ${StyledPhaseContainerConfigurerHead} {
    display: flex;
    gap: 10px;
    padding-left: 10px;
    max-width: calc(100vw - 130px);
    height: 40px;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .composition-content {
    padding-top: 150px;
    transition: padding-top 0.2s;

    ${cmComAudioPlayerHeaderStickyCss}
  }

  &.hide-metronome .com-metronome {
    display: none;
  }

  &.with-open-player .composition-player {
    opacity: 1;
    pointer-events: all;
  }

  html [st-fullscreen] :is(&, &.with-open-player) .composition-player {
    opacity: 0;
    margin-top: calc(0px - var(--com-player-size));
    pointer-events: none;
  }
`;
