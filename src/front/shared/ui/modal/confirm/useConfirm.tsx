import { useSetRootAnchoredContent } from '#shared/ui/useSetRootAnchoredContent';
import { ReactNode, useCallback, useRef } from 'react';
import { emptyFunc } from 'shared/utils';
import { Modal } from '../Modal/Modal';
import { ModalBody } from '../Modal/ModalBody';
import { ModalFooter } from '../Modal/ModalFooter';
import { ModalHeader } from '../Modal/ModalHeader';
import { ConfirmListeners } from './ui/Listeners';

export const useConfirm = () => {
  const onCloseRef = useRef<() => void>(emptyFunc);
  const setContent = useSetRootAnchoredContent(onCloseRef);

  return useCallback(
    (content: ReactNode, header?: ReactNode) => {
      const resolvers = Promise.withResolvers<boolean>();

      setContent(
        <Modal
          onClose={onCloseRef.current}
          isRenderHere
        >
          <ConfirmListeners
            confirmationResolvers={resolvers}
            onClose={onCloseRef.current}
          />
          <ModalHeader>{header ?? 'Подтверди'}</ModalHeader>
          <ModalBody>{content}</ModalBody>
          <ModalFooter>
            <span className="flex flex-big-gap">
              <span
                id="confirm-button-YES"
                className="pointer"
                onClick={() => {
                  onCloseRef.current();
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
