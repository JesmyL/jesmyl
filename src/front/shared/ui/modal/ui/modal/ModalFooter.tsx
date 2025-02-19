import { StyledModalFooter } from '../../lib/styled';

interface Props {
  children: React.ReactNode;
}

export function ModalFooter({ children }: Props) {
  return <StyledModalFooter>{children}</StyledModalFooter>;
}
