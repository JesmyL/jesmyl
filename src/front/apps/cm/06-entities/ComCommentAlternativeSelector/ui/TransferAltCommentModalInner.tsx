import { Button } from '#shared/components/ui/button';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { ModalBody, ModalFooter, ModalHeader } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmComCommentRegisteredAltKeysAtom } from '$cm/entities/com-comment';
import { cmIDB } from '$cm/shared/state';
import { cmTsjrpcClient } from '$cm/shared/tsjrpc';
import { useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import { CmComWid } from 'shared/api';

export const CmComCommentAlternativeSelectorTransferModalInner = ({ comw }: { comw: CmComWid }) => {
  const [transferAltFrom, setTransferAltFrom] = useState<string | null>(null);
  const registeredAltKeys = useAtomValue(cmComCommentRegisteredAltKeysAtom);
  const [transferAltTo, setTransferAltTo] = useState<string | null>(registeredAltKeys.values().next().value ?? null);
  const items = Array.from(registeredAltKeys).map(key => ({ id: key, title: key }));
  const localCommentBlock = useLiveQuery(() => cmIDB.tb.localComCommentBlocks.get(comw), [comw]);

  cmComCommentRegisteredAltKeysAtom.do.init();

  return (
    <>
      <ModalHeader>Переместить заметки</ModalHeader>
      <ModalBody className="flex flex-col">
        <Dropdown<string | null>
          nullTitle={<span className="text-x7">Общ</span>}
          id={transferAltFrom}
          onSelectId={setTransferAltFrom}
          items={items}
          hiddenIds={[transferAltTo]}
        />
        <LazyIcon
          icon="ArrowDataTransferVertical"
          className="m-5"
        />
        <Dropdown<string | null>
          id={transferAltTo}
          onSelectId={setTransferAltTo}
          items={items}
          hiddenIds={[transferAltFrom]}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          icon="ArrowDataTransferVertical"
          disabled={transferAltFrom === transferAltTo || localCommentBlock != null}
          disabledReason={
            transferAltFrom === transferAltTo
              ? 'Объекты перемещения одинаковые'
              : localCommentBlock != null
                ? 'Действие может быть выполнено только при отправке комментариев на сервер'
                : undefined
          }
          onClick={() => cmTsjrpcClient.replaceUserAltCommentBlocks({ comw, from: transferAltFrom, to: transferAltTo })}
        >
          Обменять
        </Button>
      </ModalFooter>
    </>
  );
};
