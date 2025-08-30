import { backSwipableContainerMaker } from '#shared/lib/backSwipableContainerMaker';
import { propagationStopper } from '#shared/lib/event-funcs';
import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { Atom, useAtomValue } from 'atomaric';
import { TrustChildrenCheckType } from 'front/types/TrustChildrenCheckType';
import { HTMLAttributes, ReactNode, useEffect } from 'react';
import { Eventer, EventerListeners } from 'shared/utils';
import styled from 'styled-components';
import { Portal } from '../Portal';
import { RootAnchoredContent } from '../RootAnchoredContent';
import { TheIconButton } from '../the-icon/TheIconButton';

const swipeEvents: EventerListeners<void> = [];

const swiper = backSwipableContainerMaker(() => Eventer.invoke(swipeEvents, undefined));

export type FullContentOpenMode = null | 'open' | 'closable';
export type FullContentValue<PassValue = unknown> = (close: () => void, passValue?: PassValue) => ReactNode;

export const FullContent = <Value, TrustValue extends Value>(
  props: TrustChildrenCheckType<Value, TrustValue> & {
    openAtom: Atom<Value>;
    closable?: boolean;
    className?: string;
    containerClassName?: string;
  },
) => {
  const value = useAtomValue(props.openAtom);
  const isOpen = props.checkIsOpen === undefined ? value === 0 || !!value : props.checkIsOpen(value);

  return (
    <RootAnchoredContent openAtom={props.openAtom}>
      {isOpen && (
        <Portal>
          <Swiped
            close={props.openAtom.reset}
            onClick={props.closable ? props.openAtom.reset : propagationStopper}
            className={props.className}
          >
            {props.closable || (
              <StyledCloseButton
                icon="Cancel01"
                className="pointer close-button"
                onClick={props.openAtom.reset}
              />
            )}
            <StyledContainer className={props.containerClassName ?? 'p-5'}>
              {typeof props.children === 'function' ? props.children(value as never) : props.children}
            </StyledContainer>
          </Swiped>
        </Portal>
      )}
    </RootAnchoredContent>
  );
};

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
  width: 100vw;
  height: 100%;

  > ${StyledCloseButton} {
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 1000000;
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
