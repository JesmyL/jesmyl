import { mylib } from '#shared/lib/my-lib';
import { bibleShowTranslatesAtom, useBibleTranslatesContext } from '$bible/ext';
import { CmCom } from '$cm/ext';
import { useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { makeRegExp } from 'regexpert';
import { CmComCommentBlockSpecialSelector } from 'shared/api';
import { emptyFunc } from 'shared/utils';
import { CmComBlockKindKey } from 'shared/values/cm/block-kinds/BlockKind.model';
import { RuleSet, css } from 'styled-components';
import {
  cmComCommentMakeContentTextWithoutHighlightMarkers,
  cmComCommentMakePseudoCommentContentAccentsCss,
  cmComCommentMakePseudoCommentContentPropCss,
} from '../utils/makePseudoComment.props';
import { cmComCommentMakeStartCommentCss } from '../utils/makeStartCommentCss';
import { cmComCommentPseudoCommentStaticPropsCss } from '../utils/pseudoCommentStaticPropsCss';
import {
  useCmComCommentBlock,
  useCmComCommentKindBlockTaker,
  useCmComCommentTextBlockTaker,
} from './useCmComCommentBlock';

export const useCmComCommentBlockCssStyles = (com: CmCom, isSetHashesOnly = false) => {
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
      const cssContentList = isSetHashesOnly
        ? null
        : (visibleOrders?.map(ord => {
            const ordSelectorId = ord.makeSelector();

            let commentLines = takeCommentTexts(ordSelectorId);
            const kindComment = ord.kind && commentKindsBlock?.[Math.abs(ord.kind) as CmComBlockKindKey];

            if (!commentLines?.length && !kindComment) return '';

            commentLines ??= [];
            if (kindComment) commentLines = [kindComment].concat(commentLines);

            const lineCommentKeys = new Set<string | number>();
            const lineComments: Record<string, string[]> = {};

            const linesStyle = commentLines.map((line, linei) => {
              if (!line) return;

              line = line.replace(
                makeRegExp(`/(?<=^|\\n) *(/*)( *\\d{1,2} *)(.*)/g`),
                (_all, pre: string, num: string, rest: string) => {
                  let key;

                  if (rest.startsWith(':')) {
                    rest = rest.slice(1);

                    key = `${num.trim().padStart(lineWordPositionDigitsSeparationCount, ' ')}${`${parseInt(rest) || 1}`.padStart(lineWordPositionDigitsSeparationCount, ' ')}`;
                    rest = rest.slice(numsSet.has(rest[0]) && numsSet.has(rest[1]) ? 2 : 1);
                  } else key = +num.trim();

                  lineCommentKeys.add(key);
                  (lineComments[key] ??= []).push(pre ? `${pre} ${rest}` : rest);

                  return '';
                },
              );

              return css`
                .styled-header ${commentHolderSelectors[linei] || '::after'} {
                  ${cmComCommentPseudoCommentStaticPropsCss}
                  ${cmComCommentMakePseudoCommentContentPropCss(line)}
                  ${cmComCommentMakePseudoCommentContentAccentsCss(line)}
                }
              `;
            });

            return css`
              [solid-com-order-selector='${ordSelectorId}'] {
                ${linesStyle}

                ${Array.from(lineCommentKeys).map(commentKey => {
                  let comment = lineComments[commentKey].join('\n');

                  if (mylib.isNum(commentKey))
                    return css`
                      &:not(:has([solid-order-text-linei='${commentKey}'])):after,
                      [solid-order-text-linei='${commentKey}']:before {
                        ${cmComCommentMakePseudoCommentContentPropCss(comment)}
                        ${cmComCommentMakePseudoCommentContentAccentsCss(comment)}
                      }
                    `;

                  const linei = +commentKey.slice(0, lineWordPositionDigitsSeparationCount) - 1;
                  const wordi = +commentKey.slice(lineWordPositionDigitsSeparationCount) - 1;
                  const csss: (RuleSet<object> | false)[] = [];

                  comment = comment.replace(makeRegExp('/\\[([^\\n\\]]+)\\]/g'), (_all, content: string) => {
                    const leadChar = content[0];
                    content = content.slice(1);

                    switch (leadChar) {
                      case '^': {
                        const chords = content.split(makeRegExp('/ +/'));

                        for (let chordi = 0; chordi < chords.length; chordi++) {
                          if (chords[chordi] === '.') continue;

                          let chord = chords[chordi];
                          let contentCss = '';
                          const highlights = cmComCommentMakePseudoCommentContentAccentsCss(chord, null);

                          chord = cmComCommentMakeContentTextWithoutHighlightMarkers(chord);

                          if (chord !== '.' && chord !== '') {
                            const isPreAddition = chord[0] === '>';
                            const isPostAddition = chord[0] === '<';

                            if (isPreAddition || isPostAddition) chord = chord.slice(1);

                            contentCss = cmComCommentMakePseudoCommentContentPropCss(
                              chord,
                              isPreAddition ? 'attr(attr-chord)' : '',
                              isPostAddition ? 'attr(attr-chord)' : '',
                            );
                          }

                          csss.push(css`
                            > [attr-chordi='${chordi}']:not([com-letter-chorded='post']):before,
                            > [attr-chordi='${chordi}'][com-letter-chorded='post'] [word-fragment]:before,
                            > [attr-chordi='${chordi - 1}'][com-letter-chorded='pre'] [word-fragment]:before,
                            > [attr-chordi='${chordi - 1}'][com-letter-chorded='post']:after {
                              ${contentCss}${highlights}
                              text-decoration-line: underline;
                            }

                            > [attr-chordi='${chordi - 1}'][com-letter-chorded='pre'] [word-fragment]:after {
                              ${contentCss}
                            }

                            > [attr-chordi='${chordi}']:not([com-letter-chorded='post']) {
                              &[com-letter-spaced-word] {
                                text-align: right;
                                display: inline-block;
                              }

                              [word-fragment]:after {
                                ${contentCss}
                              }
                            }
                          `);
                        }

                        break;
                      }
                      case '<':
                      case '>': {
                        csss.push(css`
                          ${leadChar === '<' ? '&:before' : '&:after'} {
                            ${cmComCommentMakePseudoCommentContentPropCss(content + (leadChar === '<' ? '' : ' '))}
                            ${cmComCommentMakePseudoCommentContentAccentsCss(content, null)}
                          }
                        `);
                        break;
                      }
                    }

                    return '';
                  });

                  return css`
                    [solid-order-text-linei='${linei}'] [whole-wordi='${wordi}'] {
                      ${cmComCommentMakePseudoCommentContentAccentsCss(comment, null)}

                      ${csss}
                    }
                  `;
                })}
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
  }, [currentBibleTranslate, takeCommentTexts, translates, com, isSetHashesOnly, commentKindsBlock]);

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

const lineWordPositionDigitsSeparationCount = 3;
const numsSet = new Set('0123456789');
