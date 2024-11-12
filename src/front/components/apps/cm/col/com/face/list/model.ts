import { CmComWid } from '../../../../../../../../shared/api/complect/apps/cm/complect/enums';
import { Com } from '../../Com';
import { ComFaceInheritProps } from '../ComFace.model';

export interface IComFaceList extends ComFaceInheritProps {
  ccomw?: CmComWid | NaN;
  importantOnClick?: (com: Com, comi: number, event: MouseEvent) => void;
  selectable?: boolean;
}
