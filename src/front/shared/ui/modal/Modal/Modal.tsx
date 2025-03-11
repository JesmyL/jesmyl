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
  asRootAnchor?: (close: (isOpen: false) => void) => React.ReactNode;
}

export function Modal({ mood, children, onClose, asRootAnchor }: Props) {
  const subClose = useMemo(() => ({ current: emptyFunc }), []);
  const close = useCallback(() => {
    subClose.current();
    onClose(false);
  }, [onClose, subClose]);

  const renderNode = (
    <EscapableModal
      className="type_screen"
      onClose={close}
    >
      <StyledModalScreenWrapper className="type_screen">
        <StyledModalScreen
          className={'type_screen mood mood_' + mood}
          onClick={propagationStopper}
        >
          {asRootAnchor?.(close) ?? children}
        </StyledModalScreen>
      </StyledModalScreenWrapper>
    </EscapableModal>
  );

  if (asRootAnchor)
    return (
      <RootAnchoredContent
        renderNode={renderNode}
        subClose={subClose}
      />
    );

  return <Portal>{renderNode}</Portal>;
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
