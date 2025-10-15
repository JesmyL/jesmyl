import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { atom } from 'atomaric';
import { TheCmComOrder } from 'front/apps/cm/06-entities/com-order/ui/TheOrder';
import { ChordVisibleVariant } from 'front/apps/cm/07-shared/model/Cm.model';
import { OrdersRedactorOrderToolsProps } from '../model';

const isModalOpenAtom = atom(false);

export const OrdersRedactorOrderToolsChordBind = ({ com, ord, ordi }: OrdersRedactorOrderToolsProps) => {
  return (
    <>
      <BottomPopupItem
        icon="Playlist03"
        title="Аккорды"
        onClick={isModalOpenAtom.do.toggle}
      />

      <Modal openAtom={isModalOpenAtom}>
        <ModalHeader>Аккорды</ModalHeader>

        <ModalBody>
          <pre style={{ whiteSpace: 'normal' }}>
            <b>Устанавливаем Аккорды для блока</b>
            <br />
            <br />
            <TheCmComOrder
              ord={ord}
              ordi={ordi}
              com={com}
              chordVisibleVariant={ChordVisibleVariant.Maximal}
            />
          </pre>
          {com.chords?.map((chordsBlock, chordsBlocki) => {
            const targetOrd = ord.me.targetOrd;

            const chordIndex =
              targetOrd && (ord.chordsi == null || ord.chordsi === -1) ? targetOrd.chordsi : ord.chordsi;

            return (
              <IconCheckbox
                key={chordsBlocki}
                checked={chordsBlocki === chordIndex}
                disabled={chordsBlocki === chordIndex}
                className="mt-2"
                onChange={isModalOpenAtom.reset}
                onClick={() =>
                  cmEditComOrderClientTsjrpcMethods.bindChordBlock({
                    ordw: ord.wid,
                    orderTitle: ord.me.header(),
                    comw: com.wid,
                    chordi: chordsBlocki,
                    isAnchor: ord.isAnchor ? 1 : 0,
                  })
                }
                postfix={
                  <pre>
                    <b>{chordsBlocki + 1}</b>
                    <br />
                    {com.transposeBlock(chordsBlock)}
                  </pre>
                }
              />
            );
          })}
        </ModalBody>
      </Modal>
    </>
  );
};
