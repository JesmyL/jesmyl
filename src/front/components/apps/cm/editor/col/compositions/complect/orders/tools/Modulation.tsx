import { useExerExec } from '../../../../../../../../../complect/exer/hooks/useExer';
import useModal from '../../../../../../../../../complect/modal/useModal';
import mylib from '../../../../../../../../../complect/my-lib/MyLib';
import IconButton from '../../../../../../../../../complect/the-icon/IconButton';
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

export const OrdersRedactorOrderToolsModulation = ({
  props: { ccom, ord, ordi },
  closePopup,
}: {
  props: OrdersRedactorOrderToolsProps;
  closePopup: () => void;
}) => {
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
              com={ccom}
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
                    ccom.resetChordLabels();
                    exec();
                    close();
                    closePopup();
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
      <IconButton
        Icon={IconFlashStrokeRounded}
        postfix="Значение модуляции"
        onClick={openModal}
      />
    </>
  );
};
