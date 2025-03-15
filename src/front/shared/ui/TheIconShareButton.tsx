import { mylib } from '#shared/lib/my-lib';
import { ReactNode, useState } from 'react';
import { Modal } from './modal/Modal/Modal';
import { ModalBody } from './modal/Modal/ModalBody';
import { ModalHeader } from './modal/Modal/ModalHeader';
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
  const [bodyNode, setBodyNode] = useState<React.ReactNode>();

  return (
    <>
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
            setBodyNode(
              <div className="user-select-all">
                {(prepared.title || '') +
                  (prepared.text ? '\n\n' + prepared.text : '') +
                  (prepared.url ? '\n\n' + prepared.url : '')}
              </div>,
            );
          }
        }}
      />

      {bodyNode && (
        <Modal onClose={setBodyNode}>
          <ModalHeader>Не удалось поделиться:</ModalHeader>
          <ModalBody>{bodyNode}</ModalBody>
        </Modal>
      )}
    </>
  );
}
