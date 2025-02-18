import { BottomPopup } from '#shared/ui/absolute-popup/bottom-popup/BottomPopup';
import PhaseContainerConfigurer from 'front/08-shared/ui/phase-container/PhaseContainerConfigurer';
import { ComFaceList } from 'front/components/apps/cm/col/com/face/list/ComFaceList';
import { useFavoriteComs } from 'front/components/apps/cm/lists/favorites/useFavoriteComs';
import { LocalListToolsPopup } from 'front/components/apps/cm/lists/popups/LocalListToolsPopup';
import { useState } from 'react';

export const FavoriteComsPage = () => {
  const { markedComs } = useFavoriteComs();
  const [isOpenTools, setIsOpenTools] = useState(false);

  return (
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
  );
};
