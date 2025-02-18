import { BottomPopupItem } from '#shared/ui/absolute-popup/bottom-popup/BottomPopupItem';
import { FullScreenContent } from '#shared/ui/fullscreen-content';
import { useState } from 'react';
import NewComposition from './new-com/NewComposition';

export const EditCompositionsMore = ({ onClose }: { onClose(is: false): void }) => {
  const [isComCreatorOpen, setIsComCreatorOpen] = useState<unknown>(null);

  return (
    <>
      {isComCreatorOpen && (
        <FullScreenContent onClose={() => setIsComCreatorOpen(null)}>
          <NewComposition
            onClose={() => {
              setIsComCreatorOpen(false);
              onClose(false);
            }}
          />
        </FullScreenContent>
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
