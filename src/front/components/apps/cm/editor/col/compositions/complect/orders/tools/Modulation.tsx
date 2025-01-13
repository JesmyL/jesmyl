import Modal from 'front/complect/modal/Modal/Modal';
import { ModalBody } from 'front/complect/modal/Modal/ModalBody';
import { ModalHeader } from 'front/complect/modal/Modal/ModalHeader';
import { cmComOrderClientInvocatorMethods } from 'front/components/apps/cm/editor/cm-editor-invocator.methods';
import { mylib } from 'front/utils';
import { useState } from 'react';
import { BottomPopupItem } from '../../../../../../../../../complect/absolute-popup/bottom-popup/BottomPopupItem';
import IconCheckbox from '../../../../../../../../../complect/the-icon/IconCheckbox';
import { IconFlashStrokeRounded } from '../../../../../../../../../complect/the-icon/icons/flash';
import { ChordVisibleVariant } from '../../../../../../Cm.model';
import TheOrder from '../../../../../../col/com/order/TheOrder';
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
        Icon={IconFlashStrokeRounded}
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
