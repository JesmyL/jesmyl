import { StyledModalBody } from '../styled';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function ModalBody({ children, className }: Props) {
  return <StyledModalBody className={className}>{children}</StyledModalBody>;
}
