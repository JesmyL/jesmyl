import { useCmComLastOpenComw } from '$cm/entities/com';
import { CmComWid } from 'shared/api';
import { CmComFaceInheritProps } from '../model/ComFace.model';

/** The explicitly passed com wins: the player page plays a com that is not always the last opened one. */
export const useCmComFaceCurrentComw = (props: CmComFaceInheritProps): CmComWid | und => {
  const lastOpenComw = useCmComLastOpenComw();

  return props.currentComw ?? lastOpenComw;
};
