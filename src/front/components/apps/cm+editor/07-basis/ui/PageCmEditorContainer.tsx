import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { PageContainerProps } from '#shared/ui/phase-container/PageContainerConfigurer.model';
import styled from 'styled-components';

export const PageCmEditorContainer = (props: PageContainerProps) => {
  return (
    <StyledContainer
      {...props}
      className={`phase-cm-editor-container ${props.className || ''}`}
    />
  );
};

const StyledContainer = styled(PageContainerConfigurer)`
  .composition-block {
    &.ord-invisible {
      *,
      ::after,
      ::before {
        text-decoration: line-through;
        opacity: 0.7;
      }
    }
  }
`;
