import { isTouchDevice } from '#shared/lib/device-differences';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { CmCom } from '$cm/ext';
import { atom } from 'atomaric';
import { useCmComOpenComLinkRendererContext } from '../lib/current-com-list';
import { CmComListQrShare } from './ComListShare';
import { CmComFullscreenExpandList } from './FullscreenExpandComList';

const isOpenQrAtom = atom(false);
const isOpenListAtom = atom(false);

export const CmComLocalListToolsPopup = (props: { coms: CmCom[] | und; children?: React.ReactNode }) => {
  const linkToCom = useCmComOpenComLinkRendererContext();

  return !props.coms?.length ? (
    props.children
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
          comw: props.coms[0].wid,
          tran: '-!-',
        },
      })}
      <BottomPopupItem
        icon="QrCode01"
        title="Поделиться списком"
        onClick={isOpenQrAtom.do.toggle}
      />

      {props.children}

      <CmComListQrShare
        openAtom={isOpenQrAtom}
        coms={props.coms}
      />

      <FullContent
        openAtom={isOpenListAtom}
        containerClassName="p-0"
      >
        <CmComFullscreenExpandList coms={props.coms} />
      </FullContent>
    </>
  );
};
