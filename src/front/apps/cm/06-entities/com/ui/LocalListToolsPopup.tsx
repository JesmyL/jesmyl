import { translateBase } from '#basis/locale';
import { isTouchDevice } from '#shared/lib/device-differences';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { Link } from '@tanstack/react-router';
import { Atom, atom } from 'atomaric';
import { CmComWid } from 'shared/api';
import { CmComListQrShare } from './ComListShare';
import { CmComFullscreenExpandList } from './FullscreenExpandComList';

let isOpenQrAtom: Atom<boolean>;
let isOpenListAtom: Atom<boolean>;

export const CmComLocalListToolsPopup = ({
  comws,
  children,
}: {
  comws: CmComWid[] | und;
  children?: React.ReactNode;
}) => {
  isOpenQrAtom ??= atom(false);
  isOpenListAtom ??= atom(false);

  return !comws?.length ? (
    children
  ) : (
    <>
      <BottomPopupItem
        icon="BookOpen02"
        title={translateBase(it => it.cm.com.expandList)}
        onClick={isOpenListAtom.do.toggle}
      />

      <Link
        to="."
        search={prev => ({
          ...(prev as object),
          comw: comws[0],
          tran: '-!-',
        })}
      >
        <BottomPopupItem
          icon={isTouchDevice ? 'Play' : 'Computer'}
          title={translateBase(it => it.cm.com.showLiSlides)}
        />
      </Link>

      <BottomPopupItem
        icon="QrCode01"
        title={translateBase(it => it.cm.com.shareLi)}
        onClick={isOpenQrAtom.do.toggle}
      />

      {children}

      <CmComListQrShare
        openAtom={isOpenQrAtom}
        comws={comws}
      />

      <FullContent
        openAtom={isOpenListAtom}
        containerClassName="p-0"
      >
        <CmComFullscreenExpandList comws={comws} />
      </FullContent>
    </>
  );
};
