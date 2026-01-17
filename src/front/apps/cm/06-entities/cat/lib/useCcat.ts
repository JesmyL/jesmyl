import { mylib } from '#shared/lib/my-lib';
import { useCmComList } from '$cm/entities/com';
import { cmIDB } from '$cm/shared/state';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { CmCatWid } from 'shared/api';
import { CmCat } from './Cat';

export const useCmCat = (catw: CmCatWid) => {
  const icat = useCmCatICcat(catw);
  const comws = useMemo(() => icat?.s ?? (icat?.d && mylib.keys(icat.d).map(Number)), [icat?.d, icat?.s]);
  const coms = useCmComList(comws);

  return useMemo(() => {
    if (catw === CmCatWid.zero) return new CmCat({ k: 'full', m: 0, n: 'Все песни', w: 0 }, coms);

    return icat && coms && new CmCat(icat, coms);
  }, [catw, coms, icat]);
};

export function useCmCatICcat(catw?: CmCatWid) {
  return useLiveQuery(() => cmIDB.db.cats.where({ w: catw }).first(), [catw]);
}
