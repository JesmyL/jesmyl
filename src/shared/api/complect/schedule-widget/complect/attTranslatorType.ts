export const enum AttTranslatorType {
  /** Только сегодняшний день */
  Today = -1,
  /** Всё время */
  AllTime = -2,
  /** Сегодня и завтра */
  TodayTomorrow = -3,
  /** Вчера и сегодня */
  TodayYesterday = -4,
  /** Только завтрашний день */
  Tomorrow = -5,
  /** Только вчерашний день */
  Yesterday = -6,
  /** Все предыдущие дни и сегодня */
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
