import { BottomPopupItem } from 'front/complect/absolute-popup/bottom-popup/BottomPopupItem';
import { FullContent } from 'front/complect/fullscreen-content/FullContent';
import { useState } from 'react';
import { IconPlusSignCircleStrokeRounded } from '../../../../../../../complect/the-icon/icons/plus-sign-circle';
import NewComposition from './new-com/NewComposition';

export const EditCompositionsMore = () => {
  const [isComCreatorOpen, setIsComCreatorOpen] = useState<unknown>(null);

  return (
    <>
      {isComCreatorOpen && (
        <FullContent onClose={() => setIsComCreatorOpen(null)}>
          <NewComposition onClose={setIsComCreatorOpen} />
        </FullContent>
      )}
      <BottomPopupItem
        Icon={IconPlusSignCircleStrokeRounded}
        title="Новая песня"
        onClick={event => {
          event.stopPropagation();
          setIsComCreatorOpen(true);
        }}
      />
    </>
  );
};
