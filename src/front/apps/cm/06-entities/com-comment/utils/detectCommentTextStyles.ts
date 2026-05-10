import { mylib } from '#shared/lib/my-lib';
import { css, SerializedStyles } from '@emotion/react';
import {
  CmComCommentConstructorPropsDictSelectorRulePropsKey,
  CmComCommentConstructorPropsDictWordRulePropsKey,
  CmComCommentTextDetectorChordRuleProps,
  CmComCommentTextDetectorRuleProps,
} from 'shared/model/cm/com-comment';
import { itInvokeIt } from 'shared/utils';
import {
  cmComCommentAccentsColorList,
  cmComCommentMakePseudoCommentContentPropCss,
  cmComCommentMakePseudoElementCorrectContentText,
} from 'shared/utils/cm';
import { PRecord } from 'tsjrpc/types/base.model';
import { cmComCommentHeaderHolderSelectors } from '../const/commentHolderSelectors';
import { cmComCommentExtractSelector } from '../lib/useCmComCommentBlock';
import { cmComCommentPseudoCommentStaticPropsCss } from './pseudoCommentStaticPropsCss';

export const cmComCommentDetectCommentTextStyles = () => {
  const ordSelector2StylesDict: PRecord<
    CmComCommentConstructorPropsDictSelectorRulePropsKey,
    (() => SerializedStyles)[]
  > = {};
  const ordKind2StylesDict: PRecord<CmComCommentConstructorPropsDictSelectorRulePropsKey, SerializedStyles> = {};
  const usedOrdSelectorSet = new Set<CmComCommentConstructorPropsDictSelectorRulePropsKey>();
  const lineWordStyleDict: PRecord<
    CmComCommentConstructorPropsDictWordRulePropsKey,
    (SerializedStyles | string | nil)[]
  > = {};
  const sidePlacedChordsOnWait: PRecord<
    `${number}:${number}/${number}`,
    PRecord<'<' | '^' | '>', CmComCommentTextDetectorChordRuleProps>
  > = {};

  return {
    styles: () => {
      const selectorsCssList = Array.from(usedOrdSelectorSet).map(selector => {
        const rules = css`
          ${mylib.values(sidePlacedChordsOnWait).map(chordProps => {
            const preProps = chordProps?.['<'];
            const replaceProps = chordProps?.['^'];
            const postProps = chordProps?.['>'];

            const props = preProps ?? replaceProps ?? postProps!;

            const wordRuleList = lineWordStyleDict[`${selector}l${props.linei}w${props.wordi}`];
            if (wordRuleList == null) return;

            const chordi = props.chordi;

            const preText = preProps?.text;
            const replaceText = replaceProps?.text;
            const postText = postProps?.text;

            let contentTextCss = '';

            if (preText) contentTextCss += cmComCommentMakePseudoElementCorrectContentText(preText);

            contentTextCss += replaceText
              ? cmComCommentMakePseudoElementCorrectContentText(replaceText)
              : 'attr(attr-chord)';

            if (postText) contentTextCss += cmComCommentMakePseudoElementCorrectContentText(postText);

            contentTextCss = contentTextCss && `content:${contentTextCss};`;

            wordRuleList.push(css`
              > [attr-chordi='${chordi}']:not([com-letter-chorded='post']):before,
              > [attr-chordi='${chordi}'][com-letter-chorded='post'] [word-fragment]:before,
              > [attr-chordi='${chordi - 1}'][com-letter-chorded='pre'] [word-fragment]:before,
              > [attr-chordi='${chordi - 1}'][com-letter-chorded='post']:after {
                ${contentTextCss}${cmComCommentAccentsColorList[replaceProps?.type ?? 0]}
                text-decoration: underline;
              }

              ${contentTextCss &&
              css`
                > [attr-chordi='${chordi - 1}'][com-letter-chorded='pre'] [word-fragment]:after {
                  ${contentTextCss}
                }
              `}

              > [attr-chordi='${chordi}']:not([com-letter-chorded='post']) {
                &[com-letter-spaced-word] {
                  text-align: right;
                  display: inline-block;
                }

                ${contentTextCss &&
                css`
                  [word-fragment]:after {
                    ${contentTextCss}
                  }
                `}
              }
            `);

            return null;
          })}
        `;

        const query = selector.startsWith('k')
          ? `[solid-block-kind='${selector}']`
          : `&.weight-add [ord-selector='${cmComCommentExtractSelector(selector)}']`;

        return css`
          ${query} {
            ${rules}
            ${ordSelector2StylesDict[selector]?.map(itInvokeIt)}
          }
        `;
      });

      return css`
        ::before,
        :after {
          color: var(--color-x3);
        }

        .comment-holder {
          &:after,
          &:before {
            ${cmComCommentPseudoCommentStaticPropsCss}
          }
        }

        ${selectorsCssList}
        ${mylib.values(ordKind2StylesDict)}
      `;
    },
    onDetect: (props: CmComCommentTextDetectorRuleProps) => {
      const accentColor = props.text ? (cmComCommentAccentsColorList[props.type] ?? 'color: currentColor;') : '';
      const isKind = props.pre.startsWith('k');

      usedOrdSelectorSet.add(props.pre);
      const styles = (ordSelector2StylesDict[props.pre] ??= []);

      if ('blocki' in props) {
        if (isKind) {
          ordKind2StylesDict[props.pre] ??= css`
            [solid-ord-selector][solid-block-kind='${props.pre}'] ${cmComCommentHeaderHolderSelectors[0]} {
              ${cmComCommentMakePseudoCommentContentPropCss(props.text)}
              ${accentColor}
            }
          `;
        } else {
          styles.push(
            () => css`
              .styled-header ${cmComCommentHeaderHolderSelectors[props.blocki + 1] || '::after'} {
                ${cmComCommentMakePseudoCommentContentPropCss(props.text)}
                ${accentColor}
              }
            `,
          );
        }
      } else if ('wordi' in props) {
        const lineWordStyleKey = `${props.pre}l${props.linei}w${props.wordi}` as const;

        if (lineWordStyleDict[lineWordStyleKey] == null) {
          lineWordStyleDict[lineWordStyleKey] = [];

          styles.push(
            () => css`
              [${isKind ? 'solid-' : ''}ord-linei='${props.linei}'] [line-wordi='${props.wordi}'] {
                ${lineWordStyleDict[lineWordStyleKey]}
              }
            `,
          );
        }

        if ('chordi' in props) {
          const key = `${props.linei}:${props.wordi}/${props.chordi}` as const;

          sidePlacedChordsOnWait[key] ??= {};
          sidePlacedChordsOnWait[key][props.place] ??= props;
        } else if (props.place !== '^') {
          lineWordStyleDict[lineWordStyleKey].push(css`
            ${props.place === '<' ? '&:before' : '&:after'} {
              ${cmComCommentMakePseudoCommentContentPropCss(props.text)}
              ${accentColor}
            }
          `);
        } else {
          lineWordStyleDict[lineWordStyleKey].push(accentColor);
        }
      } else if ('linei' in props) {
        styles.push(
          () => css`
            &:not(:has([ord-linei='${props.linei}'])):after,
            [ord-linei='${props.linei}']:before {
              ${cmComCommentMakePseudoCommentContentPropCss(props.text)}
              ${accentColor}
            }
          `,
        );
      }
    },
  };
};
