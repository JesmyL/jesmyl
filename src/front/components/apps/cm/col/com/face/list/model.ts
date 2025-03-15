import { Com } from '../../Com';
import { ComFaceInheritProps } from '../ComFace.model';

export interface IComFaceList extends ComFaceInheritProps {
  importantOnClick?: (props: { com: Com; comi: number; event: MouseEvent; defaultClick: () => void }) => void;
  selectable?: boolean;
}
