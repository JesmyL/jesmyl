import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { RemovedComsModalInner } from '$cm+editor/features/RemovedComsModalInner';
import { NewComposition } from '$cm+editor/widgets/NewComposition';
import { useAuth } from '$index/atoms';
import { useState } from 'react';

export const EditCompositionsMore = ({ onClose }: { onClose(is: false): void }) => {
  const [isComCreatorOpen, setIsComCreatorOpen] = useState(false);
  const [isRemovedComsOpen, setIsRemovedComsOpen] = useState(false);
  const auth = useAuth();

  return (
    <>
      <BottomPopupItem
        id="create-com-button"
        icon="PlusSignCircle"
        title="Новая песня"
        onClick={() => setIsComCreatorOpen(true)}
      />
      <BottomPopupItem
        id="create-com-button"
        icon="FileRemove"
        title="Удалённые песни"
        onClick={() => setIsRemovedComsOpen(true)}
      />

      {isComCreatorOpen && (
        <FullContent
          onClose={() => {
            setIsComCreatorOpen(false);
            onClose(false);
          }}
        >
          {close => <NewComposition onClose={close} />}
        </FullContent>
      )}

      {auth.level >= 80 && isRemovedComsOpen && (
        <Modal onClose={setIsRemovedComsOpen}>
          <RemovedComsModalInner />
        </Modal>
      )}
    </>
  );
};
