import { mylib } from 'front/utils';
import { BottomPopupItem } from '../../../../../../../../../complect/absolute-popup/bottom-popup/BottomPopupItem';
import { useExerExec } from '../../../../../../../../../complect/exer/hooks/useExer';
import useModal from '../../../../../../../../../complect/modal/useModal';
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
  const exec = useExerExec();

  const [modalNode, openModal] = useModal(({ header, body }, close) => {
    return (
      <>
        {header(<>Установка значения модуляции</>)}
        {body(
          <>
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
                  onChange={() => {
                    ord.setFieldValue('md', position);
                    com.resetChordLabels();
                    exec();
                    close();
                    onClose(false);
                  }}
                  postfix={`Повышение на ${position} ${mylib.declension(position, 'полутон', 'полутона', 'полутонов')}`}
                />
              );
            })}
          </>,
        )}
      </>
    );
  });

  return (
    <>
      {modalNode}
      <BottomPopupItem
        Icon={IconFlashStrokeRounded}
        title="Значение модуляции"
        onClick={openModal}
      />
    </>
  );
};
