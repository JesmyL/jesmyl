import { mylib } from '#shared/lib/my-lib';
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

const intervals = '.'
  .repeat(11)
  .split('')
  .map((_, i) => i + 1)
  .reverse();

export const OrdersRedactorOrderToolsModulation = ({ com, ord, ordi }: OrdersRedactorOrderToolsProps) => {
  const [isModalOpen, setIsModalOpen] = useState<unknown>(false);

  return (
    <>
      <BottomPopupItem
        icon="Flash"
        title="Значение модуляции"
        onClick={setIsModalOpen}
      />

      {isModalOpen && (
        <Modal onClose={setIsModalOpen}>
          {({ onClose }) => (
            <>
              <ModalHeader>Установка значения модуляции</ModalHeader>
              <ModalBody>
                <TheOrder
                  orderUnit={ord}
                  orderUniti={ordi}
                  chordVisibleVariant={ChordVisibleVariant.Maximal}
                  com={com}
                />
                {intervals.map(position => {
                  return (
                    <IconCheckbox
                      key={position}
                      checked={ord.fieldValues.md === position}
                      disabled={ord.fieldValues.md === position}
                      className="margin-gap-t"
                      onClick={() =>
                        cmComOrderClientInvocatorMethods.setModulationValue({
                          comw: com.wid,
                          orderTitle: ord.me.header(),
                          ordw: ord.wid,
                          value: position,
                        })
                      }
                      onChange={() => {
                        setIsModalOpen(false);
                        onClose();
                      }}
                      postfix={`Повышение на ${position} ${mylib.declension(position, 'полутон', 'полутона', 'полутонов')}`}
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
