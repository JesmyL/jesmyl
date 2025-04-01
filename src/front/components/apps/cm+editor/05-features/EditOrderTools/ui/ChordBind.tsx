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

export const OrdersRedactorOrderToolsChordBind = ({ com, ord, ordi }: OrdersRedactorOrderToolsProps) => {
  const [isOpenModal, setIsOpenModal] = useState<unknown>(false);

  return (
    <>
      <BottomPopupItem
        icon="Playlist03"
        title="Аккорды"
        onClick={setIsOpenModal}
      />

      {isOpenModal && (
        <Modal onClose={setIsOpenModal}>
          {({ onClose }) => (
            <>
              <ModalHeader>Аккорды</ModalHeader>

              <ModalBody>
                <pre style={{ whiteSpace: 'normal' }}>
                  <b>Устанавливаем Аккорды для блока</b>
                  <br />
                  <br />
                  <TheOrder
                    orderUnit={ord}
                    orderUniti={ordi}
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
                      className="margin-gap-t"
                      onChange={onClose}
                      onClick={() =>
                        cmComOrderClientInvocatorMethods.bindChordBlock({
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
            </>
          )}
        </Modal>
      )}
    </>
  );
};
