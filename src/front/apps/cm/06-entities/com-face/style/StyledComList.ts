import { MyLib } from '#shared/lib/my-lib';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { CmComWid } from 'shared/api';
import { cmComCommentMakePseudoCommentContentPropCss } from 'shared/utils/cm';
import { cmComFaceCurrentComwIdPrefix } from '../const/ids';

export const StyledCmComFaceList = styled.div<{
  $ccomw: CmComWid | NaN | nil;
  $accentComw: number | nil;
  $comTitles: Record<number, string> | und;
}>`
  * {
    transition: opacity 0.4s;
  }

  ${props => {
    if (props.$comTitles == null) return;

    return MyLib.entries(props.$comTitles).map(([index, title]) => {
      return css`
        .face-item:nth-of-type(${+index + 1}) {
          margin-top: 2em;

          &:before {
            ${cmComCommentMakePseudoCommentContentPropCss(title)}
            position: absolute;
            display: block;
            top: -1.5em;
            width: 100%;
            text-align: center;
            color: var(--color--7);
          }
        }
      `;
    });
  }}

  ${props => css`
    #${cmComFaceCurrentComwIdPrefix}${props.$ccomw} {
      font-weight: bold;
    }
  `}
  
    ${props => {
    return props.$accentComw
      ? css`
          > :not(#${cmComFaceCurrentComwIdPrefix}${props.$accentComw}) {
            opacity: 0.4;
          }
        `
      : null;
  }}
`;
