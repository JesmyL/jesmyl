import { StyledModalHeader } from '../styled';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function ModalHeader({ children, className }: Props) {
  return <StyledModalHeader className={className}>{children}</StyledModalHeader>;
}
