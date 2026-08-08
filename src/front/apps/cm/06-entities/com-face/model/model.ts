import { IExportableCom } from 'shared/api';
import { CmComFaceInheritProps } from './ComFace.model';

export interface ICmComFaceList extends CmComFaceInheritProps {
  importantOnClick?: (props: {
    com: IExportableCom;
    comi: number;
    event: MouseEvent;
    defaultClick: () => void;
  }) => void;
  selectable?: boolean;
}
