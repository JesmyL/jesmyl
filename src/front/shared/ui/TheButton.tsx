import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { ConfirmContent } from './modal/confirm/ConfirmContent';

export function TheButton({
  disabled,
  confirm,
  onClick,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  disabled?: boolean;
  confirm?: boolean | string;
}) {
  return (
    <ConfirmContent
      confirm={onClick !== undefined && (confirm === true ? props.children : confirm)}
      content={onConfirm => {
        return (
          <Button
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

const Button = styled.div`
  display: inline-block;
  position: relative;
  border: var(--color--2) 4px solid;
  border-radius: 2em;
  padding: 0.5em 2.2em;
`;
