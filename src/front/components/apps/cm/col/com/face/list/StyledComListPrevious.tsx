import { useSelectedComs } from '@cm/base/useSelectedComs';
import { CmComWid } from 'shared/api';
import styled, { css } from 'styled-components';
import { cmCurrentComwIdPrefix } from '../lib/consts';
import { ComFaceListProps } from './_ComList';
import { StyledComList } from './StyledComList';
import { useComListClickListener } from './useComListClickListener';

export const ComListPreviousSibling = (
  props: Pick<ComFaceListProps, 'importantOnClick' | 'list'> & {
    listRef: React.RefObject<HTMLDivElement | null>;
  },
) => {
  const { selectedComws, toggleSelectedCom } = useSelectedComs();

  useComListClickListener(props.listRef, props.importantOnClick, props.list, toggleSelectedCom);

  return <StyledComListPrevious $selectedComws={selectedComws} />;
};
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

export const StyledComListPrevious = styled.div<{
  $selectedComws: CmComWid[];
}>`
  display: none;

  + ${StyledComList} {
    ${props => props.$selectedComws.map(selectedComwMapper)}
  }
`;
