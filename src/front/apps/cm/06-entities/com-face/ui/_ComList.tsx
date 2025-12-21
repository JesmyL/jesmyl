import { FaceItem } from '#basis/ui/FaceItem';
import { isIOS } from '#shared/lib/device-differences';
import { useListInfiniteScrollController } from '#shared/lib/hooks/useListInfiniteScrollController';
import { mylib } from '#shared/lib/my-lib';
import { useCmComLastOpenComw } from '$cm/entities/com';
import { useCmComSetListLimitsExtracterContext } from '$cm/entities/index';
import { useRef } from 'react';
import { retNull } from 'shared/utils';
import { CmCom } from '../../com/lib/Com';
import { CmComNumber } from '../../com/ui/ComNumber';
import { cmComFaceCurrentComwIdPrefix, cmComFaceItemDescriptionClassName } from '../const/ids';
import { useCmComFaceListClickListener } from '../lib/useComListClickListener';
import { useCmComFaceScrollToCurrentComFace } from '../lib/useScrollToCurrentComFace';
import { ICmComFaceList } from '../model/model';
import { CmComFaceListControlledContainer } from './ComListControlledContainer';

export interface CmComFaceListProps extends ICmComFaceList {
  list: CmCom[];
  titles?: Record<number, string>;
  className?: string;
}

export const CmComFaceListComList = (props: CmComFaceListProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const lastOpenComw = useCmComLastOpenComw();
  const { limits, updateLimits } = useListInfiniteScrollController(
    listRef,
    props.list,
    props.isPutCcomFaceOff ? (_, comi) => comi === 0 : com => com.wid === lastOpenComw,
    [lastOpenComw],
  );

  useCmComSetListLimitsExtracterContext().current = updateLimits;
  useCmComFaceScrollToCurrentComFace(listRef, props, [lastOpenComw]);
  useCmComFaceListClickListener(listRef, props.importantOnClick, props.list);

  const isSetWids = !(props.titles && mylib.keys(props.titles).length);
  const setComDescription = props.comDescription
    ? (com: CmCom, comi: number) => (
        <div className={cmComFaceItemDescriptionClassName}>{props.comDescription!(com, comi)}</div>
      )
    : retNull;

  return (
    <CmComFaceListControlledContainer
      {...props}
      listRef={listRef}
    >
      {props.list.slice(isIOS ? 0 : limits.start, limits.finish).map((com, comi) => {
        return (
          <FaceItem.Root
            key={isSetWids ? com.wid : comi}
            id={`${cmComFaceCurrentComwIdPrefix}${com.wid}`}
            className={`flex between pointer ${comi}-comi`}
          >
            <FaceItem.Logo>{!com.name || <CmComNumber comw={com.wid} />}</FaceItem.Logo>
            <FaceItem.Title>{com.name || <span className="text-xKO">Неизвестная песня</span>}</FaceItem.Title>
            {setComDescription(com, comi)}
          </FaceItem.Root>
        );
      })}
    </CmComFaceListControlledContainer>
  );
};
