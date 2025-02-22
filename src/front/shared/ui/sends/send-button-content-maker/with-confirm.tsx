import { useConfirm } from '#shared/ui/modal/confirm/useConfirm';
import { useState } from 'react';
import { SendButtonContentMakerBody } from './maker-body';
import { SendButtonContentMakerProps } from './maker.model';

export const SendButtonContentMakerWithConfirm = <Value,>(props: SendButtonContentMakerProps<Value>) => {
  const [confirmNode, confirm] = useConfirm();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {confirmNode}
      <SendButtonContentMakerBody<Value>
        {...props}
        isLoading={isLoading}
        onClick={async () => {
          try {
            if (props.onSend == null) return;
            if (!(await confirm(props.confirm))) return;
            setIsLoading(true);

            await props.onSend();
            setIsLoading(false);
          } catch (error) {
            setIsLoading(false);
            throw error;
          }
        }}
      />
    </>
  );
};
