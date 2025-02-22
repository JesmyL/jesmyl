import { ReactNode } from 'react';

export interface ConfirmedContentProps {
  confirm?: ReactNode;
  content: (onConfirm: () => Promise<boolean>) => ReactNode;
}
