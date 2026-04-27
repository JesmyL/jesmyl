import { bibleShowTranslatesAtom, useBibleTranslatesContext } from '$bible/ext';
import { cmComIsComMiniAnchorAtom } from '$cm/entities/index';
import { CmCom } from '$cm/ext';
import { makeStyleNode } from '$cm/shared/lib/makeStyleNode';
import { css, SerializedStyles } from '@emotion/react';
import { useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { CmComCommentBlockSimpleSelector, CmComCommentBlockSpecialSelector } from 'shared/api';
import { emptyFunc, itInvokeIt } from 'shared/utils';
import { CmComBlockKindKey } from 'shared/values/cm/block-kinds/BlockKind.model';
import { cmComCommentHeaderHolderSelectors } from '../const/commentHolderSelectors';
import { CmComCommentTextDetectorRuleProps } from '../model/common';
import { cmComCommentTextRulesDetector } from '../utils/cmComCommentTextRulesDetector';
import { cmComCommentDetectCommentTextStyles } from '../utils/detectCommentTextStyles';
import { cmComCommentMakeStartCommentCss } from '../utils/makeStartCommentCss';
import { cmComCommentPseudoCommentStaticPropsCss } from '../utils/pseudoCommentStaticPropsCss';
import {
  useCmComCommentBlock,
  useCmComCommentKindBlockTaker,
  useCmComCommentTextBlockTaker,
} from './useCmComCommentBlock';

export const useCmComCommentBlockCss = (
  com: CmCom,
  isSetHashesOnly = false,
  customPropsForOrder?: { selector: CmComCommentBlockSimpleSelector; propsList: CmComCommentTextDetectorRuleProps[] },
) => {
  const [styles, setStyles] = useState<
    Partial<{
      commentCssNode: React.ReactNode;
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

      let cssContentList;

      if (customPropsForOrder) {
        const { onDetect, styles } = cmComCommentDetectCommentTextStyles(customPropsForOrder.selector);

        customPropsForOrder.propsList.forEach(onDetect);

        cssContentList = [styles];
      } else {
        cssContentList = isSetHashesOnly
          ? null
          : (visibleOrders?.map((ord): (() => string | SerializedStyles) => {
              if (ord == null) return () => '';
              const ordSelectorId = ord.makeSelector();

              let commentLines = takeCommentTexts(ordSelectorId);
              const kindComment = ord.kind && commentKindsBlock?.[Math.abs(ord.kind) as CmComBlockKindKey];

              if (!commentLines?.length && !kindComment) return () => '';

              commentLines ??= [];
              if (kindComment) commentLines = [kindComment].concat(commentLines);

              const { onDetect, styles } = cmComCommentDetectCommentTextStyles(ordSelectorId);

              cmComCommentTextRulesDetector(false, commentLines, onDetect);

              return styles;
            }) ?? []);
      }

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
            makeCommentWithTextCss,
            makeCommentWithTextLinksOnlyCss,
          } = await cmComCommentMakeStartCommentCss(currentBibleTranslate, line, translates);

          isThereUnsettedTranslate ||= isUnset;
          isThereCorrectBibleText ||= isWithText;
          const selector = `> ${cmComCommentHeaderHolderSelectors[linei + 1]}`;

          return css`
            ${selector} {
              ${accentsCss}
            }

            &.expand-first-comment-bible-texts ${selector} {
              ${makeCommentWithTextCss()}
            }

            &:not(.expand-first-comment-bible-texts) ${selector} {
              ${makeCommentWithTextLinksOnlyCss()}
            }
          `;
        }),
      );

      const styleCss = css`
        --comment-opacity: 0.6;
        --comment-margin-left: 1rem;

        ${headCommentContents}

        .styled-header {
          &::after,
          > ::after,
          > ::before,
          &::before {
            text-decoration: none;
          }

          &::before {
            opacity: var(--comment-opacity);
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

        ${cssContentList?.map(itInvokeIt)}
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
      `;

      return {
        isThereUnsettedTranslate,
        isThereCorrectBibleText,
        commentCssNode: makeStyleNode(css`
          .com-orders-with-comments {
            ${styleCss}
          }
        `),
      };
    })()
      .then(setStyles)
      .catch(emptyFunc);
  }, [
    currentBibleTranslate,
    takeCommentTexts,
    translates,
    com,
    isSetHashesOnly,
    commentKindsBlock,
    customPropsForOrder,
  ]);

  return useAtomValue(cmComIsComMiniAnchorAtom) ? {} : styles;
};
