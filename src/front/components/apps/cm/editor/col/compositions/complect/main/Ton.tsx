import { cmComClientInvocatorMethods } from 'front/components/apps/cm/cm-invocator-editor.methods';
import { mylib } from 'front/utils';
import { useState } from 'react';
import useModal from '../../../../../../../../complect/modal/useModal';
import IconCheckbox from '../../../../../../../../complect/the-icon/IconCheckbox';
import { IconNotification01StrokeRounded } from '../../../../../../../../complect/the-icon/icons/notification-01';
import { ChordVisibleVariant } from '../../../../../Cm.model';
import ComOrders from '../../../../../col/com/orders/ComOrders';
import { EditableCom } from '../../com/EditableCom';

const dotts = '.'
  .repeat(12)
  .split('')
  .map((_, i) => i)
  .reverse();

export const EditableCompositionMainTon = ({ ccom }: { ccom: EditableCom }) => {
  const [initialPosition] = useState(ccom.transPosition);

  const [modalNode, openModal] = useModal(({ header, body }, close) => {
    return (
      <>
        {header(<>Тональность песни</>)}
        {body(
          <>
            <ComOrders
              com={ccom}
              chordVisibleVariant={ChordVisibleVariant.Maximal}
            />
            {dotts.map(position => {
              return (
                <IconCheckbox
                  key={position}
                  checked={position === ccom.transPosition}
                  disabled={position === ccom.transPosition}
                  className={'margin-gap-t ' + (position === initialPosition ? ' text-bold' : '')}
                  onChange={() => {
                    cmComClientInvocatorMethods.changeTon(null, ccom.wid, position);
                    close();
                  }}
                  postfix={`На ${position} ${mylib.declension(
                    position,
                    'полутон',
                    'полутона',
                    'полутонов',
                  )} от базовой`}
                />
              );
            })}
          </>,
        )}
      </>
    );
  });

  return (
    <div
      className="flex full-width between margin-gap-v pointer"
      onClick={openModal}
    >
      {modalNode}
      <IconNotification01StrokeRounded />
      <div className="title half-width text-center">Изменить тональность</div>
      <div className="half-width text-center">{ccom.firstChord}</div>
    </div>
  );
};
