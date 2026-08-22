import { translateBase } from '#basis/locale';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { cmComFavoriteComwsAtom, CmComLocalListToolsPopup } from '$cm/entities/com';
import { CmComFaceList } from '$cm/entities/com-face';
import { useAtomValue } from 'atomaric';
import { useState } from 'react';

export const CmFavouriteComsPage = () => {
  const favouriteComws = useAtomValue(cmComFavoriteComwsAtom);
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
              <CmComLocalListToolsPopup comws={favouriteComws} />
            </BottomPopup>
          )}
          <CmComFaceList list={favouriteComws} />
        </>
      }
    />
  );
};
