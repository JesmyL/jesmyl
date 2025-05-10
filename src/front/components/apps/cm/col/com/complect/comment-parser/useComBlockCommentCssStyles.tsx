import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { useDebounceValue } from '#shared/lib/hooks/useDebounceValue';
import { MyLib } from '#shared/lib/my-lib';
import { useBibleTranslatesContext } from '$bible/basis/lib/contexts/translates';
import { useEffect, useState } from 'react';
import { makeRegExp } from 'regexpert';
import { CmComWid } from 'shared/api';
import { emptyFunc } from 'shared/utils';
import { RuleSet, css } from 'styled-components';
import { StyledComLine } from '../../line/StyledComLine';
import { Order } from '../../order/Order';
import { ComBlockCommentMakerCleans } from './Cleans';

export const useComBlockCommentCssStyles = (comw: CmComWid, visibleOrders: Order[] | und, comment: string | nil) => {
  const comComment = useDebounceValue(comment, 400);
  const [fastStyles, setFastStyles] = useState<string | null>(null);
  const [styles, setStyles] = useState<RuleSet<object> | ''>('');
  const translates = useBibleTranslatesContext();

  useEffect(() => {
    setFastStyles('');

    return hookEffectPipe()
      .pipe(setTimeoutPipe(setFastStyles, 600, null))
      .effect();
  }, [comw]);

  useEffect(() => {
    if (fastStyles !== null) {
      setStyles('');
      return;
    }

    (async () => {
      let cssContentList: RuleSet<object>[] = [];

      if (comComment) {
        const { regExp: commentMatcher, transform: makePropsFromCommentsArgs } =
          ComBlockCommentMakerCleans.commentsAnySpecialNumberParseReg;
        const commentBlocks = Array.from(comComment.matchAll(commentMatcher));
        const commentsDict: Record<string, string[]> = {};

        for (const commentBlock of commentBlocks) {
          const cmt = makePropsFromCommentsArgs(commentBlock as never);

          if (!cmt.comment) continue;

          if (cmt.hashes && cmt.hashes.length > 1 && cmt.blockHashPosition !== undefined) {
            if (visibleOrders == null) continue;

            const leadOrderStyleKey = visibleOrders[+cmt.blockHashPosition - 1]?.me.style?.key.trim();

            if (leadOrderStyleKey == null) continue;
            let orderPosition = 0;

            for (const visibleOrder of visibleOrders) {
              orderPosition++;

              if (visibleOrder.me.style?.key.trim() !== leadOrderStyleKey) continue;
              if (commentsDict[orderPosition] != null && cmt.modificators !== '!') continue;

              commentsDict[orderPosition] = [cmt.comment.trim()];
            }
            continue;
          } else if (cmt.modificators === '!' && cmt.blockHashPosition !== undefined) {
            commentsDict[cmt.blockHashPosition] = [cmt.comment.trim()];

            continue;
          }

          if (cmt.blockHashPosition !== undefined) {
            commentsDict[cmt.blockHashPosition] ??= [];
            commentsDict[cmt.blockHashPosition].push(cmt.comment.trim());
          }
        }

        cssContentList = MyLib.entries(commentsDict).map(([blockNumber, comment]) => {
          const commentStr = comment.join('\n');
          const isNumeredLines = commentStr.match(makeRegExp(`/(?<=^|\\n)\\d/`));

          return css`
            ${ComBlockCommentMakerCleans.makeComOrderBlockSelector(blockNumber)} {
              .styled-header::after {
                ${ComBlockCommentMakerCleans.makePseudoCommentContentCss(commentStr)}
                ${ComBlockCommentMakerCleans.makePseudoCommentContentAccentsCss(commentStr)}
              }

              ${isNumeredLines &&
              css`
                ${StyledComLine} {
                  counter-increment: com-line;

                  &::before {
                    content: counter(com-line) '_';
                    opacity: 0.7;
                  }
                }
              `}
            }
          `;
        });
      }

      const numeredOrderHeaders = visibleOrders?.map((_ord, ordi) => {
        return css`
          ${ComBlockCommentMakerCleans.makeComOrderHeaderSelector(ordi + 1)} {
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
