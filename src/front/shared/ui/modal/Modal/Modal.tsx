import { propagationStopper } from '#shared/lib/event-funcs';

import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { Portal } from '#shared/ui/Portal';
import { RootAnchoredContent } from '#shared/ui/RootAnchoredContent';
import { Atom, useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { StyledModal, StyledModalScreen, StyledModalScreenWrapper } from '../styled';

export interface Props<Value> {
  openAtom: Atom<Value>;
  checkIsOpen?: (value: Value) => boolean;
  mood?: 'ok' | 'ko';
  children?: React.ReactNode;
  onClose?: (openAtom: Atom<Value>) => void;
  isRenderHere?: boolean;
}

export const Modal = <Value,>({
  mood,
  children,
  isRenderHere,
  openAtom,
  checkIsOpen,
  onClose = () => openAtom.reset(),
}: Props<Value>) => {
  const isOpenValue = useAtomValue(openAtom);
  const isOpen = checkIsOpen === undefined ? isOpenValue === 0 || !!isOpenValue : checkIsOpen(isOpenValue);

  const modalNode = isOpen && (
    <Portal>
      <StyledModal
        className="type_screen"
        onClick={event => {
          event.stopPropagation();
          onClose(openAtom);
        }}
      >
        <EscapableModal onClose={() => onClose(openAtom)} />
        <StyledModalScreenWrapper className="type_screen">
          <StyledModalScreen
            className={'type_screen mood mood_' + mood}
            onClick={propagationStopper}
          >
            {children}
          </StyledModalScreen>
        </StyledModalScreenWrapper>
      </StyledModal>
    </Portal>
  );

  if (isRenderHere) return modalNode;

  return <RootAnchoredContent openAtom={openAtom}>{modalNode}</RootAnchoredContent>;
};

const EscapableModal = ({ onClose }: { onClose: () => void }) => {
  useEffect(() => {
    return ThrowEvent.listenKeyDown('Escape', event => {
      event.stopPropagation();
      onClose();
    });
  }, [onClose]);

  return <></>;
};
