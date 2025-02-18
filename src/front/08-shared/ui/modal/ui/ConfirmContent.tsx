import React from 'react';
import { useConfirm } from '../lib/useConfirm';

interface Props {
  confirm?: React.ReactNode;
  content: (onConfirm: () => Promise<boolean>) => React.ReactNode;
}

export const ConfirmContent = (props: Props) => {
  if (props.confirm) return <WithConfirm {...props} />;

  return <>{props.content(() => Promise.resolve(true))}</>;
};

const WithConfirm = (props: Props) => {
  const [node, confirm] = useConfirm();

  return (
    <>
      {node}
      {props.content(() => confirm(props.confirm))}
    </>
  );
};
