import { CmCom } from 'shared/const/cm/Com';
import { checkIsNumber } from 'shared/utils/checkIs';
import { ICmComFaceList } from '../model/model';
import { CmComFaceListComList } from './_ComList';
import { CmComFaceWidList } from './_WidList';

interface Props extends ICmComFaceList {
  list: number[] | CmCom[] | nil;
  titles?: Record<number, string>;
  className?: string;
}

export const CmComFaceList = (props: Props) => {
  if (props.list == null) return null;

  if (checkIsNumber(props.list[0]))
    return (
      <CmComFaceWidList
        {...props}
        list={props.list as []}
      />
    );

  return (
    <>
      {!props.list.length || (
        <CmComFaceListComList
          {...props}
          list={props.list as []}
        />
      )}
    </>
  );
};
