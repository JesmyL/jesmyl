import { Button } from '#shared/components/ui/button';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalFooter } from '#shared/ui/modal/Modal/ModalFooter';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmComCommentRegisteredAltKeysAtom } from '$cm/basis/lib/store/atoms';
import { cmIDB } from '$cm/basis/lib/store/cmIDB';
import { Com } from '$cm/col/com/Com';
import { cmTsjrpcClient } from '$cm/tsjrpc/basic.tsjrpc.methods';
import { useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';

export const CmTransferAltCommentModalInner = ({ com }: { com: Com }) => {
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
