import { useAtomSet } from '#shared/lib/atom';
import { mylib } from '#shared/lib/my-lib';
import { useEffect } from 'react';
import { itInvokeIt, wait } from 'shared/utils';
import { Com } from '../../Com';
import { ComBlockCommentMakerCleans } from './Cleans';
import { isComCommentRedactAtom } from './complect';

export const useComCommentBlockFastReactions = (com: Com) => {
  const setIsRedact = useAtomSet(isComCommentRedactAtom);

  useEffect(() => {
    let withHeaderOrdi = 0;
    const mutes = new Set<() => void>();

    com.orders?.forEach(ord => {
      if (ord.me.isInherit || ord.isEmptyHeader || !ord.isVisible) return;
      withHeaderOrdi++;
      const withHeaderOrdPosition = withHeaderOrdi;

      const headerNode = document.querySelector(
        ComBlockCommentMakerCleans.makeComOrderHeaderSelector(withHeaderOrdPosition),
      );

      if (headerNode == null) return;
      let isFirstClick = true;

      const setComment = async () => {
        if (isFirstClick) {
          isFirstClick = false;
          setTimeout(() => (isFirstClick = true), 500);
          return;
        }

        setIsRedact(false);
        await wait(10);
        setIsRedact(true);
        await wait();

        const commentInput = document.querySelector('.com-comment-input') as HTMLTextAreaElement;
        if (commentInput == null) return;
        const hashedNumber = `\n#${withHeaderOrdPosition} `;

        commentInput.scrollIntoView({ block: 'center' });
        commentInput.focus();
        const caretPosition = commentInput.value.search(
          ComBlockCommentMakerCleans.commentsParseReg(withHeaderOrdPosition),
        );

        Promise.resolve().then(() => mylib.setInputHeightByContent(commentInput));

        if (caretPosition < 0) {
          let currentNumber = withHeaderOrdPosition - 1;

          while (currentNumber++ < withHeaderOrdi) {
            const insertPosition = commentInput.value.search(
              ComBlockCommentMakerCleans.commentsParseReg(currentNumber),
            );

            if (insertPosition > -1) {
              commentInput.value =
                commentInput.value.slice(0, insertPosition) + hashedNumber + commentInput.value.slice(insertPosition);

              commentInput.selectionStart = commentInput.selectionEnd = commentInput.value.indexOf(
                '\n',
                insertPosition + 1,
              );
              return;
            }
          }
          commentInput.value += hashedNumber;
          return;
        }

        commentInput.selectionStart = commentInput.selectionEnd = commentInput.value.indexOf('\n', caretPosition + 1);
      };

      headerNode.addEventListener('click', setComment);
      mutes.add(() => headerNode.removeEventListener('click', setComment));
    });

    return () => mutes.forEach(itInvokeIt);
  }, [com.orders, com.wid, setIsRedact]);
};
