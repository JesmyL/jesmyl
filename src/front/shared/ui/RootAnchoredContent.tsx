import { useEffect } from 'react';
import { useSetRootAnchoredContent } from './useSetRootAnchoredContent';

interface Props {
  children: React.ReactNode;
  onCloseRef: { current: () => void };
  classNames?: string[];
}

export const RootAnchoredContent = ({ children, onCloseRef, classNames }: Props) => {
  const setContent = useSetRootAnchoredContent(onCloseRef, children, classNames);

  useEffect(() => setContent(), [children, classNames, setContent]);

  return <></>;
};
