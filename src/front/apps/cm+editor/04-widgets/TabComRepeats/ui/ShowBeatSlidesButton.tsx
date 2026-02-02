import { Button } from '#shared/components';
import { Modal, ModalBody } from '#shared/ui/modal';
import { CmCom } from '$cm/ext';
import { Atom, atom } from 'atomaric';
import { useMemo } from 'react';

let openAtom: Atom<boolean>;

export const CmEditorTabComRepeatsShowBeatSlidesButton = ({ com }: { com: CmCom }) => {
  openAtom ??= atom(false);

  const list = useMemo(() => com.makeExpandedSolidFragmentedSlides(com.makeExpandedSolidTextLines()), [com]);

  return (
    <>
      <Button
        icon="Computer"
        onClick={openAtom.do.toggle}
      />

      <Modal openAtom={openAtom}>
        <ModalBody>
          {list.map(({ lines }) => {
            return lines.map((line, linei) => (
              <div
                key={linei}
                className={linei ? '' : 'mt-4'}
                dangerouslySetInnerHTML={{ __html: line }}
              />
            ));
          })}
        </ModalBody>
      </Modal>
    </>
  );
};
