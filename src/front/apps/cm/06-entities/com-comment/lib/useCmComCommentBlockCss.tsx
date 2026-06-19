import { bibleShowTranslatesAtom, useBibleTranslatesContext } from '$bible/ext';
import { cmComIsComMiniAnchorAtom } from '$cm/entities/index';
import { makeStyleNode } from '$cm/shared/lib/makeStyleNode';
import { css, SerializedStyles } from '@emotion/react';
import { useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { CmComCommentBlockSpecialSelector } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { CmComOrder } from 'shared/const/cm/order/Order';
import { CmComCommentTextDetectorRuleProps } from 'shared/model/cm/com-comment';
import { itInvokeIt } from 'shared/utils';
import { cmComCommentTextRulesDetector } from 'shared/utils/cm';
import { CmComBlockKindKey } from 'shared/values/cm/block-kinds/BlockKind.model';
import { cmComOrderPlusKindSet } from 'shared/values/cm/block-kinds/kind-sets';
import { cmComCommentHeaderHolderSelectors } from '../const/commentHolderSelectors';
import { cmComCommentDetectCommentTextStyles } from '../utils/detectCommentTextStyles';
import { cmComCommentMakeStartCommentCss } from '../utils/makeStartCommentCss';
import { cmComCommentPseudoCommentStaticPropsCss } from '../utils/pseudoCommentStaticPropsCss';
import {
  cmComCommentExtractSelector,
  takeCmComCommentKindBlockDict,
  useCmComCommentBlock,
  useCmComCommentTextBlockTaker,
} from './useCmComCommentBlock';

export const useCmComCommentBlockCss = (
  com: CmCom,
  isSetHashesOnly = false,
  customPropsForOrder?: CmComCommentTextDetectorRuleProps[],
  delay = 10,
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
  const commentKindsBlock = takeCmComCommentKindBlockDict(com.wid, localCommentBlock, commentBlock);
  const currentBibleTranslate = useAtomValue(bibleShowTranslatesAtom)[0];

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        const visibleOrders = com.visibleOrders();

        let cssContentList;

        if (customPropsForOrder) {
          const { onDetect, styles } = cmComCommentDetectCommentTextStyles();

          customPropsForOrder.forEach(onDetect);

          cssContentList = [styles];
        } else {
          const ordKindsWasSettedSet = new Set<CmComBlockKindKey | nil>();

          cssContentList = isSetHashesOnly
            ? null
            : (visibleOrders?.map((ord): (() => string | SerializedStyles) => {
                const { onDetect, styles } = cmComCommentDetectCommentTextStyles();
                let currentOrd: CmComOrder | nil = ord;

                do {
                  const ord = currentOrd;
                  currentOrd = currentOrd.me.next;

                  if (ord == null) break;

                  const commentLines = takeCommentTexts(ord.wid);
                  if (commentLines?.length) cmComCommentTextRulesDetector(false, `s${ord.wid}`, commentLines, onDetect);

                  if (!ordKindsWasSettedSet.has(ord.kind)) {
                    ordKindsWasSettedSet.add(ord.kind);
                    const kindComment = ord.kind && commentKindsBlock?.[cmComCommentExtractSelector(ord.kind)];

                    if (kindComment) cmComCommentTextRulesDetector(false, `k${ord.kind}`, [kindComment], onDetect);
                  }
                } while (currentOrd?.kind && cmComOrderPlusKindSet.has(currentOrd.kind));

                return styles;
              }) ?? []);
        }

        const numeredOrderHeaders = visibleOrders?.map(
          (ord, ordi) => css`
            [ord-selector='${ord.wid}'] .styled-header::before {
              content: '#${ordi + 1}';
            }
          `,
        );
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

          [ord-selector] {
            &:after,
            [ord-linei]:before {
              ${cmComCommentPseudoCommentStaticPropsCss}
            }

            [ord-linei]:before {
              margin-left: var(--comment-margin-left);
            }

            &:after {
              margin-left: calc(var(--comment-margin-left) * 2);
            }
          }
        `;

        setStyles({
          isThereUnsettedTranslate,
          isThereCorrectBibleText,
          commentCssNode: makeStyleNode(css`
            .com-orders-with-comments {
              ${styleCss}
            }
          `),
        });
      } catch {
        //
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [
    currentBibleTranslate,
    takeCommentTexts,
    translates,
    com,
    isSetHashesOnly,
    commentKindsBlock,
    customPropsForOrder,
    delay,
  ]);

  return useAtomValue(cmComIsComMiniAnchorAtom) ? {} : styles;
};
