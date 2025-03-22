import { Modal } from '#shared/ui/modal/Modal/Modal';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { cmComOrderClientInvocatorMethods } from '$cm+editor/basis/lib/cm-editor-invocator.methods';
import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { CmComOrderOnClickBetweenData } from '$cm+editor/basis/model/Orders';
import { useState } from 'react';
import { CmNewOrderMakeEtap } from '../model';
import { OrdersRedactorAdditionsEtapsModalInner } from './Etaps';

type Props = {
  com: EditableCom | und;
  onClose: (is: false) => void;
  setClickBetweenOrds: (data: CmComOrderOnClickBetweenData) => void;
};

export const OrdersRedactorAdditions = ({ com, setClickBetweenOrds }: Props) => {
  const [modalSelectForstEtap, setModalSelectForstEtap] = useState<null | CmNewOrderMakeEtap>(null);

  if (!com) return;

  return (
    <>
      <BottomPopupItem
        icon="Text"
        title="Текстовый блок"
        onClick={() => setModalSelectForstEtap(CmNewOrderMakeEtap.Text)}
      />
      <BottomPopupItem
        icon="Option"
        title="Аккордный блок"
        onClick={() => setModalSelectForstEtap(CmNewOrderMakeEtap.Chord)}
      />
      {modalSelectForstEtap && (
        <Modal onClose={() => setModalSelectForstEtap(null)}>
          {({ onClose }) => (
            <OrdersRedactorAdditionsEtapsModalInner
              com={com}
              firstEtap={modalSelectForstEtap}
              onClose={onClose}
              onOrderBuilt={(styleBlock, chordi, texti) => {
                setModalSelectForstEtap(null);
                onClose();
                setClickBetweenOrds({
                  buttonTitle: (
                    <>
                      Новый блок <span className="color--7">{styleBlock.title[com.langi]}</span>
                    </>
                  ),
                  checkIsShowButton: () => true,
                  onClick: async ({ aboveLeadOrdw }) => {
                    cmComOrderClientInvocatorMethods.insertNewBlock(
                      null,
                      com.wid,
                      styleBlock.title[com.langi],
                      aboveLeadOrdw,
                      chordi,
                      styleBlock.key,
                      texti,
                    );
                  },
                });
              }}
            />
          )}
        </Modal>
      )}
    </>
  );
};
