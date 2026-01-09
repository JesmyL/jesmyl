import { useCmCom, useCmComLastOpenComw } from '$cm/entities/com';
import { useMemo } from 'react';

export const useCmBroadcastCurrentComTexts = (pushKind: number | und) => {
  const lastOpenComw = useCmComLastOpenComw();
  const com = useCmCom(lastOpenComw);

  return useMemo(() => com?.makeSlideTexts(true, pushKind), [com, pushKind]);
};
