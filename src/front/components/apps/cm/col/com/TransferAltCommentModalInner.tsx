import { Button } from '#shared/components/ui/button';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalFooter } from '#shared/ui/modal/Modal/ModalFooter';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmComCommentRegisteredAltKeysAtom } from '$cm/basis/lib/store/atoms';
import { cmIDB } from '$cm/basis/lib/store/cmIDB';
import { Com } from '$cm/col/com/Com';
import { useAtomValue } from 'atomaric';
import { useState } from 'react';

export const CmTransferAltCommentModalInner = ({ com }: { com: Com }) => {
  const [transferAltFrom, setTransferAltFrom] = useState<string | null>(null);
  const registeredAltKeys = useAtomValue(cmComCommentRegisteredAltKeysAtom);
  const [transferAltTo, setTransferAltTo] = useState<string | null>(registeredAltKeys.values().next().value ?? null);
  const items = Array.from(registeredAltKeys).map(key => ({ id: key, title: key }));

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
          disabled={transferAltFrom === transferAltTo}
          onClick={async () => {
            const commentBlock =
              (await cmIDB.tb.localComCommentBlocks.get(com.wid)) ?? (await cmIDB.tb.comCommentBlocks.get(com.wid));
            if (commentBlock == null) return;

            const fromAlt = transferAltFrom == null ? commentBlock.d : commentBlock.alt?.[transferAltFrom];
            const toAlt = transferAltTo == null ? commentBlock.d : commentBlock.alt?.[transferAltTo];

            const alt = { ...commentBlock.alt };
            const newComment = {
              ...commentBlock,
              comw: com.wid,
              m: Date.now(),
              alt,
            };

            if (transferAltFrom != null && transferAltTo != null) {
              alt[transferAltFrom] = toAlt;
              alt[transferAltTo] = fromAlt;
            } else if (transferAltTo != null && transferAltFrom == null) {
              newComment.d = toAlt ?? {};
              alt[transferAltTo] = fromAlt;
            } else if (transferAltFrom != null && transferAltTo == null) {
              newComment.d = fromAlt ?? {};
              alt[transferAltFrom] = toAlt;
            }

            await cmIDB.tb.localComCommentBlocks.put(newComment);
          }}
        >
          Переместить
        </Button>
      </ModalFooter>
    </>
  );
};
