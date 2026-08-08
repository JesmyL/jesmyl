import { translateBase } from '#basis/locale';
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
      headTitle={translateBase(it => it.fav)}
      onMoreClick={setIsOpenTools}
      content={
        <>
          {isOpenTools && (
            <BottomPopup onClose={setIsOpenTools}>
              <CmComLocalListToolsPopup icoms={favouriteComs} />
            </BottomPopup>
          )}
          <CmComFaceList list={favouriteComs} />
        </>
      }
    />
  );
};
