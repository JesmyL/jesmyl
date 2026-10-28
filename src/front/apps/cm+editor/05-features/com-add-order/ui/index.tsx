import { translateDynamic, translateEditorBase } from '#basis/locale';
import { Modal } from '#shared/ui/modal';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmComOrderOnClickBetweenData } from '$cm+editor/shared/model/Orders';
import { Atom, atom } from 'atomaric';
import { DynLocaleKey } from 'shared/model/+locale/_DynLocaleKey';
import { EditorLocaleKey } from 'shared/model/+locale/_EditorLocaleKey';
import { CmEditorComAddOrderNewOrderMakeEtap } from '../model';
import { CmEditorComAddOrderAdditionsEtapsModalInner } from './Etaps';

type Props = {
  com: EditableCom;
  onClose: (is: false) => void;
  setClickBetweenOrds: (data: CmComOrderOnClickBetweenData) => void;
};

let selectFirstEtapAtom: Atom<null | CmEditorComAddOrderNewOrderMakeEtap>;

export const CmEditorComAddOrderRedactorAdditions = ({ com, setClickBetweenOrds }: Props) => {
  selectFirstEtapAtom ??= atom<null | CmEditorComAddOrderNewOrderMakeEtap>(null);

  return (
    <>
      <BottomPopupItem
        icon="Text"
        title={translateEditorBase(EditorLocaleKey.CmEditorTextBlock)}
        onClick={() => selectFirstEtapAtom.set(CmEditorComAddOrderNewOrderMakeEtap.Text)}
      />
      <BottomPopupItem
        icon="Option"
        title={translateEditorBase(EditorLocaleKey.CmEditorChordedBlock)}
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
            onOrderBuilt={(kindBlock, chordi, texti) => {
              const orderTitle = translateDynamic(com.langi)(it => it[DynLocaleKey.CmComKind][kindBlock.key]);

              selectFirstEtapAtom.set(null);
              setClickBetweenOrds({
                buttonTitle: (
                  <>
                    {translateEditorBase(EditorLocaleKey.CmEditorNewBlock)} <span className="text-x7">{orderTitle}</span>
                  </>
                ),
                checkIsShowButton: ({ ordAbove }) => {
                  if (ordAbove == null && kindBlock.isInherit) return false;
                  return true;
                },
                onClick: async ({ aboveLeadOrdw }) => {
                  cmEditComOrderClientTsjrpcMethods.insertNewBlock({
                    comw: com.wid,
                    orderTitle,
                    insertAfterOrdwOrFirst: aboveLeadOrdw,
                    chordi: chordi,
                    kind: kindBlock.key,
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
