import { mylib } from '#shared/lib/my-lib';
import { CmCom } from '$cm/ext';
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

  if (mylib.isNum(props.list[0]))
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
