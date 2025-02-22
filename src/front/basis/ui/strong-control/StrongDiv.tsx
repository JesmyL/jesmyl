import { ConfirmContent } from '#shared/ui/modal/confirm/ConfirmContent';
import { ReactNode } from 'react';

export function StrongDiv(props: {
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
            } catch (_error) {
              props.onFailure?.();
            }
          }}
          children={props.children}
        />
      )}
    />
  );
}
