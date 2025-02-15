import { cmComOrderClientInvocatorMethods } from 'front/components/apps/cm/editor/cm-editor-invocator.methods';
import { useState } from 'react';
import { BottomPopupItem } from '../../../../../../../../../complect/absolute-popup/bottom-popup/BottomPopupItem';
import Modal from '../../../../../../../../../complect/modal/Modal/Modal';
import { EditableCom } from '../../../com/EditableCom';
import { CmComOrderOnClickBetweenData } from '../model';
import { OrdersRedactorAdditionsEtapsModalInner } from './Etaps';
import { CmNewOrderMakeEtap } from './values';

export const OrdersRedactorAdditions = ({
  com,
  onClose,
  setClickBetweenOrds,
}: {
  com: EditableCom | und;
  onClose: (is: false) => void;
  setClickBetweenOrds: (data: CmComOrderOnClickBetweenData) => void;
}) => {
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
          <OrdersRedactorAdditionsEtapsModalInner
            com={com}
            firstEtap={modalSelectForstEtap}
            onClose={onClose}
            onOrderBuilt={(styleBlock, chordi, texti) => {
              setModalSelectForstEtap(null);
              onClose(false);
              setClickBetweenOrds({
                buttonTitle: (
                  <>
                    Новый блок <span className="color--7">{styleBlock.title[com.langi]}</span>
                  </>
                ),
                checkIsShowButton: () => true,
                onClick: async aboveOrd => {
                  cmComOrderClientInvocatorMethods.insertNewBlock(
                    null,
                    com.wid,
                    styleBlock.title[com.langi],
                    aboveOrd?.wid,
                    chordi,
                    styleBlock.key,
                    texti,
                  );
                },
              });
            }}
          />
        </Modal>
      )}
    </>
  );
};
