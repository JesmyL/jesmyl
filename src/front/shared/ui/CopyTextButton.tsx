import { ReactNode } from 'react';
import { checkIsString } from 'shared/utils/checkIs';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { Modal, ModalBody, ModalHeader } from './modal';
import { TheIconButton } from './the-icon/TheIconButton';
import { WithAtomWithValue } from './WithAtomWithValue';

interface Props {
  text: string | (() => string | nil);
  disabled?: boolean;
  description?: ReactNode;
  className?: string;
  message?: ReactNode;
  withoutIcon?: boolean;
  onClose?: () => void;
}

export function CopyTextButton({ text, disabled, description, className, message, withoutIcon, onClose }: Props) {
  return (
    <WithAtomWithValue init="">
      {(textToCopy, textToCopyAtom) => (
        <>
          <span
            className={twMerge('flex gap-2 pointer', className)}
            onClick={event => {
              event.stopPropagation();
              const textToWrite = checkIsString(text) ? text : text();
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
      )}
    </WithAtomWithValue>
  );
}
