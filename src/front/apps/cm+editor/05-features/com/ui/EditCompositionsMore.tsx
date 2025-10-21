import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { Modal } from '#shared/ui/modal';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { CmEditorComCreate, CmEditorComRemovedComsModalInner } from '$cm+editor/widgets/com';
import { atom } from 'atomaric';
import { useEffect } from 'react';

const isRemovedComsOpenAtom = atom(false);
const isComCreatorOpenAtom = atom(false);

export const CmEditorComListEditMore = ({ onClose }: { onClose(is: boolean): void }) => {
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
            <CmEditorComCreate openAtom={isComCreatorOpenAtom} />
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
            <CmEditorComRemovedComsModalInner />
          </Modal>
        </>
      )}
    </>
  );
};
