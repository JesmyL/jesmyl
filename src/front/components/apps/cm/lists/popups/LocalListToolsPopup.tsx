import { isTouchDevice } from '#shared/lib/device-differences';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { useCmOpenComLinkRendererContext } from '$cm/basis/lib/contexts/current-com-list';
import { Com } from '$cm/col/com/Com';
import { useState } from 'react';
import { ComListQrShare } from './ComListShare';
import { FullscreenExpandComList } from './FullscreenExpandComList';

export const LocalListToolsPopup = ({ coms }: { coms: Com[] | und }) => {
  const [isOpenList, setIsOpenList] = useState(false);
  const [isOpenQr, setIsOpenQr] = useState(false);
  const linkToCom = useCmOpenComLinkRendererContext();

  return (
    coms && (
      <>
        {isOpenList && (
          <FullContent
            onClose={setIsOpenList}
            containerClassName=""
          >
            <FullscreenExpandComList coms={coms} />
          </FullContent>
        )}
        <BottomPopupItem
          icon="BookOpen02"
          title="Раскрыть песни списка"
          onClick={() => setIsOpenList(true)}
        />
        {linkToCom({
          children: (
            <BottomPopupItem
              icon={isTouchDevice ? 'Play' : 'Computer'}
              title="Показывать слайды списка"
            />
          ),
          search: {
            comw: coms[0].wid,
            tran: '-!-',
          },
        })}
        <BottomPopupItem
          icon="QrCode01"
          title="Поделиться списком"
          onClick={() => setIsOpenQr(true)}
        />
        {isOpenQr && (
          <ComListQrShare
            onClose={setIsOpenQr}
            coms={coms}
          />
        )}
      </>
    )
  );
};
