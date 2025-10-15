import { mylib } from '#shared/lib/my-lib';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { ChordVisibleVariant, TheCmComOrder } from '$cm/ext';
import { atom } from 'atomaric';
import { CmEditorComOrderToolsProps } from '../model';

const intervals = '.'
  .repeat(11)
  .split('')
  .map((_, i) => i + 1)
  .reverse();

const isModalOpenAtom = atom(false);

export const CmEditorComOrderToolsModulation = ({ com, ord, ordi }: CmEditorComOrderToolsProps) => {
  return (
    <>
      <BottomPopupItem
        icon="Flash"
        title="Значение модуляции"
        onClick={isModalOpenAtom.do.toggle}
      />

      <Modal openAtom={isModalOpenAtom}>
        <ModalHeader>Установка значения модуляции</ModalHeader>
        <ModalBody>
          <TheCmComOrder
            ord={ord}
            ordi={ordi}
            chordVisibleVariant={ChordVisibleVariant.Maximal}
            com={com}
          />
          {intervals.map(position => {
            return (
              <IconCheckbox
                key={position}
                checked={ord.fieldValues.md === position}
                disabled={ord.fieldValues.md === position}
                className="mt-2"
                onClick={() =>
                  cmEditComOrderClientTsjrpcMethods.setModulationValue({
                    comw: com.wid,
                    orderTitle: ord.me.header(),
                    ordw: ord.wid,
                    value: position,
                  })
                }
                onChange={isModalOpenAtom.reset}
                postfix={`Повышение на ${position} ${mylib.declension(position, 'полутон', 'полутона', 'полутонов')}`}
              />
            );
          })}
        </ModalBody>
      </Modal>
    </>
  );
};
