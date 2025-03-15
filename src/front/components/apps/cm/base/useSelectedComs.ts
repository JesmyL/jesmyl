import { cmIDB } from '$cm/_db/cm-idb';
import { useComs } from '$cm/basis/lib/coms-selections';
import { useCallback } from 'react';

export function useSelectedComs() {
  const [selectedComws, setSelectedComws] = cmIDB.use.selectedComws();
  const selectedComs = useComs(selectedComws);

  const selectedComPosition = useCallback((comWid: number) => selectedComws.indexOf(comWid) + 1, [selectedComws]);

  const toggleSelectedCom = useCallback(
    (comWid: number) => {
      setSelectedComws(
        selectedComPosition(comWid) ? selectedComws.filter(comw => comWid !== comw) : [...selectedComws, comWid],
      );
    },
    [selectedComPosition, selectedComws, setSelectedComws],
  );

  return {
    selectedComws,
    selectedComs,
    selectedComPosition,
    clearSelectedComws: () => setSelectedComws([]),
    toggleSelectedCom,
    setSelectedComws,
  };
}
