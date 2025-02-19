import { PageContainer } from '#shared/ui/PageContainer';
import styled from 'styled-components';
import { PhaseContainerProps } from '../../../../../shared/ui/PageContainer/model';

export function PhaseCmEditorContainer(props: PhaseContainerProps) {
  return (
    <StyledContainer
      {...props}
      className={`phase-cm-editor-container ${props.className || ''}`}
    />
  );
}

const StyledContainer = styled(PageContainer)`
  .composition-block {
    &.invisible {
      *,
      ::after,
      ::before {
        text-decoration: line-through;
      }
    }
  }
`;
