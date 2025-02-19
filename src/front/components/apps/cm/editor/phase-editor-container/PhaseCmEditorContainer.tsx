import { PhaseContainerConfigurer } from 'front/complect/phase-container/PhaseContainerConfigurer';
import styled from 'styled-components';
import { PhaseContainerProps } from '../../../../../complect/phase-container/PhaseContainerConfigurer.model';

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
