import { useCmCom, useCmComLastOpenComw } from '$cm/entities/com';
import { useMemo } from 'react';

export const useCmBroadcastCurrentComTexts = (pushKind: number | und) => {
  const lastOpenComw = useCmComLastOpenComw();
  const com = useCmCom(lastOpenComw);

  return useMemo(
    () =>
      com
        ?.groupSlideLinesByKind(com.takeSolidTextLines(false, true), pushKind)
        .flatMap(({ list }) => list)
        .map(lines => lines.join('\n')),
    [com, pushKind],
  );
};
