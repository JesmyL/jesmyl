import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { CmComLocalListToolsPopup } from '$cm/entities/com';
import { CmComFaceList } from '$cm/entities/com-face';
import { useCmComFavouriteList } from '$cm/entities/com-favourite';
import { useState } from 'react';

export const CmFavouriteComsPage = () => {
  const { favouriteComs } = useCmComFavouriteList();
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
              <CmComLocalListToolsPopup coms={favouriteComs} />
            </BottomPopup>
          )}
          <CmComFaceList list={favouriteComs} />
        </>
      }
    />
  );
};
