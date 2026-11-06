import { Langi } from 'shared/api';
import { takeLangSystemCode } from 'shared/const/+locale';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { StoragesRackSummaryType } from 'shared/model/storages/list.model';
import { translateBase } from 'shared/utils/locale/base';

export const storagesSummaryTypePropsDict: Record<
  StoragesRackSummaryType,
  { title: string; mapDateString: (dateTs: number, langi?: Langi) => string | null }
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
    mapDateString: (ts, langi = Langi.Ru) =>
      new Date(ts).toLocaleString(takeLangSystemCode(langi), { year: 'numeric', month: 'long' }),
  },
  [StoragesRackSummaryType.ByYear]: {
    get title() {
      return translateBase(BaseLocaleKey.StoragesByYear);
    },
    mapDateString: (ts, langi = Langi.Ru) => new Date(ts).toLocaleString(takeLangSystemCode(langi), { year: 'numeric' }),
  },
};

export const storagesSummaryTypeTitlesOrder = [
  StoragesRackSummaryType.Total,
  StoragesRackSummaryType.ByMonth,
  StoragesRackSummaryType.ByYear,
];
