import { Atom, useAtomValue } from '#shared/lib/atom';
import { backSwipableContainerMaker } from '#shared/lib/backSwipableContainerMaker';
import { propagationStopper } from '#shared/lib/event-funcs';
import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { HTMLAttributes, ReactNode, useEffect } from 'react';
import { Eventer, EventerListeners } from 'shared/utils';
import styled from 'styled-components';
import { RootAnchoredContent } from '../RootAnchoredContent';
import { TheIconButton } from '../the-icon/TheIconButton';

const swipeEvents: EventerListeners<void> = [];

const swiper = backSwipableContainerMaker(() => Eventer.invoke(swipeEvents, undefined));

export type FullContentOpenMode = null | 'open' | 'closable';
export type FullContentValue<PassValue = unknown> = (close: () => void, passValue?: PassValue) => ReactNode;

interface Props<Value> {
  openAtom: Atom<Value>;
  checkIsOpen?: (value: Value) => boolean;
  closable?: boolean;
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export const FullContent = <Value,>(props: Props<Value>) => {
  const isOpenValue = useAtomValue(props.openAtom);
  const isOpen = props.checkIsOpen === undefined ? !!isOpenValue : props.checkIsOpen(isOpenValue);

  return (
    <RootAnchoredContent openAtom={props.openAtom}>
      {isOpen && (
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
          <StyledContainer className={props.containerClassName ?? 'p-5'}>{props.children}</StyledContainer>
        </Swiped>
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
