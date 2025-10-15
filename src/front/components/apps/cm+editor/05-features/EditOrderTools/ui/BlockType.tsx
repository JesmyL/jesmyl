import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { atom } from 'atomaric';
import { TheCmComOrder } from 'front/apps/cm/06-entities/com-order/ui/TheOrder';
import { ChordVisibleVariant } from 'front/apps/cm/07-shared/model/Cm.model';
import { comBlockStyles } from 'shared/values/cm/block-styles/BlockStyles';
import { OrdersRedactorOrderToolsProps } from '../model';

const isModalOpenAtom = atom(false);

export const OrdersRedactorOrderToolsBlockType = ({ com, ord, ordi }: OrdersRedactorOrderToolsProps) => {
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
