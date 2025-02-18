import { BottomPopupItem } from '#shared/ui/absolute-popup/bottom-popup/BottomPopupItem';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import IconCheckbox from 'front/08-shared/ui/the-icon/IconCheckbox';
import { cmComOrderClientInvocatorMethods } from 'front/components/apps/cm/editor/cm-editor-invocator.methods';
import { useState } from 'react';
import { ChordVisibleVariant } from '../../../../../../Cm.model';
import TheOrder from '../../../../../../col/com/order/TheOrder';
import { OrdersRedactorOrderToolsProps } from '../OrdersRedactorOrderTools';

export const OrdersRedactorOrderToolsChangeText = ({ com, ord, ordi, onClose }: OrdersRedactorOrderToolsProps) => {
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
          <ModalHeader>{blockHeaderHtml('Установи Текстовый блок для блока')}</ModalHeader>
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
                      <b>{texti - -1}</b>
                      <pre>{text}</pre>
                    </>
                  }
                  onChange={() => {
                    setIsModalOpen(false);
                    onClose(false);
                  }}
                  onClick={() =>
                    cmComOrderClientInvocatorMethods.setTexti(null, ord.me.header(), com.wid, ord.wid, texti)
                  }
                />
              );
            })}
          </ModalBody>
        </Modal>
      )}
    </>
  );
};
