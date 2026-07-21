import { useSetRootAnchoredContent } from '#shared/ui/useSetRootAnchoredContent';
import { Atom, atom } from 'atomaric';
import { ReactNode, useCallback, useRef } from 'react';
import { emptyFunc } from 'shared/utils';
import { KeyboardListeners } from '../../../KeyboardListeners';
import { Modal } from '../../modal/ui/Modal';
import { ModalBody } from '../../modal/ui/ModalBody';
import { ModalFooter } from '../../modal/ui/ModalFooter';
import { ModalHeader } from '../../modal/ui/ModalHeader';

let isOpenConfirmAtom: Atom<boolean>;

export const useConfirm = () => {
  isOpenConfirmAtom ??= atom(false);

  const onCloseRef = useRef<() => void>(emptyFunc);
  const setContent = useSetRootAnchoredContent(isOpenConfirmAtom);

  return useCallback(
    (content: ReactNode, header?: ReactNode) => {
      const resolvers = Promise.withResolvers<boolean>();
      isOpenConfirmAtom.set(true);

      const onAction = (resolve: boolean) => {
        resolvers.resolve(resolve);
        onCloseRef.current();
        isOpenConfirmAtom.reset();
      };

      setContent(
        <Modal
          isRenderHere
          openAtom={isOpenConfirmAtom}
          onClose={() => {
            resolvers.resolve(false);
            isOpenConfirmAtom.reset();
          }}
        >
          <KeyboardListeners
            onEnter={() => onAction(true)}
            onEscape={() => onAction(false)}
          />
          <ModalHeader>{header ?? 'Подтверди'}</ModalHeader>
          <ModalBody>{content}</ModalBody>
          <ModalFooter>
            <span className="flex gap-5">
              <span
                id="confirm-button-YES"
                className="pointer"
                onClick={() => {
                  onCloseRef.current();
                  isOpenConfirmAtom.set(false);
                  resolvers.resolve(true);
                }}
              >
                Да
              </span>
              <span
                id="confirm-button-NO"
                className="pointer"
                onClick={() => {
                  resolvers.resolve(false);
                  isOpenConfirmAtom.set(false);
                  onCloseRef.current();
                }}
              >
                Нет
              </span>
            </span>
          </ModalFooter>
        </Modal>,
      );

      return resolvers.promise;
    },
    [setContent],
  );
};
