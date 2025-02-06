import IconButton from 'front/complect/the-icon/IconButton';
import { TheIconType } from 'front/complect/the-icon/model';
import useToast from '../../modal/useToast';
import { SendButtonContentMaker } from '../send-button-content-maker/maker';
import { SendButtonContentMakerProps } from '../send-button-content-maker/maker.model';

interface Props<Value> extends SendButtonContentMakerProps<Value> {
  Icon: TheIconType;
  className?: string;
  prefix?: null | React.ReactNode;
  postfix?: null | React.ReactNode;
  disabledReason?: string;
}

export default function EvaSendButton<Value>(props: Props<Value>) {
  const [toastNode, toast] = useToast();

  return (
    <SendButtonContentMaker
      {...props}
      anchorNodes={<>{toastNode}</>}
      onFailure={error => {
        props.onFailure?.(error);
        toast(error, { mood: 'ko' });
      }}
      content={(onClick, error, isLoading) => {
        const sysClassName = error ? ' color--ko ' : '';

        return props.prefix === undefined && props.postfix === undefined ? (
          <IconButton
            isLoading={isLoading}
            className={sysClassName + (props.className || '')}
            onClick={props.disabled ? undefined : onClick}
            Icon={props.Icon}
            disabled={props.disabled}
            disabledReason={props.disabledReason}
          />
        ) : (
          <span
            className={'flex flex-gap ' + (sysClassName || 'flex-max ') + (props.className || '')}
            onClick={props.disabled ? undefined : onClick}
          >
            {props.prefix}
            <IconButton
              isLoading={isLoading}
              className={sysClassName}
              Icon={props.Icon}
              disabled={props.disabled}
              disabledReason={props.disabledReason}
            />
            {props.postfix}
          </span>
        );
      }}
    />
  );
}
