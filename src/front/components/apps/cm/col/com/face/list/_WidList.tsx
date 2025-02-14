import { itNNil } from 'shared/utils';
import { CmComWid } from '../../../../../../../../shared/api/complect/apps/cm/complect/enums';
import { useComs } from '../../../../cols/useCols';
import { ListComFaceForSelectionsProps } from '../ComFace.model';
import { ComFaceListComList } from './_ComList';
import { IComFaceList } from './model';

interface Props extends IComFaceList, ListComFaceForSelectionsProps {
  list: CmComWid[];
  titles?: Record<number, string>;
}

export const ComFaceListWidList = ({ list, ...comProps }: Props) => {
  const listComs = useComs(list);
  const filteredComs = listComs.filter(itNNil);
  const coms = filteredComs.length === listComs.length ? listComs : filteredComs;

  return (
    <>
      {!coms.length || (
        <ComFaceListComList
          list={coms}
          {...comProps}
        />
      )}
    </>
  );
};
