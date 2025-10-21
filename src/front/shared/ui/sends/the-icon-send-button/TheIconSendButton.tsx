import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { toast } from 'sonner';
import { SendButtonContentMaker } from '../send-button-content-maker/maker';
import { SendButtonContentMakerProps } from '../send-button-content-maker/maker.model';

interface Props<Value> extends SendButtonContentMakerProps<Value> {
  icon: KnownStameskaIconName;
  className?: string;
  prefix?: null | React.ReactNode;
  postfix?: null | React.ReactNode;
  disabledReason?: string;
  withoutAnimation?: boolean;
}

export function TheIconSendButton<Value>({ className = '', ...props }: Props<Value>) {
  return (
    <SendButtonContentMaker
      {...props}
      onFailure={error => {
        props.onFailure?.(error);
        toast(error, makeToastKOMoodConfig());
      }}
      content={(onClick, error, isLoading) => {
        return (
          <TheIconButton
            isLoading={isLoading}
            className={className + (error ? ' text-xKO ' : '')}
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
