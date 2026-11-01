import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { ConfirmContent } from './modal';

const xColorBorders = {
  x2: 'border-x2',
  x3: 'border-x3',
  x5: 'border-x5',
};

type Props = {
  color?: keyof typeof xColorBorders;
};

export function TheButton({
  disabled,
  confirm,
  onClick,
  color,
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
          <div
            {...props}
            className={twMerge(
              'the-button pointer inline-block relative rounded-[2em] px-[2.2em] py-[0.5em] border-4',
              xColorBorders[color ?? 'x2'],
              props.className,
              disabled && 'disabled',
            )}
            onClick={async event => {
              if (onClick && (await onConfirm())) onClick(event);
            }}
          />
        );
      }}
    />
  );
}
