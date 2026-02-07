import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { ChordVisibleVariant, TheCmComOrder } from '$cm/ext';
import { Atom, atom } from 'atomaric';
import { comBlockKinds } from 'shared/values/cm/block-kinds/BlockKind';
import { CmEditorComOrderToolsProps } from '../model';

let isModalOpenAtom: Atom<boolean>;

export const CmEditorComOrderToolsBlockKind = ({ com, ord, ordi }: CmEditorComOrderToolsProps) => {
  isModalOpenAtom ??= atom(false);

  return (
    <>
      <BottomPopupItem
        icon="Cube"
        title="Тип блока"
        onClick={isModalOpenAtom.do.toggle}
      />

      <Modal openAtom={isModalOpenAtom}>
        <ModalHeader>Тип блока</ModalHeader>
        <ModalBody>
          <TheCmComOrder
            ord={ord}
            ordi={ordi}
            chordVisibleVariant={ChordVisibleVariant.Maximal}
            chordHardLevel={3}
            com={com}
          />
          {comBlockKinds?.kinds.map(kindBlock => {
            if ((ordi === 0 || ord.me.isTarget) && kindBlock.isInherit) return null;
            if (ord.texti == null ? kindBlock.isBlockForTextableOnly : kindBlock.isBlockForChordedOnly) return null;

            const newBlockn = kindBlock.title[com.langi || 0];
            return (
              <IconCheckbox
                key={kindBlock.key}
                checked={kindBlock.key === ord.kind}
                disabled={kindBlock.key === ord.kind}
                className="mt-2"
                onChange={isModalOpenAtom.reset}
                postfix={newBlockn}
                onClick={() =>
                  cmEditComOrderClientTsjrpcMethods.setKind({
                    ordw: ord.wid,
                    orderTitle: ord.me.header(),
                    comw: com.wid,
                    kind: kindBlock.key,
                    newTypeTitle: kindBlock.title[com.langi],
                  })
                }
              />
            );
          })}
        </ModalBody>
      </Modal>
    </>
  );
};
