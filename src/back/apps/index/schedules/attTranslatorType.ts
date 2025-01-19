export enum AttTranslatorType {
  Today = -1,
  AllTime = -2,
  TodayTomorrow = -3,
  TodayYesterday = -4,
  Tomorrow = -5,
  Yesterday = -6,
  TodayPrev = -7,
}

export const attTranslatorTypes = [
  {
    id: AttTranslatorType.Today,
    title: 'Сегодня',
  },
  {
    id: AttTranslatorType.Yesterday,
    title: 'Вчера',
  },
  {
    id: AttTranslatorType.Tomorrow,
    title: 'Завтра',
  },
  {
    id: AttTranslatorType.TodayTomorrow,
    title: 'Сегодня + Завтра',
  },
  {
    id: AttTranslatorType.TodayYesterday,
    title: 'Вчера + Сегодня',
  },
  {
    id: AttTranslatorType.TodayPrev,
    title: 'Предыдущие дни + Сегодня',
  },
  {
    id: AttTranslatorType.AllTime,
    title: 'Всё время',
  },
];
