import { mylib } from '#shared/lib/my-lib';
import { ReactNode } from 'react';
import { ConfirmContent } from '../modal/confirm/ConfirmContent';
import { useToast } from '../modal/useToast';
import { TheIconLoading } from './IconLoading';
import { LazyIcon } from './LazyIcon';

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
  const className =
    `${props.className || ''}${(!props.disabled && props.onClick) || props.disabledReason ? ' pointer' : ''}` +
    `${props.disabled ? ' disabled' + (props.disabledReason ? ' clickable' : '') : ''}`;
  const toast = useToast();

  return (
    <>
      <ConfirmContent
        confirm={props.confirm === true ? props.postfix || props.prefix : props.confirm}
        content={onConfirm => {
          return (
            <>
              <span
                className={`flex flex-gap flex-max ${className || ''}`}
                onClick={
                  props.onClick
                    ? async event => {
                        event.stopPropagation();
                        if (props.isLoading) return;

                        if (props.disabled) {
                          if (props.disabledReason) {
                            toast(mylib.isFunc(props.disabledReason) ? props.disabledReason() : props.disabledReason, {
                              mood: 'ko',
                            });
                          }
                          return;
                        }

                        if (await onConfirm()) props.onClick?.(event);
                      }
                    : undefined
                }
              >
                {props.prefix}
                {props.isLoading ? (
                  <TheIconLoading className={props.iconClassName} />
                ) : (
                  <LazyIcon
                    icon={props.icon}
                    kind={props.kind}
                    className={props.iconClassName}
                    withoutAnimation={props.withoutAnimation}
                  />
                )}
                {props.postfix}
              </span>
            </>
          );
        }}
      />
    </>
  );
};
