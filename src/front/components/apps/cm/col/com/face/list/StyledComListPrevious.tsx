import { useSelectedComs } from '@cm/basis/lib/hooks/useSelectedComs';
import styled from 'styled-components';
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

const selectedComwMapper = (comw: CmComWid) => `#${currentComwIdPrefix}${comw}`;

export const StyledComListPrevious = styled.div<{
  $selectedComws: CmComWid[];
}>`
  display: none;

  + ${StyledComList} :is(${props => props.$selectedComws.map(selectedComwMapper).join(',')}) .face-logo {
    border-color: var(--color--3);
  }
`;
