import { ConfirmedContentProps } from './model';
import { useConfirm } from './useConfirm';

export const ConfirmContent = (props: ConfirmedContentProps) => {
  if (props.confirm) return <WithConfirm {...props} />;

  return <>{props.content(() => Promise.resolve(true))}</>;
};

const WithConfirm = (props: ConfirmedContentProps) => {
  const [node, confirm] = useConfirm();

  return (
    <>
      {node}
      {props.content(() => confirm(props.confirm))}
    </>
  );
};
