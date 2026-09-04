import {
  cmComFavoriteComwsAtom,
  cmComLastOpenComwAtom,
  cmComSelectedComwsAtom,
  useCmComCurrent,
  useCmComCurrentComPackContext,
} from '$cm/entities/com';
import { cmComFaceCurrentComwIdPrefix } from '$cm/entities/com-face';
import { cmOpenComListModeAtom } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';
import { useCallback } from 'react';
import { CmComWid } from 'shared/api';
import { useCmBroadcastSlidesContext } from '../state/slides';

export const useCmBroadcastScreenComNavigationComws = () => {
  const favComws = useAtomValue(cmComFavoriteComwsAtom);
  const selComws = useAtomValue(cmComSelectedComwsAtom);
  const openListMode = useAtomValue(cmOpenComListModeAtom);

  const comPack = useCmComCurrentComPackContext();

  return {
    comPack,
    comws: openListMode === 'fav' ? favComws : openListMode === 'sel' ? selComws : comPack.comws,
  };
};

export const useCmBroadcastScreenComNavigations = () => {
  const ccom = useCmComCurrent();

  const { comws } = useCmBroadcastScreenComNavigationComws();
  const { setSlidei } = useCmBroadcastSlidesContext();

  return {
    prevCom: useCallback(() => {
      const comi = getComi(ccom?.wid, comws);
      if (comi < 0) return;
      const nextComw = comws[comi === 0 ? comws.length - 1 : comi - 1];

      cmComLastOpenComwAtom.set(nextComw);
      setSlidei(0);
      scrollToView(nextComw);
    }, [ccom?.wid, comws, setSlidei]),
    nextCom: useCallback(() => {
      const comi = getComi(ccom?.wid, comws);
      if (comi < 0) return;
      const nextComw = comws[comi === comws.length - 1 ? 0 : comi + 1];

      cmComLastOpenComwAtom.set(nextComw);
      setSlidei(0);
      scrollToView(nextComw);
    }, [ccom?.wid, comws, setSlidei]),
  };
};

const getComi = (comw?: number, coms?: CmComWid[]) => {
  if (!coms || comw == null) return -1;
  return coms.findIndex(cw => comw === cw);
};

const scrollToView = (comw: CmComWid) => {
  const comFace = document.getElementById(`${cmComFaceCurrentComwIdPrefix}${comw}`);
  if (comFace) comFace.scrollIntoView({ block: 'center' });
};
