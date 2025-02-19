import { BottomPopupItem } from 'front/complect/absolute-popup/bottom-popup/BottomPopupItem';
import { FullContent } from 'front/complect/fullscreen-content/FullContent';
import { useState } from 'react';
import NewComposition from './new-com/NewComposition';

export const EditCompositionsMore = ({ onClose }: { onClose(is: false): void }) => {
  const [isComCreatorOpen, setIsComCreatorOpen] = useState<unknown>(null);

  return (
    <>
      {isComCreatorOpen && (
        <FullContent onClose={() => setIsComCreatorOpen(null)}>
          <NewComposition
            onClose={() => {
              setIsComCreatorOpen(false);
              onClose(false);
            }}
          />
        </FullContent>
      )}
      <BottomPopupItem
        id="create-com-button"
        icon="PlusSignCircle"
        title="Новая песня"
        onClick={event => {
          event.stopPropagation();
          setIsComCreatorOpen(true);
        }}
      />
    </>
  );
};
