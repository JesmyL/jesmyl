import useToast from '../../modal/useToast';
import { TheIconLoading } from '../../the-icon/IconLoading';
import { SendButtonContentMaker } from '../send-button-content-maker/maker';
import { EvaSendButtonProps } from './EvaSendButton.model';

export default function EvaSendButton<Value>(props: EvaSendButtonProps<Value>) {
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
        const sysClassName = (props.disabled ? ' disabled ' : ' pointer ') + (error ? ' color--ko ' : '');

        return props.prefix === undefined && props.postfix === undefined ? (
          <TheIconLoading
            isLoading={isLoading}
            className={sysClassName + (props.className || '')}
            onClick={onClick}
            Icon={props.Icon}
          />
        ) : (
          <span
            className={'flex flex-gap ' + (sysClassName || 'flex-max ') + (props.className || '')}
            onClick={onClick}
          >
            {props.prefix}
            <TheIconLoading
              isLoading={isLoading}
              className={sysClassName}
              Icon={props.Icon}
            />
            {props.postfix}
          </span>
        );
      }}
    />
  );
}
