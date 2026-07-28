import { translateBase } from '#basis/locale';
import { useCmComList } from '$cm/entities/com';
import { cmIDB } from '$cm/shared/state';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { CmCatWid } from 'shared/api';
import { CmCat } from 'shared/const/cm/Cat';
import { extractNumber } from 'shared/utils';
import { objectKeys } from 'shared/utils/object.utils';

export const useCmCat = (catw: CmCatWid) => {
  const icat = useCmCatICcat(catw);
  const comws = useMemo(() => icat?.s ?? (icat?.d && objectKeys(icat.d).map(extractNumber)), [icat?.d, icat?.s]);
  const coms = useCmComList(comws);

  return useMemo(() => {
    if (catw === CmCatWid.all)
      return new CmCat({ k: 'full', m: 0, n: translateBase(it => it.cm.cat.t.all), w: 0 }, coms);

    return icat && coms && new CmCat(icat, coms);
  }, [catw, coms, icat]);
};

export function useCmCatICcat(catw?: CmCatWid) {
  return useLiveQuery(() => cmIDB.db.cats.where({ w: catw }).first(), [catw]);
}
