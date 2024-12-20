import { MyLib } from 'front/utils';
import styled, { css } from 'styled-components';
import { CmComWid } from '../../../../../../../../shared/api/complect/apps/cm/complect/enums';
import { makePseudoElementCorrectContentText } from '../../../../../../../complect/utils';
import { currentComwIdPrefix } from './_ComList';

export const StyledComList = styled.div<{
  $ccomw: CmComWid | NaN | nil;
  $accentComw: number | nil;
  $isPutCcomFaceOff: boolean | nil;
  $comTitles: Record<number, string> | und;
}>`
  * {
    transition: opacity 0.4s;
  }

  ${props => {
    if (props.$comTitles == null) return;

    return MyLib.entries(props.$comTitles).map(([index, title]) => {
      return css`
        .face-item:nth-child(${+index + 1}) {
          margin-top: 2em;

          &:before {
            content: '${makePseudoElementCorrectContentText(title)}';
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

  ${props =>
    !props.$isPutCcomFaceOff &&
    css`
      #${currentComwIdPrefix}${props.$ccomw} {
        font-weight: bold;
      }
    `}
  
    ${props => {
    return css`
      ${props.$accentComw
        ? css`
            > :not(#${currentComwIdPrefix}${props.$accentComw}) {
              opacity: 0.4;
            }
          `
        : ''}
    `;
  }}
`;
