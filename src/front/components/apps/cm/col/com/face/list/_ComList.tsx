import { isIPhone } from 'front/complect/device-differences';
import { useListInfiniteScrollController } from 'front/complect/useListInfiniteScrollController';
import { useSetComListLimitsExtracterContext } from 'front/components/apps/cm/base/SetComListLimitsExtracterContext';
import { mylib } from 'front/utils';
import { useRef } from 'react';
import { FaceItem } from '../../../../../../../complect/FaceItem';
import { Com } from '../../Com';
import { ListComFaceForSelectionsProps } from '../ComFace.model';
import { ComListControlledContainer } from './ComListControlledContainer';
import { IComFaceList } from './model';

export interface ComFaceListProps extends IComFaceList, ListComFaceForSelectionsProps {
  list: Com[];
  titles?: Record<number, string>;
  className?: string;
}

export const currentComwIdPrefix = 'com_face_wid_';
export const faceItemDescriptionClassName = 'face-item-description';

export const ComFaceListComList = (props: ComFaceListProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const { limits, updateLimits } = useListInfiniteScrollController(listRef, props.list, com => com.wid === props.ccomw);

  useSetComListLimitsExtracterContext().current = updateLimits;

  const isSetWids = !(props.titles && mylib.keys(props.titles).length);
  const setComDescription = props.comDescription
    ? (com: Com, comi: number) => <div className={faceItemDescriptionClassName}>{props.comDescription!(com, comi)}</div>
    : () => null;

  return (
    <ComListControlledContainer
      {...props}
      listRef={listRef}
    >
      {props.list.slice(isIPhone ? 0 : limits.start, limits.finish).map((com, comi) => {
        return (
          <FaceItem
            key={isSetWids ? com.wid : comi}
            id={`${currentComwIdPrefix}${com.wid}`}
            className={`flex between pointer ${comi}-comi`}
          >
            <div className="face-logo">{com.number}</div>
            <span className="face-title ellipsis">{com.name}</span>
            {setComDescription(com, comi)}
          </FaceItem>
        );
      })}
    </ComListControlledContainer>
  );
};
