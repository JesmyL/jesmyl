import { BottomPopup } from '#shared/ui/absolute-popup/bottom-popup/BottomPopup';
import PhaseContainerConfigurer from 'front/08-shared/ui/phase-container/PhaseContainerConfigurer';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { cmCompositionRoute } from '../../../../../01-app/router-configs/cm';
import useSelectedComs from '../../../../../07-basis/lib/hooks/cm/useSelectedComs';
import { CmTranslationComListContextInSelected } from '../../base/translations/InSelected';
import { ComFaceList } from '../../col/com/face/list/ComFaceList';
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
