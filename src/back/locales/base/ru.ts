import { BibleTranslateName, Langi, MenuComToolName } from 'shared/api';
import { LocaleBase } from 'shared/model/+locale/base';
import { IF, isUtil, STR, SWITCH } from 'shared/utils/stringTemplater';

export const localeBaseRu: LocaleBase<Langi.Ru> = {
  lng: Langi.Ru,
  v: 0,

  cm: {
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
      t2: 'Песни',
      dsc: 'Список известных песен',

      changeSel: 'Заменить выбранные',

      forEachBlock: 'Для каждого блока "$n"',
      maxSel: `Можно выбрать максимум $s песен`,
      watcheds: 'Просмотры песен (общ. $c)',
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
      sqBrInTxtRep:
        'Текст в [квадратных скобках] не показывается в слайдах, но приводится к (тексту в круглых скобках) в тексте песен. Используйте [[две открывающие скобки] для переноса строки. Перед "[" должен быть пробел, а после "]" быть ничего не должно',
      rmTBlock: STR(['$t'])`Удалить${IF('$t').ELSE` новый`} блок?\n\n$t`,

      ton: 'Тональность',
      addToolByClick: 'Клик на иконку для добавления в быстрое меню',
      crossLinks: 'Связанные песни',
      addMod: STR(['$w', '$m'])`Добавлена: $w${IF(isUtil.NEQ('$w', '$m')).THEN`\nОбновлена: $m`}`,
    },

    cat: {
      t: {
        all: 'Все песни',
      },
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
    chordN: 'Аккорд $n',
    creNxChRule: 'Создать правило для следующего аккорда',
    unkCh: 'Неизвестный аккорд',
    coms: 'Песни',
    showComms: 'Показать комменты',
    toComList: 'К списку песен',
    maxChCount: 'Максимальное количество аккордов',
    minChCount: 'Текст с минимальным количеством аккордов',
    noChTxt: 'Текст без аккордов',
    minChCountDsc:
      'В режиме минимального количества аккордов они присутствуют в блоках, где впервые встречаются или меняются (для одноимённых)',
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
    searchByBook: 'Поиск по книге <i>$b</i>',
    searchByChapter: 'Поиск по главе <i>$b $c</i>',
    clearChapter: 'Очистить раздел $c?',
    removeModule: 'Удалить безвозвратно модуль "$n"',

    trs: {
      [BibleTranslateName.rst]: 'Русский Синодальный Перевод',
      [BibleTranslateName.kas]: 'Новый Завет. Перевод Кассиана (Безобразова)',
      [BibleTranslateName.kzb]: 'Казахский перевод',
      [BibleTranslateName.nrt]: 'Новый русский перевод',
    },
  },

  sch: {
    notFound: 'Расписание не найдено',
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
  del: 'Удалить $t',
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
};
