import { PhaseContainerConfigurer } from '#shared/ui/phase-container/PhaseContainerConfigurer';
import { PhaseContainerProps } from '#shared/ui/phase-container/PhaseContainerConfigurer.model';
import styled from 'styled-components';

export function PhaseCmEditorContainer(props: PhaseContainerProps) {
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
