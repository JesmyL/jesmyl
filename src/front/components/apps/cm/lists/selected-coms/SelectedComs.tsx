import { BottomPopup } from '#widgets/absolute-popup/bottom-popup/BottomPopup';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import PhaseContainerConfigurer from '../../../../../07-shared/ui/phase-container/PhaseContainerConfigurer';
import { CmTranslationComListContextInSelected } from '../../base/translations/InSelected';
import useSelectedComs from '../../base/useSelectedComs';
import { ComFaceList } from '../../col/com/face/list/ComFaceList';
import { cmCompositionRoute } from '../../routing/cmRoutingApp';
import { LocalListToolsPopup } from '../popups/LocalListToolsPopup';
import { MoveSelectedComButton } from './MoveSelectedComButton';

export default function SelectedComs() {
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
