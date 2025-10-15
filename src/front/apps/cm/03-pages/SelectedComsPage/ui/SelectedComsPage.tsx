import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { CmComLocalListToolsPopup, CmComMoveSelectedButton, useCmComSelectedList } from '$cm/entities/com';
import { CmComFaceList } from '$cm/entities/com-face';
import { useState } from 'react';

export function CmSelectedComs() {
  const { selectedComs, selectedComws } = useCmComSelectedList();
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
              <CmComLocalListToolsPopup coms={selectedComs} />
            </BottomPopup>
          )}
          <CmComFaceList
            list={selectedComws}
            comDescription={(_comw, comi) => <CmComMoveSelectedButton comi={comi} />}
          />
        </>
      }
    />
  );
}
