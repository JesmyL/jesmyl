import { bibleShowTranslatesAtom, useBibleTranslatesContext } from '$bible/ext';
import { CmCom } from '$cm/ext';
import { useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { CmComCommentBlockSpecialSelector, CmComOrderWid } from 'shared/api';
import { emptyFunc } from 'shared/utils';
import { CmComBlockKindKey } from 'shared/values/cm/block-kinds/BlockKind.model';
import { RuleSet, css } from 'styled-components';
import { cmComCommentReplaceLineWordComments } from '../utils/cmComCommentReplaceLineWordComments';
import {
  cmComCommentAccentsColorList,
  cmComCommentMakePseudoCommentContentAccentsColorCss,
  cmComCommentMakePseudoCommentContentPropCss,
} from '../utils/makePseudoComment.props';
import { cmComCommentMakeStartCommentCss } from '../utils/makeStartCommentCss';
import { cmComCommentPseudoCommentStaticPropsCss } from '../utils/pseudoCommentStaticPropsCss';
import {
  useCmComCommentBlock,
  useCmComCommentKindBlockTaker,
  useCmComCommentTextBlockTaker,
} from './useCmComCommentBlock';

export const useCmComCommentBlockCssStyles = (
  com: CmCom,
  isSetHashesOnly = false,
  forOrdSelectorOnly?: CmComOrderWid,
) => {
  const [styles, setStyles] = useState<
    Partial<{
      commentCss: RuleSet<object> | '';
      isThereUnsettedTranslate: boolean;
      isThereCorrectBibleText: boolean;
    }>
  >({});
  const translates = useBibleTranslatesContext();
  const { localCommentBlock, commentBlock } = useCmComCommentBlock(com.wid);
  const takeCommentTexts = useCmComCommentTextBlockTaker(com.wid, localCommentBlock, commentBlock);
  const commentKindsBlock = useCmComCommentKindBlockTaker(com.wid, localCommentBlock, commentBlock);
  const currentBibleTranslate = useAtomValue(bibleShowTranslatesAtom)[0];

  useEffect(() => {
    (async () => {
      const visibleOrders = com.visibleOrders();
      const cssContentList =
        isSetHashesOnly && forOrdSelectorOnly == null
          ? null
          : ((forOrdSelectorOnly == null ? visibleOrders : [com.getOrderBySelector(forOrdSelectorOnly).ord])?.map(
              ord => {
                if (ord == null) return;
                const ordSelectorId = ord.makeSelector();

                let commentLines = takeCommentTexts(ordSelectorId);
                const kindComment = ord.kind && commentKindsBlock?.[Math.abs(ord.kind) as CmComBlockKindKey];

                if (!commentLines?.length && !kindComment) return '';

                commentLines ??= [];
                if (kindComment) commentLines = [kindComment].concat(commentLines);

                const styles: RuleSet<object>[] = [];
                const lineWordStyleDict: PRecord<`${number}/${number}`, (RuleSet<object> | string | nil)[]> = {};

                cmComCommentReplaceLineWordComments(commentLines, props => {
                  if ('blocki' in props) {
                    styles.push(css`
                      .styled-header ${commentHolderSelectors[props.blocki] || '::after'} {
                        ${cmComCommentPseudoCommentStaticPropsCss}
                        ${cmComCommentMakePseudoCommentContentPropCss(props.text)}
                        ${cmComCommentMakePseudoCommentContentAccentsColorCss(props.text)}
                      }
                    `);
                  } else if ('wordi' in props) {
                    const lineWordStyleKey = `${props.linei}/${props.wordi}` as const;

                    if (lineWordStyleDict[lineWordStyleKey] == null) {
                      lineWordStyleDict[lineWordStyleKey] = [];

                      styles.push(css`
                        [solid-order-text-linei='${props.linei}'] [whole-wordi='${props.wordi}'] {
                          ${() => lineWordStyleDict[lineWordStyleKey]}
                        }
                      `);
                    }

                    if ('chordi' in props) {
                      const highlights = cmComCommentAccentsColorList[props.kind];
                      const contentCss =
                        props.text &&
                        cmComCommentMakePseudoCommentContentPropCss(
                          props.text,
                          props.add === '<' ? 'attr(attr-chord)' : '',
                          props.add === '>' ? 'attr(attr-chord)' : '',
                        );

                      lineWordStyleDict[lineWordStyleKey].push(css`
                        ${css`
                          > [attr-chordi='${props.chordi}']:not([com-letter-chorded='post']):before,
                          > [attr-chordi='${props.chordi}'][com-letter-chorded='post'] [word-fragment]:before,
                          > [attr-chordi='${props.chordi - 1}'][com-letter-chorded='pre'] [word-fragment]:before,
                          > [attr-chordi='${props.chordi - 1}'][com-letter-chorded='post']:after {
                            ${contentCss}${highlights}
                            text-decoration-line: underline;
                          }

                          > [attr-chordi='${props.chordi - 1}'][com-letter-chorded='pre'] [word-fragment]:after {
                            ${contentCss}
                          }

                          > [attr-chordi='${props.chordi}']:not([com-letter-chorded='post']) {
                            &[com-letter-spaced-word] {
                              text-align: right;
                              display: inline-block;
                            }

                            [word-fragment]:after {
                              ${contentCss}
                            }
                          }
                        `}
                      `);
                    } else if ('isNotPreAdd' in props) {
                      lineWordStyleDict[lineWordStyleKey].push(css`
                        ${props.isNotPreAdd ? '&:before' : '&:after'} {
                          ${cmComCommentMakePseudoCommentContentPropCss(props.text)}
                          ${cmComCommentMakePseudoCommentContentAccentsColorCss(props.text, null)}
                        }
                      `);
                    } else {
                      lineWordStyleDict[lineWordStyleKey].push(
                        cmComCommentMakePseudoCommentContentAccentsColorCss(props.text, null),
                      );
                    }
                  } else if ('linei' in props) {
                    styles.push(css`
                      &:not(:has([solid-order-text-linei='${props.linei}'])):after,
                      [solid-order-text-linei='${props.linei}']:before {
                        ${cmComCommentMakePseudoCommentContentPropCss(props.text)}
                        ${cmComCommentMakePseudoCommentContentAccentsColorCss(props.text)}
                      }
                    `);
                  }
                });

                return css`
                  [solid-com-order-selector='${ordSelectorId}'] {
                    ${styles}
                  }
                `;
              },
            ) ?? []);

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
        (takeCommentTexts(CmComCommentBlockSpecialSelector.Head) ?? []).map(async (line, linei) => {
          const {
            isThereUnsettedTranslate: isUnset,
            isThereCorrectBibleText: isWithText,
            accentsCss,
            commentWithTextCss,
            commentWithTextLinksOnlyCss,
          } = await cmComCommentMakeStartCommentCss(currentBibleTranslate, line, translates);

          isThereUnsettedTranslate ||= isUnset;
          isThereCorrectBibleText ||= isWithText;
          const selector = `> ${commentHolderSelectors[linei + 1]}`;

          return css`
            .com-orders-with-comments {
              ${selector} {
                ${cmComCommentPseudoCommentStaticPropsCss}
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
            > ::after,
            > ::before,
            &::before {
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

          [solid-com-order-selector] {
            &:after,
            [solid-order-text-linei]:before {
              ${cmComCommentPseudoCommentStaticPropsCss}
            }

            [solid-order-text-linei]:before {
              margin-left: var(--comment-margin-left);
            }

            &:after {
              margin-left: calc(var(--comment-margin-left) * 2);
            }
          }
        `,
      };
    })()
      .then(styles => setStyles(styles))
      .catch(emptyFunc);
  }, [
    currentBibleTranslate,
    takeCommentTexts,
    translates,
    com,
    isSetHashesOnly,
    commentKindsBlock,
    forOrdSelectorOnly,
  ]);

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
