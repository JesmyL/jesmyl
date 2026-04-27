import { useCmComSelectedList } from '$cm/entities/com';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { memo } from 'react';
import { CmComWid } from 'shared/api';
import { cmComFaceCurrentComwIdPrefix } from '../const/ids';
import { StyledCmComFaceList } from '../style/StyledComList';

export const CmComFaceListPreviousSibling = memo(() => {
  const { selectedComws } = useCmComSelectedList();

  return <CmComFaceStyledListPrevious $selectedComws={selectedComws} />;
});

const selectedComwMapper = (comw: CmComWid, comwi: number) => {
  return css`
    #${cmComFaceCurrentComwIdPrefix}${comw} .face-logo {
      border-color: var(--color--3);

      &::after {
        content: '${comwi + 1}';
      }
    }
  `;
};

export const CmComFaceStyledListPrevious = styled.div<{ $selectedComws: CmComWid[] }>`
  display: none;

  + ${StyledCmComFaceList} {
    ${props => props.$selectedComws.map(selectedComwMapper)}
  }
`;
