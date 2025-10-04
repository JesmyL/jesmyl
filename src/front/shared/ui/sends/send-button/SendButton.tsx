import { makeToastKOMoodConfig } from '#shared/ui/modal/toast.configs';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheButton } from '#shared/ui/TheButton';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { SendButtonContentMaker } from '../send-button-content-maker/maker';
import { SendButtonProps } from './SendButton.model';

export function SendButton<Value>(props: SendButtonProps<Value>) {
  return (
    <SendButtonContentMaker
      {...props}
      confirm={props.confirm === true ? props.title : props.confirm}
      onFailure={error => {
        props.onFailure?.(error);
        toast(error, makeToastKOMoodConfig());
      }}
      content={(onClick, error, isLoading) => {
        return (
          <TheButton
            id={props.id}
            className={twMerge(
              'm-2',
              props.disabled ? 'disabled' : '',
              isLoading && !error ? 'pointers-none' : '',
              props.className,
            )}
            onClick={props.disabled ? undefined : onClick}
          >
            {props.title}
            <div className="absolute h-full flex center right-0 top-0 mr-2">
              {error ? (
                <LazyIcon
                  icon="Alert02"
                  className="text-xKO"
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
}
