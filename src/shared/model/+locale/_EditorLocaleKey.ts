export const enum EditorLocaleKey {
  /** Версия локали */
  LocaleVersion = 0,
  /** Не совпадает количество аккордов по строкам в версиях сложности в строке $n */
  CmChordLengthMismatch = 1,
  /** Размерность */
  CmSize = 2,
  /** Интенсивность */
  CmIntensity = 3,
  /** Текст в [квадратных скобках] не показывается в слайдах, но приводится к (тексту в круглых скобках) в тексте песен. Используйте [[две открывающие скобки] для переноса строки. Перед "[" должен быть пробел, а после "]" быть ничего не должно */
  CmEditSquareBracketsHint = 4,
  /** Удалить новый блок? $t */
  CmEditIsRemoveTextBlock = 5,
  /** Удалённые песни */
  CmEditRemovedComs = 6,
  /** Восстановить эту песню */
  CmEditBackup = 7,
  /** Уничтожить эту песню */
  CmEditDestroy = 8,
  /** Вставка предыдущего текста */
  CmEditInsertPreviousText = 9,
  /** Заменить на этот текст */
  CmEditReplaceText = 10,
  /** Будет очищено при вставке новых блоков */
  CmEditWillClearOnInsert = 11,
  /** Удалённые аудио */
  CmEditRemovedAudios = 12,
  /** Добавить аудио */
  CmEditAddAudio = 13,
  /** Конфиг стр $n */
  CmEditConfigStringNumber = 14,
  /** Очистить номер из сборника $n */
  CmEditClearCollectionNumber = 15,
  /** Вставить новый блок сюда */
  CmEditInsertBlockX = 16,
  /** Новая песня */
  CmEditorNewCom = 17,
  /** Нет разобранных порядковых блоков */
  CmEditorNewNoParsed = 18,
  /** Нет прикреплённых аудио */
  CmEditorNewNoAudio = 19,
  /** Начни писать или вставь текст для создания песни */
  CmEditorNewStartWrite = 20,
  /** Разобрать текст */
  CmEditorNewParseTextHeap = 21,
  /** Прикреплённые аудио */
  CmEditorNewBoundAudio = 22,
  /** Нет треков */
  CmEditorNewNoTracks = 23,
  /** Новые аудио */
  CmEditorNewNewAudios = 24,
  /** Опубликовать песню */
  CmEditorNewPublishCom = 25,

  /** Аккорды */
  CmChords = 26,
  /** Вернуть аккорд */
  CmComeBackChord = 27,
  /** Удалить аккорд */
  CmDeleteChord = 28,
  /** Такой аккорд существует */
  CmChordExists = 29,
  /** Неправильное написание аккорда */
  CmIncorrectChord = 30,
  /** Выбери аккорд для редактирования */
  CmSelectChordEdit = 31,
  /** Неизвестные аккорды ($n) */
  CmUnknownChordsCount = 32,
  /** Больше редактирующих нет */
  CmNoEditorsMore = 33,
  /** Редактирует также $l */
  CmEditsToo = 34,
  /** Редактирует $f */
  CmEdits = 35,
  /** Песня удалена */
  CmComRemoved = 36,
  /** Восстановить */
  CmComeBack = 37,
  /** Порядковые блоки */
  CmOrderBlocks = 38,
  /** Устанавливаем Аккорды для блока */
  CmEditorSetBlockChords = 39,
  /** Значение модуляции */
  CmEditorModulationValue = 40,
  /** Установка значения модуляции */
  CmEditorModulationValueSetting = 41,
  /** Тип блока */
  CmEditorBlockKind = 42,
  /** Заменить текст */
  CmEditorReplaceText = 43,
  /** Переместить блок */
  CmEditorMoveBlock = 44,
  /** Текст для нового блока */
  CmEditorNewBlockText = 45,
  /** Блок аккордов */
  CmEditorChordBlock = 46,
  /** Тип нового блока */
  CmEditorNewBlockType = 47,
  /** Текстовый блок */
  CmEditorTextBlock = 48,
  /** Аккордный блок */
  CmEditorChordedBlock = 49,
  /** Тональность песни */
  CmEditorComKey = 50,
  /** Нет упоминаний этого блока */
  CmEditorNoBlockReferences = 51,
  /** Отправить выбранные песни */
  CmEditorSendSelected = 52,
  /** История дня */
  CmEditorDayHistory = 53,
  /** Отправка песен в событие */
  CmEditorSendingToEvent = 54,
  /** Показать ещё */
  CmEditorShowMore = 55,
  /** Другая группа ассоциации */
  CmEditorOtherGroup = 56,
  /** Данная песня состоит в другой группе ассоциаций */
  CmEditorComInOtherGroup = 57,
  /** Ссылок нет */
  CmEditorNoReferences = 58,
  /** Сброс границ */
  CmEditorResetBounds = 59,
  /** Начальный лад */
  CmEditorStartFret = 60,
  /** URL-адрес */
  CmEditorUrl = 61,
  /** URL-адрес: */
  CmEditorUrlColon = 62,
  /** Обзор URL */
  CmEditorObserveUrl = 63,
  /** Известные ресурсы: */
  CmEditorKnownResources = 64,
  /** MP3 */
  CmEditorMp3 = 65,
  /** Ё-Е правила */
  CmEditorYoYeRules = 66,
  /** Ударов в минуту */
  CmEditorBeatsPerMinute = 67,
  /** Redirect */
  CmEditorRedirect = 68,
  /** Query (mp3): */
  CmEditorQueryMp3 = 69,
  /** Аттрибут с URL (mp3): */
  CmEditorAttributeUrlMp3 = 70,
  /** Аттрибут (текст): */
  CmEditorAttributeText = 71,
  /** Замена в строке URL (RegExp): */
  CmEditorReplaceUrlRegExp = 72,
  /** Заменить в строке URL (на текст): */
  CmEditorReplaceUrlText = 73,
  /** Песня не воспроизводилась */
  CmEditorComNotPlayed = 74,
  /** Не нашлось некорректного времени */
  CmEditorNoIncorrectTime = 75,
  /** Такой URL-адрес уже есть */
  CmEditorUrlAlreadyExists = 76,
  /** Ссылка должна начинаться с https:// */
  CmEditorUrlMustBeHttps = 77,
  /** Ссылка должна быть на корень сайта (без $u) */
  CmEditorUrlMustBeRoot = 78,
  /** Невалидный URL-адрес */
  CmEditorInvalidUrl = 79,
  /** Редирект должен быть на известный ресурс */
  CmEditorRedirectKnown = 80,
  /** Неизвестный источник */
  CmEditorUnknownSource = 81,
  /** Редактор MP3 правил */
  CmEditorMp3RulesEditor = 82,
  /** Новое правило */
  CmEditorNewRule = 83,
  /** Проверить */
  CmEditorCheck = 84,
  /** Применить */
  CmEditorApply = 85,
  /** Новое значение */
  CmEditorNewValue = 86,
  /** Сброс */
  CmEditorReset = 87,
  /** Сбросить повторения блока "$h"? */
  CmEditorResetRepeats = 88,
  /** Очистить собственные правила повторения? */
  CmEditorClearOwnRepeats = 89,
  /** Вставить новый блок в самое начало? */
  CmEditorInsertBlockStart = 90,
  /** Вставить новый блок сюда? */
  CmEditorInsertBlockHere = 91,
  /** Удалить ссылку? */
  CmEditorRemoveReference = 92,
  /** Переместить (удалить из этой группы) */
  CmEditorMoveOutGroup = 93,
  /** Статистика использования */
  CmEditorStatistics = 94,
  /** Этот список уже загружен */
  CmEditorListLoaded = 95,
  /** Удалить эту запись? */
  CmEditorRemoveRecord = 96,
  /** Обновил: */
  CmEditorUpdatedBy = 97,
  /** Следующий блок - продолжение */
  CmEditorNextIsContinuation = 98,
  /** Удалить блок */
  CmEditorDeleteBlock = 99,
  /** Скрыть блок */
  CmEditorHideBlock = 100,
  /** Показать блок */
  CmEditorShowBlock = 101,
  /** Скрыть блок $h? */
  CmEditorHideBlockConfirm = 102,
  /** Ссылка на $h */
  CmEditorLinkToBlock = 103,
  /** Текстовый блок для блока */
  CmEditorTextForBlock = 104,
  /** Скрывать в свёрнутом режиме */
  CmEditorHideInCollapsed = 105,
  /** Показывать в свёрнутом режиме */
  CmEditorShowInCollapsed = 106,
  /** $h будет тут */
  CmEditorBlockWillBeHere = 107,
  /** Убрать название блока */
  CmEditorRemoveBlockName = 108,
  /** Вернуть название блока */
  CmEditorRestoreBlockName = 109,
  /** Установить смену типа тональности */
  CmEditorSetTonalitySwitch = 110,
  /** Снять смену типа тональности */
  CmEditorRemoveTonalitySwitch = 111,
  /** В этом блоке и после него тип тональности будет */
  CmEditorTonalityTypeWillBe = 112,
  /** диезный */
  CmEditorSharp = 113,
  /** бемольный */
  CmEditorFlat = 114,
  /** Сделать песню диезной? */
  CmEditorComSharp = 115,
  /** Сделать песню бемольной? */
  CmEditorComFlat = 116,
  /** Тип тональности - */
  CmEditorTonalityTypeIs = 117,
  /** Тональность — $t */
  CmEditorComTonalityLabel = 118,
  /** Песня не проигрывается */
  CmEditorComNotPlaying = 119,
  /** При переименовании привязка к блоку будет утеряна */
  CmEditorRenameUnbinds = 120,
  /** Удалить точку $t? */
  CmEditorRemovePoint = 121,
  /** Новый блок */
  CmEditorNewBlock = 122,
  /** Следующий этап */
  CmEditorNextStage = 123,
  /** Др. набор */
  CmEditorOtherSet = 124,
  /** Показывать другие метки */
  CmEditorShowOtherMarks = 125,
  /** Лад $n */
  CmEditorFretNumber = 126,
  /** Редактирование интерпретации для мероприятия */
  CmEditorInterpretationEdit = 127,
  /** включать библейские слова */
  CmEditorIncludeBibleWords = 128,
  /** Отправить $n слово */
  CmEditorSendWords = 129,
  /** Сделать $n-ю часть ссылки на $h невидимой? */
  CmEditorLinkPartHide = 130,
  /** Сделать $n-ю часть ссылки на $h видимой? */
  CmEditorLinkPartShow = 131,
  /** Это действие повлечёт за собой уничтожение аппликатуры в данном блоке. */
  CmEditorAppliqueDestroyed = 132,
  /** Подготовка */
  CmEditorPreparation = 140,
  /** Считывание текстов */
  CmEditorReadTexts = 141,
  /** Преобразование в монолит */
  CmEditorMonolith = 142,
  /** В нижний регистр */
  CmEditorToLower = 143,
  /** Обрезка неславянских символов */
  CmEditorTrimNonSlavic = 144,
  /** Глобальная замена ё на е */
  CmEditorReplaceYoWithYe = 145,
  /** Преобразование в список отдельных слов */
  CmEditorToWordList = 146,
  /** Отсеивание неуникальных слов */
  CmEditorFilterUnique = 147,
  /** Отбор слов содержащих буквы "е" */
  CmEditorPickWordsWithYe = 148,
  /** Сортировка слов */
  CmEditorSortWords = 149,
  /** Отрисовка списка $n */
  CmEditorRenderList = 150,
  /** Проверено слово $w */
  CmEditorWordChecked = 151,
  /** innerHTML (Не innerText): */
  CmEditorHtmlMode = 152,
  /** Категории */
  CmEditorCategories = 153,
  /** Создать категорию */
  CmEditorCategoryCreate = 154,
  /** Вид категории */
  CmEditorCategoryKind = 155,
  /** Название категории */
  CmEditorCategoryTitle = 156,
  /** Песен: $c */
  CmEditorCategoryComsCount = 157,
  /** Редактировать категорию */
  CmEditorCategoryEdit = 158,
  /** Удалённые категории */
  CmEditorRemovedCats = 159,
  /** Посмотреть JSON */
  LookJSON = 160,
  /** Вернуться к редактированию */
  BackToEdit = 161,

  /** Вид нельзя изменить: в категории есть песни */
  CmEditorCategoryKindLocked = 162,
  /** Удалить $x */
  DeleteX = 163,
  /** Изменений нет */
  NoChanges = 164,
  /** Отправить $s */
  ToSendSomething = 165,
  /** Некорректное название */
  IncorrectName = 166,
  /** Тексты */
  Texts = 167,
  /** Много строк */
  ManyLines = 168,
  /** Максимальное количество строк */
  MaximumLinesCount = 169,
  /** Мало строк */
  FewLines = 170,
  /** Сборники */
  Collections = 171,
  /** Запрещено */
  Denied = 172,
  /** Язык */
  Language = 173,

  /** Дашборд */
  VisitsDashboard = 174,
  /** Онлайн */
  VisitsOnline = 175,
  /** Визитов сегодня */
  VisitsToday = 176,
  /** Уникальных посетителей */
  VisitsUnique = 177,
  /** Посещения за сегодня, по часам */
  VisitsTodayByHour = 178,
  /** Поддержка */
  VisitsSupport = 179,
  /** Лог */
  VisitsLog = 180,
  /** Ошибки */
  VisitsErrors = 181,
  /** аноним */
  VisitsAnonymous = 182,
  /** Отметить прочитанным */
  VisitsMarkAllRead = 183,
  /** Загрузить более старые */
  VisitsOlderMessages = 184,
  /** Система */
  VisitsSystem = 185,
  /** $f-$t - $c посещений */
  VisitsHourPeriod = 186,
  /** История посещений */
  VisitsHistory = 187,
  /** Дни */
  VisitsPeriodDay = 188,
  /** Недели */
  VisitsPeriodWeek = 189,
  /** Месяцы */
  VisitsPeriodMonth = 190,
  /** Годы */
  VisitsPeriodYear = 191,
  /** $l - $c посещений */
  VisitsHistoryCount = 192,
  /** Средние посещения */
  VisitsAverage = 193,
  /** $l - $c в среднем в день */
  VisitsAveragePeriod = 194,
  /** Визиты */
  VisitsVisitErrors = 195,
  /** $u уникальных, $v посещений */
  VisitsAnonSummary = 196,
  /** Визиты по версиям */
  VisitsVersions = 197,
  /** Минимальные версии по дням */
  VisitsMinVersions = 198,
  /** Отправить отчёт на e-mail */
  VisitsSendReport = 199,
  /** Отправлено на $e */
  VisitsReportSent = 200,
  /** Онлайн по часам */
  VisitsOnlineByHour = 201,
  /** $f-$t - мин $n — макс $x */
  VisitsOnlineHourPeriod = 202,
  /** Изменения */
  VisitsChanges = 203,
  /** Получатели отчёта */
  VisitsReportRecipients = 204,
  /** Список получателей сохранён */
  VisitsRecipientsSaved = 205,
  /** Не отправлено: $e */
  VisitsReportNotSent = 206,
  /** Удалить получателя $e из списка? */
  VisitsReportRecipientRemoveConfirm = 207,
  /** @deprecated 1370 */
  CmEditorHardChordsComplexHint = 208,
  /** Проверка PUSH-уведомлений */
  PushCheck = 209,
  /** Копировать из «$t» */
  CmEditBroadcastCopyNl = 210,
  /** b-># */
  CmEditorBemoleToDiez = 211,
  /** Параметр */
  CmEditorSmartSearchParam = 212,
}
