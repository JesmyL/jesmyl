import { Dialog } from '#shared/components/ui/dialog';
import { propagationStopper } from '#shared/lib/event-funcs';
import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { TrustChildrenCheckType } from '#shared/model/TrustChildrenCheckType';
import { Portal } from '#shared/ui/Portal';
import { RootAnchoredContent } from '#shared/ui/RootAnchoredContent';
import { Atom, useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { StyledModalScreen, StyledModalScreenWrapper } from '../styled';

export const Modal = <Value, TrustValue extends Value = Exclude<Value, nil | '' | false>>({
  mood,
  children,
  isRenderHere,
  openAtom,
  checkIsOpen,
  className,
  onClose = () => openAtom.reset(),
}: TrustChildrenCheckType<Value, TrustValue> & {
  openAtom: Atom<Value>;
  mood?: 'ok' | 'ko';
  onClose?: (openAtom: Atom<Value>) => void;
  isRenderHere?: boolean;
  className?: string;
}) => {
  const value = useAtomValue(openAtom);
  const isOpen = checkIsOpen === undefined ? value === 0 || !!value : checkIsOpen(value);

  const modalNode = isOpen && (
    <Portal>
      <Dialog.Root>
        <Dialog.Overlay />
        <EscapableModal onClose={() => onClose(openAtom)} />
        <StyledModalScreenWrapper
          className={twMerge('type_screen bg-x1/97', className)}
          onClick={event => {
            event.stopPropagation();
            onClose(openAtom);
          }}
        >
          <StyledModalScreen
            className={'type_screen mood mood_' + (mood ?? '')}
            onClick={propagationStopper}
          >
            {typeof children === 'function' ? children(value as never) : children}
          </StyledModalScreen>
        </StyledModalScreenWrapper>
      </Dialog.Root>
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
