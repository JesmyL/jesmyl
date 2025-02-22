import { PhaseContainerConfigurer } from '#shared/ui/phase-container/PhaseContainerConfigurer';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { CmTranslationComListContextInSelected } from '@cm/base/translations/InSelected';
import { useSelectedComs } from '@cm/base/useSelectedComs';
import { ComFaceList } from '@cm/col/com/face/list/ComFaceList';
import { cmCompositionRoute } from '@cm/routing/cmRoutingApp';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LocalListToolsPopup } from '../popups/LocalListToolsPopup';
import { MoveSelectedComButton } from './MoveSelectedComButton';

export function SelectedComs() {
  const { selectedComs, selectedComws } = useSelectedComs();
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  return (
    <Routes>
      <Route
        index
        element={
          <PhaseContainerConfigurer
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
        }
      />

      {cmCompositionRoute(children => (
        <CmTranslationComListContextInSelected>{children}</CmTranslationComListContextInSelected>
      ))}
    </Routes>
  );
}
