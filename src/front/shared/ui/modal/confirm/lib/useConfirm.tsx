import { useSetRootAnchoredContent } from '#shared/ui/useSetRootAnchoredContent';
import { atom } from 'atomaric';
import { ReactNode, useCallback, useRef } from 'react';
import { emptyFunc } from 'shared/utils';
import { Modal } from '../../modal/ui/Modal';
import { ModalBody } from '../../modal/ui/ModalBody';
import { ModalFooter } from '../../modal/ui/ModalFooter';
import { ModalHeader } from '../../modal/ui/ModalHeader';
import { ConfirmListeners } from '../ui/Listeners';

const isOpenConfirmAtom = atom(false);

export const useConfirm = () => {
  const onCloseRef = useRef<() => void>(emptyFunc);
  const setContent = useSetRootAnchoredContent(isOpenConfirmAtom);

  return useCallback(
    (content: ReactNode, header?: ReactNode) => {
      const resolvers = Promise.withResolvers<boolean>();
      isOpenConfirmAtom.set(true);

      setContent(
        <Modal
          isRenderHere
          openAtom={isOpenConfirmAtom}
        >
          <ConfirmListeners
            confirmationResolvers={resolvers}
            onClose={() => {
              onCloseRef.current();
              isOpenConfirmAtom.set(false);
            }}
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
