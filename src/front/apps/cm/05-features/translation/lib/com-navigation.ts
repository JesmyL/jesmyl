import { CmCom, useCmComCurrent, useCmComCurrentComPackContext } from '$cm/entities/com';
import { cmComFaceCurrentComwIdPrefix } from '$cm/entities/com-face';
import { useCmComFavouriteList } from '$cm/entities/com-favourite';
import { cmComIsShowFavouritesInTranslationsAtom } from '$cm/entities/index';
import { useNavigate } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { useCallback } from 'react';
import { useCmTranslationScreenComTextNavigations } from './com-texts';

export const useCmTranslationScreenComNavigations = () => {
  const { favouriteComs } = useCmComFavouriteList();
  const isShowFavouritesList = useAtomValue(cmComIsShowFavouritesInTranslationsAtom);
  const ccom = useCmComCurrent();
  const navigate = useNavigate();
  const setCom: (com: CmCom) => void = useCallback(
    (com: CmCom) =>
      navigate({
        to: '.',
        search: prev =>
          ({
            ...(prev as object),
            comw: com.wid,
          }) as object,
      }),
    [navigate],
  );

  const comPack = useCmComCurrentComPackContext();
  const coms = isShowFavouritesList ? favouriteComs : comPack.list;
  const { setTexti } = useCmTranslationScreenComTextNavigations();

  return {
    coms,
    comPack,
    prevCom: useCallback(() => {
      const comi = getComi(ccom?.wid, coms);
      if (comi < 0) return;
      const nextCom = coms[comi === 0 ? coms.length - 1 : comi - 1];

      setCom(nextCom);
      setTexti(0);
      scrollToView(nextCom);
    }, [ccom?.wid, coms, setCom, setTexti]),
    nextCom: useCallback(() => {
      const comi = getComi(ccom?.wid, coms);
      if (comi < 0) return;
      const nextCom = coms[comi === coms.length - 1 ? 0 : comi + 1];

      setCom(nextCom);
      setTexti(0);
      scrollToView(nextCom);
    }, [ccom?.wid, coms, setCom, setTexti]),
  };
};

const getComi = (comw?: number, coms?: CmCom[]) => {
  if (!coms || comw == null) return -1;
  return coms.findIndex(com => comw === com.wid);
};

const scrollToView = (com: CmCom) => {
  const comFace = document.getElementById(`${cmComFaceCurrentComwIdPrefix}${com.wid}`);
  if (comFace) comFace.scrollIntoView({ block: 'center' });
};
