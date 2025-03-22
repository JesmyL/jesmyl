import { mylib } from '#shared/lib/my-lib';
import { cmIDB } from '$cm/basis/lib/cmIDB';
import { useComs } from '$cm/basis/lib/coms-selections';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { CmCatWid } from 'shared/api';
import { Cat } from './Cat';

export const useCat = (catw: CmCatWid) => {
  const icat = useIccat(catw);
  const comws = useMemo(() => icat?.s ?? (icat?.d && mylib.keys(icat.d).map(Number)), [icat?.d, icat?.s]);
  const coms = useComs(comws);

  return useMemo(() => {
    if (catw === CmCatWid.zero) return new Cat({ k: 'all', m: 0, n: 'Все песни', w: 0 }, coms);

    return icat && coms && new Cat(icat, coms);
  }, [catw, coms, icat]);
};

export function useIccat(catw?: CmCatWid) {
  return useLiveQuery(() => cmIDB.db.cats.where({ w: catw }).first(), [catw]);
}
