import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmComClientInvocatorMethods } from '$cm+editor/basis/lib/cm-editor-invocator.methods';
import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { ChordVisibleVariant } from '$cm/Cm.model';
import { ComOrders } from '$cm/col/com/orders/ComOrders';
import { useState } from 'react';

const dotts = '.'
  .repeat(12)
  .split('')
  .map((_, i) => i)
  .reverse();

export const CmComEditTransposition = ({ ccom }: { ccom: EditableCom }) => {
  const [initialPosition] = useState(ccom.transPosition);
  const [iconOnLoad, setIconOnLoad] = useState('');
  const firstChord = ccom.getFirstSimpleChord();

  const [isOpenModal, setIsOpenModal] = useState<unknown>(false);

  return (
    <div
      className="flex full-width between margin-gap-v pointer"
      onClick={setIsOpenModal}
    >
      <LazyIcon icon="Notification01" />
      <div className="title half-width text-center">Изменить тональность</div>
      <div className="half-width text-center">{firstChord}</div>

      {!isOpenModal || (
        <Modal onClose={setIsOpenModal}>
          <ModalHeader>Тональность песни</ModalHeader>

          <ModalBody>
            {dotts.map(position => {
              const transposedChord = ccom.transposeBlock(firstChord ?? '', position - (ccom.transPosition ?? 0));

              return transposedChord === iconOnLoad ? (
                <TheIconLoading
                  key={position}
                  className="margin-gap-t"
                />
              ) : (
                <IconCheckbox
                  key={position}
                  checked={position === ccom.transPosition}
                  disabled={position === ccom.transPosition}
                  className={'margin-gap-t ' + (position === initialPosition ? ' text-bold' : '')}
                  onChange={async () => {
                    setIconOnLoad(transposedChord);
                    await cmComClientInvocatorMethods.changeTon(null, ccom.wid, position);
                    close();
                    setIconOnLoad('');
                  }}
                  postfix={transposedChord}
                />
              );
            })}
            <ComOrders
              com={ccom}
              chordVisibleVariant={ChordVisibleVariant.Maximal}
            />
          </ModalBody>
        </Modal>
      )}
    </div>
  );
};
