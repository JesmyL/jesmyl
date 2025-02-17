import IconButton from '#shared/ui/the-icon/IconButton';
import { ReactNode } from 'react';
import useModal from '../../04-widgets/modal/useModal';
import useToast from '../../04-widgets/modal/useToast';

interface Props {
  text: string | (() => string | nil);
  disabled?: boolean;
  description?: ReactNode;
  className?: string;
  message?: ReactNode;
  withoutIcon?: boolean;
  onClose?: () => void;
}

export default function CopyTextButton({
  text,
  disabled,
  description,
  className,
  message,
  withoutIcon,
  onClose,
}: Props) {
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
          } catch (e) {
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
          <IconButton
            icon="Copy01"
            disabled={disabled}
          />
        )}
      </span>
    </>
  );
}
