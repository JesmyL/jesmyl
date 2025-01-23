import styled from 'styled-components';
import PhaseContainerConfigurer from '../../../../../complect/phase-container/PhaseContainerConfigurer';
import { PhaseContainerProps } from '../../../../../complect/phase-container/PhaseContainerConfigurer.model';

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
