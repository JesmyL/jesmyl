let color = '';

export const bibleTitles = {
  titles: [
    { setColor: 'text-[#300570] dark:text-[#966BD6]' },
    { short: 'Быт', full: 'Бытие', textColor: '' },
    { short: 'Исх', full: 'Исход', textColor: '' },
    { short: 'Лев', full: 'Левит', textColor: '' },
    { short: 'Чис', full: 'Числа', textColor: '' },
    { short: 'Втор', full: 'Второзаконие', textColor: '' },

    { setColor: 'text-[#A56800] dark:text-[#FFB840]' },
    { short: 'Нав', full: 'Иисус Навин', textColor: '' },
    { short: 'Суд', full: 'Судьи', textColor: '' },
    { short: 'Руф', full: 'Руфь', textColor: '' },
    { short: '1Цар', full: '1-я Царств', min: '1Царств', textColor: '' },
    { short: '2Цар', full: '2-я Царств', min: '2Царств', textColor: '' },
    { short: '3Цар', full: '3-я Царств', min: '3Царств', textColor: '' },
    { short: '4Цар', full: '4-я Царств', min: '4Царств', textColor: '' },
    { short: '1Пар', full: '1-я Паралипоменон', min: '1Паралипоменон', textColor: '' },
    { short: '2Пар', full: '2-я Паралипоменон', min: '2Паралипоменон', textColor: '' },
    { short: 'Ездр', full: 'Ездра', textColor: '' },
    { short: 'Неем', full: 'Неемия', textColor: '' },
    { short: 'Есф', full: 'Есфирь', textColor: '' },

    { setColor: 'text-[#007141] dark:text-[#61D7A4]' },
    { short: 'Иов', full: 'Иов', textColor: '' },
    { short: 'Пс', full: 'Псалтирь', textColor: '' },
    { short: 'Прит', full: 'Притчи', textColor: '' },
    { short: 'Еккл', full: 'Екклесиаст', textColor: '' },
    { short: 'Песн', full: 'Песня песней', textColor: '' },

    { setColor: 'text-[#93002F] dark:text-[#F16D97]' },
    { short: 'Ис', full: 'Исаия', textColor: '' },
    { short: 'Иер', full: 'Иеремия', textColor: '' },
    { short: 'Плач', full: 'Плач Иеремии', textColor: '' },
    { short: 'Иез', full: 'Иезекииль', textColor: '' },
    { short: 'Дан', full: 'Даниил', textColor: '' },

    { setColor: 'text-[#A56800] dark:text-[#FFCB73]' },
    { short: 'Ос', full: 'Осия', textColor: '' },
    { short: 'Иоил', full: 'Иоиль', textColor: '' },
    { short: 'Ам', full: 'Амос', textColor: '' },
    { short: 'Авд', full: 'Авдий', textColor: '' },
    { short: 'Ион', full: 'Иона', textColor: '' },
    { short: 'Мих', full: 'Михей', textColor: '' },
    { short: 'Наум', full: 'Наум', textColor: '' },
    { short: 'Авв', full: 'Аввакум', textColor: '' },
    { short: 'Соф', full: 'Софония', textColor: '' },
    { short: 'Агг', full: 'Аггей', textColor: '' },
    { short: 'Зах', full: 'Захария', textColor: '' },
    { short: 'Мал', full: 'Малахия', textColor: '' },

    { setColor: 'text-[#071C71] dark:text-[#66A3D1]' },
    { short: 'Мат', full: 'От Матфея', textColor: '' },
    { short: 'Мар', full: 'От Марка', textColor: '' },
    { short: 'Лук', full: 'От Луки', textColor: '' },
    { short: 'Ин', full: 'От Иоанна', textColor: '' },

    { setColor: 'text-[#9C0019] dark:text-[#F87085]' },
    { short: 'Деян', full: 'Деяния', textColor: '' },

    { setColor: 'text-[#3F046F] dark:text-[#A468D5]' },
    { short: 'Иак', full: 'Иакова', textColor: '' },
    { short: '1Пет', full: '1-е Петра', min: '1Петра', textColor: '' },
    { short: '2Пет', full: '2-е Петра', min: '2Петра', textColor: '' },
    { short: '1Ин', full: '1-е Иоанна', min: '1Иоанна', textColor: '' },
    { short: '2Ин', full: '2-е Иоанна', min: '2Иоанна', textColor: '' },
    { short: '3Ин', full: '3-е Иоанна', min: '3Иоанна', textColor: '' },
    { short: 'Иуд', full: 'Иуды', textColor: '' },

    { setColor: 'text-[#A5A500] dark:text-[#FFFF73]' },
    { short: 'Рим', full: 'К Римлянам', textColor: '' },
    { short: '1Кор', full: '1-е Коринфянам', min: '1Коринфянам', textColor: '' },
    { short: '2Кор', full: '2-е Коринфянам', min: '2Коринфянам', textColor: '' },
    { short: 'Гал', full: 'К Галатам', textColor: '' },
    { short: 'Еф', full: 'К Ефесянам', textColor: '' },
    { short: 'Флп', full: 'К Филиппийцам', textColor: '' },
    { short: 'Кол', full: 'К Колоссянам', textColor: '' },
    { short: '1Фес', full: '1-е Фессалоникийцам', min: '1Фессалоникийцам', textColor: '' },
    { short: '2Фес', full: '2-е Фессалоникийцам', min: '2Фессалоникийцам', textColor: '' },
    { short: '1Тим', full: '1-е Тимофею', min: '1Тимофею', textColor: '' },
    { short: '2Тим', full: '2-е Тимофею', min: '2Тимофею', textColor: '' },
    { short: 'Тит', full: 'К Титу', textColor: '' },
    { short: 'Флм', full: 'К Филимону', textColor: '' },
    { short: 'Евр', full: 'К Евреям', textColor: '' },

    { setColor: 'text-[#A51300] dark:text-[#FF8373]' },
    { short: 'Откр', full: 'Откровение', textColor: '' },
  ]
    .map(it => {
      if (it.setColor) color = it.setColor;
      else it.textColor = color;

      return it;
    })
    .filter(it => it.setColor == null),
};

export const checkEachBibleTitles = (
  book: OmitOwn<(typeof bibleTitles)['titles'][number], 'setColor' | 'textColor'>,
  checker: (title: string) => boolean,
) => {
  return checker(book.short) || checker(book.full) || checker(book.min ?? '');
};

export const bibleLowerBooks = bibleTitles.titles.map(book => {
  return {
    full: book.full.toLowerCase(),
    short: book.short.toLowerCase(),
    min: book.min?.toLowerCase(),
  };
});
