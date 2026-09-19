import { translateBase } from '#basis/locale';
import { cmIDB } from '$cm/shared/state';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { CmCatWid, IExportableCat } from 'shared/api';
import { CmCat } from 'shared/const/cm/Cat';
import { cmEditorCategoryTrackers } from 'shared/const/cm/cmEditorCategoryTrackers';
import { extractNumber } from 'shared/utils';
import { objectKeys } from 'shared/utils/object.utils';

export const useCmCatMapComws = (icat: IExportableCat | nil) =>
  useMemo(() => icat?.s ?? (icat?.d && objectKeys(icat.d).map(extractNumber)), [icat?.d, icat?.s]);

export const useCmCatComws = (icat: IExportableCat | nil) => {
  const catComws = useCmCatMapComws(icat);
  const coms = useLiveQuery(async () => (catComws ? [] : cmIDB.db.coms.toArray()), [catComws]);

  return useMemo(() => {
    if (catComws) return catComws;
    if (!coms || !icat) return [];
    let resultComs;

    if (icat.k === 'full') resultComs = coms;
    else {
      const cat = new CmCat(icat);
      const select = cmEditorCategoryTrackers[icat.k];

      resultComs = coms.filter(icom => select(icom, cat));
    }

    return resultComs.map(com => com.w);
  }, [catComws, coms, icat]);
};

export const useCmCatICcat = (catw?: CmCatWid) =>
  useLiveQuery(async () => (catw ? cmIDB.db.cats.get(catw) : makeDefICat()), [catw]);

const makeDefICat = (): IExportableCat => ({
  k: 'full',
  m: 0,
  t: 'all',
  n: translateBase(it => it.cm.cat.li.all),
  w: CmCatWid.all,
});
