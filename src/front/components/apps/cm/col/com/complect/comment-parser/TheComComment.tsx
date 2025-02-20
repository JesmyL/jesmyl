import { useAtom } from '#shared/lib/atom';
import { propagationStopper } from '#shared/lib/event-stubs';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { LazyIcon, TheIconLoading } from '#shared/ui/icon';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { cmIDB } from '@cm/shared/lib/cmIdb';
import { useEffect, useRef, useState } from 'react';
import { isNIs } from 'shared/utils';
import styled from 'styled-components';
import { CmComWid } from '../../../../../../../../shared/api/complect/apps/cm/complect/enums';
import { updateComComment, useComComment } from '../../../../com-comments-manager';
import { isComCommentRedactAtom } from './complect';
import { TheComCommentInfo } from './infos/TheComCommentInfo';

interface Props {
  comw: CmComWid;
}

const HashSwitcherIcon = 'Note03';

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
    mylib.setInputHeightByContent(inputRef.current);
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
      <div
        id="com-comment-panel"
        className="flex full-width between"
      >
        <span className="flex flex-gap">
          Заметки
          <LazyIcon
            icon={isRedact ? 'CheckmarkCircle02' : 'Edit01'}
            className="pointer com-notes-edit-button flex full-width between color--7 margin-gap-v"
            onClick={event => {
              propagationStopper(event);
              setIsRedact(isNIs);
            }}
          />
          {comComment?.isSavedLocal ? (
            <LazyIcon
              icon="FileValidation"
              className="color--ok"
            />
          ) : (
            <TheIconLoading isLoading={isLoading} />
          )}
        </span>
        <div className="flex flex-gap">
          <LazyIcon
            icon={HashSwitcherIcon}
            className={`pointer flex full-width between color--7 margin-gap-v${
              isShowConHashComments ? '' : ' fade-05'
            }`}
            onClick={event => {
              propagationStopper(event);
              setIsShowConHashComments(isNIs);
            }}
          />
          <LazyIcon
            icon="MessageQuestion"
            className="pointer flex full-width between color--7 margin-gap-v"
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
          onKeyDown={propagationStopper}
          className="com-comment-input full-width bgcolor--2"
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
