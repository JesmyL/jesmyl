import { IIncorrects } from 'shared/model/cm/Incorrects';
import styled, { css } from 'styled-components';

const classNamePostfix = '-correct-block';

export const TextCorrectMessages = ({ corrects }: { corrects: IIncorrects }) => {
  return (
    <>
      {corrects.errors?.map(({ message }, correcti) => {
        return (
          <StyledBox
            className={`error${classNamePostfix}`}
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
            className={`warning${classNamePostfix}`}
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
            className={`unknown${classNamePostfix}`}
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
