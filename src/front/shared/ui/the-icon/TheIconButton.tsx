import { Button } from '#shared/components/ui/button';
import { mylib } from '#shared/lib/my-lib';
import { ReactNode } from 'react';
import { toast } from 'sonner';
import { StameskaIconKind } from 'stameska-icon/utils';
import { twMerge } from 'tailwind-merge';
import { ConfirmContent, makeToastKOMoodConfig } from '../modal';

interface Props {
  icon: KnownStameskaIconName;
  kind?: StameskaIconKind;
  disabled?: boolean;
  withoutAnimation?: boolean;
  disabledReason?: (() => ReactNode) | ReactNode;
  confirm?: React.ReactNode;
  prefix?: ReactNode;
  postfix?: ReactNode;
  className?: string;
  iconClassName?: string;
  isLoading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLOrSVGElement, MouseEvent> | KeyboardEvent) => Promise<unknown> | unknown;
}

export const TheIconButton = (props: Props) => {
  return (
    <>
      <ConfirmContent
        confirm={props.confirm === true ? props.postfix || props.prefix : props.confirm}
        content={onConfirm => {
          return (
            <>
              <span
                className={twMerge(
                  'flex gap-2 flex-max',
                  props.className,
                  (!props.disabled && props.onClick) || props.disabledReason ? 'pointer' : null,
                  props.disabled && `disabled${props.disabledReason ? ' clickable' : ''}`,
                )}
                onClick={
                  props.onClick
                    ? async event => {
                        event.stopPropagation();
                        if (props.isLoading) return;

                        if (props.disabled) {
                          if (props.disabledReason) {
                            toast(
                              mylib.isFunc(props.disabledReason) ? props.disabledReason() : props.disabledReason,
                              makeToastKOMoodConfig(),
                            );
                          }
                          return;
                        }

                        if (await onConfirm()) props.onClick?.(event);
                      }
                    : undefined
                }
              >
                {props.prefix}
                <Button
                  icon={props.icon}
                  iconKind={props.kind}
                  isLoading={props.isLoading}
                  className={props.iconClassName}
                  withoutAnimation={props.withoutAnimation}
                />
                {props.postfix}
              </span>
            </>
          );
        }}
      />
    </>
  );
};
