import styled from 'styled-components';
import PhaseContainerConfigurer from '../../../../../07-shared/ui/phase-container/PhaseContainerConfigurer';
import { PhaseContainerProps } from '../../../../../07-shared/ui/phase-container/PhaseContainerConfigurer.model';

export default function PhaseCmEditorContainer(props: PhaseContainerProps) {
  return (
    <StyledContainer
      {...props}
      className={`phase-cm-editor-container ${props.className || ''}`}
    />
  );
}

const StyledContainer = styled(PhaseContainerConfigurer)`
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
