import { FaceItem } from '#basis/ui/FaceItem';
import { isIPhone } from '#shared/lib/device-differences';
import { useListInfiniteScrollController } from '#shared/lib/hooks/useListInfiniteScrollController';
import { mylib } from '#shared/lib/my-lib';
import { useSetComListLimitsExtracterContext } from '$cm/base/SetComListLimitsExtracterContext';
import { useLastOpenComw } from '$cm/basis/lib/com-selections';
import { useRef } from 'react';
import { retNull } from 'shared/utils';
import { Com } from '../../Com';
import { CmComNumber } from '../../complect/ComNumber';
import { cmCurrentComwIdPrefix, cmFaceItemDescriptionClassName } from '../lib/consts';
import { ComListControlledContainer } from './ComListControlledContainer';
import { IComFaceList } from './model';
import { useComListClickListener } from './useComListClickListener';
import { useScrollToCurrentComFace } from './useScrollToCurrentComFace';

export interface ComFaceListProps extends IComFaceList {
  list: Com[];
  titles?: Record<number, string>;
  className?: string;
}

export const ComFaceListComList = (props: ComFaceListProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const lastOpenComw = useLastOpenComw();
  const { limits, updateLimits } = useListInfiniteScrollController(
    listRef,
    props.list,
    com => com.wid === lastOpenComw,
    [lastOpenComw],
  );

  useSetComListLimitsExtracterContext().current = updateLimits;
  useScrollToCurrentComFace(listRef, props, [lastOpenComw]);
  useComListClickListener(listRef, props.importantOnClick, props.list);

  const isSetWids = !(props.titles && mylib.keys(props.titles).length);
  const setComDescription = props.comDescription
    ? (com: Com, comi: number) => (
        <div className={cmFaceItemDescriptionClassName}>{props.comDescription!(com, comi)}</div>
      )
    : retNull;

  return (
    <ComListControlledContainer
      {...props}
      listRef={listRef}
    >
      {props.list.slice(isIPhone ? 0 : limits.start, limits.finish).map((com, comi) => {
        return (
          <FaceItem
            key={isSetWids ? com.wid : comi}
            id={`${cmCurrentComwIdPrefix}${com.wid}`}
            className={`flex between pointer ${comi}-comi`}
          >
            <div className="face-logo">
              <CmComNumber comw={com.wid} />
            </div>
            <span className="face-title ellipsis">{com.name}</span>
            {setComDescription(com, comi)}
          </FaceItem>
        );
      })}
    </ComListControlledContainer>
  );
};
