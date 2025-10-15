import { Modal } from '#shared/ui/modal/Modal/Modal';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmComOrderOnClickBetweenData } from '$cm+editor/shared/model/Orders';
import { atom } from 'atomaric';
import { CmEditorComAddOrderNewOrderMakeEtap } from '../model';
import { CmEditorComAddOrderAdditionsEtapsModalInner } from './Etaps';

type Props = {
  com: EditableCom;
  onClose: (is: false) => void;
  setClickBetweenOrds: (data: CmComOrderOnClickBetweenData) => void;
};

const selectFirstEtapAtom = atom<null | CmEditorComAddOrderNewOrderMakeEtap>(null);

export const CmEditorComAddOrderRedactorAdditions = ({ com, setClickBetweenOrds }: Props) => {
  return (
    <>
      <BottomPopupItem
        icon="Text"
        title="Текстовый блок"
        onClick={() => selectFirstEtapAtom.set(CmEditorComAddOrderNewOrderMakeEtap.Text)}
      />
      <BottomPopupItem
        icon="Option"
        title="Аккордный блок"
        onClick={() => selectFirstEtapAtom.set(CmEditorComAddOrderNewOrderMakeEtap.Chord)}
      />

      <Modal
        openAtom={selectFirstEtapAtom}
        checkIsOpen={it => it != null}
      >
        {firstEtap => (
          <CmEditorComAddOrderAdditionsEtapsModalInner
            com={com}
            firstEtap={firstEtap}
            onClose={selectFirstEtapAtom.reset}
            onOrderBuilt={(styleBlock, chordi, texti) => {
              selectFirstEtapAtom.set(null);
              setClickBetweenOrds({
                buttonTitle: (
                  <>
                    Новый блок <span className="text-x7">{styleBlock.title[com.langi]}</span>
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
