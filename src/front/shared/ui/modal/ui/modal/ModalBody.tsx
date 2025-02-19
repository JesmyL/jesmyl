import { StyledModalBody } from '../../lib/styled';

interface Props {
  children: React.ReactNode;
}

export function ModalBody({ children }: Props) {
  return <StyledModalBody>{children}</StyledModalBody>;
}
