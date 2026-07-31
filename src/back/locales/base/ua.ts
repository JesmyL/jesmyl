import { BibleTranslateName, Langi, MenuComToolName } from 'shared/api';
import { LocaleBase } from 'shared/model/+locale/base';
import { GENERATE, IF, isUtil, STR, SWITCH } from 'shared/utils/stringTemplater';

export const localeBaseUa: LocaleBase<Langi.Ua> = {
  langi: Langi.Ua,
  v: 0,

  cm: {
    t: 'Пісні відроджених',

    com: {
      tool: {
        [MenuComToolName.MarkCom]: STR(['$v'])`${IF('$v').THEN`Видалити з обраного`.ELSE`Додати до обраного`}`,
        [MenuComToolName.SelectedToggle]: STR(['$v'])`${IF('$v').THEN`Прибрати з вибраних`.ELSE`Вибрати пісню`}`,
        [MenuComToolName.IsMiniAnchor]: STR(['$v'])`${IF('$v').THEN`Розгорнути посилання`.ELSE`Згорнути посилання`}`,

        [MenuComToolName.FullscreenMode]: 'На весь екран',
        [MenuComToolName.ChordsVariant]: 'Показати акорди',
        [MenuComToolName.ShowTranslation]: 'Слайди',
        [MenuComToolName.ChordImages]: 'Аплікатура акордів',
        [MenuComToolName.OpenPlayer]: 'Програвач',
        [MenuComToolName.HideMetronome]: 'Метроном',
        [MenuComToolName.QrShare]: 'Поділитися через QR',
        [MenuComToolName.CatsBinds]: 'Показувати збірки',
        [MenuComToolName.ComComment]: 'Мої замітки',
        [MenuComToolName.CopyCom]: 'Копіювати текст пісні',
        [MenuComToolName.ChordHardLevel]: 'Рівень складності акорду - $v',
        [MenuComToolName.EditCom]: 'Редагувати',
      },

      showPlayer: 'Показувати плеєр',
      sharedListToYou: 'З вами поділилися списком',
      addToSel: 'Додати до вибраних',
      dsc: 'Список відомих пісень',

      changeSel: 'Замінити вибрані',

      forEachBlock: 'Для кожного блоку "$n;"',
      maxSel: `Можно вибрати максимум $s пісень`,
      watcheds: 'Перегляди пісень (заг. $c;)',
      willAdd: `Додасться $c $declension{{$c}{пісня}{пісні}{пісень}}`,
      willLost: `Втратиться $c $declension{{$c}{пісня}{пісні}{пісень}}`,

      twiceClickPrev: 'подвійний клік&nbsp;-\nпопередня пісня',
      twiceClickNx: 'подвійний клік&nbsp;-\nнаступна пісня',

      clickNxSlide: 'клік&nbsp;-\nнаступний слайд',
      clickPrevSlide: 'клік&nbsp;-\nпопередній слайд',
      notFound: 'Пісня не знайдена',
      expandList: 'Розгорнути пісні списку',
      showLiSlides: 'Показувати слайди списку',
      shareLi: 'Поділитися списком',
      unk: 'Невідома пісня',

      ton: 'Тональність',
      addToolByClick: 'Клік на іконку для додавання у швидке меню',
      crossLinks: "Пов'язані пісні",
      addMod: STR(['$w', '$m'])`Додана: $w${IF(isUtil.NEQ('$w', '$m')).THEN`\nОновлена: $m`}`,

      size: 'Розмірність',
      temp: 'Інтенсивність',

      // EDITOR:
      sqBrInTxtRep:
        'Текст у [квадратних дужках] не показується в слайдах, але зводиться до (тексту в круглих дужках) у тексті пісень. Використовуйте [[дві відкривальні дужки] для перенесення рядка. Перед "[" має бути пробіл, а після "]" не повинно бути нічого',
      rmTBlock: STR(['$t'])`Видалити${IF('$t').ELSE` новий`} блок?\n\n$t`,
      rms: 'Видалені пісні',
      backup: 'Відновити цю пісню',
      destroy: 'Знищити цю пісню',
      insPrevTxt: 'Вставка попереднього тексту',
      repTxt: 'Замінити на цей текст',
      willClear: 'Буде очищено при вставці нових блоків',
      rmAudios: 'Видалені аудіо',
      addAudio: 'Додати аудіо',
      cnfStrN: 'Конфіг стор $n',
      clearDictNumN: 'Очистити номер зі збірника $n',
      insNwBlockAtX: STR(['$x'])`Вставити новий блок ${SWITCH('$x').CASE('b')`на самий початок`.DEFAULT`сюди`}`,

      new: {
        t: 'Нова пісня',
        noParsedX: STR(['$x'])`Немає розібраних ${SWITCH('$x')
          //
          .CASE('t')`текстів`.CASE('c')`акордів`.CASE('o')`порядкових блоків`}`,
        noBindAudio: 'Немає прикріплених аудіо',
        startWrite: 'Почни писати або встав текст для створення пісні',
        parseTxt: 'Розібрати текст',
        bindedAudio: 'Прикріплені аудіо',
        noTracks: 'Немає треків',
        newAudios: 'Нові аудіо',
        pub: 'Опублікувати пісню',
      },
      // :EDITOR
    },
    cat: {
      t: 'Категорія',
      li: {
        all: 'Усі пісні',
        child: 'Дитячі',
        youth: 'Молодіжні',
        PesnVzr: 'Пісня Відродження',
        RU: 'Російськомовні',
        UA: 'Україномовні',
        solo: 'Соло',
        Christmass: 'На Різдво',
        Easter: 'На Великдень',
        tooSlow: 'Дуже повільні',
        slow: 'Повільні',
        middle: 'Середньої інтенсивності',
        fast: 'Швидкі',
        tooFast: 'Дуже швидкі',
      },
    },

    li: {
      all: 'Усі',
      li: 'Списки',
      player: 'Плеєр',
      admin: 'Адмін',
    },

    comm: {
      N: `Комент №$n`,
      areHidden: 'Коментарі приховані',
      forLine: 'Комент для рядка',

      wordLabel: STR(['$p'])`${SWITCH('$p').CASE('>')`після`.CASE('<')`до`.DEFAULT`колір`} слова`,
      unreachs: 'Недосяжні коментарі',
      base: 'База',
      addedMaxAlts: 'Додано максимальну кількість альтернатив',
      addAlt: 'Додати нову альтернативу',
      soLongName: `Занадто довга назва ($l;+)`,
      freshPulled: 'Свіжі коментарі стягнуті',
      pull: 'Стягнути коменти',
    },

    trackMarksNotSetted: 'Для цього треку маркери не встановлені',
    sel: 'Вибране',
    thematics: 'Тематичні',
    blocks: 'Блоки',

    nxBlockConfig: 'Конфіг наступного блоку',
    insertNxBlock: 'Вставити вікно наступного блоку',
    hideNxBlock: 'Прибрати текст наступного блоку',

    chBlockConfig: 'Конфіг акордного блоку',
    hideChBlock: 'Прибрати конфіг акордного блоку',
    insertChBlock: 'Додати конфіг акордного блоку',

    linnes: 'Рядки',
    chBlocks: 'Акордні блоки',
    toShow: 'Показувати',
    toPass: 'Пропускати',
    toHide: 'Приховувати',
    emptySlide: 'Порожній слайд',

    chN: 'Акорд $n',
    chs: 'Акорди',
    comeBackCh: 'Повернути акорд',
    delCh: 'Видалити акорд',
    chExists: 'Такий акорд існує',
    incCh: 'Неправильне написання акорду',
    creNxChRule: 'Створити правило для наступного акорду',
    unkCh: 'Невідомий акорд',
    selChEdit: 'Вибери акорд для редагування',
    maxChCount: 'Максимальна кількість акордів',
    minChCount: 'Текст з мінімальною кількістю акордів',
    noChTxt: 'Текст без акордів',
    minChCountDsc:
      'У режимі мінімальної кількості акордів вони присутні в блоках, де вперше зустрічаються або змінюються (для однойменних)',

    toComList: 'До списку пісень',
    coms: 'Пісні',
    showComms: 'Показати коменти',
    unkChN: 'Невідомі акорди ($n;)',
    noEditorsMore: 'Більше ніхто не редагує',
    editsToo: STR(['$m', '$l'])`${IF('$m').THEN`Редагують`.ELSE`Редагує`} також $l`,
    edits: 'Редагує $f',
    comRemoved: 'Пісня видалена',
    comeBack: 'Відновити',

    ords: 'Порядкові блоки',
  },
  bible: {
    t: 'Біблія',
    chapter: 'Глава',
    searchInText: 'Пошук у тексті',
    searchInChapter: 'Пошук по главі',
    searchByLink: 'Пошук за посиланням',
    insertion: 'Вставка',
    txtInBrkts: 'Текст у [дужках]',
    JesusWords: 'Слова Христа',
    tr: 'Переклади Біблії',
    loadedTr: 'Завантажені переклади',
    modulesForLoad: 'Доступні для завантаження',

    chapterNum: 'Глава $c',
    searchByBook: 'Пошук по книзі <i>$b;</i>',
    searchByChapter: 'Пошук по главі <i>$b $c;</i>',
    clearChapter: 'Очистити розділ $c;?',
    removeModule: 'Видалити безповоротно модуль "$n;"',

    trs: {
      [BibleTranslateName.rst]: 'Російський Синодальний Переклад',
      [BibleTranslateName.kas]: 'Новий Завіт. Переклад Касіяна (Безобразова)',
      [BibleTranslateName.kzb]: 'Казахський переклад',
      [BibleTranslateName.nrt]: 'Новий російський переклад',
    },
  },

  sch: {
    notFound: 'Розклад не знайдено',
    evMod: `Оновлено: $m`,

    insWatchAtt: GENERATE<'s' | ''>()
      //
      .NEXT('')`Шаблон `
      //
      .NEXT('s')`$t`
      //
      .NEXT('')` - Вставити оглядове вкладення`.toString(['$t']),
  },

  bro: {
    followInPhone: 'Слідкуйте за текстами на екрані у себе в телефоні',
  },

  each0: 'кожне',
  each1: 'кожен',
  each2: 'кожна',
  each3: 'кожне',

  lasts: 'Останні',
  msg: 'Повідомлення',
  authIncorrect: 'Авторизація не дійсна',
  notAuthed: 'Не авторизований',
  selProgram: 'Виберіть програму',
  accessRights: 'Права доступу',
  inoe: 'Інше',
  name: 'Назва',
  role: 'Роль',
  withoutRole: 'Без ролі',
  enterRoleName: 'Введіть назву для ролі',
  newRole: 'Нова роль',
  interactive: 'Взаємодія',
  myFiles: 'Мої файли',
  downloads: 'Завантаження',
  constants: 'Константи',

  oneForTwo: '$o для $t',
  newVer: ' (Нова - v$v;)',

  settings: 'Налаштування',
  aboutApp: 'Про додаток',
  otherApps: 'Інші програми',
  anims: 'Анімації',
  font: 'Шрифт',
  showErrors: 'Показати помилки',
  chapterEmpty: 'Розділ порожній',
  actualVer: ' - Актуальна',
  refreshAppConfirm: "Переконайтеся в наявності інтернет-з'єднання! Оновити додаток?",
  immediateRefreshOnFinish:
    "Ця дія вимагає негайного оновлення відразу після свого завершення. Переконайтеся, будь ласка, що у вас є інтернет-з'єднання, бо, в іншому випадку, виникне проблема",
  toAuth: 'Авторизуватися',
  authSuccess: `Успішна авторизація`,
  oneTimeCode: 'Одноразовий код',
  enterCode: 'ввести код',
  or: 'або',

  readQR: 'Читати QR',
  showMyQr: 'Показати мій QR',

  logout: 'Вийти з системи',
  link: 'Посилання',
  events: 'Події',
  txt: 'Текст',
  preview: 'Передперегляд',
  slide: 'Слайд',
  setup: 'Налаштувати',

  history: 'Історія',
  plan: 'План',

  search: 'Пошук',
  globSearch: 'Глобальний пошук',
  broadcast: 'Трансляція',

  tg: {
    beInChannel: 'Перебувати в каналі',
    steps:
      'Перейти в нього\nНатиснути кнопку "Авторизуватися" в закрепі\nВвести код з особистого повідомлення від бота сюди:',
    startBot: 'Запустити бота',
    authNeeds: 'Для авторизації потрібно',
  },

  email: {
    bindedToCurrentAuth: "$fio прив'язаний до поточного акаунта",
    otpSent: 'Код надіслано на пошту $e',
    toBind: "Прив'язати E-mail",
  },

  fromOf: STR(['$f', '$o'])`${IF(isUtil.NEQ('$f', '$o')).THEN`$f з `}$o`,

  fav: 'Обране',
  favNLim: `Ліміт - $n обраних`,

  sel: 'Вибране',
  clearSelList: 'Очистити список вибраних',

  color: 'Колір',
  before: 'До',
  instead: 'Замість',
  after: 'Після',
  lists: 'Списки',
  lineN: 'Рядок $n',
  word: 'Слово',
  wordN: 'Слово $n',
  delX: 'Видалити $x',
  del: 'Видалити',
  txtBefore: 'Текст до',
  txtAfter: 'Текст після',
  close: 'Закрити',
  Nsec: '$n сек.',
  detailed: 'Детальніше',
  fontSize: 'Розмір шрифту',
  lookedN: 'Переглянули $n $declension{{$n}{раз}{рази}{разів}}',
  toAdd: 'Додати',
  NDay: '$n;-й день',
  savedLoc: 'Збережено локально',
  noChanges: 'Змін немає',
  toSendSmth: 'Надіслати $s',
  backToEdit: 'Повернутися до редагування',
  cre: 'Створити',
  redact: 'Редагувати',
  noAccess: 'Немає доступу',

  durationMin: 'Тривалість, хв',
  min_minute: ' хв',
  incName: 'Некоректна назва',
  txts: 'Тексти',
  send: 'Надіслати',
  manyStrs: 'Багато рядків',
  maxStrsCount: 'Максимальна кількість рядків',
  fewStrs: 'Мало рядків',
  dicts: 'Збірники',
  denied: 'Заборонено',
  lang: 'Мова',
  lookJSON: 'Переглянути JSON',
  NSymbols: '$n $declension{{$n}{символ}{символи}{символів}}',
};
