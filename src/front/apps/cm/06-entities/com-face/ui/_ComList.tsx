import { translateBase } from '#basis/locale';
import { FaceItem } from '#basis/ui/FaceItem';
import { isIOS } from '#shared/lib/device-differences';
import { useListInfiniteScrollController } from '#shared/lib/hooks/useListInfiniteScrollController';
import { CmComNumber, useCmComLastOpenComw } from '$cm/entities/com';
import { CmComAudioPlayerCacheMarks } from '$cm/entities/com-audio-player';
import { useCmComSetListLimitsExtracterContext } from '$cm/entities/index';
import { useRef, useState } from 'react';
import { CmComWid, IExportableCom } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { retNull } from 'shared/utils';
import { objectLength } from 'shared/utils/object.utils';
import {
  cmComFaceCurrentComwIdPrefix,
  cmComFaceItemAudioMarksClassName,
  cmComFaceItemDescriptionClassName,
} from '../const/ids';
import { useCmComFaceListClickListener } from '../lib/useComListClickListener';
import { useCmComFaceScrollToCurrentComFace } from '../lib/useScrollToCurrentComFace';
import { CmComFaceListProps } from '../model/model';
import { CmComFaceListControlledContainer } from './ComListControlledContainer';

export const CmComFaceListComList = (props: CmComFaceListProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const lastOpenComw = useCmComLastOpenComw();
  const [dropTargetComw, setDropTargetComw] = useState<CmComWid | nil>(null);
  const { importantDropOnCom } = props;
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
        const isDropTarget = dropTargetComw === com.w;

        return (
          <FaceItem.Root
            key={isSetWids ? com.w : comi}
            id={`${cmComFaceCurrentComwIdPrefix}${com.w}`}
            className={`flex between pointer ${comi}-comi${isDropTarget ? ' face-item-drop-target' : ''}`}
            onDragOver={
              importantDropOnCom
                ? event => {
                    event.preventDefault();
                    setDropTargetComw(prev => (prev === com.w ? prev : com.w));
                  }
                : undefined
            }
            onDragLeave={
              importantDropOnCom
                ? event => {
                    if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
                    setDropTargetComw(prev => (prev === com.w ? null : prev));
                  }
                : undefined
            }
            onDrop={
              importantDropOnCom
                ? event => {
                    setDropTargetComw(null);
                    importantDropOnCom({ com, comi, event });
                  }
                : undefined
            }
          >
            <FaceItem.Logo>{!com.n || <CmComNumber comw={com.w} />}</FaceItem.Logo>
            <FaceItem.Title>
              {com.n || <span className="text-xKO">{translateBase(BaseLocaleKey.CmUnknown)}</span>}
            </FaceItem.Title>
            {setComDescription(com, comi)}
            {props.withoutCacheMarks || (
              <CmComAudioPlayerCacheMarks
                srcs={com.al}
                className={cmComFaceItemAudioMarksClassName}
              />
            )}
          </FaceItem.Root>
        );
      })}
    </CmComFaceListControlledContainer>
  );
};
