import { StyledModalFooter } from '../styled';

interface Props {
  children: React.ReactNode;
}

export function ModalFooter({ children }: Props) {
  return <StyledModalFooter>{children}</StyledModalFooter>;
}
