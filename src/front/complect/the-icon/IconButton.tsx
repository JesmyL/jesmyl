import { HTMLAttributes, ReactNode, useState } from 'react';
import { ConfirmContent } from '../modal/confirm/ConfirmContent';
import useToast from '../modal/useToast';
import { mylib } from '../my-lib';
import { StyledLoadingSpinner } from './IconLoading';
import { LazyIcon } from './LazyIcon';

interface Props {
  icon: TheIconKnownName;
  disabled?: boolean;
  disabledReason?: (() => ReactNode) | ReactNode;
  confirm?: React.ReactNode;
  prefix?: ReactNode;
  postfix?: ReactNode;
  className?: string;
  iconClassName?: string;
  isLoading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLOrSVGElement, MouseEvent> | KeyboardEvent) => Promise<unknown> | unknown;
}

const IconButton = <P extends Props = Props>(
  props: (P['prefix'] extends nil
    ? P['postfix'] extends nil
      ? OmitOwn<HTMLAttributes<HTMLOrSVGElement>, 'prefix'>
      : OmitOwn<HTMLAttributes<HTMLSpanElement>, 'prefix'>
    : OmitOwn<HTMLAttributes<HTMLSpanElement>, 'prefix'>) &
    P,
) => {
  const className =
    `${props.className || ''}${(!props.disabled && props.onClick) || props.disabledReason ? ' pointer' : ''}` +
    `${props.disabled ? ' disabled' + (props.disabledReason ? ' clickable' : '') : ''}`;
  const [isLoading, setIsLoading] = useState(false);
  const [toastNode, toast] = useToast();

  return (
    <>
      {toastNode}
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

                        if (props.disabled) {
                          if (props.disabledReason) {
                            toast(mylib.isFunc(props.disabledReason) ? props.disabledReason() : props.disabledReason, {
                              mood: 'ko',
                            });
                          }
                          return;
                        }

                        if (await onConfirm()) {
                          setIsLoading(true);
                          await props.onClick?.(event);
                          setIsLoading(false);
                        }
                      }
                    : undefined
                }
              >
                {props.prefix}
                {props.isLoading || isLoading ? (
                  <StyledLoadingSpinner icon="Loading03" />
                ) : (
                  <LazyIcon icon={props.icon} />
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

export default IconButton;
