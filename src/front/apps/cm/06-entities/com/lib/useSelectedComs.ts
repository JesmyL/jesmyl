import { useAtom } from 'atomaric';
import { useCallback } from 'react';
import { cmComSelectedComwsAtom } from '../state/atoms';
import { useCmComList } from './coms-selections';

export const useCmComSelectedList = () => {
  const [selectedComws, setSelectedComws] = useAtom(cmComSelectedComwsAtom);
  const selectedComs = useCmComList(selectedComws);

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
};
