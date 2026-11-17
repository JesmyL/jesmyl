export const enum BaseLocaleKey {
  /** Язык интерфейса */
  Langi = 0,
  /** Версия локали */
  LocaleVersion = 1,

  /** Песни возрождённых */
  CmApp = 2,
  /** Удалить избранное; Убрать из выбранных; Раскрыть ссылки… */
  CmMarkComTool = 3,
  /** Показывать плеер */
  CmShowPlayer = 4,
  /** С вами поделились списком */
  CmListShared = 5,
  /** Добавить к выбранным */
  CmAddToSelectedList = 6,
  /** Список известных песен */
  CmKnownList = 7,
  /** Заменить выбранные */
  CmChangeSelectedList = 8,
  /** Для каждого блока "$n" */
  CmForEachBlock = 9,
  /** Можно выбрать максимум $s песен */
  CmCanSelectMaximumCount = 10,
  /** Просмотры песен (общ. $c) */
  CmWatchedCount = 11,
  /** Добавится $c песня */
  CmWillAdd = 12,
  /** Потеряется $c песня */
  CmWillLost = 13,
  /** дважды клик - предыдущая песня */
  CmTwiceClickPrevious = 14,
  /** дважды клик - следующая песня */
  CmTwiceClickNext = 15,
  /** клик - следующий слайд */
  CmClickNextSlide = 16,
  /** клик - предыдущий слайд */
  CmClickPreviousSlide = 17,
  /** Песня не найдена */
  CmNotFound = 18,
  /** Раскрыть песни списка */
  CmExpandList = 19,
  /** Показывать слайды списка */
  CmShowListSlides = 20,
  /** Поделиться списком */
  CmShareList = 21,
  /** Неизвестная песня */
  CmUnknown = 22,
  /** Тональность */
  CmKey = 23,
  /** Клик на иконку для добавления в быстрое меню */
  CmAddByClick = 24,
  /** Связанные песни */
  CmCrossLinks = 25,
  /** Добавлена: $w Обновлена: $m */
  CmAddOrModifiedLabel = 26,
  /** Очень медленные; Медленные; Средняя интенсивность… */
  CmCategoryList = 27,
  /** Все */
  CmListsAll = 28,
  /** Плеер */
  CmListsPlayer = 29,
  /** Админ */
  CmListsAdmin = 30,

  /** Коммент №$n */
  CmCommentNumber = 31,
  /** Комментарии скрыты */
  CmCommentAreHidden = 32,
  /** Коммент для строки */
  CmCommentForLine = 33,
  /** после/до слова */
  CmCommentWordLabel = 34,
  /** Недостижимые комментарии */
  CmCommentUnreachable = 35,
  /** База */
  CmCommentBase = 36,
  /** Добавлено максимальное количество альтернатив */
  CmCommentAddedMaximumAlternatives = 37,
  /** Добавить новую альтернативу */
  CmCommentAddAlternative = 38,
  /** Слишком длинное название ($l+) */
  CmCommentSoLongName = 39,
  /** Свежие комментарии стянуты */
  CmCommentFreshPulled = 40,
  /** Стянуть коменты */
  CmCommentPull = 41,

  /** Для этого трека маркеры не установлены */
  CmMarksNotSet = 42,
  /** Тематические */
  CmThematics = 43,
  /** Блоки */
  CmBlocks = 44,
  /** Конфиг следующего блока */
  CmNextBlockConfig = 45,
  /** Вставить окно следующего блока */
  CmInsertNextBlock = 46,
  /** Убрать текст следующего блока */
  CmHideNextBlock = 47,
  /** Конфиг аккордного блока */
  CmChordBlockConfig = 48,
  /** Убрать конфиг аккордного блока */
  CmHideChordBlock = 49,
  /** Добавить конфиг аккордного блока */
  CmInsertChordBlock = 50,
  /** Ошибка воспроизведения аудио */
  CmAudioPlaybackError = 51,
  /** Выберите песню */
  CmChooseCom = 52,
  /** В песне треков нет */
  CmNoComTracks = 53,
  /** Слайды не настроены */
  CmNoSlides = 54,
  /** Функционал не доступен */
  CmFeatureUnavailable = 55,
  /** Удалить трек из кэша? */
  CmCacheDeleteDescription = 56,
  /** Случайный порядок */
  CmShuffle = 57,
  /** Слайды текста */
  CmTextSlides = 58,
  /** Предыдущая песня */
  CmPreviousCom = 59,
  /** Следующая песня */
  CmNextCom = 60,
  /** Строчки */
  CmLines = 61,
  /** Аккордные блоки */
  CmChordBlocks = 62,
  /** Показывать */
  CmToShow = 63,
  /** Пропускать */
  CmToPass = 64,
  /** Скрывать */
  CmToHide = 65,
  /** Пустой слайд */
  CmEmptySlide = 66,
  /** Разбивка строк */
  CmBroadcastLineSeparator = 67,
  /** Макс. две */
  CmBroadcastDuo = 68,
  /** Макс. пять */
  CmBroadcastFive = 69,
  /** Аккорд $n */
  CmChordNumber = 70,
  /** Создать правило для следующего аккорда */
  CmCreateNextChordRule = 71,
  /** Неизвестный аккорд */
  CmUnknownChord = 72,
  /** Максимальное количество аккордов */
  CmMaximumChordsCount = 73,
  /** Текст с минимальным количеством аккордов */
  CmMinimumChordsCount = 74,
  /** Текст без аккордов */
  CmNoChordsText = 75,
  /** В режиме минимального количества аккордов они присутствуют в блоках, где впервые встречаются или меняются (для одноимённых) */
  CmMinimumChordsCountDescription = 76,
  /** К списку песен */
  CmGoToComList = 77,
  /** Песни */
  CmComs = 78,
  /** Показать комменты */
  CmShowComments = 79,
  /** Добавлено «$n»: $d МБ. Занято: $t МБ. Свободно: $f МБ. */
  CmAudioCached = 80,
  /** Добавлено «$n»: $d МБ. Занято: $t МБ. */
  CmAudioCachedNoQuota = 81,
  /** Удалено «$n»: $d МБ. Занято: $t МБ. Свободно: $f МБ. */
  CmAudioUncached = 82,
  /** Удалено «$n»: $d МБ. Занято: $t МБ. */
  CmAudioUncachedNoQuota = 83,
  /** Все песни */
  CmAllCategoryName = 84,

  /** Ответ */
  QuestionerAnswer = 85,
  /** Редактор */
  QuestionerEditor = 86,
  /** Проверка */
  QuestionerReview = 87,
  /** Анонимный опрос */
  QuestionerAnonymous = 88,
  /** Ответ отправлен */
  QuestionerAnswerSent = 89,
  /** Новый опрос */
  QuestionerNewSurvey = 90,
  /** Вопрос скрыт */
  QuestionerQuestionHidden = 91,
  /** Управление видимостью */
  QuestionerVisibilityControl = 92,
  /** Вставьте НЕПОСРЕДСТВЕННО перед/в середине/после пропущенного слова такие символы (можно несколько подряд) */
  QuestionerTextIncorrectHint = 93,
  /** Для корректировки набора употребляемых символов нажимайте на них */
  QuestionerSymbolsAdjustHint = 94,
  /** Для обновления результата уберите фокус из текстового поля */
  QuestionerResultUpdateHint = 95,
  /** Дополнительные варианты */
  QuestionerExtraVariants = 96,
  /** Отмеченные варианты являются правильными */
  QuestionerMarkedCorrect = 97,
  /** Сначала нужно выбрать подходящие варианты для сортировки: */
  QuestionerSorterFirst = 98,
  /** А потом их отсортировать: */
  QuestionerSorterThen = 99,
  /** Этот комментарий обязателен к заполнению */
  QuestionerCommentRequired = 100,
  /** Сортировка в этом блоке обязательна */
  QuestionerSorterRequired = 101,
  /** Нужно восстановить все недостающие слова */
  QuestionerRestoreRequired = 102,
  /** Запрашивать Фамилию/Имя */
  QuestionerAskFullName = 103,
  /** Опросник */
  QuestionerTitle = 104,
  /** Опросы */
  QuestionerSurveys = 105,
  /** Опрос */
  QuestionerSurvey = 106,
  /** Новый вопрос */
  QuestionerNewQuestion = 107,
  /** Ответы */
  QuestionerAnswers = 108,
  /** Мои ответы */
  QuestionerMyAnswers = 109,
  /** Ссылка скопирована */
  QuestionerLinkCopied = 110,
  /** Отправить мои ответы */
  QuestionerSendAnswers = 111,
  /** Этот вопрос обязателен к ответу */
  QuestionerQuestionRequired = 112,
  /** Нет текста вопроса */
  QuestionerNoQuestionText = 113,
  /** Обязательно для заполнения */
  QuestionerRequired = 114,
  /** Текст вопроса */
  QuestionerQuestionText = 115,
  /** Заголовок ($t) */
  QuestionerHeaderWithType = 116,
  /** Не вписаны Фамилия и Имя */
  QuestionerFullNameMissing = 117,
  /** Фамилия Имя */
  QuestionerFullName = 118,
  /** Сделать невидимым */
  QuestionerMakeVisible = 119,
  /** Виден при всех условиях */
  QuestionerVisibleAll = 120,
  /** Виден хотя бы при одном из условий */
  QuestionerVisibleAny = 121,
  /** И */
  QuestionerAnd = 122,
  /** ИЛИ */
  QuestionerOr = 123,
  /** Подусловие */
  QuestionerSubCondition = 124,
  /** Других вопросов нет */
  QuestionerNoOthers = 125,
  /** Добавить условие */
  QuestionerAddCondition = 126,
  /** Чек-лист */
  QuestionerTemplateCheck = 127,
  /** Переключатель */
  QuestionerTemplateRadio = 128,
  /** Комментарий */
  QuestionerTemplateComment = 129,
  /** Сортировка */
  QuestionerTemplateSorter = 130,
  /** Текстовая вставка */
  QuestionerTemplateText = 131,
  /** В этом блоке можно выбрать несколько вариантов ответа */
  QuestionerTemplateCheckDescription = 132,
  /** В этом блоке можно выбрать только один вариант ответа */
  QuestionerTemplateRadioDescription = 133,
  /** Это блок для любого комментария */
  QuestionerTemplateCommentDescription = 134,
  /** Нужно отсортировать список в правильном порядке */
  QuestionerTemplateSorterDescription = 135,
  /** В тексте есть пробелы - нужно их восстановить */
  QuestionerTemplateTextDescription = 136,
  /** равно */
  QuestionerOperatorEquals = 137,
  /** не равно */
  QuestionerOperatorNotEquals = 138,
  /** присутствует */
  QuestionerOperatorPresent = 139,
  /** отсутствует */
  QuestionerOperatorAbsent = 140,
  /** длина контента больше */
  QuestionerOperatorLengthGreater = 141,
  /** длина контента меньше */
  QuestionerOperatorLengthLess = 142,
  /** Минимум пунктов (1) */
  QuestionerMinimumPoints = 143,
  /** Максимум пунктов */
  QuestionerMaximumPoints = 144,
  /** Нет правильного порядка */
  QuestionerNoOrder = 145,
  /** Нужно выбрать подходящие варианты */
  QuestionerChooseSuitable = 146,
  /** Верхняя ремарка */
  QuestionerTopNote = 147,
  /** Нижняя ремарка */
  QuestionerBottomNote = 148,
  /** Есть пункты без названия */
  QuestionerPointsNoTitle = 149,
  /** Добавить пункт */
  QuestionerAddPoint = 150,
  /** Есть варианты без названия */
  QuestionerVariantsNoTitle = 151,
  /** Добавить вариант */
  QuestionerAddVariant = 152,
  /** Показывать варианты в случайном порядке */
  QuestionerShuffleVariants = 153,
  /** Нет варианотов ответа */
  QuestionerNoVariants = 154,
  /** Ответ на вопрос "$t" обязателен */
  QuestionerAnswerRequired = 155,
  /** Ответ на вопрос "$t" должен содержать */
  QuestionerAnswerMust = 156,
  /** Ответ на вопрос "$t" может содержать */
  QuestionerAnswerMay = 157,
  /** Можно выбрать */
  QuestionerCanChoose = 158,
  /** Нужно выбрать */
  QuestionerNeedChoose = 159,
  /** от $a до $b вариантов */
  QuestionerFromToVariants = 160,
  /** минимум $a */
  QuestionerMinimumVariants = 161,
  /** максимум $a */
  QuestionerMaximumVariants = 162,
  /** Комментарий "$t" является обязательным */
  QuestionerCommentRequiredFor = 163,
  /** Нужно отсортировать значения в пункте "$t" */
  QuestionerSortValuesIn = 164,
  /** Нужно восстановить все недостающие слова в пункте "$t" */
  QuestionerRestoreIn = 165,
  /** $n вариант */
  QuestionerVariantsNumber = 166,

  /** Библия */
  Bible = 167,
  /** Глава */
  BibleChapter = 168,
  /** Поиск в тексте */
  BibleSearchText = 169,
  /** Поиск по главе */
  BibleSearchChapter = 170,
  /** Поиск по ссылке */
  BibleSearchLink = 171,
  /** Вставка */
  BibleInsertion = 172,
  /** Текст в [скобках] */
  BibleTextInBrackets = 173,
  /** Слова Христа */
  BibleJesusWords = 174,
  /** Переводы Библии */
  BibleTranslations = 175,
  /** Загруженные переводы */
  BibleLoadedTranslations = 176,
  /** Доступные к загрузке */
  BibleLoadModules = 177,
  /** Библейские тексты в Предисловии */
  BiblePrefaceTexts = 178,
  /** Нужный перевод должен быть загружен! */
  BibleTranslationsMustBeLoaded = 179,
  /** Поиск по книге $b */
  BibleSearchBook = 180,
  /** Поиск по главе $b $c */
  BibleSearchChapterFull = 181,
  /** Очистить раздел $c? */
  BibleClearChapter = 182,
  /** Удалить безвозвратно модуль "$n" */
  BibleRemoveModule = 183,
  /** Перевод не загружен */
  BibleTranslationsNotLoaded = 184,
  /** [0-9] - перейти к стиху; Shift+[@v>] - добавить диапазон стихов; Ctrl+@ - добавить/удалить один стих */
  BibleVerseKeys = 185,
  /** Ctrl+@ - добавить/убрать перевод на экран */
  BibleAddTranslationToScreen = 186,
  /** Ctrl+@ - добавить из книги */
  BibleAddFromBook = 187,
  /** Ctrl+@ - добавить из главы */
  BibleAddFromChapter = 188,
  /** Shift - для передачи контроля выше */
  BibleShiftPass = 189,
  /** $m+@ - добавить ссылку; $m+$d+@ - вырезать ссылку; Enter - применить; Del - удалить пункт; Ctrl+Del - очистить список "$t" */
  BibleArchiveKeys = 190,
  /** Если в тексте для Предисловия вставить Библейскую ссылку в определённом формате, то в Предисловие будет вставлен текст из Писания автоматически */
  BiblePreface1 = 191,
  /** Последовательность Библейской ссылки выглядит так: */
  BiblePreface2 = 192,
  /** Пробелы и высота букв не обязательны. Но пробела после кода перевода (rst:) быть не должно */
  BiblePreface3 = 193,
  /** Для вставки в Предисловие текста Писания обязательна приставка перевода с двоеточием (в предыдущем примере "rst:") */
  BiblePreface4 = 194,
  /** Перевод задаётся латинскими буквами. На данный момент доступны такие переводы: */
  BiblePreface5 = 195,
  /** Для идентификации Библейской книги укажите сокращение или полное название: */
  BiblePreface6 = 196,
  /** Можно указывать пробел после цифры в названии книги */
  BiblePreface7 = 197,
  /** <ПЕРЕВОД $t НЕ УСТАНОВЛЕН> */
  BibleTranslationsNotSet = 198,
  /** <КНИГА $t НЕ НАЙДЕНА> */
  BibleBookNotFound = 199,
  /** <КНИГИ "$b" В ПЕРЕВОДЕ $t НЕТ> */
  BibleBookAbsent = 200,
  /** <$n ГЛАВЫ НЕТ> */
  BibleChapterAbsent = 201,
  /** <$n СТИХА НЕТ> */
  BibleVerseAbsent = 202,
  /** <ОШИБКА ДИАПАЗОНА> */
  BibleRangeError = 203,
  /** Русский Синодальный Перевод; Новый Завет. Перевод Кассиана (Безобразова); Казахский перевод… */
  BibleTranslate = 204,
  /** F1; Ctrl+Enter - добавить в План */
  BibleAddToPlan = 205,

  /** Расписание не найдено */
  ScheduleNotFound = 206,
  /** Обновлено: $m */
  ScheduleUpdated = 207,
  /** Шаблон $t - Вставить обзорное вложение */
  ScheduleInsertOverviewAttachment = 208,
  /** Мероприятие */
  ScheduleEvent = 209,
  /** Мероприятия */
  ScheduleEventPlural = 210,
  /** Мероприятие не найдено */
  ScheduleEventNotFound = 211,
  /** Тип мероприятия */
  ScheduleEventTypeTitle = 212,
  /** Мероприятий нет */
  ScheduleEventsNotFound = 213,
  /** Мероприятие прошло */
  ScheduleEventPassed = 214,
  /** Не изв. */
  ScheduleUnknownShort = 215,
  /** Ошибка! */
  ScheduleErrorExclamation = 216,
  /** Без названия */
  ScheduleUntitled = 217,
  /** Список */
  ScheduleList = 218,
  /** список */
  ScheduleListLower = 219,
  /** Участники */
  ScheduleMembers = 220,
  /** Роли */
  ScheduleRoles = 221,
  /** роль */
  ScheduleRoleLower = 222,
  /** Отменить */
  ScheduleCancel = 223,
  /** Начало */
  ScheduleStart = 224,
  /** Тема */
  ScheduleTopic = 225,
  /** Заголовок */
  ScheduleHeader = 226,
  /** Содержание */
  ScheduleContent = 227,
  /** Состав */
  ScheduleComposition = 228,
  /** Имя */
  ScheduleFirstName = 229,
  /** Фамилия */
  ScheduleLastName = 230,
  /** Завтра $t в $tm */
  ScheduleNextStart = 231,
  /** Это был последний день */
  ScheduleLastDayWas = 232,
  /** Составляется */
  ScheduleComposing = 233,
  /** Сейчас */
  ScheduleNow = 234,
  /** Тех. перерыв */
  ScheduleTechBreak = 235,
  /** конец дня */
  ScheduleEndOfDay = 236,
  /** до начала меньше часа */
  ScheduleLessThanHour = 237,
  /** через $n минуту */
  ScheduleAfterMinutes = 238,
  /** в $tm */
  ScheduleAtTime = 239,
  /** до начала $n час */
  ScheduleBeforeHours = 240,
  /** до начала $n день */
  ScheduleBeforeDays = 241,
  /** Через $nм. */
  ScheduleThroughMinutes = 242,
  /** осталась $n минута */
  ScheduleMinutesLeft = 243,
  /** Буду участвовать */
  ScheduleWillParticipate = 244,
  /** по ссылке */
  ScheduleByLink = 245,
  /** по кнопке в расписании */
  ScheduleByScheduleButton = 246,
  /** по кнопке "Хочу комментить события" */
  ScheduleByCommentButton = 247,
  /** по кнопке "Хочу комментить события" в отдельном дне */
  ScheduleByDayCommentButton = 248,
  /** Вы будете записаны как участник */
  ScheduleWillBeRegistered = 249,
  /** Предварительной регистрации на мероприятие нет */
  ScheduleNoPreregistration = 250,
  /** Заявка принята */
  ScheduleRequestAccepted = 251,
  /** Заявка отправлена */
  ScheduleRequestSent = 252,
  /** Доступ к содержимому ограничен */
  ScheduleContentAccessLimited = 253,
  /** Предыдущее - $d */
  SchedulePrevious = 254,
  /** Следить за трансляцией */
  ScheduleWatchBroadcast = 255,
  /** Шаблоны событий */
  ScheduleEventTemplates = 256,
  /** Добавить день */
  ScheduleAddDay = 257,
  /** Дни удалять не возможно! Создать новый? */
  ScheduleAddDayConfirm = 258,
  /** Удалить расписание */
  ScheduleRemove = 259,
  /** Восстановить расписание будет не возможно. Продолжить? */
  ScheduleRemoveConfirm = 260,
  /** Хочу комментить события */
  ScheduleWantCommentEvents = 261,
  /** Комментировать события могут только регистрированные пользователи */
  ScheduleOnlyRegComment = 262,
  /** Скопировать расписание */
  ScheduleCopyAll = 263,
  /** Копируем $t */
  ScheduleCopying = 264,
  /** Скопировать $t в $o */
  ScheduleCopyXToY = 265,
  /** Какое расписание копировать? */
  ScheduleWhichToCopy = 266,
  /** Создать расписание */
  ScheduleCreate = 267,
  /** Новое расписание */
  ScheduleNew = 268,
  /** Создать расписание с названием */
  ScheduleCreateWithTitle = 269,
  /** Первый - технический день */
  ScheduleFirstIsTechDay = 270,
  /** Сделать первый день обычным? */
  ScheduleMakeFirstDayUsual = 271,
  /** Сделать первый день подготовительным? */
  ScheduleFirstDayPrep = 272,
  /** Права по умолчанию */
  ScheduleDefaultRights = 273,
  /** Справедливы утверждения мелким шрифтом */
  ScheduleSmallFontStatements = 274,
  /** - Новый */
  ScheduleNewUser = 275,
  /** - в блоке */
  ScheduleInBlock = 276,
  /** - Неизвестный */
  ScheduleUnknown = 277,
  /** Неизвестная роль */
  ScheduleUnknownRole = 278,
  /** Вакант */
  ScheduleVacant = 279,
  /** Добавить новую роль? */
  ScheduleAddRoleConfirm = 280,
  /** Роль $t займёт */
  ScheduleRoleWillTake = 281,
  /** Теперь $u займёт роль $t? */
  ScheduleUserTakeRole = 282,
  /** $t в категорию */
  ScheduleRoleToCategory = 283,
  /** Редактирование роли $t */
  ScheduleRoleRedact = 284,
  /** Иконка для роли $t */
  ScheduleRoleIcon = 285,
  /** $u больше не $t? */
  ScheduleUserNoMoreRole = 286,
  /** Освободить роль */
  ScheduleFreeRole = 287,
  /** Заменить человека */
  ScheduleReplacePerson = 288,
  /** Назначить человека */
  ScheduleAppointPerson = 289,
  /** Категория $t */
  ScheduleCategory = 290,
  /** Основное */
  ScheduleMain = 291,
  /** Не в контексте */
  ScheduleNotInContext = 292,
  /** Файл Excel */
  ScheduleExcelFile = 293,
  /** Не выбирать */
  ScheduleNotChoose = 294,
  /** (Примечание) */
  ScheduleNote = 295,
  /** Сформированный список ($c уч): */
  ScheduleFormedList = 296,
  /** Загрузить список */
  ScheduleUploadList = 297,
  /** Ранее добавленные участники */
  SchedulePreviousMembers = 298,
  /** Игра */
  ScheduleGame = 299,
  /** игра */
  ScheduleGameLower = 300,
  /** Добавить новую игру? */
  ScheduleAddGameConfirm = 301,
  /** Командные игры */
  ScheduleTeamGames = 302,
  /** Командная игра */
  ScheduleTeamGame = 303,
  /** Сформировать команды */
  ScheduleFormTeams = 304,
  /** Составляем новые команды для игры $t */
  ScheduleNewTeams = 305,
  /** Критерий сортировки */
  ScheduleSortCriteria = 306,
  /** Количество команд */
  ScheduleTeamsCount = 307,
  /** Точность сортировки */
  ScheduleSortPrecision = 308,
  /** Команды */
  ScheduleTeams = 309,
  /** Перераспределяю... */
  ScheduleRedistributing = 310,
  /** Разбег между командами - $n */
  ScheduleTeamSpread = 311,
  /** Команда $n */
  ScheduleTeamNumber = 312,
  /** Отправить список команд? */
  ScheduleSendTeams = 313,
  /** Посмотреть критерии сортировки */
  ScheduleViewCriterias = 314,
  /** Список критериев */
  ScheduleCriteriaList = 315,
  /** Добавить новый критерий? */
  ScheduleAddCriteria = 316,
  /** Новый критерий */
  ScheduleNewCriteria = 317,
  /** Фильтр по имени */
  ScheduleFilterByName = 318,
  /** Фильтр по названию */
  ScheduleFilterByTitle = 319,
  /** Отсортированные участники ($n чел) */
  ScheduleSortedMembers = 320,
  /** Неопределённые участники ($n чел) */
  ScheduleUndefinedMembers = 321,
  /** Распределить */
  ScheduleDistribute = 322,
  /** Участники распределены */
  ScheduleMembersDistributed = 323,
  /** $f - неизвестный участник? */
  ScheduleUnknownMemberConfirm = 324,
  /** У кого преимущество? */
  ScheduleWhoHasAdvantage = 325,
  /** Переопределение участника ($t) */
  ScheduleMemberOverride = 326,
  /** Распределение участноков ($t) $n/$m */
  ScheduleMembersDistribution = 327,
  /** Участник определён */
  ScheduleMemberDetermined = 328,
  /** Фотографии */
  SchedulePhotos = 329,
  /** Фотографии (локально) */
  SchedulePhotosLocal = 330,
  /** подготовка */
  SchedulePreparation = 331,
  /** $n день */
  ScheduleDayNumber = 332,
  /** $n день, */
  ScheduleDayNumberComma = 333,
  /** , день $n */
  ScheduleDayWordNumber = 334,
  /** Тема дня */
  ScheduleDayTopic = 335,
  /** Описание дня */
  ScheduleDayDescription = 336,
  /** Рейтинг дня: $t */
  ScheduleDayRating = 337,
  /** Начало дня */
  ScheduleDayStart = 338,
  /** Распечатать распорядок дня */
  SchedulePrintDay = 339,
  /** Загрузить текстовое расписание */
  ScheduleUploadText = 340,
  /** Расписание дня должно быть пустым */
  ScheduleDayMustBeEmpty = 341,
  /** Новые события */
  ScheduleNewEvents = 342,
  /** $nм. */
  ScheduleMinuteShort = 343,
  /** м */
  ScheduleMinuteLetter = 344,
  /** Отправить только новые события */
  ScheduleSendOnlyNewEvents = 345,
  /** Установить время начала дня: $t */
  ScheduleDayStartTime = 346,
  /** Новое событие */
  ScheduleNewEvent = 347,
  /** Отправить расписание */
  ScheduleSend = 348,
  /** Распорядок */
  ScheduleRoutine = 349,
  /** будет здесь */
  ScheduleWillBeHere = 350,
  /** Добавить событие */
  ScheduleAddEvent = 351,
  /** Неизвестный шаблон события */
  ScheduleUnknownEventTemplate = 352,
  /** Это событие только для лидеров */
  ScheduleLeadersOnly = 353,
  /** $t - вставить вложение */
  ScheduleInsertAttachment = 354,
  /** Редактировать шаблон события */
  ScheduleRedactEventTemplate = 355,
  /** Вырезать событие */
  ScheduleCutEvent = 356,
  /** Удалить событие */
  ScheduleRemoveEvent = 357,
  /** Шаблон события $t */
  ScheduleEventTemplate = 358,
  /** Шаблон не найден */
  ScheduleTemplateNotFound = 359,
  /** Рейтинг события */
  ScheduleEventRating = 360,
  /** Другие оценки */
  ScheduleOtherRatings = 361,
  /** Оценок нет */
  ScheduleNoRatings = 362,
  /** Событие $t больше не скрытое? */
  ScheduleEventUnhide = 363,
  /** Событие $t сделать скрытым? */
  ScheduleEventMakeHidden = 364,
  /** Скрытое событие */
  ScheduleHiddenEvent = 365,
  /** Неизвестное вложение */
  ScheduleUnknownEventAttachment = 366,
  /** Контент не доступен */
  ScheduleContentUnavailable = 367,
  /** Источник удалён */
  ScheduleSourceRemoved = 368,
  /** Добавить шаблон события */
  ScheduleAddEventTemplate = 369,
  /** исп. $n раз */
  ScheduleUsedCount = 370,
  /** не используется */
  ScheduleNotUsed = 371,
  /** - Редактирование шаблона */
  ScheduleTemplateRedact = 372,
  /** - Редактирование вложения */
  ScheduleAttachmentRedact = 373,
  /** Период */
  SchedulePeriod = 374,
  /** Сегодня */
  ScheduleToday = 375,
  /** Завтра */
  ScheduleTomorrow = 376,
  /** Вчера */
  ScheduleYesterday = 377,
  /** Сегодня последний день */
  ScheduleTodayLastDay = 378,
  /** Обзор на */
  ScheduleOverviewOf = 379,
  /** Вложения */
  ScheduleAttachments = 380,
  /** Вложение */
  ScheduleAttachment = 381,
  /** Вложений нет */
  ScheduleNoAttachments = 382,
  /** Шаблоны вложений */
  ScheduleAttachmentTemplates = 383,
  /** Создать шаблон вложения? */
  ScheduleAddAttachmentTemplateConfirm = 384,
  /** Есть шаблоны вложений без названия или описания */
  ScheduleTemplatesNoName = 385,
  /** Описание вложения */
  ScheduleAttachmentDescription = 386,
  /** Иконка для вложения $t */
  ScheduleAttachmentIcon = 387,
  /** Убрать ссылку вложения $t из события */
  ScheduleRemoveAttachmentReference = 388,
  /** Убрать вложение $t из события */
  ScheduleRemoveAttachment = 389,
  /** - сослаться на вложение */
  ScheduleAttachmentLink = 390,
  /** Выполнить */
  ScheduleExecute = 391,
  /** Пункты с галочками */
  ScheduleChecklistDescription = 392,
  /** Пункт */
  SchedulePoint = 393,
  /** Есть пустые пункты */
  ScheduleHasEmptyPoints = 394,
  /** Скопировать */
  ScheduleCopy = 395,
  /** Пунктов: $n */
  SchedulePointsCount = 396,
  /** Людей: $n */
  SchedulePeopleCount = 397,
  /** Выбираемых: $n */
  ScheduleSelectableCount = 398,
  /** Отмеченных: $n */
  ScheduleCheckedCount = 399,
  /** Списков: $n */
  ScheduleListsCount = 400,
  /** Под списками: $n */
  ScheduleSubListsCount = 401,
  /** Вставить поле ввода: */
  ScheduleInsertInputField = 402,
  /** $t. Вставлять нечего */
  ScheduleNothingToInsert = 403,
  /** Участник не найден */
  ScheduleMemberNotFound = 404,
  /** Ком. игра не найдена */
  ScheduleGameNotFound = 405,
  /** Неизвестный пункт */
  ScheduleUnknownPoint = 406,
  /** Удалить пункт? */
  ScheduleRemovePointConfirm = 407,
  /** Новый подпункт */
  ScheduleNewSubpoint = 408,
  /** Из списка */
  ScheduleFromList = 409,
  /** Образ "$t" */
  ScheduleImageOf = 410,
  /** Образ не выбран */
  ScheduleImageNotSelected = 411,
  /** Заголовки: */
  ScheduleTitlesColon = 412,
  /** видит */
  ScheduleSeesWord = 413,
  /** редактирует */
  ScheduleEditsWord = 414,
  /** Кто */
  ScheduleWho = 415,
  /** Использовать */
  ScheduleUseWord = 416,
  /** Название пустое */
  ScheduleEmptyName = 417,
  /** Есть пустые заголовки */
  ScheduleHasEmptyTitles = 418,
  /** Используются: */
  ScheduleUsedColon = 419,
  /** ... или участники */
  ScheduleOrMembers = 420,
  /** Название списка */
  ScheduleListName = 421,
  /** Заголовок руководителям */
  ScheduleMentorsTitle = 422,
  /** Заголовок участникам */
  ScheduleMembersTitle = 423,
  /** Создать новый список? */
  ScheduleAddListConfirm = 424,
  /** Создать новое $t? */
  ScheduleCreateNewX = 425,
  /** Иконка для списка $t */
  ScheduleListIcon = 426,
  /** Трансляция не началась */
  ScheduleBroadcastNotStarted = 427,
  /** Трансляция завершена */
  ScheduleBroadcastFinished = 428,
  /** Выбери стримера */
  ScheduleChooseStreamer = 429,
  /** Нет существенных символов! */
  ScheduleNoSignificantChars = 430,
  /** Не должно быть пустым! */
  ScheduleMustNotBeEmpty = 431,
  /** "$t" уже есть! */
  ScheduleAlreadyExists = 432,
  /** Добавление дней */
  ScheduleRightAddDays = 433,
  /** Организатор дней */
  ScheduleRightAddDaysRole = 434,
  /** Организатора дней */
  ScheduleRightAddDaysRoleGen = 435,
  /** Создание дней в расписании */
  ScheduleRightAddDaysDescription = 436,
  /** Добавление событий */
  ScheduleRightAddEvents = 437,
  /** Составитель событий */
  ScheduleRightAddEventsRole = 438,
  /** Составителя событий */
  ScheduleRightAddEventsRoleGen = 439,
  /** Добавление событий в дни расписания */
  ScheduleRightAddEventsDescription = 440,
  /** Редактирование событий */
  ScheduleRightRedactEventContent = 441,
  /** Редактор событий */
  ScheduleRightRedactEventContentRole = 442,
  /** Редактора событий */
  ScheduleRightRedactEventContentRoleGen = 443,
  /** Изменение темы, времени и описания событий */
  ScheduleRightRedactEventContentDescription = 444,
  /** Редактирование композиций */
  ScheduleRightRedactComsList = 445,
  /** Редактор композиций */
  ScheduleRightRedactComsListRole = 446,
  /** Редактора композиций */
  ScheduleRightRedactComsListRoleGen = 447,
  /** Изменение списка композиций в событиях */
  ScheduleRightRedactComsListDescription = 448,

  /** Следите за текстами на экране у себя в телефоне */
  BroadcastFollowInPhone = 449,
  /** Не удалось подключить режим презентации */
  BroadcastPresentModeFailed = 450,
  /** Трансляция */
  Broadcast = 451,

  /** Склад */
  StoragesTitle = 452,
  /** Стеллаж */
  StoragesRack = 453,
  /** Название стеллажа */
  StoragesRackTitle = 454,
  /** Редактирование */
  StoragesEditRack = 455,
  /** Родительский стеллаж */
  StoragesParentRack = 456,
  /** неизвестен */
  StoragesUnknownRack = 457,
  /** Это действие неизменно */
  StoragesActionIrreversible = 458,
  /** Редактировать статусы */
  StoragesEditStatuses = 459,
  /** Специальные поля */
  StoragesSpecialFields = 460,
  /** Сводки */
  StoragesSums = 461,
  /** Название сводки */
  StoragesSumTitle = 462,
  /** Создать карточку */
  StoragesCreateCard = 463,
  /** Сортировка и группировка карточек */
  StoragesSortAndGroup = 464,
  /** Сформировать карточки из Excel */
  StoragesCardsFromExcel = 465,
  /** Добавить участника */
  StoragesAddMember = 466,
  /** Формирование карточек из Excel файла */
  StoragesFromExcelTitle = 467,
  /** Проведите ассоциации для полей: */
  StoragesMatchFields = 468,
  /** Сформировать карточки */
  StoragesFormCards = 469,
  /** Не все строки из файла были преобразованы в карточки. Получилось корректно сформировать $n карточку */
  StoragesPartialFormed = 470,
  /** Мета-данные */
  StoragesMetadata = 471,
  /** Удалить мета-информацию? */
  StoragesRemoveMetadataConfirm = 472,
  /** Новый статус */
  StoragesNewStatus = 473,
  /** Название нового статуса */
  StoragesNewStatusTitle = 474,
  /** Иконка для статуса $t */
  StoragesStatusIcon = 475,
  /** Статусы, которые можно выбрать когда $t - текущий */
  StoragesStatusNextDescription = 476,
  /** Выберите тип нового специального поля */
  StoragesFieldType = 477,
  /** Будет добавлено */
  StoragesWillBeAdded = 478,
  /** во все карточки */
  StoragesToAllCards = 479,
  /** во все $t во всех карточках */
  StoragesNestedCards = 480,
  /** Новое поле */
  StoragesNewField = 481,
  /** Название для нового поля */
  StoragesNewFieldTitle = 482,
  /** Новое поле с типом $t */
  StoragesNewFieldType = 483,
  /** Дат нет */
  StoragesNoDates = 484,
  /** Дата не выбрана */
  StoragesDateNotSelected = 485,
  /** Новая дата */
  StoragesNewDate = 486,
  /** Заметка */
  StoragesNote = 487,
  /** Статус */
  StoragesStatus = 488,
  /** Итог */
  StoragesTotal = 489,
  /** Формула по карточке */
  StoragesSumFormula = 490,
  /** Сортировка */
  StoragesSorting = 491,
  /** Группировка */
  StoragesGrouping = 492,
  /** Направление сортировки */
  StoragesSortDirection = 493,
  /** По возрастанию */
  StoragesAscending = 494,
  /** По убыванию */
  StoragesDescending = 495,
  /** Нет */
  StoragesNone = 496,
  /** Использовать правила */
  StoragesUseRules = 497,
  /** Сортировка и группировка в стеллаже $t */
  StoragesSumAndGroupOf = 498,
  /** Будут изменены статусы для всех карточек этого списка. Внести такие изменения? */
  StoragesStatusesConfirm = 499,
  /** Скопировано */
  StoragesCopied = 500,
  /** Словарь (неизменное значение) */
  StoragesDictionary = 501,
  /** Новый словарь */
  StoragesNewDictionary = 502,
  /** Название для нового словаря */
  StoragesNewDictionaryTitle = 503,
  /** Единица измерения: */
  StoragesUnit = 504,
  /** Значения: */
  StoragesValues = 505,
  /** Стили */
  StoragesStyles = 506,
  /** Обычный */
  StoragesUsual = 507,
  /** Маленький */
  StoragesSmall = 508,
  /** Большой */
  StoragesBig = 509,
  /** Огромный */
  StoragesHuge = 510,
  /** Цвет текста: */
  StoragesTextColor = 511,
  /** Цвет фона: */
  StoragesBackgroundColor = 512,
  /** После запятой - $n зн. */
  StoragesDecimals = 513,
  /** За месяц */
  StoragesByMonth = 514,
  /** За год */
  StoragesByYear = 515,
  /** Отступ сверху */
  StoragesMarginTop = 516,
  /** Отступ снизу */
  StoragesMarginBottom = 517,
  /** Другое */
  StoragesOther = 518,
  /** Введи название измерения (максимум символов - $n) */
  StoragesNewMeasurement = 519,
  /** Описание ($n символов) */
  StoragesDescriptionLength = 520,

  /** Игрок */
  GamerTitle = 521,
  /** Список игр */
  GamerGamesList = 522,
  /** Мемори-гигант */
  GamerMemoryGiant = 523,
  /** Закончить игру? */
  GamerEndGameConfirm = 524,
  /** Удалить изображение? */
  GamerRemoveImageConfirm = 525,
  /** $n сек. */
  GamerSeconds = 526,

  /** Тюнер */
  TunerTitle = 527,

  /** Консоль */
  IndexConsole = 528,
  /** Сущ/прил редактор */
  IndexNounPronounRedact = 529,
  /** Сущ/Прил */
  IndexNounPronouns = 530,
  /** Существительное (М! Ж: Ср. мн, "к) */
  IndexNoun = 531,
  /** Прилагательное (как стена<белый) */
  IndexPronoun = 532,
  /** Для отправки убедись в адекватности словосочетания */
  IndexWordRedactHint = 533,
  /** Нужно выбрать уровень сложности */
  IndexSelectComplexity = 534,

  /** Конфиги */
  Configs = 535,
  /** Прозрачность */
  ConfigOpacity = 536,
  /** Фон */
  ConfigBackground = 537,
  /** Выравнивание */
  ConfigAlign = 538,
  /** Лево */
  ConfigLeft = 539,
  /** Центр */
  ConfigCenter = 540,
  /** Право */
  ConfigRight = 541,
  /** Ширина */
  ConfigJustify = 542,
  /** Высота букв */
  ConfigLetterHeight = 543,
  /** Контур */
  ConfigStroke = 544,
  /** Изменить иконку */
  ConfigChangeIcon = 545,
  /** Окошки */
  ConfigScreens = 546,
  /** Цвет шрифта */
  ConfigTextColor = 547,
  /** Видимость */
  ConfigVisibility = 548,
  /** Стиль текста */
  ConfigTextStyle = 549,
  /** Наклон */
  ConfigItalic = 550,
  /** Нормальный */
  ConfigNormal = 551,
  /** Жирный */
  ConfigBold = 552,
  /** Тонкий */
  ConfigThin = 553,
  /** Не выбрано */
  ConfigNotSelected = 554,
  /** Подтверди */
  ConfigConfirmHeader = 555,
  /** Да */
  ConfigYes = 556,
  /** Нет */
  ConfigNo = 557,
  /** Заполни */
  ConfigPromptHeader = 558,
  /** Принять */
  ConfigAccept = 559,
  /** Текст скопирован */
  ConfigTextCopied = 560,
  /** Выбрать файлы (до $max МБ) */
  ConfigPickFile = 561,
  /** Дата */
  ConfigDate = 562,
  /** Первое с большой */
  ConfigTextCaseCapitalize = 563,
  /** так Как есть */
  ConfigTextCaseAsIs = 564,
  /** ВСЕ С БОЛЬШОЙ */
  ConfigTextCaseUppercase = 565,

  /** Презентации */
  Presentations = 566,
  /** Доступно только в десктопном приложении */
  PresentationsDesktopOnly = 567,

  /** Цветовая гамма */
  ColorGamut = 568,
  /** Луг */
  ColorGamutMeadow = 569,
  /** Чернила */
  ColorGamutInk = 570,
  /** Янтарь */
  ColorGamutAmber = 571,
  /** Малина */
  ColorGamutRaspberry = 572,
  /** Индиго */
  ColorGamutIndigo = 573,
  /** Лагуна */
  ColorGamutLagoon = 574,
  /** Графит */
  ColorGamutGraphite = 575,
  /** Фуксия */
  ColorGamutFuchsia = 576,
  /** Солнце */
  ColorGamutSun = 577,
  /** Неон */
  ColorGamutNeon = 578,

  /** каждое */
  Each0 = 579,
  /** каждый */
  Each1 = 580,
  /** каждая */
  Each2 = 581,
  /** каждое */
  Each3 = 582,
  /** Последние */
  Lasts = 583,
  /** Сообщение */
  Message = 584,
  /** Авторизация не действительна */
  AuthorizationIncorrect = 585,
  /** Не авторизован */
  NotAuthorized = 586,
  /** Выберите программу */
  SelectProgram = 587,
  /** Права доступа */
  AccessRights = 588,
  /** Иное */
  Inoe = 589,
  /** Название */
  Name = 590,
  /** Описание */
  Description = 591,
  /** Комментарий */
  Comment = 592,
  /** Тип */
  Type = 593,
  /** Игры */
  Games = 594,
  /** Новая карточка */
  NewCard = 595,
  /** Роль */
  Role = 596,
  /** Без роли */
  WithoutRole = 597,
  /** Введите название для роли */
  EnterRoleName = 598,
  /** Новая роль */
  NewRole = 599,
  /** Взаимодействие */
  Interactive = 600,
  /** Мои файлы */
  MyFiles = 601,
  /** Загрузки */
  Downloads = 602,
  /** Константы */
  Constants = 603,
  /** $o для $t */
  OneForTwo = 604,
  /** (Новая - v$v) */
  NewVersion = 605,
  /** Настройки */
  Settings = 606,
  /** О приложении */
  AboutApplication = 607,
  /** Другие программы */
  OtherPrograms = 608,
  /** Анимации */
  Animations = 609,
  /** Шрифт */
  Font = 610,
  /** Показать ошибки */
  ShowErrors = 611,
  /** Раздел пуст */
  ChapterEmpty = 612,
  /** - Актуальная */
  ActualVersion = 613,
  /** Убедитесь в наличии интернет-соединения! Обновить приложение? */
  RefreshApplicationConfirm = 614,
  /** Этим действием вы полностью удалите внутренности приложения - оффлайн режим будет недоступен некоторое время. Для подтверждения данного действия введите код $c в поле ввода */
  RefreshOnFinish = 615,
  /** Некорректный код */
  IncorrectCode = 616,
  /** Предупреждение */
  Alert = 617,
  /** Слайды */
  Slides = 618,
  /** Не удалось скопировать текст: */
  CopyTextFailed = 619,
  /** Не удалось поделиться: */
  ShareFailed = 620,
  /** Такой карточки нет */
  CardNotFound = 621,
  /** Ошибка */
  Error = 622,
  /** Папка */
  Folder = 623,
  /** Рабочая папка не выбрана */
  WorkingDirectoryNotSelected = 624,
  /** Выбрать папку (WorkDir = $a внутри неё, если она называется иначе) */
  WorkingDirectoryPickFolder = 625,
  /** Авторизоваться */
  LogIn = 626,
  /** Успешная авторизация */
  AuthorizationSuccess = 627,
  /** Одноразовый код */
  OneTimeCode = 628,
  /** ввести код */
  EnterCode = 629,
  /** или */
  Or = 630,
  /** Читать QR */
  ReadQR = 631,
  /** Показать мой QR */
  ShowMyQr = 632,
  /** Выйти из системы */
  Logout = 633,
  /** Ссылка */
  Link = 634,
  /** События */
  Events = 635,
  /** Текст */
  Text = 636,
  /** Предпросмотр */
  Preview = 637,
  /** Слайд */
  Slide = 638,
  /** Настроить */
  Setup = 639,
  /** История */
  History = 640,
  /** План */
  Plan = 641,
  /** Поиск */
  Search = 642,
  /** Управление */
  Control = 643,
  /** Состоять в канале */
  TelegramBeInChannel = 644,
  /** Перейти в него Нажать кнопку "Авторизоваться" в закрепе Ввести код из личного сообщения от бота сюда: */
  TelegramSteps = 645,
  /** Запустить бота */
  TelegramStartBot = 646,
  /** Для авторизации нужно */
  TelegramAuthorizationNeeds = 647,
  /** $f привязан к текущему аккаунту */
  EmailBoundToCurrentAccount = 648,
  /** Код отправлен на почту $e */
  EmailCodeSent = 649,
  /** Привязать E-mail */
  EmailToBind = 650,
  /** E-mail */
  EmailLabel = 651,
  /** $f из $o */
  FromOf = 652,
  /** Избранное */
  Favorite = 653,
  /** Лимит - $n избранных */
  FavoriteNumberLimit = 654,
  /** Выбранное */
  Selected = 655,
  /** Очистить список выбранных */
  ClearSelectedList = 656,
  /** Цвет */
  Color = 657,
  /** До */
  Before = 658,
  /** Вместо */
  Instead = 659,
  /** После */
  After = 660,
  /** Списки */
  Lists = 661,
  /** Строка $n */
  LineNumber = 662,
  /** Слово */
  Word = 663,
  /** Слово $n */
  WordNumber = 664,
  /** Удалить */
  Delete = 665,
  /** Текст до */
  TextBefore = 666,
  /** Текст после */
  TextAfter = 667,
  /** Закрыть */
  Close = 668,
  /** $n сек. */
  NumberSeconds = 669,
  /** Подробнее */
  Detailed = 670,
  /** Размер шрифта */
  FontSize = 671,
  /** Просмотрели $n раз */
  LookedNumberTimes = 672,
  /** Добавить */
  ToAdd = 673,
  /** $n-й день */
  NumberDay = 674,
  /** Сохранено локально */
  SavedLocally = 675,
  /** Создать */
  Create = 676,
  /** Редактировать */
  Redact = 677,
  /** Нет доступа */
  NoAccess = 678,
  /** Продолжительность, мин */
  DurationMinutes = 679,
  /** мин */
  MinuteShort = 680,
  /** Отправить */
  Send = 681,
  /** Список пуст */
  EmptyList = 682,
  /** <Без значения> */
  NoValue = 683,
  /** Например */
  ForExample = 684,
  /** Для чтения файлов Excel необходимо соединение с интернет */
  ExcelNeedsNetwork = 685,
  /** Срочно! */
  Urgent = 686,
  /** Картинки */
  MyFilesTypesImages = 687,
  /** изображение */
  MyFilesTypesImage = 688,
  /** Видео */
  MyFilesTypesVideo = 689,
  /** видео-файл */
  MyFilesTypesVideoFile = 690,
  /** Шрифты */
  MyFilesTypesFonts = 691,
  /** файл шрифтов */
  MyFilesTypesFontFile = 692,
  /** Другие */
  MyFilesTypesOther = 693,
  /** файл */
  MyFilesTypesFile = 694,
  /** По умолчанию */
  ByDefault = 695,
  /** Загрузить файлы */
  UploadFiles = 696,
  /** Закрыть окно? */
  CloseConfirm = 697,
  /** Начальный слайд закрывается */
  SlideCloses = 698,
  /** по клавише Backspace */
  ByBackspace = 699,
  /** Выберите Excel файл */
  PickExcelFile = 700,
  /** Строка важного сообщения */
  AlertLine = 701,
  /** Положение строки - вверх/вниз/+CTRL */
  AlertLinePosition = 702,
  /** Не найдено */
  NotFound = 703,
  /** Альтернативный текст: */
  AlternativeText = 704,
  /** Название: */
  AlertTitle = 705,
  /** Время пробега: */
  RunTime = 706,
  /** Добавить шаблон */
  AddTemplate = 707,
  /** Конфигураций нет */
  NoConfigs = 708,
  /** Без фона */
  WithoutBackground = 709,
  /** Нецифра - разделитель */
  NonDigitSeparator = 710,
  /** Упс... Что-то пошло не по плану... */
  Oops = 711,
  /** Можно принудительно обновить версию приложения */
  UpdateHint = 712,
  /** Кэш */
  Cached = 713,
  /** Уведомления запрещены. Разрешите их в настройках браузера или телефона: приложение → Уведомления */
  SchedulePushPermissionDenied = 714,
  /** Не удалось включить уведомления. Попробуйте ещё раз */
  SchedulePushSubscribeError = 715,

  /** $n символ */
  NumberSymbols = 716,

  /** Напоминания отключены */
  ScheduleInformStatus = 717,
  /** Напоминать только в начале */
  ScheduleInformOnlyByStart = 718,
  /** Напоминать за $n мин. */
  ScheduleInformBefore = 719,
  /** Участник не получает уведомления */
  ScheduleUserReceiveInform = 720,
  /** Не напоминать мне */
  ScheduleInformMe = 721,
  /** Отключить на время */
  ScheduleInformMuteFor = 722,
  /** 1 час */
  ScheduleInformMute1Hour = 723,
  /** 4 часа */
  ScheduleInformMute4Hours = 724,
  /** 8 часов */
  ScheduleInformMute8Hours = 725,
  /** 1 день */
  ScheduleInformMute1Day = 726,
  /** 7 дней */
  ScheduleInformMute7Days = 727,
  /** Отключить звук */
  ScheduleInformSoundOn = 728,
  /** Отключить уведомления */
  ScheduleInformOn = 729,
  /** До $d */
  ScheduleInformUntil = 730,
  /** Включить снова */
  ScheduleInformResume = 731,
  /** Приглашение */
  ScheduleInvite = 732,
  /** Выключено */
  ScheduleInformDisabled = 733,
  /** Периодичность */
  SchedulePeriodicity = 734,
  /** Моё участие */
  ScheduleMyParticipation = 735,
  /** Моя роль */
  ScheduleMyRole = 736,
  /** Покинуть */
  ScheduleLeave = 737,
  /** Покинуть мероприятие? */
  ScheduleLeaveConfirm = 738,
  /** Прошедшие */
  SchedulePassedPlural = 739,
  /** Отключить */
  ScheduleEnable = 740,
  /** Отключённые */
  SchedulePausedPlural = 741,
  /** Больше года */
  ScheduleMoreThanYear = 742,
  /** Добавить пользователя по QR */
  ScheduleAddUserByQr = 743,
  /** Каждую неделю */
  SchedulePeriodEveryWeek = 744,
  /** Раз в месяц */
  SchedulePeriodMonthly = 745,
  /** День недели месяца */
  SchedulePeriodWeekdayOfMonthKind = 746,
  /** Пользователь добавлен в расписание */
  ScheduleUserAdded = 747,
  /** Push-уведомления */
  PushNotifications = 748,
  /** Подобрать Icon */
  ConfigPickIcon = 749,
  /** Копировать */
  Copy = 750,
  /** Оповещение будет за $n минут */
  ScheduleEventAppInformWillBe = 751,
  /** Оповещение не будет */
  ScheduleEventAppInformWontBe = 752,
  /** Умный поиск */
  CmSmartSearch = 753,
  /** Системный язык */
  SystemLanguage = 754,
  /** Язык приложения */
  AppLanguage = 755,
  /** Песни в списке "$l" нет */
  CmComNotInList = 756,
  /** Неизвестное имя иконки: $n */
  OtherFooterIconUnknown = 757,
  /** Иконка для раздела «$n» */
  OtherFooterIconTitle = 758,
  /** Список иконок пуст */
  OtherFooterIconListEmpty = 759,

  /** Некорректное имя аккорда $n */
  InvalidChordName = 760,
  /** @deprecated 1344 */
  CmPickChord = 761,
  /** Гитара */
  CmGuitar = 762,
  /** Укулеле */
  CmUkulele = 763,

  /** Трансфер */
  TextTransfer = 764,
  /** ПК */
  TextTransferPc = 765,

  /** Отправить тестовый PUSH */
  PushTestSendTooltip = 786,

  // Отдельный ключ для названия страницы и пункта меню «Пользователи»: ключ прав доступа не трогаем.
  /** Пользователи */
  Users = 804,

  // Название переключателя тёмной темы в настройках приложения.
  /** Инверсия темы */
  DarkMode = 807,

  // Кнопка обновления приложения в тосте о новой версии.
  /** Обновить */
  Update = 811,

  // Заголовок тоста о новой версии приложения: короткий фрагмент `NewVersion` в роли заголовка не годится.
  /** Доступна новая версия приложения — v$v */
  NewVersionAvailable = 812,

  // Сообщение о том, что переданный файл превышает заданный лимит объёма.
  /** Файл больше $s МБ */
  TextTransferFileTooLarge = 813,

  // Подсказка у кнопки выбора файла: файл передаётся параллельно тексту, только один, с лимитом объёма.
  /** Параллельно с текстом: один файл (до $s МБ) */
  TextTransferFileHint = 814,

  // Кнопка скачивания полученного файла (не путать с разделом «Загрузки»).
  /** Скачать */
  Download = 815,

  // Сообщение в консоль, когда IndexedDB заблокирована другой вкладкой.
  /** Доступ к базе данных заблокирован другой вкладкой. */
  DatabaseBlockedByAnotherTab = 817,

  // Ошибка декодирования TBCV-ключа: $t подставляет исходное значение ключа.
  /** Некорректный формат TBCV ключа: "$t" */
  InvalidTbcvKeyFormat = 818,

  // Названия уровней интенсивности кома: значения выбираются по CmComIntensityLevel.
  /** Очень медленная; Медленная; Средняя; Быстрая; Очень быстрая */
  CmIntensityTitle = 819,

  // Ограничение количества альтернатив комментария в настройках констант.
  /** макс. кол-во альтернатив */
  ConstantsMaxComCommentAlternativesCount = 820,
  // Ограничение длины блока комментария в настройках констант.
  /** макс. символов для блока */
  ConstantsMaxComCommentBlockLen = 821,
  // Ограничение длины аккорда в комментарии в настройках констант.
  /** макс. символов для аккорда */
  ConstantsMaxComCommentChordLen = 822,
  // Ограничение длины шапки комментария в настройках констант.
  /** макс. символов для шапки */
  ConstantsMaxComCommentHeadLen = 823,
  // Ограничение длины строки комментария в настройках констант.
  /** макс. символов для строки */
  ConstantsMaxComCommentLineLen = 824,
  // Ограничение длины слова в комментарии в настройках констант.
  /** макс. символов для слова */
  ConstantsMaxComCommentWordLen = 825,
  // Ограничение длины строки текста песни в настройках констант.
  /** макс. длина строки в песне */
  ConstantsMaxComLineLength = 826,
  // Ограничение количества избранных песен в настройках констант.
  /** макс. избранных песен */
  ConstantsMaxFavouritesCount = 827,
  // Ограничение количества последних посещённых песен в настройках констант.
  /** макс. последних песен */
  ConstantsMaxLaterComsCount = 828,
  // Ограничение количества выбранных песен в настройках констант.
  /** макс. выбранных песен */
  ConstantsMaxSelectedComsCount = 829,
  // Ограничение объёма передаваемого файла в настройках констант.
  /** макс. объём передаваемых файлов (МБ) */
  ConstantsMaxTransferFileSize = 830,

  // Заголовок группы констант комментариев.
  /** cm - комменты */
  ConstantsCmComments = 831,
  // Заголовок группы прочих констант песен.
  /** cm - другое */
  ConstantsCmOther = 832,
  // Заголовок группы общих констант Index.
  /** index - общее */
  ConstantsIndexCommon = 833,

  // Заголовок конфигурации допустимых доменных зон E-mail.
  /** E-mail доменные зоны */
  ConstantsEmailDomainZones = 834,
  // Ошибка конфигурации: адрес не входит в допустимые доменные зоны; $z - список зон.
  /** Допустимые доменные зоны: $z */
  ConstantsAllowedEmailDomainZones = 835,
  // Ошибка конфигурации: вместо строки передано значение другого типа.
  /** Ожидается строка */
  ConstantsStringExpected = 836,

  // Сообщение о недопустимых символах: $m - сами символы, $t - текст с выделенными ошибками.
  /** Присутствуют недопустимые символы: $m\n\n$t */
  CmIncorrectSymbolsPresent = 837,
  // Предупреждение о непарных кавычках: $n - количество, $o - открывающие (true) или закрывающие (false).
  /** В тексте присутствует непарное количество кавычек.\nНеобходимо добавить $n открывающую кавычку */
  CmUnpairedQuotesWarning = 838,
}
