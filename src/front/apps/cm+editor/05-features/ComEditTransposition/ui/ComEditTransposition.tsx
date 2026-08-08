import { ChordVisibleVariant } from '#shared/model/cm/Cm.model';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { CmComOrderList } from '$cm/ext';
import { Atom, atom } from 'atomaric';
import { useState } from 'react';
import { CmCom } from 'shared/const/cm/Com';
import { arrayByLength } from 'shared/utils/object.utils';
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

  return (
    <>
      <TheIconButton
        onClick={isOpenModalAtom.do.toggle}
        icon="Notification01"
        postfix={
          <>
            Тональность — <span className="text-x7">{ccom.tonica}</span>
          </>
        }
      />

      <Modal openAtom={isOpenModalAtom}>
        <ModalHeader>Тональность песни</ModalHeader>

        <ModalBody>
          {arrayByLength(12, i => i)
            .reverse()
            .map(position => {
              const transposedChord = ccom.transposeBlock(ccom.tonica, position - ccom.transPosition);

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
