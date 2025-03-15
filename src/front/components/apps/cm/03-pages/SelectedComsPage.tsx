import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { useSelectedComs } from '$cm/base/useSelectedComs';
import { ComFaceList } from '$cm/col/com/face/list/ComFaceList';
import { MoveSelectedComButton } from '$cm/entities/MoveSelectedComButton';
import { useState } from 'react';
import { LocalListToolsPopup } from '../lists/popups/LocalListToolsPopup';

export function SelectedComs() {
  const { selectedComs, selectedComws } = useSelectedComs();
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  return (
    <PageContainerConfigurer
      className="favorites-container"
      headTitle="Выбранное"
      onMoreClick={setIsToolsOpen}
      content={
        <>
          {isToolsOpen && (
            <BottomPopup onClose={setIsToolsOpen}>
              <LocalListToolsPopup coms={selectedComs} />
            </BottomPopup>
          )}
          <ComFaceList
            list={selectedComws}
            comDescription={(_comw, comi) => <MoveSelectedComButton comi={comi} />}
          />
        </>
      }
    />
  );
}
