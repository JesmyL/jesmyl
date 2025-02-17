import { useListInfiniteScrollController } from '#shared/hooks/useListInfiniteScrollController';
import { isIPhone } from '#shared/lib/device-differences';
import { useSetComListLimitsExtracterContext } from 'front/components/apps/cm/base/SetComListLimitsExtracterContext';
import { mylib } from 'front/utils';
import { useRef } from 'react';
import { retNull } from 'shared/utils';
import { FaceItem } from '../../../../../../../07-shared/ui/FaceItem';
import { Com } from '../../Com';
import { CmComNumber } from '../../complect/ComNumber';
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
            id={`${currentComwIdPrefix}${com.wid}`}
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
