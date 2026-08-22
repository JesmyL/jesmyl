import {
  cmComFavoriteComwsAtom,
  cmComSelectedComwsAtom,
  useCmComCurrent,
  useCmComCurrentComPackContext,
} from '$cm/entities/com';
import { cmComFaceCurrentComwIdPrefix } from '$cm/entities/com-face';
import { cmOpenComListModeAtom } from '$cm/shared/state';
import { useNavigate } from '@tanstack/react-router';
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
  const navigate = useNavigate();
  const setCom = useCallback(
    (comw: CmComWid) =>
      navigate({
        to: '.',
        search: prev => ({ ...(prev as object), comw }) as object,
      }),
    [navigate],
  );

  const { comws } = useCmBroadcastScreenComNavigationComws();
  const { setSlidei } = useCmBroadcastSlidesContext();

  return {
    prevCom: useCallback(() => {
      const comi = getComi(ccom?.wid, comws);
      if (comi < 0) return;
      const nextCom = comws[comi === 0 ? comws.length - 1 : comi - 1];

      setCom(nextCom);
      setSlidei(0);
      scrollToView(nextCom);
    }, [ccom?.wid, comws, setCom, setSlidei]),
    nextCom: useCallback(() => {
      const comi = getComi(ccom?.wid, comws);
      if (comi < 0) return;
      const nextCom = comws[comi === comws.length - 1 ? 0 : comi + 1];

      setCom(nextCom);
      setSlidei(0);
      scrollToView(nextCom);
    }, [ccom?.wid, comws, setCom, setSlidei]),
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
