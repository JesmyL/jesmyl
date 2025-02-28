import { PhaseContainerConfigurer } from '#shared/ui/phase-container/PhaseContainerConfigurer';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { useState } from 'react';

import { Route, Routes } from 'react-router-dom';
import { CmTranslationComListContextInFavourites } from '../../base/translations/InFavourites';
import { ComFaceList } from '../../col/com/face/list/ComFaceList';
import { cmCompositionRoute } from '../../routing/cmRoutingApp';
import { LocalListToolsPopup } from '../popups/LocalListToolsPopup';
import { useFavoriteComs } from './useFavouriteComs';

export function FavoriteComs() {
  const { favouriteComws } = useFavoriteComs();
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
                    <LocalListToolsPopup coms={favouriteComws} />
                  </BottomPopup>
                )}
                <ComFaceList list={favouriteComws} />
              </>
            }
          />
        }
      />

      {cmCompositionRoute(children => (
        <CmTranslationComListContextInFavourites>{children}</CmTranslationComListContextInFavourites>
      ))}
    </Routes>
  );
}
