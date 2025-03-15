import { useSelectedComs } from '$cm/base/useSelectedComs';
import { memo } from 'react';
import { CmComWid } from 'shared/api';
import styled, { css } from 'styled-components';
import { cmCurrentComwIdPrefix } from '../lib/consts';
import { StyledComList } from './StyledComList';

export const ComListPreviousSibling = memo(() => {
  const { selectedComws } = useSelectedComs();

  return <StyledComListPrevious $selectedComws={selectedComws} />;
});

const selectedComwMapper = (comw: CmComWid, comwi: number) => {
  return css`
    #${cmCurrentComwIdPrefix}${comw} .face-logo {
      border-color: var(--color--3);

      &::after {
        content: '${comwi + 1}';
      }
    }
  `;
};

export const StyledComListPrevious = styled.div<{ $selectedComws: CmComWid[] }>`
  display: none;

  + ${StyledComList} {
    ${props => props.$selectedComws.map(selectedComwMapper)}
  }
`;
