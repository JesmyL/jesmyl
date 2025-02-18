import { SendButtonContentMakerBody } from './maker-body';
import { SendButtonContentMakerProps } from './maker.model';
import { SendButtonContentMakerWithConfirm } from './with-confirm';

export const SendButtonContentMaker = <Value,>(props: SendButtonContentMakerProps<Value>) => {
  if (props.confirm != null) return <SendButtonContentMakerWithConfirm<Value> {...props} />;

  return (
    <SendButtonContentMakerBody<Value>
      {...props}
      onClick={() => props.onSend?.()}
    />
  );
};
