import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { RemovedComsModalInner } from '$cm+editor/features/RemovedComsModalInner';
import { NewComposition } from '$cm+editor/widgets/NewComposition';
import { useAuth } from '$index/atoms';
import { atom } from 'atomaric';
import { useEffect } from 'react';

const isRemovedComsOpenAtom = atom(false);
const isComCreatorOpenAtom = atom(false);

export const EditCompositionsMore = ({ onClose }: { onClose(is: boolean): void }) => {
  const auth = useAuth();

  useEffect(() => isComCreatorOpenAtom.subscribe(onClose), [onClose]);

  return (
    <>
      <BottomPopupItem
        id="create-com-button"
        icon="PlusSignCircle"
        title="Новая песня"
        onClick={isComCreatorOpenAtom.do.toggle}
      />
      <BottomPopupItem
        id="create-com-button"
        icon="FileRemove"
        title="Удалённые песни"
        onClick={isRemovedComsOpenAtom.do.toggle}
      />

      <FullContent openAtom={isComCreatorOpenAtom}>
        <NewComposition openAtom={isComCreatorOpenAtom} />
      </FullContent>

      {auth.level >= 80 && (
        <Modal openAtom={isRemovedComsOpenAtom}>
          <RemovedComsModalInner />
        </Modal>
      )}
    </>
  );
};
