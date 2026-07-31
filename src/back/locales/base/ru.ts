import { BibleTranslateName, Langi, MenuComToolName } from 'shared/api';
import { LocaleBase } from 'shared/model/+locale/base';
import { GENERATE, IF, isUtil, STR, SWITCH } from 'shared/utils/stringTemplater';

export const localeBaseRu: LocaleBase<Langi.Ru> = {
  langi: Langi.Ru,
  v: 0,

  cm: {
    t: 'Песни возрождённых',

    com: {
      tool: {
        [MenuComToolName.MarkCom]: STR(['$v'])`${IF('$v').THEN`Удалить избранное`.ELSE`Добавить избранное`}`,
        [MenuComToolName.SelectedToggle]: STR(['$v'])`${IF('$v').THEN`Убрать из выбранных`.ELSE`Выбрать песню`}`,
        [MenuComToolName.IsMiniAnchor]: STR(['$v'])`${IF('$v').THEN`Раскрыть ссылки`.ELSE`Свернуть ссылки`}`,

        [MenuComToolName.FullscreenMode]: 'На весь экран',
        [MenuComToolName.ChordsVariant]: 'Показать аккорды',
        [MenuComToolName.ShowTranslation]: 'Слайды',
        [MenuComToolName.ChordImages]: 'Аппликатура аккордов',
        [MenuComToolName.OpenPlayer]: 'Проигрыватель',
        [MenuComToolName.HideMetronome]: 'Метроном',
        [MenuComToolName.QrShare]: 'Поделиться по QR',
        [MenuComToolName.CatsBinds]: 'Показывать сборники',
        [MenuComToolName.ComComment]: 'Мои заметки',
        [MenuComToolName.CopyCom]: 'Копировать текст песни',
        [MenuComToolName.ChordHardLevel]: 'Уровень сложности аккорда - $v',
        [MenuComToolName.EditCom]: 'Редактировать',
      },

      showPlayer: 'Показывать плеер',
      sharedListToYou: 'С вами поделились списком',
      addToSel: 'Добавить к выбранным',
      dsc: 'Список известных песен',

      changeSel: 'Заменить выбранные',

      forEachBlock: 'Для каждого блока "$n;"',
      maxSel: `Можно выбрать максимум $s песен`,
      watcheds: 'Просмотры песен (общ. $c;)',
      willAdd: `Добавится $c $declension{{$c}{песня}{песни}{песен}}`,
      willLost: `Потеряется $c $declension{{$c}{песня}{песни}{песен}}`,

      twiceClickPrev: 'дважды клик&nbsp;-\nпредыдущая песня',
      twiceClickNx: 'дважды клик&nbsp;-\nследующая песня',

      clickNxSlide: 'клик&nbsp;-\nследующий слайд',
      clickPrevSlide: 'клик&nbsp;-\nпредыдущий слайд',
      notFound: 'Песня не найдена',
      expandList: 'Раскрыть песни списка',
      showLiSlides: 'Показывать слайды списка',
      shareLi: 'Поделиться списком',
      unk: 'Неизвестная песня',

      ton: 'Тональность',
      addToolByClick: 'Клик на иконку для добавления в быстрое меню',
      crossLinks: 'Связанные песни',
      addMod: STR(['$w', '$m'])`Добавлена: $w${IF(isUtil.NEQ('$w', '$m')).THEN`\nОбновлена: $m`}`,

      size: 'Размерность',
      temp: 'Интенсивность',

      // EDITOR:
      sqBrInTxtRep:
        'Текст в [квадратных скобках] не показывается в слайдах, но приводится к (тексту в круглых скобках) в тексте песен. Используйте [[две открывающие скобки] для переноса строки. Перед "[" должен быть пробел, а после "]" быть ничего не должно',
      rmTBlock: STR(['$t'])`Удалить${IF('$t').ELSE` новый`} блок?\n\n$t`,
      rms: 'Удалённые песни',
      backup: 'Восстановить эту песню',
      destroy: 'Уничтожить эту песню',
      insPrevTxt: 'Вставка предыдущего текста',
      repTxt: 'Заменить на этот текст',
      willClear: 'Будет очищено при вставке новых блоков',
      rmAudios: 'Удалённые аудио',
      addAudio: 'Добавить аудио',
      cnfStrN: 'Конфиг стр $n',
      clearDictNumN: 'Очистить номер из сборника $n',
      insNwBlockAtX: STR(['$x'])`Вставить новый блок ${SWITCH('$x').CASE('b')`в самое начало`.DEFAULT`сюда`}`,

      new: {
        t: 'Новая песня',
        noParsedX: STR(['$x'])`Нет разобранных ${SWITCH('$x')
          //
          .CASE('t')`текстов`.CASE('c')`аккордов`.CASE('o')`порядковых блоков`}`,
        noBindAudio: 'Нет прикреплённых аудио',
        startWrite: 'Начни писать или вставь текст для создания песни',
        parseTxt: 'Разобрать текст',
        bindedAudio: 'Прикреплённые аудио',
        noTracks: 'Нет треков',
        newAudios: 'Новые аудио',
        pub: 'Опубликовать песню',
      },
      // :EDITOR
    },

    cat: {
      t: 'Категория',
      li: {
        all: 'Все песни',
        child: 'Детские',
        youth: 'Молодёжные',
        PesnVzr: 'Песнь Возрождения',
        RU: 'Русскоязычные',
        UA: 'Украиноязычные',
        solo: 'Соло',
        Christmass: 'На Рождество',
        Easter: 'На Пасху',
        tooSlow: 'Очень медленные',
        slow: 'Медленные',
        middle: 'Средней интенсивности',
        fast: 'Быстрые',
        tooFast: 'Очень быстрые',
      },
    },

    li: {
      all: 'Все',
      li: 'Списки',
      player: 'Плеер',
      admin: 'Админ',
    },

    comm: {
      N: `Коммент №$n`,
      areHidden: 'Комментарии скрыты',
      forLine: 'Коммент для строки',

      wordLabel: STR(['$p'])`${SWITCH('$p').CASE('>')`после`.CASE('<')`до`.DEFAULT`цвет`} слова`,
      unreachs: 'Недостижимые комментарии',
      base: 'База',
      addedMaxAlts: 'Добавлено максимальное количество альтернатив',
      addAlt: 'Добавить новую альтернативу',
      soLongName: `Слишком длинное название ($l;+)`,
      freshPulled: 'Свежие комментарии стянуты',
      pull: 'Стянуть коменты',
    },

    trackMarksNotSetted: 'Для этого трека маркеры не установлены',
    sel: 'Выбранное',
    thematics: 'Тематические',
    blocks: 'Блоки',

    nxBlockConfig: 'Конфиг следующего блока',
    insertNxBlock: 'Вставить окно следующего блока',
    hideNxBlock: 'Убрать текст следующего блока',

    chBlockConfig: 'Конфиг аккордного блока',
    hideChBlock: 'Убрать конфиг аккордного блока',
    insertChBlock: 'Добавить конфиг аккордного блока',

    linnes: 'Строчки',
    chBlocks: 'Аккордные блоки',
    toShow: 'Показывать',
    toPass: 'Пропускать',
    toHide: 'Скрывать',
    emptySlide: 'Пустой слайд',

    chN: 'Аккорд $n',
    chs: 'Аккорды',
    comeBackCh: 'Вернуть аккорд',
    delCh: 'Удалить аккорд',
    chExists: 'Такой аккорд существует',
    incCh: 'Не правильное написание аккорда',
    creNxChRule: 'Создать правило для следующего аккорда',
    unkCh: 'Неизвестный аккорд',
    selChEdit: 'Выбери аккорд для редактирования',
    maxChCount: 'Максимальное количество аккордов',
    minChCount: 'Текст с минимальным количеством аккордов',
    noChTxt: 'Текст без аккордов',
    minChCountDsc:
      'В режиме минимального количества аккордов они присутствуют в блоках, где впервые встречаются или меняются (для одноимённых)',

    toComList: 'К списку песен',
    coms: 'Песни',
    showComms: 'Показать комменты',
    unkChN: 'Неизвестные аккорды ($n;)',
    noEditorsMore: 'Больше редактирующих нет',
    editsToo: STR(['$m', '$l'])`${IF('$m').THEN`Редактируют`.ELSE`Редактирует`} также $l`,
    edits: 'Редактирует $f',
    comRemoved: 'Песня удалена',
    comeBack: 'Восстановить',

    ords: 'Порядковые блоки',
  },

  bible: {
    t: 'Библия',
    chapter: 'Глава',
    searchInText: 'Поиск в тексте',
    searchInChapter: 'Поиск по главе',
    searchByLink: 'Поиск по ссылке',
    insertion: 'Вставка',
    txtInBrkts: 'Текст в [скобках]',
    JesusWords: 'Слова Христа',
    tr: 'Переводы Библии',
    loadedTr: 'Загруженные переводы',
    modulesForLoad: 'Доступные к загрузке',

    chapterNum: 'Глава $c',
    searchByBook: 'Поиск по книге <i>$b;</i>',
    searchByChapter: 'Поиск по главе <i>$b; $c;</i>',
    clearChapter: 'Очистить раздел $c;?',
    removeModule: 'Удалить безвозвратно модуль "$n;"',

    trs: {
      [BibleTranslateName.rst]: 'Русский Синодальный Перевод',
      [BibleTranslateName.kas]: 'Новый Завет. Перевод Кассиана (Безобразова)',
      [BibleTranslateName.kzb]: 'Казахский перевод',
      [BibleTranslateName.nrt]: 'Новый русский перевод',
    },
  },

  sch: {
    notFound: 'Расписание не найдено',
    evMod: `Обновлено: $m`,

    insWatchAtt: GENERATE<'s' | ''>()
      //
      .NEXT('')`Шаблон `
      //
      .NEXT('s')`$t`
      //
      .NEXT('')` - Вставить обзорное вложение`.toString(['$t']),
  },

  bro: {
    followInPhone: 'Следите за текстами на экране у себя в телефоне',
  },

  each0: 'каждое',
  each1: 'каждый',
  each2: 'каждая',
  each3: 'каждое',

  lasts: 'Последние',
  msg: 'Сообщение',
  authIncorrect: 'Авторизация не действительна',
  notAuthed: 'Не авторизован',
  selProgram: 'Выберите программу',
  accessRights: 'Права доступа',
  inoe: 'Иное',
  name: 'Название',
  role: 'Роль',
  withoutRole: 'Без роли',
  enterRoleName: 'Введите название для роли',
  newRole: 'Новая роль',
  interactive: 'Взаимодействие',
  myFiles: 'Мои файлы',
  downloads: 'Загрузки',
  constants: 'Константы',

  oneForTwo: '$o для $t',
  newVer: ' (Новая - v$v;)',

  settings: 'Настройки',
  aboutApp: 'О приложении',
  otherApps: 'Другие программы',
  anims: 'Анимации',
  font: 'Шрифт',
  showErrors: 'Показать ошибки',
  chapterEmpty: 'Раздел пуст',
  actualVer: ' - Актуальная',
  refreshAppConfirm: 'Убедитесь в наличии интернет-соединения! Обновить приложение?',
  immediateRefreshOnFinish:
    'Это действие требует немедленного обновления сразу после своего завершения. Убедитесь, пожалуйста, что у вас есть интернет-соединение, ибо, в противном случае, возникнет проблема',
  toAuth: 'Авторизоваться',
  authSuccess: `Успешная авторизация`,
  oneTimeCode: 'Одноразовый код',
  enterCode: 'ввести код',
  or: 'или',

  readQR: 'Читать QR',
  showMyQr: 'Показать мой QR',

  logout: 'Выйти из системы',
  link: 'Ссылка',
  events: 'События',
  txt: 'Текст',
  preview: 'Предпросмотр',
  slide: 'Слайд',
  setup: 'Настроить',

  history: 'История',
  plan: 'План',

  search: 'Поиск',
  globSearch: 'Глобальный поиск',
  broadcast: 'Трансляция',

  tg: {
    beInChannel: 'Состоять в канале',
    steps: 'Перейти в него\nНажать кнопку "Авторизоваться" в закрепе\nВвести код из личного сообщения от бота сюда:',
    startBot: 'Запустить бота',
    authNeeds: 'Для авторизации нужно',
  },

  email: {
    bindedToCurrentAuth: '$fio привязан к текущему аккаунту',
    otpSent: 'Код отправлен на почту $e',
    toBind: 'Привязать E-mail',
  },

  fromOf: STR(['$f', '$o'])`${IF(isUtil.NEQ('$f', '$o')).THEN`$f из `}$o`,

  fav: 'Избранное',
  favNLim: `Лимит - $n избранных`,

  sel: 'Выбранное',
  clearSelList: 'Очистить список выбранных',

  color: 'Цвет',
  before: 'До',
  instead: 'Вместо',
  after: 'После',
  lists: 'Списки',
  lineN: 'Строка $n',
  word: 'Слово',
  wordN: 'Слово $n',
  delX: 'Удалить $x',
  del: 'Удалить',
  txtBefore: 'Текст до',
  txtAfter: 'Текст после',
  close: 'Закрыть',
  Nsec: '$n сек.',
  detailed: 'Подробнее',
  fontSize: 'Размер шрифта',
  lookedN: 'Просмотрели $n $declension{{$n}{раз}{раза}{раз}}',
  toAdd: 'Добавить',
  NDay: '$n;-й день',
  savedLoc: 'Сохранено локально',
  noChanges: 'Изменений нет',
  toSendSmth: 'Отправить $s',
  backToEdit: 'Вернуться к редактированию',
  cre: 'Создать',
  redact: 'Редактировать',
  noAccess: 'Нет доступа',

  durationMin: 'Продолжительность, мин',
  min_minute: ' мин',
  incName: 'Некореектное название',
  txts: 'Тексты',
  send: 'Отправить',
  manyStrs: 'Много строк',
  maxStrsCount: 'Максимальное количество строк',
  fewStrs: 'Мало строк',
  dicts: 'Сборники',
  denied: 'Заперщено',
  lang: 'Язык',
  lookJSON: 'Посмотреть JSON',
  NSymbols: '$n $declension{{$n}{символ}{символа}{символов}}',
};
