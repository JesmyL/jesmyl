import { propagationStopper } from '#shared/lib/event-funcs';
import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { Portal } from '#shared/ui/Portal';
import { RootAnchoredContent } from '#shared/ui/RootAnchoredContent';
import { Atom, useAtomValue } from 'atomaric';
import { TrustChildrenCheckType } from 'front/types/TrustChildrenCheckType';
import { useEffect } from 'react';
import { StyledModal, StyledModalScreen, StyledModalScreenWrapper } from '../styled';

export const Modal = <Value, TrustValue extends Value>({
  mood,
  children,
  isRenderHere,
  openAtom,
  checkIsOpen,
  onClose = () => openAtom.reset(),
}: TrustChildrenCheckType<Value, TrustValue> & {
  openAtom: Atom<Value>;
  mood?: 'ok' | 'ko';
  onClose?: (openAtom: Atom<Value>) => void;
  isRenderHere?: boolean;
}) => {
  const value = useAtomValue(openAtom);
  const isOpen = checkIsOpen === undefined ? value === 0 || !!value : checkIsOpen(value);

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
            {typeof children === 'function' ? children(value as never) : children}
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
