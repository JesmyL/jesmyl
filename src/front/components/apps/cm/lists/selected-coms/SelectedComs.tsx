import { PageContainer } from '#shared/ui/PageContainer';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { BottomPopup } from '../../../../../shared/ui/absolute-popup/bottom-popup/BottomPopup';
import { CmTranslationComListContextInSelected } from '../../basis/lib/com-list-contexts/InSelected';
import { useSelectedComs } from '../../basis/lib/hooks/useSelectedComs';
import { ComFaceList } from '../../col/com/face/list/ComFaceList';
import { cmCompositionRoute } from '../../routing/cmRoutingApp';
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
          <PageContainer
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
