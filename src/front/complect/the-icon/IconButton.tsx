import { FunctionComponent, HTMLAttributes, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { ConfirmContent } from '../modal/confirm/ConfirmContent';
import useToast from '../modal/useToast';
import { mylib } from '../my-lib';
import { StyledLoadingSpinner } from './IconLoading';
import { TheIconType } from './model';

interface Props {
  Icon: TheIconType;
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
  const isClickable = !props.disabled && props.onClick ? true : undefined;
  const className =
    `${props.className || ''}${isClickable || props.disabledReason ? ' pointer' : ''}` +
    `${props.disabled ? ' disabled' + (props.disabledReason ? ' clickable' : '') : ''}`;
  const [isLoading, setIsLoading] = useState(false);

  const Icon = props.isLoading || isLoading ? StyledLoadingSpinner : props.Icon;

  return (
    <ConfirmContent
      confirm={props.confirm}
      content={onConfirm => {
        const onClick =
          props.onClick &&
          (async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
            event.stopPropagation();
            if (await onConfirm()) {
              setIsLoading(true);
              await props.onClick!(event);
              setIsLoading(false);
            }
          });

        return (
          <>
            {props.prefix === undefined && props.postfix === undefined ? (
              <DisabledReasonContained
                Comp={Icon}
                className={className}
                disabledReason={props.disabledReason}
                disabled={props.disabled}
                onClick={onClick}
              />
            ) : (
              <DisabledReasonContained
                Comp={Span}
                className={`flex flex-gap flex-max ${className || ''}`}
                disabledReason={props.disabledReason}
                disabled={props.disabled}
                onClick={onClick}
              >
                {props.prefix}
                <Icon className={props.iconClassName} />
                {props.postfix}
              </DisabledReasonContained>
            )}
          </>
        );
      }}
    />
  );
};

const Span = styled.span``;

const DisabledReasonContained = <Node extends HTMLElement>({
  Comp,
  disabledReason,
  disabled,
  ...props
}: {
  Comp: FunctionComponent<HTMLAttributes<Node>>;
  disabledReason?: (() => ReactNode) | ReactNode | und;
  disabled: boolean | und;
} & HTMLAttributes<Node>) => {
  return disabled && disabledReason ? (
    <WithDisabledReason
      Comp={Comp}
      disabledReason={disabledReason}
      disabled
      {...props}
    />
  ) : (
    <Comp {...props} />
  );
};

const WithDisabledReason = <Node extends HTMLElement>({
  Comp,
  disabledReason,
  disabled,
  ...props
}: {
  Comp: FunctionComponent<HTMLAttributes<Node>>;
  disabledReason?: (() => ReactNode) | ReactNode;
  disabled: boolean | und;
} & HTMLAttributes<Node>) => {
  const [toastNode, toast] = useToast();

  return (
    <>
      {toastNode}
      <Comp
        {...props}
        onClick={() => toast(mylib.isFunc(disabledReason) ? disabledReason() : disabledReason, { mood: 'ko' })}
      />
    </>
  );
};

export default IconButton;
