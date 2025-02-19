import { JesmylLogo } from '#basis/ui/jesmyl-logo/JesmylLogo';
import { HTMLAttributes, PropsWithChildren, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

const enum State {
  Initial = 'initial-state',
  Loading = 'loading-process',
  Loaded = 'content-loaded',
  Ending = 'ending-process',
  Ready = 'content-is-ready',
}

export const LoadIndicatedContent = (
  props: PropsWithChildren<
    {
      isLoading: boolean;
      onLoad?: () => void;
      onLoaded?: () => void;
    } & HTMLAttributes<HTMLDivElement>
  >,
) => {
  const [state, setState] = useState(State.Initial);
  const [isWasLoading, setIsWasLoading] = useState(false);
  const [isInit, setIsInit] = useState(true);
  const initTime = useMemo(() => Date.now(), []);

  const onEnd = () => {
    setState(State.Loaded);
    props.onLoad?.();
    if (isWasLoading) props.onLoaded?.();
  };

  useEffect(() => setIsWasLoading(true), [state]);

  useLayoutEffect(() => {
    if (isInit) {
      setIsInit(false);
      return;
    }
    if (props.isLoading) setState(State.Loading);
    else {
      if (Date.now() - initTime < 200) onEnd();
      else setState(State.Ready);
    }
  }, [props.isLoading, isInit]);

  return (
    <StyledContainer className={`load-indicated-content-container ${state} ${props.className || ''}`}>
      <div
        className="load-indicated-content-spinner-container"
        onAnimationEnd={() => state === State.Ending && onEnd()}
      >
        <JesmylLogo
          className="ringify"
          onAnimationIteration={() => state === State.Ready && setState(State.Ending)}
        />
      </div>
      {state === State.Loaded ? props.children : null}
    </StyledContainer>
  );
};

const bringifyAnimation = keyframes`${css`
  from {
    top: var(--beye-ringify-top);
    left: var(--beye-ringify-left);
  }

  30% {
    top: var(--beye-ringify-top);
    left: var(--beye-ringify-left);
  }

  70% {
    top: var(--beye-top);
    left: var(--beye-left);
  }

  to {
    top: var(--beye-top);
    left: var(--beye-left);
  }
`}`;

const aringifyAnimation = keyframes`${css`
  from {
    top: var(--aeye-ringify-top);
    left: var(--aeye-ringify-left);
  }

  30% {
    top: var(--aeye-ringify-top);
    left: var(--aeye-ringify-left);
  }

  70% {
    top: var(--aeye-top);
    left: var(--aeye-left);
  }

  to {
    top: var(--aeye-top);
    left: var(--aeye-left);
  }
`}`;

const fadeInAnimation = keyframes`${css`
  from {
    opacity: 0;
  }

  90% {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`}`;

const fadeOutAnimation = keyframes`${css`
  from {
    opacity: 1;
  }

  30% {
    opacity: 0;
  }

  to {
    opacity: 0;
  }
`}`;

const rotateAnimation = keyframes`${css`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`}`;

const StyledContainer = styled.div`
  height: 100%;

  &.initial-state {
    > .load-indicated-content-spinner-container {
      > .jesmyl-smile {
        > .smile-container {
          display: none;
        }
      }
    }
  }

  &.content-is-ready,
  &.ending-process,
  &.loading-process {
    width: 100%;
    height: 100%;

    > .load-indicated-content-spinner-container {
      > .jesmyl-smile {
        &::before,
        &::after {
          content: '';
        }
      }
    }
  }

  &.content-is-ready,
  &.loading-process {
    > :not(.load-indicated-content-spinner-container) {
      display: none;
    }

    > .load-indicated-content-spinner-container {
      > .jesmyl-smile {
        animation:
          ${fadeInAnimation} 0.3s,
          ${rotateAnimation} 0.7s infinite linear;
      }
    }
  }

  &.ending-process {
    --animation-time: 0.8s;

    > .load-indicated-content-spinner-container {
      animation: ${fadeOutAnimation} var(--animation-time);
      animation-delay: var(--animation-time);

      > .jesmyl-smile {
        &::after {
          animation: ${aringifyAnimation} var(--animation-time) forwards;
        }

        &::before {
          animation: ${bringifyAnimation} var(--animation-time) forwards;
        }
      }
    }
  }

  &.content-loaded {
    > .load-indicated-content-spinner-container {
      display: none;
    }
  }

  > .load-indicated-content-spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;
