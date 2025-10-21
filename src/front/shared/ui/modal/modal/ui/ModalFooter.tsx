import { StyledModalFooter } from '../style/styled';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function ModalFooter({ children, className }: Props) {
  return <StyledModalFooter className={className}>{children}</StyledModalFooter>;
}
