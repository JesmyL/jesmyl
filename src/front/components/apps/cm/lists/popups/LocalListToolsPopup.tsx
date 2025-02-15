import { useState } from 'react';
import { BottomPopupItem } from '../../../../../complect/absolute-popup/bottom-popup/BottomPopupItem';
import { isTouchDevice } from '../../../../../complect/device-differences';
import { FullContent } from '../../../../../complect/fullscreen-content/FullContent';
import { Com } from '../../col/com/Com';
import { ComListQrShare } from './ComListShare';
import FullscreenExpandComList from './FullscreenExpandComList';

export const LocalListToolsPopup = ({ coms }: { coms: Com[] | und }) => {
  const [isOpenList, setIsOpenList] = useState(false);
  const [isOpenQr, setIsOpenQr] = useState(false);

  return (
    coms && (
      <>
        {isOpenList && (
          <FullContent
            onClose={setIsOpenList}
            containerClassName=""
            asRootAnchor={() => <FullscreenExpandComList coms={coms} />}
          />
        )}
        <BottomPopupItem
          icon="BookOpen02"
          title="Раскрыть песни списка"
          onClick={() => setIsOpenList(true)}
        />
        <BottomPopupItem
          icon={isTouchDevice ? 'Play' : 'Computer'}
          title="Показывать слайды списка"
          path={`@tran${coms?.length ? `?comw=${coms[0].wid}` : ''}`}
        />
        <BottomPopupItem
          icon="QrCode01"
          title="Поделиться списком"
          onClick={event => {
            event.stopPropagation();
            setIsOpenQr(true);
          }}
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
