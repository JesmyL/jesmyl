import { translateBase } from '#basis/locale';
import { FaceItem } from '#basis/ui/FaceItem';
import { isIOS } from '#shared/lib/device-differences';
import { useListInfiniteScrollController } from '#shared/lib/hooks/useListInfiniteScrollController';
import { CmComNumber, useCmComLastOpenComw } from '$cm/entities/com';
import { useCmComSetListLimitsExtracterContext } from '$cm/entities/index';
import { useRef } from 'react';
import { IExportableCom } from 'shared/api';
import { retNull } from 'shared/utils';
import { objectLength } from 'shared/utils/object.utils';
import { cmComFaceCurrentComwIdPrefix, cmComFaceItemDescriptionClassName } from '../const/ids';
import { useCmComFaceListClickListener } from '../lib/useComListClickListener';
import { useCmComFaceScrollToCurrentComFace } from '../lib/useScrollToCurrentComFace';
import { ICmComFaceList } from '../model/model';
import { CmComFaceListControlledContainer } from './ComListControlledContainer';

export interface CmComFaceListProps extends ICmComFaceList {
  list: IExportableCom[];
  titles?: Record<number, string>;
  className?: string;
}

export const CmComFaceListComList = (props: CmComFaceListProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const lastOpenComw = useCmComLastOpenComw();
  const { limits, updateLimits } = useListInfiniteScrollController(
    listRef,
    props.list,
    props.isPutCcomFaceOff ? (_, comi) => comi === 0 : com => com.w === lastOpenComw,
    [lastOpenComw],
  );

  useCmComSetListLimitsExtracterContext().current = updateLimits;
  useCmComFaceScrollToCurrentComFace(listRef, props, [lastOpenComw]);
  useCmComFaceListClickListener(listRef, props.importantOnClick, props.list);

  const isSetWids = !(props.titles && objectLength(props.titles));
  const setComDescription = props.comDescription
    ? (com: IExportableCom, comi: number) => (
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
            key={isSetWids ? com.w : comi}
            id={`${cmComFaceCurrentComwIdPrefix}${com.w}`}
            className={`flex between pointer ${comi}-comi`}
          >
            <FaceItem.Logo>{!com.n || <CmComNumber comw={com.w} />}</FaceItem.Logo>
            <FaceItem.Title>
              {com.n || <span className="text-xKO">{translateBase(it => it.cm.com.unk)}</span>}
            </FaceItem.Title>
            {setComDescription(com, comi)}
          </FaceItem.Root>
        );
      })}
    </CmComFaceListControlledContainer>
  );
};
