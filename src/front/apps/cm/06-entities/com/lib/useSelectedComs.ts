import { useAtomValue } from 'atomaric';
import { useCallback } from 'react';
import { cmComSelectedComwsAtom } from '../state/atoms';
import { useCmComList } from './coms-selections';

export const useCmComSelectedList = () => {
  const selectedComws = useAtomValue(cmComSelectedComwsAtom);
  const selectedComs = useCmComList(selectedComws);

  return {
    selectedComws,
    selectedComs,
    selectedComPosition: useCallback((comWid: number) => selectedComws.indexOf(comWid) + 1, [selectedComws]),
  };
};
