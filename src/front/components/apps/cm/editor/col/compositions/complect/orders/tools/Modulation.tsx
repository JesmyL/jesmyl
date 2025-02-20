import { mylib } from '#shared/lib/my-lib';
import { BottomPopupItem } from '#shared/ui/absolute-popup/bottom-popup/BottomPopupItem';
import { IconCheckbox } from '#shared/ui/icon';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { TheOrder } from 'front/components/apps/cm/col/com/order/TheOrder';
import { cmComOrderClientInvocatorMethods } from 'front/components/apps/cm/editor/cm-editor-invocator.methods';
import { useState } from 'react';
import { ChordVisibleVariant } from '../../../../../../basis/model/Cm.model';
import { OrdersRedactorOrderToolsProps } from '../OrdersRedactorOrderTools';

const intervals = '.'
  .repeat(11)
  .split('')
  .map((_, i) => i + 1)
  .reverse();

export const OrdersRedactorOrderToolsModulation = ({ com, ord, ordi, onClose }: OrdersRedactorOrderToolsProps) => {
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
                    cmComOrderClientInvocatorMethods.setModulationValue(
                      null,
                      com.wid,
                      ord.me.header(),
                      ord.wid,
                      position,
                    )
                  }
                  onChange={() => {
                    setIsModalOpen(false);
                    onClose(false);
                  }}
                  postfix={`Повышение на ${position} ${mylib.declension(position, 'полутон', 'полутона', 'полутонов')}`}
                />
              );
            })}
          </ModalBody>
        </Modal>
      )}
    </>
  );
};
