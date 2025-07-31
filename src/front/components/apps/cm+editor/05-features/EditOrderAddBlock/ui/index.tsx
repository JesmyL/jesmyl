import { Modal } from '#shared/ui/modal/Modal/Modal';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { CmComOrderOnClickBetweenData } from '$cm+editor/basis/model/Orders';
import { atom, useAtomValue } from 'atomaric';
import { CmNewOrderMakeEtap } from '../model';
import { OrdersRedactorAdditionsEtapsModalInner } from './Etaps';

type Props = {
  com: EditableCom;
  onClose: (is: false) => void;
  setClickBetweenOrds: (data: CmComOrderOnClickBetweenData) => void;
};

const selectFirstEtapAtom = atom<null | CmNewOrderMakeEtap>(null);

export const OrdersRedactorAdditions = ({ com, setClickBetweenOrds }: Props) => {
  const firstEtap = useAtomValue(selectFirstEtapAtom);

  return (
    <>
      <BottomPopupItem
        icon="Text"
        title="Текстовый блок"
        onClick={() => selectFirstEtapAtom.set(CmNewOrderMakeEtap.Text)}
      />
      <BottomPopupItem
        icon="Option"
        title="Аккордный блок"
        onClick={() => selectFirstEtapAtom.set(CmNewOrderMakeEtap.Chord)}
      />

      <Modal openAtom={selectFirstEtapAtom}>
        {firstEtap && (
          <OrdersRedactorAdditionsEtapsModalInner
            com={com}
            firstEtap={firstEtap}
            onClose={selectFirstEtapAtom.reset}
            onOrderBuilt={(styleBlock, chordi, texti) => {
              selectFirstEtapAtom.set(null);
              setClickBetweenOrds({
                buttonTitle: (
                  <>
                    Новый блок <span className="color--7">{styleBlock.title[com.langi]}</span>
                  </>
                ),
                checkIsShowButton: ({ ordAbove }) => {
                  if (ordAbove == null && styleBlock.isInherit) return false;
                  return true;
                },
                onClick: async ({ aboveLeadOrdw }) => {
                  cmEditComOrderClientTsjrpcMethods.insertNewBlock({
                    comw: com.wid,
                    orderTitle: styleBlock.title[com.langi],
                    insertAfterOrdwOrFirst: aboveLeadOrdw,
                    chordi: chordi,
                    type: styleBlock.key,
                    texti: texti,
                  });
                },
              });
            }}
          />
        )}
      </Modal>
    </>
  );
};
