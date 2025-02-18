import { cmIDB } from '#basis/lib/idb/cm';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { CmCatWid } from 'shared/api';
import { useComs } from '../../cols/useCols';
import { Cat } from './Cat';

export function useCcat(isTakeZeroCat?: boolean): Cat | nil {
  const icat = useIccat(isTakeZeroCat ? 0 : undefined);
  const coms = useComs();

  return useMemo(() => {
    if (isTakeZeroCat) return new Cat({ k: 'all', m: 0, n: 'Все песни', w: 0 }, coms);

    return icat && coms && new Cat(icat, coms);
  }, [coms, icat, isTakeZeroCat]);
}

export const useCcatw = () => +useParams().catw! as CmCatWid | NaN;

export function useIccat(catw?: CmCatWid) {
  const ccatw = useCcatw();
  return useLiveQuery(() => cmIDB.db.cats.where({ w: catw ?? ccatw }).first(), [catw, ccatw]);
}
