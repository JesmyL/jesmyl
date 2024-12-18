import { mylib } from 'front/utils';
import { ReactNode } from 'react';
import { IconShare08StrokeRounded } from '../complect/the-icon/icons/share-08';
import useModal from './modal/useModal';
import IconButton from './the-icon/IconButton';

type PrepareResult = {
  url?: string;
  title?: string;
  text?: string | (() => string | und);
};

export default function ShareEvaButton({
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
        Icon={IconShare08StrokeRounded}
        disabled={disabled}
        prefix={description}
        className={className}
        onClick={event => {
          event.stopPropagation();
          const textToWrite = mylib.isStr(text) ? text : text?.();
          if (!textToWrite && prepare === undefined) return null;

          const prepared =
            prepare === undefined
              ? {
                  url,
                  title,
                  text: textToWrite,
                }
              : prepare();

          if (prepared === undefined) return null;

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
