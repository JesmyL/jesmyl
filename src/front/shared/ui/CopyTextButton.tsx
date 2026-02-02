import { Atom, atom, useAtomValue } from 'atomaric';
import { ReactNode } from 'react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { Modal, ModalBody, ModalHeader } from './modal';
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

let textToCopyAtom: Atom<string>;

export function CopyTextButton({ text, disabled, description, className, message, withoutIcon, onClose }: Props) {
  textToCopyAtom ??= atom('');

  const textToCopy = useAtomValue(textToCopyAtom);

  return (
    <>
      <span
        className={twMerge('flex gap-2 pointer', className)}
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
