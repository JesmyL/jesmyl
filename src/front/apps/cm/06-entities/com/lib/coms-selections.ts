import { contextCreator } from '#shared/lib/contextCreator';
import { CmCom } from '$cm/ext';
import { cmIDB } from '$cm/shared/state';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { CmComMod, CmComWid, IExportableCom } from 'shared/api';
import { itNNull } from 'shared/utils';

export const useCmComList = (comwsList?: CmComWid[] | nil, excludeComwsList?: CmComWid[]) => {
  const icoms = useLiveQuery(
    () =>
      (excludeComwsList == null
        ? comwsList == null
          ? cmIDB.db.coms
          : cmIDB.db.coms.where('w').anyOf(comwsList)
        : cmIDB.db.coms.where('w').noneOf(excludeComwsList)
      ).toArray(),
    [comwsList, excludeComwsList],
  );

  return useMemo(() => {
    if (icoms == null) return [];

    const comwIndexDict = {} as Record<CmComWid, number>;
    const unknownComwSet = new Set<CmComWid>(comwsList);

    if (comwsList) {
      comwsList.forEach((comw, comwi) => (comwIndexDict[comw] = comwi));
      icoms.forEach(com => unknownComwSet.delete(com.w));
    } else {
      icoms.forEach((com, comwi) => {
        comwIndexDict[com.w] = comwi;
        unknownComwSet.delete(com.w);
      });
    }

    const unknownComs =
      comwsList
        ?.map((comw): IExportableCom | null => (unknownComwSet.has(comw) ? { m: CmComMod.def, n: '', w: comw } : null))
        .filter(itNNull) ?? [];

    return icoms
      .concat(unknownComs)
      .sort((a, b) => comwIndexDict[a.w] - comwIndexDict[b.w])
      .map(icom => new CmCom(icom));
  }, [comwsList, icoms]);
};

export const [CmComListContext, useCmComListContext] = contextCreator<CmCom[]>([]);
