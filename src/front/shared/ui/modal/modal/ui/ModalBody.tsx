import { twMerge } from 'tailwind-merge';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function ModalBody({ children, className }: Props) {
  return (
    <div className={twMerge('max-h-[80vh] overflow-x-hidden overflow-y-auto p-2 @container', className)}>
      {children}
    </div>
  );
}
