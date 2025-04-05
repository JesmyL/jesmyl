import { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { ConfirmContent } from './modal/confirm/ConfirmContent';

const xColors = ['x2', 'x3', 'x5'];

type Props = {
  color?: (typeof xColors)[number];
};

export function TheButton({
  disabled,
  confirm,
  onClick,
  ...props
}: Props &
  HTMLAttributes<HTMLDivElement> & {
    disabled?: boolean;
    confirm?: boolean | string;
  }) {
  return (
    <ConfirmContent
      confirm={onClick !== undefined && (confirm === true ? props.children : confirm)}
      content={onConfirm => {
        return (
          <StyledButton
            {...props}
            className={`the-button pointer ${props.className || ''}${disabled ? ' disabled' : ''}`}
            onClick={async event => {
              if (onClick && (await onConfirm())) onClick(event);
            }}
          />
        );
      }}
    />
  );
}

const StyledButton = styled.div<Props>`
  display: inline-block;
  position: relative;
  border-radius: 2em;
  padding: 0.5em 2.2em;

  ${props =>
    props.color && xColors.includes(props.color)
      ? css`
          border: var(--color--${props.color[1]}) 4px solid;
        `
      : css`
          border: var(--color--2) 4px solid;
        `}
`;
