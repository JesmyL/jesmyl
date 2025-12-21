import { contextCreator } from '#shared/lib/contextCreator';
import { cmIDB } from '$cm/shared/state';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { CmComMod, CmComWid, IExportableCom } from 'shared/api';
import { itNNull } from 'shared/utils';
import { CmCom } from './Com';

export const useCmComList = (comwsLine?: CmComWid[]) => {
  const icoms = useLiveQuery(
    () => (comwsLine == null ? cmIDB.db.coms.toArray() : cmIDB.db.coms.where('w').anyOf(comwsLine).toArray()),
    [comwsLine],
  );

  return useMemo(() => {
    if (icoms == null) return [];

    const comwIndexDict = {} as Record<CmComWid, number>;
    const unknownComwSet = new Set<CmComWid>(comwsLine);

    if (comwsLine) {
      comwsLine.forEach((comw, comwi) => (comwIndexDict[comw] = comwi));
      icoms.forEach(com => unknownComwSet.delete(com.w));
    } else {
      icoms.forEach((com, comwi) => {
        comwIndexDict[com.w] = comwi;
        unknownComwSet.delete(com.w);
      });
    }

    const unknownComs =
      comwsLine
        ?.map((comw): IExportableCom | null => (unknownComwSet.has(comw) ? { m: CmComMod.def, n: '', w: comw } : null))
        .filter(itNNull) ?? [];

    return icoms
      .concat(unknownComs)
      .sort((a, b) => comwIndexDict[a.w] - comwIndexDict[b.w])
      .map(icom => new CmCom(icom));
  }, [comwsLine, icoms]);
};

export const [CmComListContext, useCmComListContext] = contextCreator<CmCom[]>([]);
