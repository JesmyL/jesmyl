import useSelectedComs from 'front/components/apps/cm/base/useSelectedComs';
import styled, { css } from 'styled-components';
import { CmComWid } from '../../../../../../../../shared/api/complect/apps/cm/complect/enums';
import { ComFaceListProps, currentComwIdPrefix } from './_ComList';
import { StyledComList } from './StyledComList';
import { useComListClickListener } from './useComListClickListener';

export const ComListPreviousSibling = (
  props: Pick<ComFaceListProps, 'importantOnClick' | 'list'> & {
    listRef: React.RefObject<HTMLDivElement>;
  },
) => {
  const { selectedComws, toggleSelectedCom } = useSelectedComs();

  useComListClickListener(props.listRef, props.importantOnClick, props.list, toggleSelectedCom);

  return <StyledComListPrevious $selectedComws={selectedComws} />;
};

const selectedComwMapper = (comw: CmComWid, comwi: number) => {
  return css`
    #${currentComwIdPrefix}${comw} .face-logo {
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
