import { useAtomValue } from 'atomaric';
import { useCallback } from 'react';
import { CmComWid } from 'shared/api';
import { cmComSelectedComwsAtom } from '../state/atoms';
import { useCmComIComList } from './coms-selections';

export const useCmComSelectedList = () => {
  const selectedComws = useAtomValue(cmComSelectedComwsAtom);
  const selectedIComs = useCmComIComList(selectedComws);

  return {
    selectedComws,
    selectedIComs,
    selectedComPosition: useCallback((comWid: CmComWid) => selectedComws.indexOf(comWid) + 1, [selectedComws]),
  };
};
