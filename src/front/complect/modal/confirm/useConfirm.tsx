import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { ThrowEvent } from '../../eventer/ThrowEvent';
import Modal from '../Modal/Modal';
import { ModalBody } from '../Modal/ModalBody';
import { ModalFooter } from '../Modal/ModalFooter';
import { ModalHeader } from '../Modal/ModalHeader';

export const useConfirm = () => {
  const [bodyContent, setBodyContent] = useState<ReactNode>();
  const [headerContent, setHeaderContent] = useState<ReactNode>('Подтверди');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const confirmationPromise = useMemo(() => Promise.withResolvers<boolean>(), []);

  useEffect(() => {
    if (!isModalOpen) return;

    return ThrowEvent.listenKeyDown('Enter', event => {
      event.stopPropagation();
      confirmationPromise.resolve(true);
      setIsModalOpen(false);
    });
  }, [isModalOpen, confirmationPromise]);

  return [
    <>
      {isModalOpen && (
        <Modal onClose={setIsModalOpen}>
          <ModalHeader>{headerContent}</ModalHeader>
          <ModalBody>{bodyContent}</ModalBody>
          <ModalFooter>
            <span className="flex flex-big-gap">
              <span
                className="pointer"
                onClick={() => {
                  confirmationPromise.resolve(true);
                  setIsModalOpen(false);
                }}
              >
                Да
              </span>
              <span
                className="pointer"
                onClick={() => {
                  confirmationPromise.resolve(false);
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
    useCallback(
      (content: ReactNode, header?: ReactNode) => {
        if (header !== undefined) setHeaderContent(header);
        setBodyContent(content);
        setIsModalOpen(true);

        return confirmationPromise.promise;
      },
      [confirmationPromise.promise],
    ),
  ] as const;
};
