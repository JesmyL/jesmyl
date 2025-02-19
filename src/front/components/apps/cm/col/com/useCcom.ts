import { mylib } from '#shared/lib/my-lib';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { CmComWid } from '../../../../../../shared/api/complect/apps/cm/complect/enums';
import { atom, useAtomSet, useAtomValue } from '../../../../../shared/lib/atom';
import { cmIDB } from '../../_db/cm-idb';
import { Com } from './Com';

export const useCcomw = (): CmComWid | NaN => {
  const params = useParams();
  const searchParams = useSearchParams();
  return searchParams[0].has('comw') ? +searchParams[0].get('comw')! : +params.comw!;
};

export function useCcom(topComw?: number): Com | und {
  const ccomw = useCcomw();
  const comw = topComw ?? ccomw;
  const icom = useLiveQuery(() => mylib.isNNlOrUnd(comw) && cmIDB.tb.coms.get(comw), [comw]);

  return useMemo(() => icom && new Com(icom), [icom]);
}

export function useFixedCcom(topComw?: number): Com | und {
  const ccomw = useCcomw();
  const comw = topComw ?? ccomw;
  const icom = useLiveQuery(() => mylib.isNNlOrUnd(comw) && cmIDB.tb.coms.get(comw), [comw]);
  const ifixedCom = useLiveQuery(() => mylib.isNNlOrUnd(comw) && cmIDB.tb.fixedComs.get(+comw), [comw]);

  return useMemo(() => icom && new Com({ ...icom, ...ifixedCom }), [icom, ifixedCom]);
}

export const ccomwAtom = atom<CmComWid | und>(undefined);

export function useCom(): Com | und {
  const comw = useAtomValue(ccomwAtom);
  const icom = useLiveQuery(() => mylib.isNNlOrUnd(comw) && cmIDB.tb.coms.get(comw), [comw]);

  return useMemo(() => icom && new Com(icom), [icom]);
}

export const useTakeActualComw = (): number | NaN => {
  const setComw = useAtomSet(ccomwAtom);
  const comw = useCcomw();

  useEffect(() => {
    if (mylib.isNaN(comw)) return;
    setComw(comw);
  }, [comw, setComw]);

  return comw;
};

export const useActualCcomw = (): CmComWid | NaN => +useAtomValue(ccomwAtom)!;
