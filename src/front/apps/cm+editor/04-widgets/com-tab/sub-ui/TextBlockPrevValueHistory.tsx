import { Button } from '#shared/components/ui/button';
import { Card } from '#shared/components/ui/card';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '#shared/ui/modal';
import { atom, Atom, useAtomValue } from 'atomaric';
import { CmComWid } from 'shared/api';
import { twMerge } from 'tailwind-merge';

type Props = {
  historyAtom: Atom<{ value?: PRecord<CmComWid, PRecord<number, string[]>> }>;
  comw: CmComWid;
};

let openHistoryAtom: Atom<null | number>;

export const CmEditorComTabTextBlockPrevValueButton = (props: Props & { texti: number }) => {
  openHistoryAtom ??= atom<null | number>(null);

  const history = useAtomValue(props.historyAtom).value?.[props.comw];

  return (
    !history?.[props.texti]?.length || (
      <>
        <Button
          icon="TaskEdit01"
          onClick={() => openHistoryAtom.set(props.texti)}
        />
      </>
    )
  );
};

export const CmEditorComTabTextBlockPrevValueUpdateModal = (
  props: Props & { onPaste: (text: string, texti: number) => Promise<unknown>; texts: string[] | nil },
) => {
  const history = useAtomValue(props.historyAtom).value?.[props.comw];
  const texti = useAtomValue(openHistoryAtom);

  return (
    <Modal openAtom={openHistoryAtom}>
      <ModalHeader>Вставка предыдущего текста</ModalHeader>
      <ModalBody>
        {texti != null &&
          history?.[texti]?.map((text, txti) => {
            return (
              <Card.Root
                key={txti}
                className={twMerge('my-3', props.texts?.[texti] === text && 'pointers-none')}
              >
                <Card.Content className="pre-text">{text}</Card.Content>
                <Card.Footer className="flex justify-end">
                  <Button
                    onClick={() => {
                      props.onPaste(text, texti);
                      openHistoryAtom.reset();
                    }}
                  >
                    Заменить на этот текст
                  </Button>
                </Card.Footer>
              </Card.Root>
            );
          })}
      </ModalBody>
      <ModalFooter>Будет очищено при вставке новых блоков</ModalFooter>
    </Modal>
  );
};
