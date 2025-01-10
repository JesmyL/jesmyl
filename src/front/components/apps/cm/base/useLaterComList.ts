import { useCallback, useEffect, useMemo } from 'react';
import { useAtom } from '../../../../complect/atoms';
import { useActualRef } from '../../../../complect/useActualRef';
import { Com } from '../col/com/Com';
import { useComs } from '../cols/useCols';
import { cmMolecule } from '../molecules';

let laterComs: Com[] | und;
const setLaterComs = (coms: Com[], list: number[]) =>
  (laterComs = list.map(comw => coms.find(com => com.wid === comw)).filter(com => com) as Com[]);

const laterComwListAtom = cmMolecule.select(s => s.laterComwList);

export default function useLaterComList({ maxStack = 4 } = {}) {
  const [list, setList] = useAtom(laterComwListAtom);
  const listRef = useActualRef(list);
  const coms = useComs();

  if (coms && laterComs == null) setLaterComs(coms, listRef.current);
  useEffect(() => {
    coms && setLaterComs(coms, listRef.current);
  }, [coms, listRef]);

  const addLaterComw = useCallback(
    (comw: number) => {
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
