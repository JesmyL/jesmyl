import { Button } from '#shared/components/ui/button';
import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { TextInput } from '#shared/ui/TextInput';
import { useSetRootAnchoredContent } from '#shared/ui/useSetRootAnchoredContent';
import { atom } from 'atomaric';
import { ReactNode, useCallback, useEffect } from 'react';
import { Modal } from './Modal/Modal';
import { ModalBody } from './Modal/ModalBody';
import { ModalFooter } from './Modal/ModalFooter';
import { ModalHeader } from './Modal/ModalHeader';

const isOpenAtom = atom(false);

export const usePrompt = () => {
  const setContent = useSetRootAnchoredContent(isOpenAtom);

  return useCallback(
    (content: ReactNode, header?: ReactNode) => {
      let value = '';
      const resolvers = Promise.withResolvers<string | null>();
      isOpenAtom.set(true);

      setContent(
        <Modal
          isRenderHere
          openAtom={isOpenAtom}
        >
          <PromptListeners
            confirmationResolvers={resolvers}
            onClose={() => isOpenAtom.set(false)}
            getValue={() => value}
          />
          <ModalHeader>{header ?? 'Заполни'}</ModalHeader>
          <ModalBody>
            {content}
            <TextInput onInput={eventValue => (value = eventValue)} />
          </ModalBody>
          <ModalFooter>
            <span className="flex gap-5">
              <Button
                id="confirm-button-YES"
                className="pointer"
                onClick={() => {
                  isOpenAtom.set(false);
                  resolvers.resolve(value);
                }}
              >
                Принять
              </Button>
              <Button
                id="confirm-button-NO"
                className="pointer"
                variant="destructive"
                onClick={() => {
                  resolvers.resolve(null);
                  isOpenAtom.set(false);
                }}
              >
                Отмена
              </Button>
            </span>
          </ModalFooter>
        </Modal>,
      );

      return resolvers.promise;
    },
    [setContent],
  );
};

const PromptListeners = ({
  confirmationResolvers,
  onClose,
  getValue,
}: {
  confirmationResolvers: PromiseWithResolvers<string | null>;
  onClose: (is: false) => void;
  getValue: () => string;
}) => {
  useEffect(() => {
    return ThrowEvent.listenKeyUp('Enter', event => {
      event.stopPropagation();
      confirmationResolvers.resolve(getValue());
      onClose(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmationResolvers, onClose]);

  return <></>;
};
