import { Button } from '#shared/components/ui/button';
import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { TextInput } from '#shared/ui/TextInput';
import { useSetRootAnchoredContent } from '#shared/ui/useSetRootAnchoredContent';
import { atom } from 'atomaric';
import { ReactNode, useCallback, useEffect } from 'react';
import { Modal } from '../../modal/ui/Modal';
import { ModalBody } from '../../modal/ui/ModalBody';
import { ModalFooter } from '../../modal/ui/ModalFooter';
import { ModalHeader } from '../../modal/ui/ModalHeader';

const isOpenAtom = atom(false);

export const usePrompt = () => {
  const setContent = useSetRootAnchoredContent(isOpenAtom);

  return useCallback(
    (content: ReactNode, header?: ReactNode, defaultValue = '') => {
      const resolvers = Promise.withResolvers<string | null>();
      isOpenAtom.set(true);

      setContent(
        <Modal
          isRenderHere
          openAtom={isOpenAtom}
          onClose={() => {
            resolvers.resolve(null);
            isOpenAtom.set(false);
          }}
        >
          <PromptListeners
            confirmationResolvers={resolvers}
            onClose={() => isOpenAtom.set(false)}
            getValue={() => defaultValue}
          />
          <ModalHeader>{header ?? 'Заполни'}</ModalHeader>
          <ModalBody>
            {content}
            <TextInput
              defaultValue={defaultValue}
              onInput={eventValue => (defaultValue = eventValue)}
            />
          </ModalBody>
          <ModalFooter>
            <span className="flex gap-5">
              <Button
                id="confirm-button-YES"
                className="pointer"
                onClick={() => {
                  isOpenAtom.set(false);
                  resolvers.resolve(defaultValue);
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

// eslint-disable-next-line react-refresh/only-export-components
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
