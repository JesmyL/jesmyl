import { bibleShowTranslatesAtom, useBibleTranslatesContext } from '$bible/ext';
import { useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { makeRegExp } from 'regexpert';
import { CmComWid } from 'shared/api';
import { emptyFunc } from 'shared/utils';
import { RuleSet, css } from 'styled-components';
import { StyledCmComOrderLine } from '../../com-order-line/style/StyledComLine.styler';
import { CmComOrder } from '../../com-order/lib/Order';
import { cmComCommentAltKeyAtom } from '../state/atoms';
import { CmComCommentMakerCleans } from './Cleans';
import { useCmComCommentBlock } from './useCmComCommentBlock';

export const useCmComCommentBlockCssStyles = (
  comw: CmComWid,
  visibleOrders: CmComOrder[] | und,
  isSetHashesOnly = false,
) => {
  const altCommentKey = useAtomValue(cmComCommentAltKeyAtom);
  const [styles, setStyles] = useState<
    Partial<{
      commentCss: RuleSet<object> | '';
      isThereUnsettedTranslate: boolean;
    }>
  >({});
  const translates = useBibleTranslatesContext();
  const { takeCommentTexts } = useCmComCommentBlock(comw);
  const currentBibleTranslate = useAtomValue(bibleShowTranslatesAtom)[0];

  useEffect(() => {
    (async () => {
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

      const headCommentContents = await Promise.all(
        (takeCommentTexts('head') ?? []).map(async (line, linei) => {
          const { startCommentCss, isThereUnsettedTranslate: isUnset } =
            await CmComCommentMakerCleans.makeStartCommentCss(currentBibleTranslate, line, translates);

          isThereUnsettedTranslate ||= isUnset;

          return css`
            ${`.com-orders-with-comments > ${commentHolderSelectors[linei + 1]}`} {
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

          ${altCommentKey &&
          css`
            .com-orders-with-comments > .alt-key-holder::before {
              ${CmComCommentMakerCleans.makePseudoCommentContentCss(`${altCommentKey.toUpperCase()}\n`)}
            }
          `}

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
  }, [altCommentKey, currentBibleTranslate, takeCommentTexts, translates, visibleOrders, isSetHashesOnly]);

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
