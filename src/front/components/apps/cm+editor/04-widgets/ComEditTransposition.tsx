import { atom } from '#shared/lib/atom';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { cmEditComClientInvocatorMethods } from '$cm+editor/basis/lib/cm-editor-invocator.methods';
import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { ChordVisibleVariant } from '$cm/Cm.model';
import { ComOrders } from '$cm/col/com/orders/ComOrders';
import { useState } from 'react';

const dotts = '.'
  .repeat(12)
  .split('')
  .map((_, i) => i)
  .reverse();

const isOpenModalAtom = atom(false);

export const CmComEditTransposition = ({ ccom }: { ccom: EditableCom }) => {
  const [initialPosition] = useState(ccom.transPosition);
  const [iconOnLoad, setIconOnLoad] = useState('');
  const firstChord = ccom.getFirstSimpleChord();

  return (
    <>
      <TheIconButton
        onClick={isOpenModalAtom.toggle}
        icon="Notification01"
        postfix={
          <>
            Тональность — <span className="text-x7">{firstChord}</span>
          </>
        }
      />

      <Modal openAtom={isOpenModalAtom}>
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
                  await cmEditComClientInvocatorMethods.changeTon({ comw: ccom.wid, value: position });
                  isOpenModalAtom.reset();
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
    </>
  );
};
