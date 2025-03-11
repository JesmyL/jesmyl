import { ReactNode } from 'react';
import { useModal } from './modal/useModal';
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

export function CopyTextButton({ text, disabled, description, className, message, withoutIcon, onClose }: Props) {
  const [toastNode, toast] = useToast();
  const [modalNode, modal] = useModal();

  return (
    <>
      {modalNode}
      {toastNode}
      <span
        className={(className || '') + ' flex flex-gap pointer'}
        onClick={event => {
          event.stopPropagation();
          const textToWrite = typeof text === 'string' ? text : text();

          try {
            if (textToWrite == null) return;
            navigator.clipboard.writeText(textToWrite);
            toast(message ?? 'Текст скопирован');
            onClose?.();
          } catch (_e) {
            modal(event, ({ header, body }) => {
              return (
                <>
                  {header(<>Не удалось скопировать текст:</>)}
                  {body(<div className="user-select-all">{textToWrite}</div>)}
                </>
              );
            });
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
    </>
  );
}
