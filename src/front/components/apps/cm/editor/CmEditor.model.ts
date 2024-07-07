import { ReactNode } from 'react';
import { CmMp3Rule, ShortRealRule } from '../../../../models';

export interface CmEditorStoraged {
  rules: ShortRealRule[];
  mp3Rules?: CmMp3Rule[];
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
