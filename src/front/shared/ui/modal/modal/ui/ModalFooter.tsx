import { twMerge } from 'tailwind-merge';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function ModalFooter({ children, className }: Props) {
  return <div className={twMerge('flex justify-end mt-2.5', className)}>{children}</div>;
}
