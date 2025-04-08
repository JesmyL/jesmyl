import { atom, useAtomValue } from '#shared/lib/atom';
import { ReactNode } from 'react';
import { Modal } from './modal/Modal/Modal';
import { ModalBody } from './modal/Modal/ModalBody';
import { ModalHeader } from './modal/Modal/ModalHeader';
import { useToast } from './modal/useToast';
import { TheIconButton } from './the-icon/TheIconButton';

interface Props {
  text: string | (() => string | nil);
  disabled?: boolean;
  description?: ReactNode;
  className?: string;
  message?: ReactNode;
  withoutIcon?: boolean;
  onClose?: () => void;
}

const textToCopyAtom = atom('');

export function CopyTextButton({ text, disabled, description, className, message, withoutIcon, onClose }: Props) {
  const toast = useToast();
  const textToCopy = useAtomValue(textToCopyAtom);

  return (
    <>
      <span
        className={(className || '') + ' flex flex-gap pointer'}
        onClick={event => {
          event.stopPropagation();
          const textToWrite = typeof text === 'string' ? text : text();
          if (textToWrite == null) return;

          try {
            navigator.clipboard.writeText(textToWrite);
            toast(message ?? 'Текст скопирован');
            onClose?.();
          } catch (_e) {
            textToCopyAtom.set(textToWrite);
          }
        }}
      >
        {description}
        {withoutIcon || (
          <TheIconButton
            icon="Copy01"
            disabled={disabled}
          />
        )}
      </span>

      <Modal openAtom={textToCopyAtom}>
        <ModalHeader>Не удалось скопировать текст:</ModalHeader>
        <ModalBody className="user-select-all">{textToCopy}</ModalBody>
      </Modal>
    </>
  );
}
