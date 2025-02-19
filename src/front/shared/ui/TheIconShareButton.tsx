import { mylib } from '#shared/lib/my-lib';
import { ReactNode } from 'react';
import { IconButton } from './icon';
import { useModal } from './modal';

type PrepareResult = {
  url?: string;
  title?: string;
  text?: string | (() => string | und);
};

export default function TheIconShareButton({
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
      <IconButton
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
          } catch (e) {
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
