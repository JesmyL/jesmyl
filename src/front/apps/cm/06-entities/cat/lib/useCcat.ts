import { cmIDB } from '$cm/shared/state';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { CmCatKind, CmCatWid, IExportableCat } from 'shared/api';
import { CmCat } from 'shared/const/cm/Cat';
import { extractNumber } from 'shared/utils';
import { objectKeys } from 'shared/utils/object.utils';
import { takeCmCatAdditional } from './additionalCat';

export const useCmCatMapComws = (cat: CmCat | nil) =>
  useMemo(() => cat?.top.s ?? (cat?.top.d && objectKeys(cat.top.d).map(extractNumber)), [cat?.top.d, cat?.top.s]);

export const useCmCatComws = (cat: CmCat | nil) => {
  const catComws = useCmCatMapComws(cat);
  const coms = useLiveQuery(async () => (catComws ? [] : cmIDB.db.coms.toArray()), [catComws]);

  return useMemo(() => {
    if (catComws) return catComws;
    if (!coms || !cat) return [];

    return coms.filter(icom => cat.hasCom(icom)).map(com => com.w);
  }, [catComws, coms, cat]);
};

export const useCmCatICcat = (catw?: number) =>
  useLiveQuery(async () => {
    const additional = takeCmCatAdditional(catw);
    if (additional) return additional;
    if (!catw) return new CmCat(makeDefICat());

    const icat = await cmIDB.db.cats.get(catw);

    return icat && new CmCat(icat);
  }, [catw]);

const makeDefICat = (): IExportableCat => ({
  k: CmCatKind.list,
  m: 0,
  n: '',
  w: CmCatWid.all,
});
