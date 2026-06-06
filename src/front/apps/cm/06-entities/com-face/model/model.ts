import { CmCom } from 'shared/const/cm/Com';
import { CmComFaceInheritProps } from './ComFace.model';

export interface ICmComFaceList extends CmComFaceInheritProps {
  importantOnClick?: (props: { com: CmCom; comi: number; event: MouseEvent; defaultClick: () => void }) => void;
  selectable?: boolean;
}
