import { cmIDB } from '$cm/shared/state';
import { useLiveQuery } from 'dexie-react-hooks';
import { CmCat } from 'shared/const/cm/Cat';
import { cmAdditionalCategories } from 'shared/const/cm/additionalCategories';

export const useCmCatList = () =>
  useLiveQuery(async () => {
    const [icats, coms] = await Promise.all([cmIDB.db.cats.toArray(), cmIDB.db.coms.toArray()]);
    const cats = [...icats.map(icat => new CmCat(icat)), ...cmAdditionalCategories.map(CmCat.fromAdditional)];

    return cats.filter(cat => cat.hasComs(coms));
  }, []) ?? [];
