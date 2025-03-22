import { propagationStopper } from '#shared/lib/event-funcs';

import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { mylib } from '#shared/lib/my-lib';
import { RootAnchoredContent } from '#shared/ui/RootAnchoredContent';
import { useEffect, useMemo } from 'react';
import { emptyFunc } from 'shared/utils';
import { StyledModal, StyledModalScreen, StyledModalScreenWrapper } from '../styled';

export interface Props {
  mood?: 'ok' | 'ko';
  children?: React.ReactNode | ((props: { onClose: () => void }) => React.ReactNode);
  onClose: (isOpen: false) => void;
  isRenderHere?: boolean;
}

export function Modal({ mood, children, onClose, isRenderHere }: Props) {
  const onCloseRef = useMemo(() => ({ current: emptyFunc }), []);
  const close = () => {
    onCloseRef.current();
    onClose(false);
  };

  const modalNode = (
    <StyledModal
      className="type_screen"
      onClick={event => {
        event.stopPropagation();
        close();
      }}
    >
      <EscapableModal onClose={close} />
      <StyledModalScreenWrapper className="type_screen">
        <StyledModalScreen
          className={'type_screen mood mood_' + mood}
          onClick={propagationStopper}
        >
          {mylib.isFunc(children) ? children({ onClose: close }) : children}
        </StyledModalScreen>
      </StyledModalScreenWrapper>
    </StyledModal>
  );

  if (isRenderHere) return modalNode;

  return <RootAnchoredContent onCloseRef={onCloseRef}>{modalNode}</RootAnchoredContent>;
}

const EscapableModal = ({ onClose }: { onClose: () => void }) => {
  useEffect(() => {
    return ThrowEvent.listenKeyDown('Escape', event => {
      event.stopPropagation();
      onClose();
    });
  }, [onClose]);

  return <></>;
};
