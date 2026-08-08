import { translateBase } from '#basis/locale';
import { isTouchDevice } from '#shared/lib/device-differences';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { Atom, atom } from 'atomaric';
import { IExportableCom } from 'shared/api';
import { useCmComOpenComLinkRendererContext } from '../lib/current-com-list';
import { CmComListQrShare } from './ComListShare';
import { CmComFullscreenExpandList } from './FullscreenExpandComList';

let isOpenQrAtom: Atom<boolean>;
let isOpenListAtom: Atom<boolean>;

export const CmComLocalListToolsPopup = (props: { icoms: IExportableCom[] | und; children?: React.ReactNode }) => {
  isOpenQrAtom ??= atom(false);
  isOpenListAtom ??= atom(false);

  const linkToCom = useCmComOpenComLinkRendererContext();

  return !props.icoms?.length ? (
    props.children
  ) : (
    <>
      <BottomPopupItem
        icon="BookOpen02"
        title={translateBase(it => it.cm.com.expandList)}
        onClick={isOpenListAtom.do.toggle}
      />
      {linkToCom({
        children: (
          <BottomPopupItem
            icon={isTouchDevice ? 'Play' : 'Computer'}
            title={translateBase(it => it.cm.com.showLiSlides)}
          />
        ),
        search: {
          comw: props.icoms[0].w,
          tran: '-!-',
        },
      })}
      <BottomPopupItem
        icon="QrCode01"
        title={translateBase(it => it.cm.com.shareLi)}
        onClick={isOpenQrAtom.do.toggle}
      />

      {props.children}

      <CmComListQrShare
        openAtom={isOpenQrAtom}
        icoms={props.icoms}
      />

      <FullContent
        openAtom={isOpenListAtom}
        containerClassName="p-0"
      >
        <CmComFullscreenExpandList coms={props.icoms} />
      </FullContent>
    </>
  );
};
