import { useCom } from '@cm/col/com/useCcom';
import { useMemo } from 'react';

export const useCmCurrentComTexts = (pushKind: number | und) => {
  const com = useCom();

  return useMemo(() => com?.getOrderedTexts(true, pushKind), [com, pushKind]);
};
