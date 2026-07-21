import { Button } from '#shared/components';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { WithAtom } from '#shared/ui/WithAtom';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { useCmComAudioMarkSlides, useCmComCurrentMarkTimei } from '$cm/ext';
import { HttpNumLeadLink } from 'shared/api';
import { TextCase } from 'shared/model/common';
import { makeCmComTextInnerHtmlProp } from 'shared/utils/cm/com/const';
import { twMerge } from 'tailwind-merge';

export const CmEditorTabComAudioMarksShowSlideListButton = ({
  ccom,
  src,
}: {
  ccom: EditableCom;
  src: HttpNumLeadLink | nil;
}) => {
  const { audioSlides, markTimes } = useCmComAudioMarkSlides(ccom, src, TextCase.AsIs);
  const currentMarkTimei = useCmComCurrentMarkTimei(markTimes, audioSlides);

  return (
    <WithAtom init={false}>
      {openSlidesAtom => (
        <>
          <Button
            icon="Computer"
            className="my-5"
            onClick={openSlidesAtom.do.toggle}
          />

          <Modal openAtom={openSlidesAtom}>
            <ModalHeader>{ccom.name}</ModalHeader>
            <ModalBody>
              {audioSlides.map(({ text, timei }) => (
                <div
                  key={timei}
                  className={twMerge('pre-text my-5', currentMarkTimei === timei && 'text-x7')}
                  {...makeCmComTextInnerHtmlProp(text)}
                />
              ))}
            </ModalBody>
          </Modal>
        </>
      )}
    </WithAtom>
  );
};
