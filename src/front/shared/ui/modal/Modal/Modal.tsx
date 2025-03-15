import { propagationStopper } from '#shared/lib/event-funcs';

import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { Portal } from '#shared/ui/Portal';
import { RootAnchoredContent } from '#shared/ui/RootAnchoredContent';
import { useCallback, useEffect, useMemo } from 'react';
import { emptyFunc } from 'shared/utils';
import { StyledModal, StyledModalScreen, StyledModalScreenWrapper } from '../styled';

export interface Props {
  mood?: 'ok' | 'ko';
  children?: React.ReactNode;
  onClose: (isOpen: false) => void;
  isRenderHere?: boolean;
}

export function Modal({ mood, children, onClose, isRenderHere }: Props) {
  const onCloseRef = useMemo(() => ({ current: emptyFunc }), []);
  const close = useCallback(() => {
    onCloseRef.current();
    onClose(false);
  }, [onClose, onCloseRef]);

  const content = (
    <EscapableModal
      className="type_screen"
      onClose={close}
    >
      <StyledModalScreenWrapper className="type_screen">
        <StyledModalScreen
          className={'type_screen mood mood_' + mood}
          onClick={propagationStopper}
        >
          {children}
        </StyledModalScreen>
      </StyledModalScreenWrapper>
    </EscapableModal>
  );

  if (isRenderHere) return <Portal>{content}</Portal>;

  return <RootAnchoredContent onCloseRef={onCloseRef}>{content}</RootAnchoredContent>;
}

const EscapableModal = ({
  children,
  className,
  onClose,
}: {
  onClose: () => void;
  children: React.ReactNode;
  className: string;
}) => {
  useEffect(() => {
    return ThrowEvent.listenKeyDown('Escape', event => {
      event.stopPropagation();
      onClose();
    });
  }, [onClose]);

  return (
    <StyledModal
      onClick={event => {
        event.stopPropagation();
        onClose();
      }}
      className={className}
    >
      {children}
    </StyledModal>
  );
};
