import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { RemovedComsModalInner } from '$cm+editor/features/RemovedComsModalInner';
import { NewComposition } from '$cm+editor/widgets/NewComposition';
import { useCheckUserAccessRightsInScope } from '$index/useCheckUserAccessRightsInScope';
import { atom } from 'atomaric';
import { useEffect } from 'react';

const isRemovedComsOpenAtom = atom(false);
const isComCreatorOpenAtom = atom(false);

export const EditCompositionsMore = ({ onClose }: { onClose(is: boolean): void }) => {
  const checkAccess = useCheckUserAccessRightsInScope();

  useEffect(() => isComCreatorOpenAtom.subscribe(onClose), [onClose]);

  return (
    <>
      {checkAccess('cm', 'COM', 'C') && (
        <>
          <BottomPopupItem
            id="create-com-button"
            icon="PlusSignCircle"
            title="Новая песня"
            onClick={isComCreatorOpenAtom.do.toggle}
          />
          <FullContent openAtom={isComCreatorOpenAtom}>
            <NewComposition openAtom={isComCreatorOpenAtom} />
          </FullContent>
        </>
      )}
      {checkAccess('cm', 'COM', 'D') && (
        <>
          <BottomPopupItem
            id="create-com-button"
            icon="FileRemove"
            title="Удалённые песни"
            onClick={isRemovedComsOpenAtom.do.toggle}
          />
          <Modal openAtom={isRemovedComsOpenAtom}>
            <RemovedComsModalInner />
          </Modal>
        </>
      )}
    </>
  );
};
