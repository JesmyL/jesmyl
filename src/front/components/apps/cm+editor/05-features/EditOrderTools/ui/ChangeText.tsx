import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { cmComOrderClientInvocatorMethods } from '$cm+editor/basis/lib/cm-editor-invocator.methods';
import { ChordVisibleVariant } from '$cm/Cm.model';
import { TheOrder } from '$cm/col/com/order/TheOrder';
import { useState } from 'react';
import { OrdersRedactorOrderToolsProps } from '../model';

export const OrdersRedactorOrderToolsChangeText = ({ com, ord, ordi }: OrdersRedactorOrderToolsProps) => {
  const [isModalOpen, setIsModalOpen] = useState<unknown>(null);

  const blockHeaderHtml = (textPre = '') =>
    `${textPre && `${textPre} `}${ord.isEmptyHeader ? <s>{ord.me.header()}</s> : ord.me.header()}`;

  return (
    <>
      <BottomPopupItem
        icon="Text"
        title="Заменить текст"
        onClick={setIsModalOpen}
      />

      {isModalOpen && (
        <Modal onClose={setIsModalOpen}>
          {({ onClose }) => (
            <>
              <ModalHeader>{blockHeaderHtml('Текстовый блок для блока')}</ModalHeader>
              <ModalBody>
                <TheOrder
                  orderUnit={ord}
                  orderUniti={ordi}
                  chordVisibleVariant={ChordVisibleVariant.Maximal}
                  com={com}
                />
                {com.texts?.map((text, texti) => {
                  if (!text) return null;

                  return (
                    <IconCheckbox
                      key={texti}
                      className="margin-gap-t"
                      disabled={ord.texti === texti}
                      checked={ord.texti === texti}
                      postfix={
                        <>
                          <b>{texti + 1}</b>
                          <pre>{text}</pre>
                        </>
                      }
                      onChange={() => {
                        setIsModalOpen(false);
                        onClose();
                      }}
                      onClick={() =>
                        cmComOrderClientInvocatorMethods.setTexti({
                          orderTitle: ord.me.header(),
                          comw: com.wid,
                          ordw: ord.wid,
                          texti: texti,
                        })
                      }
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
