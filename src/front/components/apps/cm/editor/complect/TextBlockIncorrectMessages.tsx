import styled, { css } from 'styled-components';
import { CorrectsBox } from '../corrects-box/CorrectsBox';

export const TextCorrectMessages = ({ corrects }: { corrects: CorrectsBox }) => {
  return (
    <>
      {corrects.errors?.map(({ message }, correcti) => {
        return (
          <StyledBox
            key={correcti}
            $isError
          >
            {message}
          </StyledBox>
        );
      })}
      {corrects.warnings?.map(({ message }, correcti) => {
        return (
          <StyledBox
            key={correcti}
            $isWarning
          >
            {message}
          </StyledBox>
        );
      })}
      {corrects.unknowns?.map(({ message }, correcti) => {
        return (
          <StyledBox
            key={correcti}
            $isUnknown
          >
            {message}
          </StyledBox>
        );
      })}
    </>
  );
};

const StyledBox = styled.div<{ $isError?: boolean; $isWarning?: boolean; $isUnknown?: boolean }>`
  margin: 15px 0;
  border-radius: 10px;
  padding: 10px;
  white-space: pre-line;

  ${props =>
    props.$isError &&
    css`
      background-color: rgba(255, 0, 0, 0.3);
      color: red;
    `}

  ${props =>
    props.$isWarning &&
    css`
      background-color: rgba(255, 165, 0, 0.3);
      color: orange;
    `}

    ${props =>
    props.$isUnknown &&
    css`
      background-color: rgba(0, 255, 255, 0.3);
      color: cadetblue;
    `}
`;
