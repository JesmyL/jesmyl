import { backSwipableContainerMaker } from '#shared/lib/backSwipableContainerMaker';
import { propagationStopper } from '#shared/lib/event-funcs';
import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { mylib } from '#shared/lib/my-lib';
import { HTMLAttributes, ReactNode, useEffect, useMemo } from 'react';
import { Eventer, EventerListeners, emptyFunc } from 'shared/utils';
import styled from 'styled-components';
import { RootAnchoredContent } from '../RootAnchoredContent';
import { TheIconButton } from '../the-icon/TheIconButton';

const swipeEvents: EventerListeners<void> = [];

const swiper = backSwipableContainerMaker(() => Eventer.invoke(swipeEvents, undefined));

export type FullContentOpenMode = null | 'open' | 'closable';
export type FullContentValue<PassValue = unknown> = (close: () => void, passValue?: PassValue) => ReactNode;

interface Props {
  onClose: ((isOpen: false) => void) | true;
  closable?: boolean;
  children: ((close: () => void) => React.ReactNode) | React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export function FullContent(props: Props) {
  const subClose = useMemo(() => ({ current: emptyFunc }), []);
  const close = () => {
    subClose.current();
    if (props.onClose !== true) props.onClose(false);
  };

  return (
    <RootAnchoredContent
      onCloseRef={subClose}
      children={
        <Swiped
          close={close}
          onClick={props.closable ? close : propagationStopper}
          className={props.className}
        >
          {props.closable || (
            <StyledCloseButton
              icon="Cancel01"
              className="pointer close-button"
              onClick={close}
            />
          )}
          <StyledContainer className={props.containerClassName ?? 'p-5'}>
            {mylib.isFunc(props.children) ? props.children(close) : props.children}
          </StyledContainer>
        </Swiped>
      }
    />
  );
}

const Swiped = ({ close, ...props }: { close: () => void } & HTMLAttributes<HTMLDivElement>) => {
  useEffect(() => {
    const closeAction: PropagationStopper = event => {
      event.stopPropagation();
      close();
    };

    return hookEffectLine().effect(
      Eventer.listen(swipeEvents, closeAction),
      ThrowEvent.listenKeyDown('Escape', closeAction),
    );
  }, [close]);

  return (
    <StyledContainerWrapper
      {...props}
      {...swiper}
    />
  );
};

const StyledCloseButton = styled(TheIconButton)``;

const StyledContainerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100%;

  > ${StyledCloseButton} {
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 100;
  }
`;

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--current-bg);
  width: 100vw;
  height: calc(100% - var(--keyboard-flash-height));
  overflow-y: auto;
`;
