import { BottomPopupItem } from 'front/complect/absolute-popup/bottom-popup/BottomPopupItem';
import { FullContent } from 'front/complect/fullscreen-content/FullContent';
import { useState } from 'react';
import { useCheckIsAccessed } from '../../../../../complect/exer/hooks/check-is-accessed';
import { IconFolderAddStrokeRounded } from '../../../../../complect/the-icon/icons/folder-add';
import { IconPlusSignCircleStrokeRounded } from '../../../../../complect/the-icon/icons/plus-sign-circle';
import { useAuth } from '../../../../index/atoms';
import AddContext from './AddContext';
import MeetingsCreator from './MeetingsCreator';

export const EditMeetingsMore = ({ closePopup, currPath }: { closePopup: (is: false) => void; currPath: number[] }) => {
  const auth = useAuth();
  const checkIsAccessed = useCheckIsAccessed(auth);
  const [isOpenMeetingsCreator, setIsOpenMeetingsCreator] = useState(false);
  const [isOpenAddContextNode, setIsOpenAddContextNode] = useState(false);

  return (
    <>
      <BottomPopupItem
        Icon={IconPlusSignCircleStrokeRounded}
        title="Создать событие"
        onClick={event => {
          event.stopPropagation();
          setIsOpenMeetingsCreator(true);
        }}
      />

      {checkIsAccessed(50) && (
        <BottomPopupItem
          Icon={IconFolderAddStrokeRounded}
          title="Создать контекст"
          onClick={event => {
            event.stopPropagation();
            setIsOpenAddContextNode(true);
          }}
        />
      )}

      {isOpenMeetingsCreator && (
        <FullContent
          onClose={() => {
            closePopup(false);
            setIsOpenMeetingsCreator(false);
          }}
        >
          <MeetingsCreator close={setIsOpenMeetingsCreator} />
        </FullContent>
      )}

      {isOpenAddContextNode && (
        <FullContent
          containerClassName=""
          onClose={() => {
            closePopup(false);
            setIsOpenAddContextNode(false);
          }}
        >
          <AddContext
            close={setIsOpenAddContextNode}
            currPath={currPath}
          />
        </FullContent>
      )}
    </>
  );
};
