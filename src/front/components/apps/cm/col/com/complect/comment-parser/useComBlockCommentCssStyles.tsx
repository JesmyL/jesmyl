import { useEffect, useState } from 'react';
import { css, RuleSet } from 'styled-components';
import { emptyFunc } from '../../../../../../../../back/complect/utils';
import { hookEffectPipe, setTimeoutPipe } from '../../../../../../../complect/hookEffectPipe';
import { MyLib } from '../../../../../../../complect/my-lib/MyLib';
import { useDebounceValue } from '../../../../../../../complect/useDebounceValue';
import { useBibleTranslatesContext } from '../../../../../bible/translates/TranslatesContext';
import { Com } from '../../Com';
import { Order } from '../../order/Order';
import { ComBlockCommentMakerCleans } from './Cleans';

export const useComBlockCommentCssStyles = (com: nil | Com, visibleOrders: Order[] | und, comment: string | nil) => {
  const comComment = useDebounceValue(comment, 600);
  const [fastStyles, setFastStyles] = useState<string | null>(null);
  const [styles, setStyles] = useState<RuleSet<object> | ''>('');
  const translates = useBibleTranslatesContext();

  useEffect(() => {
    setFastStyles('');

    return hookEffectPipe()
      .pipe(setTimeoutPipe(setFastStyles, 600, null))
      .effect();
  }, [com?.wid]);

  useEffect(() => {
    if (fastStyles !== null) {
      setStyles('');
      return;
    }

    (async () => {
      let cssContentList: RuleSet<object>[] = [];

      if (comComment) {
        const commentBlocks = Array.from(comComment.matchAll(ComBlockCommentMakerCleans.commentsParseReg));
        const commentsDict: Record<string, string[]> = {};

        for (const commentBlock of commentBlocks) {
          const cmt = ComBlockCommentMakerCleans.makePropsFromCommentsArgs(commentBlock as never);

          if (!cmt.$comment) continue;

          if (cmt.$hashes && cmt.$hashes.length > 1 && cmt.$blockHashPosition !== undefined) {
            if (visibleOrders == null) continue;

            const leadOrderStyleKey = visibleOrders[+cmt.$blockHashPosition - 1]?.me.style?.key.trim();

            if (leadOrderStyleKey == null) continue;
            let orderPosition = 0;

            for (const visibleOrder of visibleOrders) {
              orderPosition++;

              if (visibleOrder.me.style?.key.trim() !== leadOrderStyleKey) continue;
              if (commentsDict[orderPosition] != null && cmt.$modificators !== '!') continue;

              commentsDict[orderPosition] = [cmt.$comment.trim()];
            }
            continue;
          } else if (cmt.$modificators === '!' && cmt.$blockHashPosition !== undefined) {
            commentsDict[cmt.$blockHashPosition] = [cmt.$comment.trim()];

            continue;
          }

          if (cmt.$blockHashPosition !== undefined) {
            commentsDict[cmt.$blockHashPosition] ??= [];
            commentsDict[cmt.$blockHashPosition].push(cmt.$comment.trim());
          }
        }

        cssContentList = MyLib.entries(commentsDict).map(([blockNumber, comment]) => {
          const commentStr = comment.join('\n');

          return css`
            .styled-block:nth-child(${blockNumber} of :has(.styled-header)) {
              .styled-header {
                &::after {
                  ${ComBlockCommentMakerCleans.makePseudoCommentContentCss(commentStr)}
                  ${ComBlockCommentMakerCleans.makePseudoCommentContentAccentsCss(commentStr)}
                }
              }
            }
          `;
        });
      }

      const numeredOrderHeaders = visibleOrders?.map((_ord, ordi) => {
        return css`
          .styled-block:nth-child(${ordi + 1} of :has(.styled-header)) .styled-header {
            &::before {
              content: '#${ordi + 1}';
            }
          }
        `;
      });

      return css`
        --comment-opacity: 0.5;
        --comment-opacity-accent: 0.8;

        ${await ComBlockCommentMakerCleans.makeStartCommentCss(comComment, translates)}

        .styled-header {
          &::after,
          &::before {
            opacity: var(--comment-opacity);
            text-decoration: none;
          }

          &::before {
            margin-right: 1rem;
          }

          &:after {
            display: block;
            text-decoration: underline;
            margin-left: 1rem;
          }
        }

        ${cssContentList}
        ${numeredOrderHeaders}
      `;
    })()
      .then(styles => setStyles(styles))
      .catch(emptyFunc);
  }, [comComment, fastStyles, translates, visibleOrders]);

  return fastStyles ?? styles;
};
