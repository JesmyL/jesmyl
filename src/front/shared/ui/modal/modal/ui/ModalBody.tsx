import { twMerge } from 'tailwind-merge';
import { StyledModalBody } from '../style/styled';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function ModalBody({ children, className }: Props) {
  return <StyledModalBody className={twMerge('p-2 @container', className)}>{children}</StyledModalBody>;
}
