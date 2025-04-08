import { propagationStopper } from '#shared/lib/event-funcs';

import { Atom, useAtomValue } from '#shared/lib/atom';
import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { RootAnchoredContent } from '#shared/ui/RootAnchoredContent';
import { Portal } from '@mui/material';
import { useEffect } from 'react';
import { StyledModal, StyledModalScreen, StyledModalScreenWrapper } from '../styled';

export interface Props<Value> {
  openAtom: Atom<Value>;
  checkIsOpen?: (value: Value) => boolean;
  mood?: 'ok' | 'ko';
  children?: React.ReactNode;
  onClose?: (isOpen: false) => void;
  isRenderHere?: boolean;
}

export const Modal = <Value,>({ mood, children, isRenderHere, openAtom, checkIsOpen }: Props<Value>) => {
  const isOpenValue = useAtomValue(openAtom);
  const isOpen = checkIsOpen === undefined ? !!isOpenValue : checkIsOpen(isOpenValue);

  const modalNode = (
    <Portal>
      {isOpen && (
        <StyledModal
          className="type_screen"
          onClick={event => {
            event.stopPropagation();
            openAtom.reset();
          }}
        >
          <EscapableModal onClose={openAtom.reset} />
          <StyledModalScreenWrapper className="type_screen">
            <StyledModalScreen
              className={'type_screen mood mood_' + mood}
              onClick={propagationStopper}
            >
              {children}
            </StyledModalScreen>
          </StyledModalScreenWrapper>
        </StyledModal>
      )}
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
