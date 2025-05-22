import { getParentNodeWithClassName } from '#shared/lib/getParentNodeWithClassName';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { cmIsComMiniAnchorAtom } from '$cm/atoms';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { wait } from 'shared/utils';
import { Com } from '../../Com';
import { ComBlockCommentMakerCleans } from './Cleans';
import { isComCommentRedactAtom } from './complect';

export const useComCommentBlockFastReactions = (listRef: React.RefObject<HTMLDivElement | null>, com: Com) => {
  const isMiniAnchor = useAtomValue(cmIsComMiniAnchorAtom);

  useEffect(() => {
    if (listRef.current == null || isMiniAnchor) return;
    let isFirstClick = true;

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(listRef.current, 'mousedown', async event => {
          const comOrders = com.orders;
          if (comOrders === null) return;
          const visibleOrders = comOrders.filter(ComBlockCommentMakerCleans.withHeaderTextOrderFilter);

          if (isFirstClick) {
            isFirstClick = false;
            setTimeout(() => (isFirstClick = true), 500);
            return;
          }

          const { node, foundClassNames } = getParentNodeWithClassName(event, 'styled-block', ['styled-header']);
          if (node === null || !foundClassNames['styled-header']) return;

          isComCommentRedactAtom.set(true);
          await wait(700);

          const commentInput = document.querySelector('.com-comment-input') as HTMLTextAreaElement;
          if (commentInput == null) return;

          const orderNN = +node.getAttribute('visible-ord-nn')!;
          if (mylib.isNaN(orderNN)) return;

          const { secrets, blockTitle } = ComBlockCommentMakerCleans.takeSecretsAndTitle(
            { blockHashPosition: '' + orderNN },
            comOrders,
            visibleOrders,
          );

          const hashedNumber = `\n#${orderNN}${secrets} ${blockTitle} `;

          commentInput.focus();
          commentInput.scrollIntoView({ block: 'center' });
          commentInput.focus();

          const { regExp: commentReg } = ComBlockCommentMakerCleans.commentsParseReg(orderNN);
          const caretPosition = commentInput.value.search(commentReg);

          setTimeout(() => mylib.setInputHeightByContent(commentInput), 120);

          if (caretPosition > -1) {
            commentInput.selectionStart = commentInput.selectionEnd =
              //
              commentInput.value.indexOf('\n', caretPosition + 1);
            return;
          }

          let currentNumber = orderNN - 1;

          while (currentNumber++ < comOrders.length + 1) {
            const { regExp: currentCommentReg } = ComBlockCommentMakerCleans.commentsParseReg(currentNumber);
            const insertPosition = commentInput.value.search(currentCommentReg);

            if (insertPosition < 0) continue;

            setTimeout(() => {
              commentInput.value =
                commentInput.value.slice(0, insertPosition) + hashedNumber + commentInput.value.slice(insertPosition);

              commentInput.selectionStart = commentInput.selectionEnd = commentInput.value.indexOf(
                '\n',
                insertPosition + 1,
              );
            }, 100);

            return;
          }

          commentInput.value += hashedNumber;
        }),
      )
      .effect();
  }, [com.orders, isMiniAnchor, listRef]);
};
