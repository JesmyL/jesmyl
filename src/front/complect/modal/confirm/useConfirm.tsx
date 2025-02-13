import { ReactNode, useCallback, useEffect, useState } from 'react';
import { ThrowEvent } from '../../eventer/ThrowEvent';
import Modal from '../Modal/Modal';
import { ModalBody } from '../Modal/ModalBody';
import { ModalFooter } from '../Modal/ModalFooter';
import { ModalHeader } from '../Modal/ModalHeader';

export const useConfirm = () => {
  const [bodyContent, setBodyContent] = useState<ReactNode>();
  const [headerContent, setHeaderContent] = useState<ReactNode>('Подтверди');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationResolvers, setConfirmationResolvers] = useState(() => Promise.withResolvers<boolean>());

  useEffect(() => {
    if (!isModalOpen) return;

    return ThrowEvent.listenKeyDown('Enter', event => {
      event.stopPropagation();
      confirmationResolvers.resolve(true);
      setIsModalOpen(false);
    });
  }, [isModalOpen, confirmationResolvers]);

  return [
    <>
      {isModalOpen && (
        <Modal onClose={setIsModalOpen}>
          <ModalHeader>{headerContent}</ModalHeader>
          <ModalBody>{bodyContent}</ModalBody>
          <ModalFooter>
            <span className="flex flex-big-gap">
              <span
                id="confirm-button-YES"
                className="pointer"
                onClick={() => {
                  confirmationResolvers.resolve(true);
                  setIsModalOpen(false);
                }}
              >
                Да
              </span>
              <span
                id="confirm-button-NO"
                className="pointer"
                onClick={() => {
                  confirmationResolvers.resolve(false);
                  setIsModalOpen(false);
                }}
              >
                Нет
              </span>
            </span>
          </ModalFooter>
        </Modal>
      )}
    </>,
    useCallback((content: ReactNode, header?: ReactNode) => {
      if (header !== undefined) setHeaderContent(header);
      setBodyContent(content);
      setIsModalOpen(true);

      const resolvers = Promise.withResolvers<boolean>();
      setConfirmationResolvers(resolvers);

      return resolvers.promise;
    }, []),
  ] as const;
};
