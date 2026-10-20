import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { StoragesRackSummaryType } from 'shared/model/storages/list.model';
import { translateBase } from 'shared/utils/locale/base';

export const storagesSummaryTypePropsDict: Record<
  StoragesRackSummaryType,
  { title: string; mapDateString: (dateTs: number) => string | null }
> = {
  [StoragesRackSummaryType.Total]: {
    get title() {
      return translateBase(BaseLocaleKey.StoragesTotal);
    },
    mapDateString: () => null,
  },
  [StoragesRackSummaryType.ByMonth]: {
    get title() {
      return translateBase(BaseLocaleKey.StoragesByMonth);
    },
    mapDateString: ts => new Date(ts).toLocaleString('ru', { year: 'numeric', month: 'long' }),
  },
  [StoragesRackSummaryType.ByYear]: {
    get title() {
      return translateBase(BaseLocaleKey.StoragesByYear);
    },
    mapDateString: ts => new Date(ts).toLocaleString('ru', { year: 'numeric' }),
  },
};

export const storagesSummaryTypeTitlesOrder = [
  StoragesRackSummaryType.Total,
  StoragesRackSummaryType.ByMonth,
  StoragesRackSummaryType.ByYear,
];
