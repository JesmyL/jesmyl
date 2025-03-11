import { mylib } from '#shared/lib/my-lib';
import { ReactNode } from 'react';
import { useModal } from './modal/useModal';
import { TheIconButton } from './the-icon/TheIconButton';

type PrepareResult = {
  url?: string;
  title?: string;
  text?: string | (() => string | und);
};

export function TheIconShareButton({
  text,
  disabled,
  description,
  className,
  url,
  title,
  prepare,
}: PrepareResult & {
  disabled?: boolean;
  description?: ReactNode;
  className?: string;
  prepare?: () => und | PrepareResult;
}) {
  const [modalNode, modal] = useModal();

  return (
    <>
      {modalNode}
      <TheIconButton
        icon="Share08"
        disabled={disabled}
        prefix={description}
        className={className}
        onClick={event => {
          event.stopPropagation();
          const textToWrite = mylib.isStr(text) ? text : text?.();
          if (!textToWrite && prepare === undefined) return;

          const prepared =
            prepare === undefined
              ? {
                  url,
                  title,
                  text: textToWrite,
                }
              : prepare();

          if (prepared === undefined) return;

          try {
            navigator.share({
              ...prepared,
              text: mylib.isStr(prepared.text) ? prepared.text : prepared.text?.(),
            });
          } catch (_e) {
            modal(event, ({ header, body }) => {
              return (
                <>
                  {header(<>Не удалось поделиться:</>)}
                  {body(
                    <div className="user-select-all">
                      {(prepared.title || '') +
                        (prepared.text ? '\n\n' + prepared.text : '') +
                        (prepared.url ? '\n\n' + prepared.url : '')}
                    </div>,
                  )}
                </>
              );
            });
          }
        }}
      />
    </>
  );
}
