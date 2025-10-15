import { useCmComList } from '$cm/entities/com';
import { CmComWid } from 'shared/api';
import { itNNil } from 'shared/utils';
import { ICmComFaceList } from '../model/model';
import { CmComFaceListComList } from './_ComList';

interface Props extends ICmComFaceList {
  list: CmComWid[];
  titles?: Record<number, string>;
}

export const CmComFaceWidList = ({ list, ...comProps }: Props) => {
  const listComs = useCmComList(list);
  const filteredComs = listComs.filter(itNNil);
  const coms = filteredComs.length === listComs.length ? listComs : filteredComs;

  return (
    <>
      {!coms.length || (
        <CmComFaceListComList
          list={coms}
          {...comProps}
        />
      )}
    </>
  );
};
