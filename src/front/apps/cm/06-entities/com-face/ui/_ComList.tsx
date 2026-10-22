import { translateBase } from '#basis/locale';
import { FaceItem } from '#basis/ui/FaceItem';
import { isIOS } from '#shared/lib/device-differences';
import { useListInfiniteScrollController } from '#shared/lib/hooks/useListInfiniteScrollController';
import { CmComNumber, useCmComLastOpenComw } from '$cm/entities/com';
import { CmComAudioPlayerCacheMarks } from '$cm/entities/com-audio-player';
import { useCmComSetListLimitsExtracterContext } from '$cm/entities/index';
import { DragEvent, memo, useCallback, useRef, useState } from 'react';
import { CmComWid, IExportableCom } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
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

interface ComListItemProps {
  com: IExportableCom;
  comi: number;
  isDropTarget: boolean;
  isDropEnabled: boolean;
  comDescription: CmComFaceListProps['comDescription'];
  withoutCacheMarks: boolean | nil;
  onDragOver: (com: IExportableCom, event: DragEvent<HTMLDivElement>) => void;
  onDragLeave: (com: IExportableCom, event: DragEvent<HTMLDivElement>) => void;
  onDrop: (com: IExportableCom, comi: number, event: DragEvent<HTMLDivElement>) => void;
}

const CmComFaceListItem = memo(function CmComFaceListItem(props: ComListItemProps) {
  const { com, comi, isDropTarget, isDropEnabled, comDescription, withoutCacheMarks, onDragOver, onDragLeave, onDrop } =
    props;

  return (
    <FaceItem.Root
      id={`${cmComFaceCurrentComwIdPrefix}${com.w}`}
      className={`flex between pointer ${comi}-comi${isDropTarget ? ' face-item-drop-target' : ''}`}
      onDragOver={isDropEnabled ? event => onDragOver(com, event) : undefined}
      onDragLeave={isDropEnabled ? event => onDragLeave(com, event) : undefined}
      onDrop={isDropEnabled ? event => onDrop(com, comi, event) : undefined}
    >
      <FaceItem.Logo>{!com.n || <CmComNumber comw={com.w} />}</FaceItem.Logo>
      <FaceItem.Title>
        {com.n || <span className="text-xKO">{translateBase(BaseLocaleKey.CmUnknown)}</span>}
      </FaceItem.Title>
      {!comDescription || <div className={cmComFaceItemDescriptionClassName}>{comDescription(com, comi)}</div>}
      {withoutCacheMarks || (
        <CmComAudioPlayerCacheMarks
          srcs={com.al}
          className={cmComFaceItemAudioMarksClassName}
        />
      )}
    </FaceItem.Root>
  );
});

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

  const isDropEnabled = importantDropOnCom != null;

  const onItemDragOver = useCallback((com: IExportableCom, event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDropTargetComw(prev => (prev === com.w ? prev : com.w));
  }, []);

  const onItemDragLeave = useCallback((com: IExportableCom, event: DragEvent<HTMLDivElement>) => {
    if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return;
    setDropTargetComw(prev => (prev === com.w ? null : prev));
  }, []);

  const onItemDrop = useCallback(
    (com: IExportableCom, comi: number, event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDropTargetComw(null);
      importantDropOnCom?.({ com, comi, event });
    },
    [importantDropOnCom],
  );

  const isSetWids = !(props.titles && objectLength(props.titles));

  return (
    <CmComFaceListControlledContainer
      {...props}
      listRef={listRef}
    >
      {props.list.slice(isIOS ? 0 : limits.start, limits.finish).map((com, comi) => (
        <CmComFaceListItem
          key={isSetWids ? com.w : comi}
          com={com}
          comi={comi}
          isDropTarget={dropTargetComw === com.w}
          isDropEnabled={isDropEnabled}
          comDescription={props.comDescription}
          withoutCacheMarks={props.withoutCacheMarks}
          onDragOver={onItemDragOver}
          onDragLeave={onItemDragLeave}
          onDrop={onItemDrop}
        />
      ))}
    </CmComFaceListControlledContainer>
  );
};
