import { translateBase } from '#basis/locale';
import { useCmComIComList } from '$cm/entities/com';
import { cmIDB } from '$cm/shared/state';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { CmCatWid, IExportableCat } from 'shared/api';
import { CmCat } from 'shared/const/cm/Cat';
import { extractNumber } from 'shared/utils';
import { objectKeys } from 'shared/utils/object.utils';

export const useCmCat = (catw: CmCatWid) => {
  const icat = useCmCatICcat(catw);
  const icoms = useCmComIComList(useCmCatMapComws(icat));

  return useMemo(() => {
    if (catw === CmCatWid.all) return new CmCat(makeDefICat(), icoms);
    return icat && icoms && new CmCat(icat, icoms);
  }, [catw, icoms, icat]);
};

export const useCmCatMapComws = (icat: IExportableCat | nil) =>
  useMemo(() => icat?.s ?? (icat?.d && objectKeys(icat.d).map(extractNumber)) ?? [], [icat?.d, icat?.s]);

export const useCmCatComws = (catw: CmCatWid) => useCmCatMapComws(useCmCatICcat(catw));

export const useCmCatICcat = (catw?: CmCatWid) =>
  useLiveQuery(async () => (catw ? cmIDB.db.cats.get(catw) : makeDefICat()), [catw]);

const makeDefICat = () =>
  ({
    k: 'full',
    m: 0,
    t: 'all',
    n: translateBase(it => it.cm.cat.li.all),
    w: CmCatWid.all,
  }) satisfies IExportableCat;
