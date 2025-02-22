import { mylib } from '#shared/lib/my-lib';
import { useSelectedComs } from '@cm/base/useSelectedComs';
import { Com } from '../../Com';
import { useCcomw } from '../../useCcom';
import { ComFaceListComList } from './_ComList';
import { ComFaceListWidList } from './_WidList';
import { IComFaceList } from './model';

interface Props extends IComFaceList {
  list: number[] | Com[] | nil;
  titles?: Record<number, string>;
  className?: string;
}

export const ComFaceList = (props: Props) => {
  const ccomw = useCcomw();
  const { selectedComPosition, toggleSelectedCom } = useSelectedComs();

  if (props.list == null) return null;

  if (mylib.isNum(props.list[0]))
    return (
      <ComFaceListWidList
        {...props}
        list={props.list as []}
        ccomw={ccomw}
        selectedComPosition={selectedComPosition}
        toggleSelectedCom={toggleSelectedCom}
      />
    );

  return (
    <>
      {!props.list.length || (
        <ComFaceListComList
          {...props}
          ccomw={ccomw}
          list={props.list as []}
          selectedComPosition={selectedComPosition}
          toggleSelectedCom={toggleSelectedCom}
        />
      )}
    </>
  );
};
