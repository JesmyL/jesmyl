import { isTouchDevice } from '#shared/lib/device-differences';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { atom } from 'atomaric';
import { CmCom } from '../lib/Com';
import { useCmComOpenComLinkRendererContext } from '../lib/current-com-list';
import { CmComListQrShare } from './ComListShare';
import { CmComFullscreenExpandList } from './FullscreenExpandComList';

const isOpenQrAtom = atom(false);
const isOpenListAtom = atom(false);

export const CmComLocalListToolsPopup = ({ coms }: { coms: CmCom[] | und }) => {
  const linkToCom = useCmComOpenComLinkRendererContext();

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

      <CmComListQrShare
        openAtom={isOpenQrAtom}
        coms={coms}
      />

      <FullContent
        openAtom={isOpenListAtom}
        containerClassName=""
      >
        <CmComFullscreenExpandList coms={coms} />
      </FullContent>
    </>
  );
};
