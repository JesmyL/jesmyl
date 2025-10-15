import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { ChordVisibleVariant, CmComOrderList } from '$cm/ext';
import { atom } from 'atomaric';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const dotts = '.'
  .repeat(12)
  .split('')
  .map((_, i) => i)
  .reverse();

const isOpenModalAtom = atom(false);

export const CmEditorComEditTransposition = ({ ccom }: { ccom: EditableCom }) => {
  const [initialPosition] = useState(ccom.transPosition);
  const [iconOnLoad, setIconOnLoad] = useState('');
  const firstChord = ccom.getFirstSimpleChord();

  return (
    <>
      <TheIconButton
        onClick={isOpenModalAtom.do.toggle}
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
                className="mt-2"
              />
            ) : (
              <IconCheckbox
                key={position}
                checked={position === ccom.transPosition}
                disabled={position === ccom.transPosition}
                className={twMerge('mt-2', position === initialPosition ? 'font-bold' : '')}
                onChange={async () => {
                  setIconOnLoad(transposedChord);
                  await cmEditComClientTsjrpcMethods.changeTon({ comw: ccom.wid, value: position });
                  isOpenModalAtom.reset();
                  setIconOnLoad('');
                }}
                postfix={transposedChord}
              />
            );
          })}
          <CmComOrderList
            com={ccom}
            chordVisibleVariant={ChordVisibleVariant.Maximal}
          />
        </ModalBody>
      </Modal>
    </>
  );
};
