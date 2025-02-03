import { addEventListenerPipe, hookEffectPipe } from 'front/complect/hookEffectPipe';
import { TheIconLoading } from 'front/complect/the-icon/IconLoading';
import { propagationStopper } from 'front/complect/utils/utils';
import { cmIDB } from 'front/components/apps/cm/_db/cm-idb';
import { useEffect, useRef, useState } from 'react';
import { isNIs } from 'shared/utils';
import styled from 'styled-components';
import { CmComWid } from '../../../../../../../../shared/api/complect/apps/cm/complect/enums';
import { useAtom } from '../../../../../../../complect/atoms';
import Modal from '../../../../../../../complect/modal/Modal/Modal';
import { ModalBody } from '../../../../../../../complect/modal/Modal/ModalBody';
import { ModalHeader } from '../../../../../../../complect/modal/Modal/ModalHeader';
import IconButton from '../../../../../../../complect/the-icon/IconButton';
import { IconCheckmarkCircle02StrokeRounded } from '../../../../../../../complect/the-icon/icons/checkmark-circle-02';
import { IconEdit01StrokeRounded } from '../../../../../../../complect/the-icon/icons/edit-01';
import { IconFileValidationStrokeRounded } from '../../../../../../../complect/the-icon/icons/file-validation';
import { IconMessageQuestionStrokeRounded } from '../../../../../../../complect/the-icon/icons/message-question';
import { IconNote03StrokeRounded } from '../../../../../../../complect/the-icon/icons/note-03';
import { updateComComment, useComComment } from '../../../../com-comments-manager';
import { isComCommentRedactAtom } from './complect';
import TheComCommentInfo from './infos/TheComCommentInfo';

interface Props {
  comw: CmComWid;
}

const HashSwitcherIcon = IconNote03StrokeRounded;

export const TheComComment = ({ comw }: Props) => {
  const comComment = useComComment(comw);
  const comment = comComment?.comment ?? '';
  const [isShowConHashComments, setIsShowConHashComments] = cmIDB.use.isShowComHashComments();
  const [isShowInfoModal, setIsShowInfoModal] = useState(false);
  const [isRedact, setIsRedact] = useAtom(isComCommentRedactAtom);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const setInputHeight = () => {
    if (inputRef.current === null) return;
    const textareaNode = inputRef.current;
    textareaNode.style.height = '1px';
    textareaNode.style.height = `${textareaNode.scrollHeight}px`;
  };

  useEffect(() => {
    (async () => {
      if (inputRef.current === null) return;
      const inputNode = inputRef.current;
      const commentBox = await cmIDB.db.comComments.get(comw);
      if (commentBox == null) return;

      inputNode.value = commentBox.comment;
      setInputHeight();
    })();
  }, [comw, isRedact]);

  useEffect(() => {
    if (isRedact || inputRef.current === null) return;
    inputRef.current.value = comment;
  }, [comment, isRedact]);

  useEffect(() => {
    if (inputRef.current === null) return;
    const inputNode = inputRef.current;

    setInputHeight();

    return hookEffectPipe()
      .pipe(addEventListenerPipe(inputNode, 'focus', setInputHeight))
      .pipe(addEventListenerPipe(inputNode, 'click', propagationStopper))
      .pipe(
        addEventListenerPipe(inputNode, 'input', () => {
          setInputHeight();

          updateComComment(comw, inputNode.value, setIsLoading);
        }),
      )
      .effect();
  }, [comw, isRedact]);

  return (
    <>
      <div className="flex full-width between">
        <span className="flex flex-gap">
          Заметки
          <IconButton
            Icon={isRedact ? IconCheckmarkCircle02StrokeRounded : IconEdit01StrokeRounded}
            className="flex full-width between color--7 margin-gap-v"
            onClick={() => setIsRedact(isNIs)}
          />
          {comComment?.isSavedLocal ? (
            <IconFileValidationStrokeRounded className="color--ok" />
          ) : (
            <TheIconLoading isLoading={isLoading} />
          )}
        </span>
        <div className="flex flex-gap">
          <HashSwitcherIcon
            className={`flex full-width between color--7 margin-gap-v${isShowConHashComments ? '' : ' fade-05'}`}
            onClick={event => {
              propagationStopper(event);
              setIsShowConHashComments(isNIs);
            }}
          />
          <IconMessageQuestionStrokeRounded
            className={`flex full-width between color--7 margin-gap-v`}
            onClick={event => {
              propagationStopper(event);
              setIsShowInfoModal(isNIs);
            }}
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
        <StyledInput
          className="full-width bgcolor--2"
          ref={inputRef}
        />
      ) : (
        <div className="white-pre-line break-wrap padding-big-gap-b">{comment}</div>
      )}
    </>
  );
};

const StyledInput = styled.textarea`
  resize: none;
`;
