import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { ChordVisibleVariant } from '$cm/Cm.model';
import { TheOrder } from '$cm/col/com/order/TheOrder';
import { atom } from 'atomaric';
import { OrdersRedactorOrderToolsProps } from '../model';

const isModalOpenAtom = atom(false);
export const OrdersRedactorOrderToolsChangeText = ({ com, ord, ordi }: OrdersRedactorOrderToolsProps) => {
  const blockHeaderHtml = (textPre = '') =>
    `${textPre && `${textPre} `}${ord.isEmptyHeader ? <s>{ord.me.header()}</s> : ord.me.header()}`;

  return (
    <>
      <BottomPopupItem
        icon="Text"
        title="Заменить текст"
        onClick={isModalOpenAtom.toggle}
      />

      <Modal openAtom={isModalOpenAtom}>
        <ModalHeader>{blockHeaderHtml('Текстовый блок для блока')}</ModalHeader>
        <ModalBody>
          <TheOrder
            ord={ord}
            ordi={ordi}
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
                onChange={isModalOpenAtom.reset}
                onClick={() =>
                  cmEditComOrderClientTsjrpcMethods.setTexti({
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
      </Modal>
    </>
  );
};
