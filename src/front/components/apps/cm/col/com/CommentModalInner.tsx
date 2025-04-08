import { atom } from '#shared/lib/atom';
import { checkIsCssRuleSupports } from '#shared/lib/checkIsCssSupports';
import { propagationStopper } from '#shared/lib/event-funcs';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalFooter } from '#shared/ui/modal/Modal/ModalFooter';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmIDB } from '$cm/basis/lib/cmIDB';
import { Com } from '$cm/col/com/Com';
import { TheComCommentInfo } from '$cm/col/com/complect/comment-parser/infos/TheComCommentInfo';
import { updateComComment, useComComment } from '$cm/com-comments-manager';
import { useEffect, useRef, useState } from 'react';
import { emptyFunc } from 'shared/utils';
import styled from 'styled-components';

const HashSwitcherIcon = 'Note03';
const isShowInfoModalAtom = atom(false);

export const CmComCommentModalInner = ({ com }: { com: Com }) => {
  const [isLoading, setIsLoading] = useState(false);
  const comComment = useComComment(com.wid);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    (async () => {
      if (inputRef.current === null || com.wid == null) return;
      const inputNode = inputRef.current;
      const commentBox = await cmIDB.db.comComments.get(com.wid);
      if (commentBox == null) return;

      inputNode.value = commentBox.comment;
      setInputHeight(inputNode);
    })();
  }, [com.wid]);

  useEffect(() => {
    if (inputRef.current === null || com.wid == null) return;
    const inputNode = inputRef.current;

    setInputHeight(inputNode);

    return hookEffectPipe()
      .pipe(addEventListenerPipe(inputNode, 'focus', () => setInputHeight(inputNode)))
      .pipe(
        addEventListenerPipe(inputNode, 'input', () => {
          setInputHeight(inputNode);

          updateComComment(com.wid, inputNode.value, setIsLoading);
        }),
      )
      .effect();
  }, [com.wid]);

  return (
    <>
      <ModalHeader className="flex flex-gap">
        <LazyIcon icon="TextAlignLeft" />
        <span className="color--7">{com.name}</span>
      </ModalHeader>
      <ModalBody>
        <StyledInput
          className="com-comment-input full-width bgcolor--1"
          ref={inputRef}
        />
      </ModalBody>
      <ModalFooter className="flex flex-gap">
        {comComment?.isSavedLocal ? (
          <LazyIcon
            icon="FileValidation"
            className="color--ok"
          />
        ) : (
          <TheIconLoading isLoading={isLoading} />
        )}

        <LazyIcon
          icon="MessageQuestion"
          className="pointer flex full-width between color--7 margin-gap-v"
          onClick={event => {
            propagationStopper(event);
            isShowInfoModalAtom.set(true);
          }}
        />
      </ModalFooter>

      <Modal openAtom={isShowInfoModalAtom}>
        <ModalHeader>Заметки к песне</ModalHeader>
        <ModalBody>
          <TheComCommentInfo HashSwitcherIcon={HashSwitcherIcon} />
        </ModalBody>
      </Modal>
    </>
  );
};

const setInputHeight = checkIsCssRuleSupports('field-sizing: content')
  ? emptyFunc
  : (inputNode: HTMLTextAreaElement) => mylib.setInputHeightByContent(inputNode);

const StyledInput = styled.textarea`
  resize: none;
  field-sizing: content;
  min-height: 2lh;
`;
