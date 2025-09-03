import { useBibleTranslatesContext } from '$bible/basis/lib/contexts/translates';
import { bibleShowTranslatesAtom } from '$bible/basis/lib/store/atoms';
import { cmIDB } from '$cm/basis/lib/store/cmIDB';
import { useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useState } from 'react';
import { makeRegExp } from 'regexpert';
import { CmComWid } from 'shared/api';
import { emptyFunc } from 'shared/utils';
import { RuleSet, css } from 'styled-components';
import { StyledComLine } from '../../line/StyledComLine.styler';
import { Order } from '../../order/Order';
import { ComBlockCommentMakerCleans } from './Cleans';

export const useComBlockCommentCssStyles = (comw: CmComWid, visibleOrders: Order[] | und) => {
  const [styles, setStyles] = useState<
    Partial<{
      commentCss: RuleSet<object> | '';
      isThereUnsettedTranslate: boolean;
    }>
  >({});
  const translates = useBibleTranslatesContext();
  const localCommentBlock = useLiveQuery(() => cmIDB.tb.localComCommentBlocks.get(comw), [comw]);
  const commentBlock = useLiveQuery(() => cmIDB.tb.comCommentBlocks.get(comw), [comw]);
  const currentBibleTranslate = useAtomValue(bibleShowTranslatesAtom)[0];

  useEffect(() => {
    (async () => {
      const cssContentList =
        visibleOrders?.map(ord => {
          const ordSelectorId = ComBlockCommentMakerCleans.makeOrdSelector(ord);

          const commentLines = localCommentBlock?.d[ordSelectorId] ?? commentBlock?.d[ordSelectorId];
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
            [ord-selector='${ordSelectorId}'] {
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

      const numeredOrderHeaders = visibleOrders?.map((ord, ordi) => {
        const ordSelectorId = ComBlockCommentMakerCleans.makeOrdSelector(ord);

        return css`
          [ord-selector='${ordSelectorId}'] .styled-header {
            &::before {
              content: '#${ordi + 1}';
            }
          }
        `;
      });
      let isThereUnsettedTranslate = false;

      const headCommentContents = await Promise.all(
        (localCommentBlock?.d.head ?? commentBlock?.d.head ?? []).map(async (line, linei) => {
          const { startCommentCss, isThereUnsettedTranslate: isUnset } =
            await ComBlockCommentMakerCleans.makeStartCommentCss(currentBibleTranslate, line, translates);

          isThereUnsettedTranslate ||= isUnset;

          return css`
            ${commentHolderSelectors[linei - 1]
              ? `.com-orders-with-comments > ${commentHolderSelectors[linei - 1]}`
              : '&::before'} {
              ${startCommentCss}
            }
          `;
        }),
      );

      return {
        isThereUnsettedTranslate,
        commentCss: css`
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
        `,
      };
    })()
      .then(styles => setStyles(styles))
      .catch(emptyFunc);
  }, [commentBlock?.d, currentBibleTranslate, localCommentBlock?.d, translates, visibleOrders]);

  return styles;
};

const plusInheritBlockStyleSelector = ` + [inherit-block-style]:not(:has(.styled-header))`;

const commentHolderSelectors = [
  '.comment-holder:nth-child(1)::before',
  '.comment-holder:nth-child(1)::after',
  '.comment-holder:nth-child(2)::before',
  '.comment-holder:nth-child(2)::after',
  '.comment-holder:nth-child(3)::before',
  '.comment-holder:nth-child(3)::after',
];
