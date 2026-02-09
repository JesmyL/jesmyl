import { backSwipableContainerMaker } from '#shared/lib/backSwipableContainerMaker';
import { propagationStopper } from '#shared/lib/event-funcs';
import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { TrustChildrenCheckType } from '#shared/model/TrustChildrenCheckType';
import { atom, Atom } from 'atomaric';
import { HTMLAttributes, ReactNode, useEffect, useMemo } from 'react';
import { Eventer, EventerListeners } from 'shared/utils';
import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';
import { Portal } from '../Portal';
import { RootAnchoredContent } from '../RootAnchoredContent';
import { TheIconButton } from '../the-icon/TheIconButton';
import { WithAtomValue } from '../WithAtomValue';

const swipeEvents: EventerListeners<void> = [];

const swiper = backSwipableContainerMaker(() => Eventer.invoke(swipeEvents, undefined));

export type FullContentValue<PassValue = unknown> = (close: () => void, passValue?: PassValue) => ReactNode;

export const FullContent = <Value, TrustValue extends Value>(
  props: TrustChildrenCheckType<Value, TrustValue> & {
    closable?: boolean;
    className?: string;
    containerClassName?: string;
    hideCloseButton?: boolean;
    onClose?: () => void;
  } & ({ openAtom: Atom<Value> } | { forceOpen: true }),
) => {
  const openAtom = useMemo(() => {
    if ('openAtom' in props) return props.openAtom;

    const boolAtom = atom(false);
    boolAtom.set(true);

    return boolAtom as never as Atom<Value>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WithAtomValue atom={openAtom}>
      {value => {
        const isOpen = props.checkIsOpen === undefined ? value === 0 || !!value : props.checkIsOpen(value);

        return (
          <RootAnchoredContent openAtom={openAtom}>
            {isOpen && (
              <Portal>
                <Swiped
                  close={() => {
                    openAtom.reset();
                    props.onClose?.();
                  }}
                  onClick={props.closable ? openAtom.reset : propagationStopper}
                  className={twMerge('z-10', props.className)}
                >
                  {props.hideCloseButton || props.closable || (
                    <StyledCloseButton
                      icon="Cancel01"
                      className="pointer close-button"
                      onClick={openAtom.reset}
                    />
                  )}
                  <StyledContainer className={twMerge('p-5', props.containerClassName)}>
                    {typeof props.children === 'function' ? props.children(value as never) : props.children}
                  </StyledContainer>
                </Swiped>
              </Portal>
            )}
          </RootAnchoredContent>
        );
      }}
    </WithAtomValue>
  );
};

const Swiped = ({ close, ...props }: { close: () => void } & HTMLAttributes<HTMLDivElement>) => {
  useEffect(() => {
    const closeAction: PropagationStopper = event => {
      event.stopPropagation();
      close();
    };

    return hookEffectPipe().effect(
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
  height: 100%;
  overflow-y: auto;
`;
