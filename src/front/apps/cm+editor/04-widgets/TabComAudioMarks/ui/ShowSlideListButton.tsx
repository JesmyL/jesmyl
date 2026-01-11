import { Button } from '#shared/components';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { useCmComCurrentMarkTimei, useCmComMarkTextValuesMaker } from '$cm/ext';
import { atom } from 'atomaric';
import { HttpLink } from 'shared/api';

const openSlidesAtom = atom(false);

export const CmEditorTabComAudioMarksShowSlideListButton = ({
  ccom,
  src,
}: {
  ccom: EditableCom;
  src: HttpLink | nil;
}) => {
  const { makeText, markTimes } = useCmComMarkTextValuesMaker(ccom, src);
  const currentMarkTimei = useCmComCurrentMarkTimei(markTimes);

  return (
    <>
      <Button
        icon="Computer"
        className="my-5"
        onClick={openSlidesAtom.do.toggle}
      />

      <Modal openAtom={openSlidesAtom}>
        <ModalHeader>{ccom.name}</ModalHeader>
        <ModalBody>
          {markTimes.map((_, timei) => {
            return (
              <div
                key={timei}
                className={'pre-text my-5' + (currentMarkTimei === timei ? ' text-x7' : '')}
                dangerouslySetInnerHTML={{ __html: makeText(timei).text || '' }}
              />
            );
          })}
        </ModalBody>
      </Modal>
    </>
  );
};
