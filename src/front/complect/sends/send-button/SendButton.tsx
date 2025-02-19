import { TheButton } from '#shared/ui/Button';
import { LazyIcon, TheIconLoading } from '#shared/ui/icon';
import { useToast } from '#shared/ui/modal';
import { SendButtonContentMaker } from '#shared/ui/sendable/lib/send-button-content-maker/maker';
import { SendButtonProps } from '#shared/ui/sendable/SendButton/model';

export const SendButton = <Value,>(props: SendButtonProps<Value>) => {
  const [toastNode, toast] = useToast();

  return (
    <SendButtonContentMaker
      {...props}
      confirm={props.confirm === true ? props.title : props.confirm}
      anchorNodes={<>{toastNode}</>}
      onFailure={error => {
        props.onFailure?.(error);
        toast(error, { mood: 'ko' });
      }}
      content={(onClick, error, isLoading) => {
        return (
          <TheButton
            id={props.id}
            className={
              (props.className || '') +
              ' margin-gap' +
              (props.disabled ? ' disabled' : '') +
              (isLoading && !error ? ' pointers-none' : '')
            }
            onClick={props.disabled ? undefined : onClick}
          >
            {props.title}
            <div className="absolute full-height flex center pos-right pos-top margin-gap-r">
              {error ? (
                <LazyIcon
                  icon="Alert02"
                  className="error-message"
                />
              ) : (
                <TheIconLoading isLoading={isLoading} />
              )}
            </div>
          </TheButton>
        );
      }}
    />
  );
};
