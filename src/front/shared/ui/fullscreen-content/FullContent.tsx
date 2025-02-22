import { useSetAppRootAnchorNodesContext } from '#basis/lib/App.contexts';
import { backSwipableContainerMaker } from '#shared/lib/backSwipableContainerMaker';
import { propagationStopper } from '#shared/lib/event-funcs';
import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { useWid } from '#shared/lib/hooks/useWid';
import { mylib } from '#shared/lib/my-lib';
import { HTMLAttributes, ReactNode, useCallback, useEffect, useMemo } from 'react';
import { Eventer, EventerListeners, emptyFunc } from 'shared/utils';
import styled from 'styled-components';
import { Portal } from '../Portal';
import { IconButton } from '../the-icon/IconButton';

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
  const actualChildrenRef = useActualRef(children);
  const actualAsRootAnchorRef = useActualRef(asRootAnchor);
  const subClose = useMemo(() => ({ current: emptyFunc }), []);

  const node = useCallback(
    (wid?: string) => {
      const close = () => {
        if (actualAsRootAnchorRef.current) {
          subClose.current();
          return;
        }

        if (onClose !== true) onClose(false);
      };

      return (
        <Swiped
          key={wid}
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
          <Container className={containerClassName ?? 'padding-big-gap'}>
            {mylib.isFunc(actualAsRootAnchorRef.current)
              ? actualAsRootAnchorRef.current(subClose.current)
              : actualChildrenRef.current}
          </Container>
        </Swiped>
      );
    },
    [actualAsRootAnchorRef, actualChildrenRef, className, closable, containerClassName, onClose, subClose],
  );

  if (actualAsRootAnchorRef.current)
    return (
      <RootAnchor
        node={node}
        subClose={subClose}
      />
    );

  return <Portal>{node()}</Portal>;
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

const RootAnchor = ({
  node,
  subClose,
}: {
  node: (wid: string) => React.ReactNode;
  subClose: { current: () => void };
}) => {
  const addNode = useSetAppRootAnchorNodesContext();
  const wid = useWid();

  subClose.current = () => addNode(prev => ({ ...prev, [wid]: null }));

  useEffect(() => addNode(prev => ({ ...prev, [wid]: node(wid) })), [addNode, node, wid]);

  return <></>;
};

const StyledCloseButton = styled(IconButton)``;

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
