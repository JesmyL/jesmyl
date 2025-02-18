import { BottomPopupItem } from '#shared/ui/absolute-popup/bottom-popup/BottomPopupItem';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import IconCheckbox from 'front/08-shared/ui/the-icon/IconCheckbox';
import { cmComOrderClientInvocatorMethods } from 'front/components/apps/cm/editor/cm-editor-invocator.methods';
import { useState } from 'react';
import { ChordVisibleVariant } from '../../../../../../Cm.model';
import { blockStyles } from '../../../../../../col/com/block-styles/BlockStyles';
import TheOrder from '../../../../../../col/com/order/TheOrder';
import { OrdersRedactorOrderToolsProps } from '../OrdersRedactorOrderTools';

export const OrdersRedactorOrderToolsBlockType = ({ com, ord, ordi, onClose }: OrdersRedactorOrderToolsProps) => {
  const [isModalOpen, setIsModalOpen] = useState<unknown>(false);

  return (
    <>
      <BottomPopupItem
        icon="Cube"
        title="Тип блока"
        onClick={setIsModalOpen}
      />
      {isModalOpen && (
        <Modal onClose={setIsModalOpen}>
          <ModalHeader>Тип блока</ModalHeader>
          <ModalBody>
            <TheOrder
              orderUnit={ord}
              orderUniti={ordi}
              chordVisibleVariant={ChordVisibleVariant.Maximal}
              com={com}
            />
            {blockStyles?.styles.map(styleBlock => {
              if ((ordi === 0 || ord.me.isTarget) && styleBlock.isInherit) return null;
              if (ord.texti == null ? styleBlock.isBlockForTextableOnly : styleBlock.isBlockForChordedOnly) return null;

              const newBlockn = styleBlock.title[com.langi || 0];
              return (
                <IconCheckbox
                  key={styleBlock.key}
                  checked={styleBlock.key === ord.type}
                  disabled={styleBlock.key === ord.type}
                  className="margin-gap-t"
                  onChange={() => {
                    setIsModalOpen(false);
                    onClose(false);
                  }}
                  onClick={() =>
                    cmComOrderClientInvocatorMethods.setType(
                      null,
                      ord.wid,
                      ord.me.header(),
                      com.wid,
                      styleBlock.key,
                      styleBlock.title[com.langi],
                    )
                  }
                  postfix={newBlockn}
                />
              );
            })}
          </ModalBody>
        </Modal>
      )}
    </>
  );
};
