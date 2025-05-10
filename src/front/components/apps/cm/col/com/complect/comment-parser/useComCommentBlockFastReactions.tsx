import { getParentNodeWithClassName } from '#shared/lib/getParentNodeWithClassName';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { mylib } from '#shared/lib/my-lib';
import { useEffect } from 'react';
import { wait } from 'shared/utils';
import { Com } from '../../Com';
import { ComBlockCommentMakerCleans } from './Cleans';
import { isComCommentRedactAtom } from './complect';

export const useComCommentBlockFastReactions = (listRef: React.RefObject<HTMLDivElement | null>, com: Com) => {
  const comOrders = useActualRef(com.orders);

  useEffect(() => {
    let isFirstClick = true;

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(listRef.current, 'click', async event => {
          if (comOrders.current === null) return;
          if (isFirstClick) {
            isFirstClick = false;
            setTimeout(() => (isFirstClick = true), 500);
            return;
          }

          isComCommentRedactAtom.set(true);
          await wait(300);

          const commentInput = document.querySelector('.com-comment-input') as HTMLTextAreaElement;
          if (commentInput == null) return;

          const { node } = getParentNodeWithClassName(event, 'styled-header');

          if (node === null) return;
          const ordw = +node.getAttribute('ord-wid')!;
          if (mylib.isNaN(ordw)) return;

          let withHeaderOrdNumber = 0;
          for (const ord of comOrders.current) {
            if (ord.me.isInherit || ord.isEmptyHeader || !ord.isVisible) continue;
            withHeaderOrdNumber++;
            if (ord.wid === ordw) break;
          }

          const hashedNumber = `\n#${withHeaderOrdNumber} `;

          commentInput.focus();
          commentInput.scrollIntoView({ block: 'center' });
          commentInput.focus();

          const { regExp: commentReg } = ComBlockCommentMakerCleans.commentsParseReg(withHeaderOrdNumber);
          const caretPosition = commentInput.value.search(commentReg);

          setTimeout(() => mylib.setInputHeightByContent(commentInput), 120);

          if (caretPosition < 0) {
            let currentNumber = withHeaderOrdNumber - 1;
            const { regExp: currentCommentReg } = ComBlockCommentMakerCleans.commentsParseReg(currentNumber);

            while (currentNumber++ < withHeaderOrdNumber) {
              const insertPosition = commentInput.value.search(currentCommentReg);

              if (insertPosition > -1) {
                setTimeout(() => {
                  commentInput.value =
                    commentInput.value.slice(0, insertPosition) +
                    hashedNumber +
                    commentInput.value.slice(insertPosition);

                  commentInput.selectionStart = commentInput.selectionEnd = commentInput.value.indexOf(
                    '\n',
                    insertPosition + 1,
                  );
                }, 100);

                return;
              }
            }

            commentInput.value += hashedNumber;
            return;
          }

          commentInput.selectionStart = commentInput.selectionEnd = commentInput.value.indexOf('\n', caretPosition + 1);
        }),
      )
      .effect();
  }, [comOrders, listRef]);
};
