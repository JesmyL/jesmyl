import { useState } from 'react';
import { CmComWid } from '../../../../../../../../back/apps/cm/Cm.enums';
import { useAtom } from '../../../../../../../complect/atoms';
import KeyboardInput from '../../../../../../../complect/keyboard/KeyboardInput';
import Modal from '../../../../../../../complect/modal/Modal/Modal';
import { ModalBody } from '../../../../../../../complect/modal/Modal/ModalBody';
import { ModalHeader } from '../../../../../../../complect/modal/Modal/ModalHeader';
import IconButton from '../../../../../../../complect/the-icon/IconButton';
import { IconCheckmarkCircle02StrokeRounded } from '../../../../../../../complect/the-icon/icons/checkmark-circle-02';
import { IconEdit01StrokeRounded } from '../../../../../../../complect/the-icon/icons/edit-01';
import { IconMessageQuestionStrokeRounded } from '../../../../../../../complect/the-icon/icons/message-question';
import { IconNote03StrokeRounded } from '../../../../../../../complect/the-icon/icons/note-03';
import { cmMolecule } from '../../../../molecules';
import TheComCommentInfo from './TheComCommentInfo';

interface Props {
  comw: CmComWid;
  isRedact: boolean;
  setIsRedact: (isRedact: boolean) => void;
}

const HashSwitcherIcon = IconNote03StrokeRounded;

const comCommentsAtom = cmMolecule.select(s => s.comComments);
const isShowConHashCommentsAtom = cmMolecule.select(s => s.isShowComHashComments);

export default function TheComComment({ comw, isRedact, setIsRedact }: Props) {
  const [comments, setComments] = useAtom(comCommentsAtom);
  const [isShowConHashComments, setIsShowConHashComments] = useAtom(isShowConHashCommentsAtom);
  const [isShowInfoModal, setIsShowInfoModal] = useState(false);

  return (
    <>
      <div className="flex full-width between">
        <span className="flex flex-gap">
          Заметки
          <IconButton
            Icon={isRedact ? IconCheckmarkCircle02StrokeRounded : IconEdit01StrokeRounded}
            className="flex full-width between color--7 margin-gap-v"
            onClick={() => setIsRedact(!isRedact)}
          />
        </span>
        <div className="flex flex-gap">
          <HashSwitcherIcon
            className={`flex full-width between color--7 margin-gap-v${isShowConHashComments ? '' : ' fade-05'}`}
            onClick={() => setIsShowConHashComments(is => !is)}
          />
          <IconMessageQuestionStrokeRounded
            className={`flex full-width between color--7 margin-gap-v`}
            onClick={() => setIsShowInfoModal(is => !is)}
          />
        </div>
      </div>
      {isShowInfoModal && (
        <Modal onClose={setIsShowInfoModal}>
          <ModalHeader>Комментарии в песне</ModalHeader>
          <ModalBody>
            <TheComCommentInfo HashSwitcherIcon={HashSwitcherIcon} />
          </ModalBody>
        </Modal>
      )}
      {isRedact ? (
        <KeyboardInput
          multiline
          withoutCloseButton
          className="full-width bgcolor--2"
          value={comments[comw] ?? ''}
          onChange={comment => setComments(prev => ({ ...prev, [comw]: comment }))}
        />
      ) : (
        <div className="white-pre-line padding-big-gap-b">{comments[comw]}</div>
      )}
    </>
  );
}
