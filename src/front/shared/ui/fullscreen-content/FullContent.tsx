import { backSwipableContainerMaker } from '#shared/lib/backSwipableContainerMaker';
import { propagationStopper } from '#shared/lib/event-funcs';
import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { HTMLAttributes, ReactNode, useEffect, useMemo } from 'react';
import { Eventer, EventerListeners, emptyFunc } from 'shared/utils';
import styled from 'styled-components';
import { Portal } from '../Portal';
import { RootAnchoredContent } from '../RootAnchoredContent';
import { TheIconButton } from '../the-icon/TheIconButton';

const swipeEvents: EventerListeners<void> = [];

const swiper = backSwipableContainerMaker(() => Eventer.invoke(swipeEvents, undefined));

export type FullContentOpenMode = null | 'open' | 'closable';
export type FullContentValue<PassValue = unknown> = (close: () => void, passValue?: PassValue) => ReactNode;

interface Props {
  onClose: ((isOpen: false) => void) | true;
  closable?: boolean;
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  asRootAnchor?: (close: () => void) => React.ReactNode;
}

export function FullContent({ onClose, closable, children, className, asRootAnchor, containerClassName }: Props) {
  const subClose = useMemo(() => ({ current: emptyFunc }), []);
  const close = () => {
    subClose.current();
    if (onClose !== true) onClose(false);
  };

  const renderNode = (
    <Swiped
      close={close}
      onClick={closable ? close : propagationStopper}
      className={className}
    >
      {closable || (
        <StyledCloseButton
          icon="Cancel01"
          className="pointer close-button"
          onClick={close}
        />
      )}
      <Container className={containerClassName ?? 'p-5'}>{asRootAnchor?.(close) ?? children}</Container>
    </Swiped>
  );

  if (asRootAnchor)
    return (
      <RootAnchoredContent
        renderNode={renderNode}
        subClose={subClose}
      />
    );

  return <Portal>{renderNode}</Portal>;
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

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--current-bg);
  width: 100vw;
  height: calc(100% - var(--keyboard-flash-height));
  overflow-y: auto;
`;
