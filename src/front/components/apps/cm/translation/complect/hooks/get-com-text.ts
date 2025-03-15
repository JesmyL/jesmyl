import { useCom, useLastOpenComw } from '$cm/basis/lib/com-selections';
import { useMemo } from 'react';

export const useCmCurrentComTexts = (pushKind: number | und) => {
  const lastOpenComw = useLastOpenComw();
  const com = useCom(lastOpenComw);

  return useMemo(() => com?.getOrderedTexts(true, pushKind), [com, pushKind]);
};
