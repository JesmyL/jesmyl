import { mylib } from '#shared/lib/my-lib';
import { CmComOrderWid } from 'shared/api';
import { RuleSet, css } from 'styled-components';
import { cmComCommentHeaderHolderSelectors } from '../const/commentHolderSelectors';
import { CmComCommentTextDetectorChordRuleProps, CmComCommentTextDetectorRuleProps } from '../model/common';
import {
  cmComCommentAccentsColorList,
  cmComCommentMakePseudoCommentContentPropCss,
  cmComCommentMakePseudoElementCorrectContentText,
} from './makePseudoComment.props';
import { cmComCommentPseudoCommentStaticPropsCss } from './pseudoCommentStaticPropsCss';

export const cmComCommentDetectCommentTextStyles = (ordSelectorId: CmComOrderWid) => {
  const styles: RuleSet<object>[] = [];
  const lineWordStyleDict: PRecord<`${number}/${number}`, (RuleSet<object> | string | nil)[]> = {};
  const sidePlacedChordsOnWait: PRecord<
    `${number}:${number}/${number}`,
    PRecord<'<' | '^' | '>', CmComCommentTextDetectorChordRuleProps>
  > = {};

  return {
    styles: css`
      ::before,
      :after {
        color: var(--color-x3);
      }

      [solid-com-order-selector='${ordSelectorId}'] {
        ${() => {
          return mylib.values(sidePlacedChordsOnWait).map(chordProps => {
            const preProps = chordProps?.['<'];
            const replaceProps = chordProps?.['^'];
            const postProps = chordProps?.['>'];

            const props = preProps ?? replaceProps ?? postProps!;

            const wordRuleList = lineWordStyleDict[`${props.linei}/${props.wordi}`];
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
                text-decoration-line: underline;
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
          });
        }}

        ${
          // !after {sidePlacedChordsOnWait} map
          () => styles
        }
      }
    `,
    onDetect: (props: CmComCommentTextDetectorRuleProps) => {
      const accentColor = cmComCommentAccentsColorList[props.kind];

      if ('blocki' in props) {
        styles.push(css`
          .styled-header ${cmComCommentHeaderHolderSelectors[props.blocki] || '::after'} {
            ${cmComCommentPseudoCommentStaticPropsCss}
            ${cmComCommentMakePseudoCommentContentPropCss(props.text)}
            ${accentColor}
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
        styles.push(css`
          &:not(:has([solid-order-text-linei='${props.linei}'])):after,
          [solid-order-text-linei='${props.linei}']:before {
            ${cmComCommentMakePseudoCommentContentPropCss(props.text)}
            ${accentColor}
          }
        `);
      }
    },
  };
};
