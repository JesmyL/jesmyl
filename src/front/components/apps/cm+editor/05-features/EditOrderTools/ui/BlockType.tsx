import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { cmComOrderClientInvocatorMethods } from '$cm+editor/basis/lib/cm-editor-invocator.methods';
import { ChordVisibleVariant } from '$cm/Cm.model';
import { blockStyles } from '$cm/col/com/block-styles/BlockStyles';
import { TheOrder } from '$cm/col/com/order/TheOrder';
import { useState } from 'react';
import { OrdersRedactorOrderToolsProps } from '../model';

export const OrdersRedactorOrderToolsBlockType = ({ com, ord, ordi }: OrdersRedactorOrderToolsProps) => {
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
          {({ onClose }) => (
            <>
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
                  if (ord.texti == null ? styleBlock.isBlockForTextableOnly : styleBlock.isBlockForChordedOnly)
                    return null;

                  const newBlockn = styleBlock.title[com.langi || 0];
                  return (
                    <IconCheckbox
                      key={styleBlock.key}
                      checked={styleBlock.key === ord.type}
                      disabled={styleBlock.key === ord.type}
                      className="margin-gap-t"
                      onChange={() => {
                        setIsModalOpen(false);
                        onClose();
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
            </>
          )}
        </Modal>
      )}
    </>
  );
};
