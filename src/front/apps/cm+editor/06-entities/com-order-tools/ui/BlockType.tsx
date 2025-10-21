import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { ChordVisibleVariant, TheCmComOrder } from '$cm/ext';
import { atom } from 'atomaric';
import { comBlockStyles } from 'shared/values/cm/block-styles/BlockStyles';
import { CmEditorComOrderToolsProps } from '../model';

const isModalOpenAtom = atom(false);

export const CmEditorComOrderToolsBlockType = ({ com, ord, ordi }: CmEditorComOrderToolsProps) => {
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
            com={com}
          />
          {comBlockStyles?.styles.map(styleBlock => {
            if ((ordi === 0 || ord.me.isTarget) && styleBlock.isInherit) return null;
            if (ord.texti == null ? styleBlock.isBlockForTextableOnly : styleBlock.isBlockForChordedOnly) return null;

            const newBlockn = styleBlock.title[com.langi || 0];
            return (
              <IconCheckbox
                key={styleBlock.key}
                checked={styleBlock.key === ord.type}
                disabled={styleBlock.key === ord.type}
                className="mt-2"
                onChange={isModalOpenAtom.reset}
                onClick={() =>
                  cmEditComOrderClientTsjrpcMethods.setType({
                    ordw: ord.wid,
                    orderTitle: ord.me.header(),
                    comw: com.wid,
                    type: styleBlock.key,
                    newTypeTitle: styleBlock.title[com.langi],
                  })
                }
                postfix={newBlockn}
              />
            );
          })}
        </ModalBody>
      </Modal>
    </>
  );
};
