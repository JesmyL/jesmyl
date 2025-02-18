import { backSwipableContainerMaker } from 'front/08-shared/lib/backSwipableContainerMaker';
import { ThrowEvent } from 'front/08-shared/lib/eventer/ThrowEvent';
import { propagationStopper } from 'front/08-shared/lib/events-and-callbacks';
import { useActualRef } from 'front/08-shared/lib/hooks/useActualRef';
import { useWid } from 'front/08-shared/lib/hooks/useWid';
import Portal from 'front/08-shared/ui/Portal';
import IconButton from 'front/08-shared/ui/the-icon/IconButton';
import { mylib } from 'front/utils';
import { HTMLAttributes, useCallback, useEffect, useMemo } from 'react';
import { emptyFunc, Eventer } from 'shared/utils';
import styled from 'styled-components';
import { useAppRootAnchorNodesContext } from './nodes-context';

const swipeEvents = Eventer.createValue();

const swiper = backSwipableContainerMaker(() => swipeEvents.invoke());

interface Props {
  onClose: ((isOpen: false) => void) | true;
  closable?: boolean;
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  asRootAnchor?: (close: () => void) => React.ReactNode;
}

export function FullScreenContent({ onClose, closable, children, className, asRootAnchor, containerClassName }: Props) {
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

    return hookEffectLine().effect(swipeEvents.listen(close), ThrowEvent.listenKeyDown('Escape', closeAction));
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
  const addNode = useAppRootAnchorNodesContext();
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
