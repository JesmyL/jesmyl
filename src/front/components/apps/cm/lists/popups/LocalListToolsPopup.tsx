import { isTouchDevice } from '#shared/lib/device-differences';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { useCmOpenComLinkRendererContext } from '$cm/basis/lib/contexts/current-com-list';
import { Com } from '$cm/col/com/Com';
import { atom } from 'atomaric';
import { ComListQrShare } from './ComListShare';
import { FullscreenExpandComList } from './FullscreenExpandComList';

const isOpenQrAtom = atom(false);
const isOpenListAtom = atom(false);

export const LocalListToolsPopup = ({ coms }: { coms: Com[] | und }) => {
  const linkToCom = useCmOpenComLinkRendererContext();

  return !coms || !coms.length ? (
    <div className="flex justify-center">Список пуст</div>
  ) : (
    <>
      <BottomPopupItem
        icon="BookOpen02"
        title="Раскрыть песни списка"
        onClick={isOpenListAtom.do.toggle}
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
        onClick={isOpenQrAtom.do.toggle}
      />

      <ComListQrShare
        openAtom={isOpenQrAtom}
        coms={coms}
      />

      <FullContent
        openAtom={isOpenListAtom}
        containerClassName=""
      >
        <FullscreenExpandComList coms={coms} />
      </FullContent>
    </>
  );
};
