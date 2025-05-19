import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { updateComComment } from '$cm/com-comments-manager';
import { useEffect } from 'react';
import { emptyFunc } from 'shared/utils';
import { Com } from '../../Com';
import { ComBlockCommentMakerCleans } from './Cleans';

export const useComBlockCommentUpdateBlockNames = (com: Com | nil, isRedact: boolean, comComment: string | nil) => {
  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        setTimeoutPipe(() => {
          if (!com?.wid || !comComment) return;

          const comOrders = com.orders;

          if (comOrders == null) return;
          const visibleOrders = comOrders.filter(ComBlockCommentMakerCleans.withHeaderTextOrderFilter);

          const { regExp: commentRegExp, transform } = ComBlockCommentMakerCleans.commentsAnySpecialNumberParseReg;

          const newComment = comComment?.replace(commentRegExp, (...args) => {
            const cmt = transform(args);
            if (cmt.blockHashPosition === undefined) return cmt.$0;

            const { secrets, blockHashPosition, blockTitle } = ComBlockCommentMakerCleans.takeSecretsAndTitle(
              cmt,
              comOrders,
              visibleOrders,
            );

            return (
              `${cmt.before}${cmt.beforeSpaces}${cmt.hashes}${blockHashPosition}${secrets}${cmt.modificators || ''}` +
              ` ${blockTitle}` +
              (`${cmt.beforeCommentSpaces || (isRedact ? '' : ' ')}` || ' ') +
              `${cmt.comment || ''}`
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
  }, [com?.wid, comComment, isRedact, com?.orders]);
};
