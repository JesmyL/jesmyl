import { useConfirm } from '../hooks/useConfirm';

interface ConfirmedContentProps {
  confirm?: React.ReactNode;
  content: (onConfirm: () => Promise<boolean>) => React.ReactNode;
}

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
