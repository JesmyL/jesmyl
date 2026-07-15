import { useAtomValue } from 'atomaric';
import { useCallback } from 'react';
import { CmComWid } from 'shared/api';
import { cmComSelectedComwsAtom } from '../state/atoms';
import { useCmComList } from './coms-selections';

export const useCmComSelectedList = () => {
  const selectedComws = useAtomValue(cmComSelectedComwsAtom);
  const selectedComs = useCmComList(selectedComws);

  return {
    selectedComws,
    selectedComs,
    selectedComPosition: useCallback((comWid: CmComWid) => selectedComws.indexOf(comWid) + 1, [selectedComws]),
  };
};
