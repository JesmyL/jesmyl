import { useToast } from './modal/useToast';

const className = 'opacity-50';

export const DisabledArea = <OnClick extends Function>(props: {
  isDisabled: boolean | nil;
  disabledReason?: React.ReactNode;
  children: (props: { className: string | und; onClick: OnClick | und }) => React.ReactNode;
  onClick: OnClick;
}) => {
  if (!props.isDisabled) return <>{props.children({ onClick: props.onClick, className: undefined })}</>;

  if (props.disabledReason)
    return (
      <WithReason
        {...props}
        disabledReason={props.disabledReason}
      />
    );

  return <>{props.children({ onClick: undefined, className })}</>;
};

const WithReason = <OnClick extends Function>(props: {
  onClick: OnClick;
  disabledReason: React.ReactNode;
  children: (props: { className: string | und; onClick: OnClick | und }) => React.ReactNode;
}) => {
  const toast = useToast();

  return (
    <>
      {props.children({
        onClick: (() => toast(props.disabledReason, { mood: 'ko' })) as never,
        className,
      })}
    </>
  );
};
