import { ReactNode, useCallback, useState } from 'react';
import { Modal } from '../Modal/Modal';
import { ModalBody } from '../Modal/ModalBody';
import { ModalFooter } from '../Modal/ModalFooter';
import { ModalHeader } from '../Modal/ModalHeader';
import { ConfirmListeners } from './ui/Listeners';

export const useConfirm = () => {
  const [bodyContent, setBodyContent] = useState<ReactNode>();
  const [headerContent, setHeaderContent] = useState<ReactNode>('Подтверди');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationResolvers, setConfirmationResolvers] = useState(() => Promise.withResolvers<boolean>());

  return [
    <>
      {isModalOpen && (
        <Modal
          onClose={setIsModalOpen}
          asRootAnchor={onClose => (
            <>
              <ConfirmListeners
                confirmationResolvers={confirmationResolvers}
                isModalOpen={isModalOpen}
                onClose={onClose}
              />
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
                      onClose(false);
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
                      onClose(false);
                    }}
                  >
                    Нет
                  </span>
                </span>
              </ModalFooter>
            </>
          )}
        />
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
