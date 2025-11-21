import { bibleShowTranslatesAtom, useBibleTranslatesContext } from '$bible/ext';
import { CmCom } from '$cm/ext';
import { useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { makeRegExp } from 'regexpert';
import { emptyFunc } from 'shared/utils';
import { RuleSet, css } from 'styled-components';
import { StyledCmComOrderLine } from '../../com-order-line/style/StyledComLine.styler';
import { CmComCommentMakerCleans } from './Cleans';
import { useCmComCommentBlock } from './useCmComCommentBlock';

export const useCmComCommentBlockCssStyles = (com: CmCom, isSetHashesOnly = false) => {
  const [styles, setStyles] = useState<
    Partial<{
      commentCss: RuleSet<object> | '';
      isThereUnsettedTranslate: boolean;
      isThereCorrectBibleText: boolean;
    }>
  >({});
  const translates = useBibleTranslatesContext();
  const { takeCommentTexts } = useCmComCommentBlock(com.wid);
  const currentBibleTranslate = useAtomValue(bibleShowTranslatesAtom)[0];

  useEffect(() => {
    (async () => {
      const visibleOrders = com.visibleOrders();
      const cssContentList = isSetHashesOnly
        ? null
        : (visibleOrders?.map(ord => {
            const ordSelectorId = ord.makeSelector();

            const commentLines = takeCommentTexts(ordSelectorId);
            if (commentLines == null) return '';

            let isNumeredLines = false;

            const linesStyle = commentLines.map((line, linei) => {
              if (!line) return;
              isNumeredLines ||= !!line.match(makeRegExp(`/(?<=^|\\n)[^а-я]*\\d/`));

              return css`
                .styled-header ${commentHolderSelectors[linei] || '::after'} {
                  ${CmComCommentMakerCleans.pseudoCommentStaticPropsCss}
                  ${CmComCommentMakerCleans.makePseudoCommentContentCss(line)}
                  ${CmComCommentMakerCleans.makePseudoCommentContentAccentsCss(line)}
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
                  ${plusInheritBlockStyleSelector.repeat(0)} ${StyledCmComOrderLine},
                ${plusInheritBlockStyleSelector.repeat(1)} ${StyledCmComOrderLine},
                ${plusInheritBlockStyleSelector.repeat(2)} ${StyledCmComOrderLine},
                ${plusInheritBlockStyleSelector.repeat(3)} ${StyledCmComOrderLine},
                ${plusInheritBlockStyleSelector.repeat(4)} ${StyledCmComOrderLine},
                ${plusInheritBlockStyleSelector.repeat(5)} ${StyledCmComOrderLine} {
                    counter-increment: com-line;

                    &::before {
                      content: counter(com-line) '_';
                      opacity: 0.7;
                    }
                  }
                `}
              }
            `;
          }) ?? []);

      const numeredOrderHeaders = visibleOrders?.map((ord, ordi) => {
        const ordSelectorId = ord.makeSelector();

        return css`
          [ord-selector='${ordSelectorId}'] .styled-header {
            &::before {
              content: '#${ordi + 1}';
            }
          }
        `;
      });
      let isThereUnsettedTranslate = false;
      let isThereCorrectBibleText = false;

      const headCommentContents = await Promise.all(
        (takeCommentTexts('head') ?? []).map(async (line, linei) => {
          const {
            isThereUnsettedTranslate: isUnset,
            isThereCorrectBibleText: isWithText,
            accentsCss,
            commentWithTextCss,
            commentWithTextLinksOnlyCss,
          } = await CmComCommentMakerCleans.makeStartCommentCss(currentBibleTranslate, line, translates);

          isThereUnsettedTranslate ||= isUnset;
          isThereCorrectBibleText ||= isWithText;
          const selector = `> ${commentHolderSelectors[linei + 1]}`;

          return css`
            .com-orders-with-comments {
              ${selector} {
                ${CmComCommentMakerCleans.pseudoCommentStaticPropsCss}
                ${accentsCss}
              }

              &.expand-first-comment-bible-texts ${selector} {
                ${commentWithTextCss}
              }

              &:not(.expand-first-comment-bible-texts) ${selector} {
                ${commentWithTextLinksOnlyCss}
              }
            }
          `;
        }),
      );

      return {
        isThereUnsettedTranslate,
        isThereCorrectBibleText,
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
              --comment-margin-left: 1rem;

              display: block;
              text-decoration: underline;
              margin-left: var(--comment-margin-left);
            }
          }

          ${cssContentList}
          ${numeredOrderHeaders}
        `,
      };
    })()
      .then(styles => setStyles(styles))
      .catch(emptyFunc);
  }, [currentBibleTranslate, takeCommentTexts, translates, com, isSetHashesOnly]);

  return styles;
};

const plusInheritBlockStyleSelector = ` + [inherit-block-style]:not(:has(.styled-header))`;

const commentHolderSelectors = [
  '.comment-holder:nth-child(2)::before',
  '.comment-holder:nth-child(2)::after',
  '.comment-holder:nth-child(3)::before',
  '.comment-holder:nth-child(3)::after',
  '.comment-holder:nth-child(4)::before',
  '.comment-holder:nth-child(4)::after',
  '.comment-holder:nth-child(5)::before',
];
