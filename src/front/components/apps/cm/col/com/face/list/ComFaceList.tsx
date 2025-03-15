import { mylib } from '#shared/lib/my-lib';
import { Com } from '../../Com';
import { ComFaceListComList } from './_ComList';
import { ComFaceListWidList } from './_WidList';
import { IComFaceList } from './model';

interface Props extends IComFaceList {
  list: number[] | Com[] | nil;
  titles?: Record<number, string>;
  className?: string;
}

export const ComFaceList = (props: Props) => {
  if (props.list == null) return null;

  if (mylib.isNum(props.list[0]))
    return (
      <ComFaceListWidList
        {...props}
        list={props.list as []}
      />
    );

  return (
    <>
      {!props.list.length || (
        <ComFaceListComList
          {...props}
          list={props.list as []}
        />
      )}
    </>
  );
};
