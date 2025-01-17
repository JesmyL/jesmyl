import { ReactNode } from 'react';
import { ConfirmContent } from '../modal/confirm/ConfirmContent';
import { StrongControlProps } from './Strong.model';

export default function StrongDiv(
  props: StrongControlProps<{
    children?: ReactNode;
    className?: string;
    onClick?: () => void;
    onSuccess?: () => void;
    onFailure?: () => void;
    confirm?: ReactNode;
  }>,
) {
  return (
    <ConfirmContent
      confirm={props.confirm}
      content={onConfirm => (
        <div
          className={'pointer ' + props.className}
          onClick={
            props.scope && props.isCanSend !== false
              ? async () => {
                  if (!(await onConfirm())) return;

                  props.onClick?.();
                  // strongPrepareArgsAndSend(
                  //   exer,
                  //   props.scope,
                  //   props.fieldName,
                  //   props.cud ?? 'C',
                  //   undefined,
                  //   simpleFunc,
                  //   props.mapExecArgs,
                  //   props.fieldKey,
                  //   props.fieldValue,
                  // )
                  //   ?.then(props.onSuccess)
                  //   .catch(props.onFailure);
                }
              : undefined
          }
          children={props.children}
        />
      )}
    />
  );
}
