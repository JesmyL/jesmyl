import { mylib } from 'front/utils';
import { useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { CmComWid } from '../../../../../../shared/api/complect/apps/cm/complect/enums';
import { atom, useAtomSet, useAtomValue } from '../../../../../complect/atoms';
import { useNumComUpdates } from '../../atoms';
import { useComs } from '../../cols/useCols';
import { Com } from './Com';

export const useCcomw = (): CmComWid | NaN => {
  const params = useParams();
  const searchParams = useSearchParams();
  return searchParams[0].has('comw') ? +searchParams[0].get('comw')! : +params.comw!;
};

export function useCcom(topComw?: number): Com | und {
  useNumComUpdates();
  const coms = useComs();
  const ccomw = useCcomw();
  const comw = topComw ?? ccomw;

  return useMemo(() => coms.find(com => com.wid === comw), [coms, comw]);
}

export const ccomwAtom = atom<CmComWid | und>(undefined);

export function useCom(): Com | und {
  const coms = useComs();
  const comw = useAtomValue(ccomwAtom);

  return useMemo(() => coms.find(com => com.wid === comw), [coms, comw]);
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
