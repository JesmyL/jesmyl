import { useBibleTranslatesContext } from '$bible/basis/lib/contexts/translates';
import { cmIDB } from '$cm/basis/lib/cmIDB';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useState } from 'react';
import { makeRegExp } from 'regexpert';
import { CmComWid } from 'shared/api';
import { emptyFunc } from 'shared/utils';
import { RuleSet, css } from 'styled-components';
import { StyledComLine } from '../../line/StyledComLine';
import { Order } from '../../order/Order';
import { ComBlockCommentMakerCleans } from './Cleans';

const plusInheritBlockStyleSelector = ` + [inherit-block-style]:not(:has(.styled-header))`;

const commentHolderSelectors = [
  '.comment-holder:nth-child(1)::before',
  '.comment-holder:nth-child(1)::after',
  '.comment-holder:nth-child(2)::before',
  '.comment-holder:nth-child(2)::after',
  '.comment-holder:nth-child(3)::before',
  '.comment-holder:nth-child(3)::after',
];

export const useComBlockCommentCssStyles = (comw: CmComWid, visibleOrders: Order[] | und) => {
  const [styles, setStyles] = useState<RuleSet<object> | ''>('');
  const translates = useBibleTranslatesContext();
  const localCommentBlock = useLiveQuery(() => cmIDB.tb.localComCommentBlocks.get(comw), [comw]);
  const commentBlock = useLiveQuery(() => cmIDB.tb.comCommentBlocks.get(comw), [comw]);

  useEffect(() => {
    (async () => {
      const cssContentList =
        visibleOrders?.map((ord, ordi) => {
          const commentLines = localCommentBlock?.d[ord.wid] ?? commentBlock?.d[ord.wid];
          if (commentLines == null) return '';

          let isNumeredLines = false;

          const linesStyle = commentLines.map((line, linei) => {
            if (!line) return;
            isNumeredLines ||= !!line.match(makeRegExp(`/(?<=^|\\n)[^а-я]*\\d/`));

            return css`
              .styled-header ${commentHolderSelectors[linei] || '::after'} {
                ${ComBlockCommentMakerCleans.makePseudoCommentContentCss(line)}
                ${ComBlockCommentMakerCleans.makePseudoCommentContentAccentsCss(line)}
              }
            `;
          });

          return css`
            ${ComBlockCommentMakerCleans.makeComOrderBlockSelector(ordi + 1)} {
              ${linesStyle}

              &:has(.styled-header) {
                counter-reset: com-line;
              }

              ${isNumeredLines &&
              css`
                ${plusInheritBlockStyleSelector.repeat(0)} ${StyledComLine},
                ${plusInheritBlockStyleSelector.repeat(1)} ${StyledComLine},
                ${plusInheritBlockStyleSelector.repeat(2)} ${StyledComLine},
                ${plusInheritBlockStyleSelector.repeat(3)} ${StyledComLine},
                ${plusInheritBlockStyleSelector.repeat(4)} ${StyledComLine},
                ${plusInheritBlockStyleSelector.repeat(5)} ${StyledComLine} {
                  counter-increment: com-line;

                  &::before {
                    content: counter(com-line) '_';
                    opacity: 0.7;
                  }
                }
              `}
            }
          `;
        }) ?? [];

      const numeredOrderHeaders = visibleOrders?.map((_ord, ordi) => {
        return css`
          ${ComBlockCommentMakerCleans.makeComOrderHeaderSelector(ordi + 1)} {
            &::before {
              content: '#${ordi + 1}';
            }
          }
        `;
      });

      const headCommentContents = await Promise.all(
        (localCommentBlock?.d.head ?? commentBlock?.d.head ?? []).map(async (line, linei) => {
          return css`
            ${commentHolderSelectors[linei - 1]
              ? `.com-orders-with-comments > ${commentHolderSelectors[linei - 1]}`
              : '&::before'} {
              ${await ComBlockCommentMakerCleans.makeStartCommentCss(line, translates)}
            }
          `;
        }),
      );

      return css`
        --comment-opacity: 0.5;
        --comment-opacity-accent: 0.8;

        ${headCommentContents}

        .styled-header {
          &::after,
          &::before,
          > ::after,
          > ::before {
            opacity: var(--comment-opacity);
            text-decoration: none;
          }

          &::before {
            margin-right: 1rem;
          }

          &:after,
          > ::after,
          > ::before {
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
  }, [commentBlock?.d, localCommentBlock?.d, translates, visibleOrders]);

  return styles;
};
