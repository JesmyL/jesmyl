import { CSSProperties, ReactNode } from 'react';

export type FontSizeContainProps = {
  className?: string;
  subUpdates?: string | number;
  style?: CSSProperties;
} & XOR<{ content?: ReactNode }, { html?: string }>;
