import { twMerge } from 'tailwind-merge';
import { StyledModalBody } from '../styled';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function ModalBody({ children, className }: Props) {
  return <StyledModalBody className={twMerge('p-2', className)}>{children}</StyledModalBody>;
}
