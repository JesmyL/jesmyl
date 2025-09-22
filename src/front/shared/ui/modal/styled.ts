import styled from 'styled-components';

export const StyledModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

export const StyledModalBody = styled.div`
  max-height: 80vh;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const StyledModalHeader = styled.div`
  margin: 10px 0;
`;

export const StyledModalScreen = styled.div`
  --icon-color: var(--color--3);
  display: inline-block;

  position: absolute;
  border-radius: 5px;
  background-color: var(--color--2);
  padding: 0.5rem 1rem;
  max-width: calc(100vw - 50px);
  max-height: 95vh;
  overflow: hidden;
  color: var(--color--3);
  white-space: pre-wrap;
  word-break: break-word;

  &:not(.type_toast) {
    display: flex;
    flex-direction: column;
    min-height: max-content;
  }

  &.mood.mood_ {
    &ko {
      --icon-color: var(--color--3);
      background-color: var(--color--ko);
      color: var(--color--3);
    }
  }

  &.type_ {
    &toast {
      bottom: 0;
      max-height: 30vh;
    }

    &screen {
      width: 400px;
      min-width: 20vw;
    }
  }
`;

export const StyledModalScreenWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;

  &.type_ {
    &toast {
      bottom: 5rem;
    }

    &screen {
      align-items: center;
    }
  }
`;
