import { mylib } from '#shared/lib/my-lib';
import { useModal } from '#shared/ui/modal/useModal';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { ChordVisibleVariant } from '@cm/Cm.model';
import { ComOrders } from '@cm/col/com/orders/ComOrders';
import { cmComClientInvocatorMethods } from '@cm/editor/cm-editor-invocator.methods';
import { useState } from 'react';
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
      <LazyIcon icon="Notification01" />
      <div className="title half-width text-center">Изменить тональность</div>
      <div className="half-width text-center">{ccom.getFirstSimpleChord()}</div>
    </div>
  );
};
