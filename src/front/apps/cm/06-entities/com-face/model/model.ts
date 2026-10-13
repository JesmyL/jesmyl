import { DragEvent } from 'react';
import { IExportableCom } from 'shared/api';
import { CmComFaceInheritProps } from './ComFace.model';

export interface ICmComFaceList extends CmComFaceInheritProps {
  importantOnClick?: (props: {
    com: IExportableCom;
    comi: number;
    event: MouseEvent;
    defaultClick: () => void;
  }) => void;
  /** When set, each com face accepts dropped content and reports it with the exact com it was dropped on. */
  importantDropOnCom?: (props: { com: IExportableCom; comi: number; event: DragEvent }) => void;
  selectable?: boolean;
}

export interface CmComFaceListProps extends ICmComFaceList {
  list: IExportableCom[];
  titles?: Record<number, string>;
  className?: string;
}
