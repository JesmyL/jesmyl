import { FC } from 'react';
import useAbsoluteFloatPopup from '../../../../../../../complect/absolute-popup/useAbsoluteFloatPopup';
import useCmNav from '../../../../base/useCmNav';
import useSelectedComs from '../../../../base/useSelectedComs';
import { Com } from '../../Com';
import { useCcom } from '../../useCcom';
import { FreeComFaceProps } from '../ComFace.model';
import { ComFaceListComList } from './_ComList';
import { ComFaceListWidList } from './_WidList';
import { IComFaceList } from './model';

interface Props extends IComFaceList {
  list: number[] | Com[] | nil;
}

export const ComFaceList = (props: Props) => {
  return (
    props.list && (
      <ComFaceListWrapper
        Component={props.list[0] instanceof Com ? ComFaceListComList : ComFaceListWidList}
        {...(props as any)}
      />
    )
  );
};

interface WrapperProps extends IComFaceList {
  Component: FC<IComFaceList & FreeComFaceProps>;
  ccom: Com | und;
}

const ComFaceListWrapper = ({ Component, ...props }: WrapperProps) => {
  const ccom = useCcom();
  const { jumpTo } = useCmNav();
  const { openAbsoluteFloatPopup, closeAbsoluteFloatPopup } = useAbsoluteFloatPopup();
  const { selectedComPosition, toggleSelectedCom } = useSelectedComs();

  return (
    <Component
      {...props}
      ccom={ccom}
      jumpTo={jumpTo}
      closeAbsoluteFloatPopup={closeAbsoluteFloatPopup}
      openAbsoluteFloatPopup={openAbsoluteFloatPopup}
      selectedComPosition={selectedComPosition}
      toggleSelectedCom={toggleSelectedCom}
    />
  );
};
