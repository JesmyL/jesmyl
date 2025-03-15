import { cmIDB } from '$cm/_db/cm-idb';
import { useCcom } from '$cm/basis/lib/com-selections';
import { useCmCurrentComPackContext } from '$cm/basis/lib/contexts/current-com-list';
import { Com } from '$cm/col/com/Com';
import { cmCurrentComwIdPrefix } from '$cm/col/com/face/lib/consts';
import { useFavouriteComs } from '$cm/lists/favourites/useFavouriteComs';
import { useNavigate } from '@tanstack/react-router';
import { useCallback } from 'react';
import { useCmScreenTranslationComTextNavigations } from './com-texts';

export const useCmScreenTranslationComNavigations = () => {
  const { favouriteComs } = useFavouriteComs();
  const isShowFavouritesList = cmIDB.useValue.isShowFavouritesInTranslations();
  const ccom = useCcom();
  const navigate = useNavigate();
  const setCom: (com: Com) => void = useCallback(
    (com: Com) =>
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

  const comPack = useCmCurrentComPackContext();
  const coms = isShowFavouritesList ? favouriteComs : comPack.list;
  const { setTexti } = useCmScreenTranslationComTextNavigations();

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

const getComi = (comw?: number, coms?: Com[]) => {
  if (!coms || comw == null) return -1;
  return coms.findIndex(com => comw === com.wid);
};

const scrollToView = (com: Com) => {
  const comFace = document.getElementById(`${cmCurrentComwIdPrefix}${com.wid}`);
  if (comFace) comFace.scrollIntoView({ block: 'center' });
};
