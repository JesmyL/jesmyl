import { Button } from '#shared/components/ui/button';
import { TextInput } from '#shared/ui/TextInput';
import { useSetRootAnchoredContent } from '#shared/ui/useSetRootAnchoredContent';
import { Atom, atom } from 'atomaric';
import { ReactNode, useCallback } from 'react';
import { KeyboardListeners } from '../../../KeyboardListeners';
import { Modal } from '../../modal/ui/Modal';
import { ModalBody } from '../../modal/ui/ModalBody';
import { ModalFooter } from '../../modal/ui/ModalFooter';
import { ModalHeader } from '../../modal/ui/ModalHeader';

let isOpenAtom: Atom<boolean>;

export const usePrompt = () => {
  isOpenAtom ??= atom(false);

  const setContent = useSetRootAnchoredContent(isOpenAtom);

  return useCallback(
    (content: ReactNode, header?: ReactNode, defaultValue = '', { multiline }: { multiline?: boolean } = {}) => {
      const resolvers = Promise.withResolvers<string | null>();
      isOpenAtom.set(true);

      const onAction = (value: string | null) => {
        resolvers.resolve(value);
        isOpenAtom.set(false);
      };

      setContent(
        <Modal
          isRenderHere
          openAtom={isOpenAtom}
          onClose={() => {
            resolvers.resolve(null);
            isOpenAtom.reset();
          }}
        >
          <KeyboardListeners
            onEnter={() => onAction(defaultValue)}
            onEscape={() => onAction(null)}
          />
          <ModalHeader>{header ?? 'Заполни'}</ModalHeader>
          <ModalBody>
            {content}
            <TextInput
              defaultValue={defaultValue}
              selectOnFocus
              multiline={multiline}
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
