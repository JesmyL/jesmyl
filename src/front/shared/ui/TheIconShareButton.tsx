import { mylib } from '#shared/lib/my-lib';
import { Atom, atom, useAtomValue } from 'atomaric';
import { ReactNode } from 'react';
import { Modal, ModalBody, ModalHeader } from './modal';
import { TheIconButton } from './the-icon/TheIconButton';

type PrepareResult = {
  url?: string;
  title?: string;
  text?: string | (() => string | und);
};

let bodyNodeAtom: Atom<React.ReactNode>;

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
  bodyNodeAtom ??= atom<React.ReactNode>(null);

  const bodyNode = useAtomValue(bodyNodeAtom);

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
            bodyNodeAtom.set(
              <div className="user-select-all">
                {(prepared.title || '') +
                  (prepared.text ? '\n\n' + prepared.text : '') +
                  (prepared.url ? '\n\n' + prepared.url : '')}
              </div>,
            );
          }
        }}
      />

      <Modal openAtom={bodyNodeAtom}>
        <ModalHeader>Не удалось поделиться:</ModalHeader>
        <ModalBody>{bodyNode}</ModalBody>
      </Modal>
    </>
  );
}
