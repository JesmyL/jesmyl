import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { updateComComment } from '@cm/com-comments-manager';
import { useEffect } from 'react';
import { emptyFunc } from 'shared/utils';
import { Com } from '../../Com';
import { Order } from '../../order/Order';
import { ComBlockCommentMakerCleans } from './Cleans';

export const useComBlockCommentUpdateBlockNames = (
  com: Com | nil,
  visibleOrders: Order[] | undefined,
  isRedact: boolean,
  comComment: string | nil,
) => {
  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        setTimeoutPipe(() => {
          if (!com?.wid || !comComment || visibleOrders == null) return;

          const initialOrders = com?.orders;

          if (initialOrders == null) return;

          const newComment = comComment?.replace(ComBlockCommentMakerCleans.commentsParseReg(), (...args) => {
            const cmt = ComBlockCommentMakerCleans.makePropsFromCommentsArgs(args);
            if (cmt.$blockHashPosition === undefined) return cmt.$all;

            let secretWidStr = '';
            let blockHeader = '';
            let blockHashPosition = +cmt.$blockHashPosition;

            if (cmt.$secretWidStr) {
              const unsecredWid = ComBlockCommentMakerCleans.makeSecretToWid(cmt.$secretWidStr);
              const unsecredVisibleOrderi = visibleOrders.findIndex(ord => ord.wid === unsecredWid);
              const unsecredVisibleOrder = visibleOrders[unsecredVisibleOrderi];

              if (unsecredVisibleOrder == null) {
                const unsecretInvisibleOrderi = initialOrders.findIndex(ord => ord.wid === unsecredWid);
                const unsecretInvisibleOrder = initialOrders[unsecretInvisibleOrderi];

                if (unsecretInvisibleOrder) {
                  secretWidStr = ComBlockCommentMakerCleans.makeWidToSecret(unsecretInvisibleOrder.wid);
                  blockHeader = unsecretInvisibleOrder.me.header() || '';

                  blockHashPosition = 0;
                } else {
                  const fromBlockHashPositionOrder = visibleOrders[+cmt.$blockHashPosition - 1] as Order | nil;

                  if (fromBlockHashPositionOrder == null) {
                    secretWidStr = '';
                    blockHeader = '';
                    blockHashPosition = 0;
                  } else {
                    const fromHashOrderi = visibleOrders.findIndex(ord => ord.wid === fromBlockHashPositionOrder.wid);

                    secretWidStr = ComBlockCommentMakerCleans.makeWidToSecret(fromBlockHashPositionOrder.wid);
                    blockHeader = fromBlockHashPositionOrder.me.header() || '';

                    blockHashPosition = fromHashOrderi + 1;
                  }
                }
              } else {
                secretWidStr = cmt.$secretWidStr;
                blockHeader = unsecredVisibleOrder.me.header() || '';

                blockHashPosition = unsecredVisibleOrderi + 1;
              }
            } else {
              const fromBlockHashPositionOrder = visibleOrders[+cmt.$blockHashPosition - 1] as Order | nil;

              if (fromBlockHashPositionOrder == null) return cmt.$all;

              secretWidStr = ComBlockCommentMakerCleans.makeWidToSecret(fromBlockHashPositionOrder.wid);
              blockHeader = fromBlockHashPositionOrder.me.header() || '';
            }

            return (
              `${cmt.$before}${cmt.$beforeSpaces}${cmt.$hashes}${blockHashPosition || ''}${
                secretWidStr ? `_${secretWidStr}` : ''
              }${cmt.$modificators || ''}` +
              (blockHeader ? ` [${blockHeader}]` : ' ') +
              (`${cmt.$beforeCommentSpaces || (isRedact ? '' : ' ')}` || ' ') +
              `${cmt.$comment || ''}`
            );
          });

          if (
            ComBlockCommentMakerCleans.spaceFreeText(comComment) ===
            ComBlockCommentMakerCleans.spaceFreeText(newComment)
          )
            return;

          updateComComment(com.wid, isRedact ? newComment : newComment.trim(), emptyFunc);
        }, 500),
      )
      .effect();
  }, [visibleOrders, com?.wid, comComment, isRedact, com?.orders]);
};
