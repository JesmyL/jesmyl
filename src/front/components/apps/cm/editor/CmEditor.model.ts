import { ReactNode } from 'react';
import { EeStorePack, ShortRealRule } from 'shared/api';

export interface CmEditorStoraged {
  rules: ShortRealRule[];
  eeStorage: EeStorePack;
}

export type ExecVision = ShortRealRule & Partial<Exec> & Partial<ExecVisionVisual>;

export interface Exec {
  action: string;
  args: Record<string, any>;
  author: string;
  status: 'resolved' | 'rejected';
  ts: number;
}

export interface ExecVisionVisual {
  prevNode: ReactNode;
  valueNode: ReactNode;
  specials: ReactNode;
}
