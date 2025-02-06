import { ReactNode } from 'react';
import { ConfirmContent } from '../modal/confirm/ConfirmContent';

export default function StrongDiv(props: {
  children?: ReactNode;
  className?: string;
  onSend: () => Promise<unknown>;
  onSuccess?: () => void;
  onFailure?: () => void;
  confirm?: ReactNode;
}) {
  return (
    <ConfirmContent
      confirm={props.confirm}
      content={onConfirm => (
        <div
          className={'pointer ' + props.className}
          onClick={async () => {
            try {
              if (!(await onConfirm())) return;
              await props.onSend();
              props.onSuccess?.();
            } catch (error) {
              props.onFailure?.();
            }
          }}
          children={props.children}
        />
      )}
    />
  );
}
