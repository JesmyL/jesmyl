import { ChordVisibleVariant } from '#shared/model/cm/Cm.model';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { CmComOrderList, useCmComMapFromIComWithoutComFixes } from '$cm/ext';
import { Atom, atom } from 'atomaric';
import { useState } from 'react';
import { IExportableCom } from 'shared/api';
import { chordBemoleEquivalent } from 'shared/utils/cm/com/const';
import { arrayByLength } from 'shared/utils/object.utils';
import { twMerge } from 'tailwind-merge';

let isOpenModalAtom: Atom<boolean>;

export const CmEditorComEditTransposition = ({
  icom,
  onChange,
}: {
  icom: IExportableCom;
  onChange: (position: number) => Promise<unknown>;
}) => {
  isOpenModalAtom ??= atom(false);
  const com = useCmComMapFromIComWithoutComFixes(icom);

  const [initialPosition] = useState(com?.transPosition ?? 0);
  const [iconOnLoad, setIconOnLoad] = useState('');

  if (!com) return;

  return (
    <>
      <TheIconButton
        onClick={isOpenModalAtom.do.toggle}
        icon="Notification01"
        postfix={
          <>
            Тональность — <span className="text-x7">{com.getFixedTonica()}</span>
          </>
        }
      />

      <Modal openAtom={isOpenModalAtom}>
        <ModalHeader>Тональность песни</ModalHeader>

        <ModalBody>
          {arrayByLength(12, i => i)
            .reverse()
            .map(position => {
              const transposedChord = com.transposeBlock(com.tonica, position);

              return transposedChord === iconOnLoad ? (
                <TheIconLoading
                  key={position}
                  className="mt-2"
                />
              ) : (
                <IconCheckbox
                  key={position}
                  checked={position === com.transPosition}
                  disabled={position === com.transPosition}
                  className={twMerge('mt-2', position === initialPosition ? 'font-bold' : '')}
                  onChange={async () => {
                    setIconOnLoad(transposedChord);
                    await onChange(position);
                    isOpenModalAtom.reset();
                    setIconOnLoad('');
                  }}
                  postfix={com.isBemoled ? chordBemoleEquivalent[transposedChord] || transposedChord : transposedChord}
                />
              );
            })}
          <CmComOrderList
            com={com}
            chordVisibleVariant={ChordVisibleVariant.Maximal}
            chordHardLevel={3}
          />
        </ModalBody>
      </Modal>
    </>
  );
};
