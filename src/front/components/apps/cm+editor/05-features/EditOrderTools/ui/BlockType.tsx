import { atom } from '#shared/lib/atom';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { cmEditComOrderClientInvocatorMethods } from '$cm+editor/basis/lib/cm-editor-invocator.methods';
import { ChordVisibleVariant } from '$cm/Cm.model';
import { TheOrder } from '$cm/col/com/order/TheOrder';
import { comBlockStyles } from 'shared/values/cm/block-styles/BlockStyles';
import { OrdersRedactorOrderToolsProps } from '../model';

const isModalOpenAtom = atom(false);

export const OrdersRedactorOrderToolsBlockType = ({ com, ord, ordi }: OrdersRedactorOrderToolsProps) => {
  return (
    <>
      <BottomPopupItem
        icon="Cube"
        title="Тип блока"
        onClick={isModalOpenAtom.toggle}
      />

      <Modal openAtom={isModalOpenAtom}>
        <ModalHeader>Тип блока</ModalHeader>
        <ModalBody>
          <TheOrder
            orderUnit={ord}
            orderUniti={ordi}
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
                className="margin-gap-t"
                onChange={isModalOpenAtom.reset}
                onClick={() =>
                  cmEditComOrderClientInvocatorMethods.setType({
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
