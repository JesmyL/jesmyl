import { useToast } from '#shared/ui/modal/useToast';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { StameskaIconName } from 'stameska-icon';
import { SendButtonContentMaker } from '../send-button-content-maker/maker';
import { SendButtonContentMakerProps } from '../send-button-content-maker/maker.model';

interface Props<Value> extends SendButtonContentMakerProps<Value> {
  icon: StameskaIconName;
  className?: string;
  prefix?: null | React.ReactNode;
  postfix?: null | React.ReactNode;
  disabledReason?: string;
  withoutAnimation?: boolean;
}

export function TheIconSendButton<Value>({ className = '', ...props }: Props<Value>) {
  const toast = useToast();

  return (
    <SendButtonContentMaker
      {...props}
      onFailure={error => {
        props.onFailure?.(error);
        toast(error, { mood: 'ko' });
      }}
      content={(onClick, error, isLoading) => {
        return (
          <TheIconButton
            isLoading={isLoading}
            className={className + (error ? ' color--ko ' : '')}
            onClick={props.disabled ? undefined : onClick}
            icon={props.icon}
            disabled={props.disabled}
            disabledReason={props.disabledReason}
            postfix={props.postfix}
            prefix={props.prefix}
            withoutAnimation={props.withoutAnimation}
          />
        );
      }}
    />
  );
}
