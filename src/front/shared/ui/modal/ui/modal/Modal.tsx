import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import Portal from 'front/complect/popups/[complect]/Portal';
import { useEffect } from 'react';
import { StyledModal, StyledModalScreen, StyledModalScreenWrapper } from '../../lib/styled';

export interface Props {
  mood?: 'ok' | 'ko';
  children: React.ReactNode;
  onClose: (isOpen: false) => void;
}

export const Modal = ({ mood, children, onClose }: Props) => {
  useEffect(() => {
    return ThrowEvent.listenKeyDown('Escape', event => {
      event.stopPropagation();
      onClose?.(false);
    });
  }, [onClose]);

  return (
    <Portal>
      <StyledModal
        className="type_screen"
        onClick={event => {
          event.stopPropagation();
          onClose?.(false);
        }}
      >
        <StyledModalScreenWrapper className="type_screen">
          <StyledModalScreen
            className={'type_screen mood mood_' + mood}
            onClick={event => event.stopPropagation()}
          >
            {children}
          </StyledModalScreen>
        </StyledModalScreenWrapper>
      </StyledModal>
    </Portal>
  );
};
