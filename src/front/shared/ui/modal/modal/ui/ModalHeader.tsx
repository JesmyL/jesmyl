import { twMerge } from 'tailwind-merge';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function ModalHeader({ children, className }: Props) {
  return <div className={twMerge('my-2.5', className)}>{children}</div>;
}
