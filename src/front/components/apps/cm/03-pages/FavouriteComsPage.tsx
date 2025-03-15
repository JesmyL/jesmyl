import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { useState } from 'react';

import { ComFaceList } from '../col/com/face/list/ComFaceList';
import { useFavouriteComs } from '../lists/favourites/useFavouriteComs';
import { LocalListToolsPopup } from '../lists/popups/LocalListToolsPopup';

export const CmFavoriteComsPage = () => {
  const { favouriteComs } = useFavouriteComs();
  const [isOpenTools, setIsOpenTools] = useState(false);

  return (
    <PageContainerConfigurer
      className="favorites-container"
      headTitle="Избранное"
      onMoreClick={setIsOpenTools}
      content={
        <>
          {isOpenTools && (
            <BottomPopup onClose={setIsOpenTools}>
              <LocalListToolsPopup coms={favouriteComs} />
            </BottomPopup>
          )}
          <ComFaceList list={favouriteComs} />
        </>
      }
    />
  );
};
