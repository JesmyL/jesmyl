import { StyledModalBody } from './Modal.styled';

interface Props {
  children: React.ReactNode;
}

export function ModalBody({ children }: Props) {
  return <StyledModalBody>{children}</StyledModalBody>;
}
