import { PhaseContainerConfigurer } from 'front/complect/phase-container/PhaseContainerConfigurer';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { BottomPopup } from '../../../../../shared/ui/absolute-popup/bottom-popup/BottomPopup';
import { CmTranslationComListContextInMarks } from '../../base/translations/InMarks';
import { ComFaceList } from '../../col/com/face/list/ComFaceList';
import { cmCompositionRoute } from '../../routing/cmRoutingApp';
import { LocalListToolsPopup } from '../popups/LocalListToolsPopup';
import { useFavoriteComs } from './useFavoriteComs';

export function FavoriteComs() {
  const { markedComs } = useFavoriteComs();
  const [isOpenTools, setIsOpenTools] = useState(false);

  return (
    <Routes>
      <Route
        index
        element={
          <PhaseContainerConfigurer
            className="favorites-container"
            headTitle="Избранное"
            onMoreClick={setIsOpenTools}
            content={
              <>
                {isOpenTools && (
                  <BottomPopup onClose={setIsOpenTools}>
                    <LocalListToolsPopup coms={markedComs} />
                  </BottomPopup>
                )}
                <ComFaceList list={markedComs} />
              </>
            }
          />
        }
      />

      {cmCompositionRoute(children => (
        <CmTranslationComListContextInMarks>{children}</CmTranslationComListContextInMarks>
      ))}
    </Routes>
  );
}
