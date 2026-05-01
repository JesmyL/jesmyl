import { mylib } from '#shared/lib/my-lib';
import { css, SerializedStyles } from '@emotion/react';
import { CmComCommentBlockSimpleSelector } from 'shared/api';
import {
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
import { cmComCommentHeaderHolderSelectors } from '../const/commentHolderSelectors';
import { cmComCommentPseudoCommentStaticPropsCss } from './pseudoCommentStaticPropsCss';

export const cmComCommentDetectCommentTextStyles = () => {
  const ordSelector2StylesDict: PRecord<CmComCommentBlockSimpleSelector, (() => SerializedStyles)[]> = {};
  const usedOrdSelectorSet = new Set<CmComCommentBlockSimpleSelector>();
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

            const wordRuleList = lineWordStyleDict[`s${selector}l${props.linei}w${props.wordi}`];
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
                ${contentTextCss}${cmComCommentAccentsColorList[replaceProps?.kind ?? 0]}
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

        return css`
          [ord-selector='${selector}'] {
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
      `;
    },
    onDetect: (props: CmComCommentTextDetectorRuleProps) => {
      const accentColor = cmComCommentAccentsColorList[props.kind];

      usedOrdSelectorSet.add(props.sel);
      const styles = (ordSelector2StylesDict[props.sel] ??= []);

      if ('blocki' in props) {
        styles.push(
          () => css`
            .styled-header ${cmComCommentHeaderHolderSelectors[props.blocki] || '::after'} {
              ${cmComCommentMakePseudoCommentContentPropCss(props.text)}
              ${accentColor}
            }
          `,
        );
      } else if ('wordi' in props) {
        const lineWordStyleKey = `s${props.sel}l${props.linei}w${props.wordi}` as const;

        if (lineWordStyleDict[lineWordStyleKey] == null) {
          lineWordStyleDict[lineWordStyleKey] = [];

          styles.push(
            () => css`
              [ord-linei='${props.linei}'] [line-wordi='${props.wordi}'] {
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
