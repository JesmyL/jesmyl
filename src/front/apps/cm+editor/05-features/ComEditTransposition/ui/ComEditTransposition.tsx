import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { ChordVisibleVariant, CmCom, CmComOrderList } from '$cm/ext';
import { Atom, atom } from 'atomaric';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

let isOpenModalAtom: Atom<boolean>;

export const CmEditorComEditTransposition = ({
  ccom,
  onChange,
}: {
  ccom: CmCom;
  onChange: (position: number) => Promise<unknown>;
}) => {
  isOpenModalAtom ??= atom(false);

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
          {'.'
            .repeat(12)
            .split('')
            .map((_, i) => i)
            .reverse()
            .map(position => {
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
                    await onChange(position);
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
            chordHardLevel={3}
          />
        </ModalBody>
      </Modal>
    </>
  );
};
