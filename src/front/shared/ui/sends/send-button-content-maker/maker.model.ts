import { ReactNode } from 'react';
import { CallbackWithDto } from '../useOnSendPromiseCallback';

export type SendButtonContentMakerPropsContent = (
  onClick: CallbackWithDto,
  error: string,
  isLoading: boolean,
) => ReactNode;

export interface SendButtonContentMakerProps<Value> {
  onSend?: () => Promise<Value> | void | nil;
  onSuccess?: ((val: Value) => void) | nil;
  onFailure?: (errorMessage: string) => string | void;
  confirm?: ReactNode;
  content?: SendButtonContentMakerPropsContent;
  disabled?: boolean;
}
