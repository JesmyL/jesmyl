import { StoragesRackSummaryType } from 'shared/model/storages/list.model';

export const storagesSummaryTypePropsDict: Record<
  StoragesRackSummaryType,
  { title: string; mapDateString: (dateTs: number) => string | null }
> = {
  [StoragesRackSummaryType.Total]: {
    title: 'Общее',
    mapDateString: () => null,
  },
  [StoragesRackSummaryType.ByMonth]: {
    title: 'За месяц',
    mapDateString: ts => new Date(ts).toLocaleString('ru', { year: 'numeric', month: 'long' }),
  },
  [StoragesRackSummaryType.ByYear]: {
    title: 'За год',
    mapDateString: ts => new Date(ts).toLocaleString('ru', { year: 'numeric' }),
  },
};

export const storagesSummaryTypeTitlesOrder = [
  StoragesRackSummaryType.Total,
  StoragesRackSummaryType.ByMonth,
  StoragesRackSummaryType.ByYear,
];
