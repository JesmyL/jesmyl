import { bibleShowTranslatesAtom, useBibleTranslatesContext } from '$bible/ext';
import { CmCom } from '$cm/ext';
import { useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { makeRegExp } from 'regexpert';
import { emptyFunc } from 'shared/utils';
import { RuleSet, css } from 'styled-components';
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

            const lineComments: (string[] | nil)[] = [];

            const linesStyle = commentLines.map((line, linei) => {
              if (!line) return;

              line = line.replace(makeRegExp(`/(?<=^|\\n) *(/*)( *\\d+ *)(.*)/`), (_all, pre, num, rest) => {
                (lineComments[num.trim()] ??= []).push(`${pre} ${rest}`);
                return '';
              });

              return css`
                .styled-header ${commentHolderSelectors[linei] || '::after'} {
                  ${CmComCommentMakerCleans.pseudoCommentStaticPropsCss}
                  ${CmComCommentMakerCleans.makePseudoCommentContentCss(line)}
                  ${CmComCommentMakerCleans.makePseudoCommentContentAccentsCss(line)}
                }
              `;
            });

            return css`
              [solid-com-order-selector]:has([ord-selector='${ordSelectorId}']) {
                ${linesStyle}

                ${lineComments.map(
                  (comment, commenti) =>
                    comment &&
                    css`
                      [solid-order-text-linei='${commenti - 1}']:before {
                        margin-left: var(--comment-margin-left);

                        ${CmComCommentMakerCleans.pseudoCommentStaticPropsCss}
                        ${CmComCommentMakerCleans.makePseudoCommentContentCss(comment.join('\n'))}
                        ${CmComCommentMakerCleans.makePseudoCommentContentAccentsCss(comment.join('\n'))}
                      }
                    `,
                )}
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
          --comment-margin-left: 1rem;

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

const commentHolderSelectors = [
  '.comment-holder:nth-child(2)::before',
  '.comment-holder:nth-child(2)::after',
  '.comment-holder:nth-child(3)::before',
  '.comment-holder:nth-child(3)::after',
  '.comment-holder:nth-child(4)::before',
  '.comment-holder:nth-child(4)::after',
  '.comment-holder:nth-child(5)::before',
];
