import { CallbackWithDto, useOnSendPromiseCallback } from '../useOnSendPromiseCallback';
import { SendButtonContentMakerProps } from './maker.model';

interface PropsWithClick {
  onClick: CallbackWithDto;
  isLoading?: boolean;
}

export const SendButtonContentMakerBody = <Value,>(props: SendButtonContentMakerProps<Value> & PropsWithClick) => {
  const [onClick, error, isLoading] = useOnSendPromiseCallback(props.onClick, props.onSuccess, props.onFailure);

  return <>{props.content?.(onClick, error, props.isLoading ?? isLoading)}</>;
};
