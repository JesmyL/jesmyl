import { Button } from '#shared/components/ui/button';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { ModalBody, ModalFooter, ModalHeader } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { CmCom } from '$cm/entities/com';
import { cmComCommentRegisteredAltKeysAtom } from '$cm/entities/com-comment';
import { cmIDB } from '$cm/shared/state';
import { cmTsjrpcClient } from '$cm/shared/tsjrpc';
import { useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';

export const CmComCommentTransferAltModalInner = ({ com }: { com: CmCom }) => {
  const [transferAltFrom, setTransferAltFrom] = useState<string | null>(null);
  const registeredAltKeys = useAtomValue(cmComCommentRegisteredAltKeysAtom);
  const [transferAltTo, setTransferAltTo] = useState<string | null>(registeredAltKeys.values().next().value ?? null);
  const items = Array.from(registeredAltKeys).map(key => ({ id: key, title: key }));
  const localCommentBlock = useLiveQuery(() => cmIDB.tb.localComCommentBlocks.get(com.wid), [com.wid]);

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
          onClick={() =>
            cmTsjrpcClient.replaceUserAltCommentBlocks({ comw: com.wid, from: transferAltFrom, to: transferAltTo })
          }
        >
          Обменять
        </Button>
      </ModalFooter>
    </>
  );
};
