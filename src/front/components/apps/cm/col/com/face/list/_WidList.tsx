import { useComs } from '$cm/basis/lib/coms-selections';
import { CmComWid } from 'shared/api';
import { itNNil } from 'shared/utils';
import { ComFaceListComList } from './_ComList';
import { IComFaceList } from './model';

interface Props extends IComFaceList {
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
