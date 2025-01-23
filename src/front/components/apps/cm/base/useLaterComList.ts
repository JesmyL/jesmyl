import { useCallback, useEffect, useMemo } from 'react';
import { useActualRef } from '../../../../complect/useActualRef';
import { cmIDB } from '../_db/cm-idb';
import { Com } from '../col/com/Com';
import { useComs } from '../cols/useCols';

let laterComs: Com[] | und;
const setLaterComs = (coms: Com[], list: number[]) =>
  (laterComs = list.map(comw => coms.find(com => com.wid === comw)).filter(com => com) as Com[]);

export default function useLaterComList({ maxStack = 4 } = {}) {
  const [list, setList] = cmIDB.use.laterComwList();
  const listRef = useActualRef(list);
  const coms = useComs();

  if (coms && laterComs == null) setLaterComs(coms, listRef.current);
  useEffect(() => {
    coms && setLaterComs(coms, listRef.current);
  }, [coms, listRef]);

  const addLaterComw = useCallback(
    (comw: number) => {
      if (comw === 0) return;
      const newList = [comw].concat(
        listRef.current.filter(laterComw => laterComw !== comw).filter((_, laterComwi) => maxStack - 1 > laterComwi),
      );
      setList(newList);
    },
    [listRef, maxStack, setList],
  );

  return useMemo(
    () => ({
      laterComs,
      updateLaterComwList: setList,
      addLaterComw,
    }),
    [addLaterComw, setList],
  );
}
