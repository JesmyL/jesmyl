export const enum BackLocaleKey {
  /** Только с первой разбивкой текстов на слайды */
  CmSmartSearchNoSecondTextSplit = 0,
  /** Без разбивок текстов на слайды */
  CmSmartSearchNoTextSplits = 1,
  /** Некорректные аккорды */
  CmSmartSearchIncorrectChords = 2,
  /** Не удалось получить список аудио с сервера: $s */
  AudioListFetchFailed = 3,
  /** Сервер вернул некорректный список аудио */
  AudioListInvalid = 4,
  /** Такое время уже зарегистрировано */
  CmAudioMarkTimeExists = 5,
  /** Порядковый блок не найден */
  CmComOrderNotFound = 6,
  /** Песня не найдена */
  CmComNotFound = 7,
  /** Мероприятие не найдено */
  ScheduleNotFound = 8,
  /** Не удалось выполнить операцию */
  CmOperationFailed = 9,
  /** Ошибка удаления */
  CmDeleteFailed = 10,
  /** Целевой порядковый блок не найден */
  CmComOrderTargetNotFound = 11,
  /** Опорный порядковый блок не найден */
  CmComOrderAnchorNotFound = 12,
  /** Целевой порядковый блок должен быть выше опорного */
  CmComOrderTargetAboveAnchor = 13,
  /** Неизвестный тип */
  CmComOrderUnknownKind = 14,
  /** Продолжение блока не найдено */
  CmComOrderContinuationNotFound = 15,
  /** Блок не найден */
  CmComOrderBlockNotFound = 16,
  /** В песне нет текстов */
  CmComNoTexts = 17,
  /** Текста нет */
  CmComTextMissing = 18,
  /** Аппликатура не обнаружена */
  CmComApplikaturaMissing = 19,
  /** Порядковый блок не найден (при поиске по собственному ID) */
  CmComOrderOwnBlockNotFound = 20,
  /** Не найден определённый родительский блок $p */
  CmComOrderParentNotFound = 21,
  /** Неизвестный фильтр умного поиска */
  CmSmartSearchUnknownFilter = 22,
  /** MP3-правило не найдено */
  CmEditorMp3RuleNotFound = 23,
  /** Неизвестная песня */
  CmComUnknown = 24,
  /** Сначала песню нужно удалить */
  CmComMustDeleteFirst = 25,
  /** Категория не является списком */
  CmCatNotList = 26,
  /** Категория не является сборником */
  CmCatNotDict = 27,
  /** Категория "$n" не была удалена */
  CmCatNotRemoved = 28,
  /** Вид категории "$n" нельзя изменить: в ней есть песни */
  CmCatKindLocked = 29,
  /** Название категории не может быть пустым */
  CmCatNameEmpty = 30,
  /** Название категории слишком длинное */
  CmCatNameTooLong = 31,
  /** Категория не найдена */
  CmCatNotFound = 32,
  /** Авторизация не действительна */
  AuthInvalid = 33,
  /** Неизвестный префикс ссылки $p */
  AudioLinkPrefixUnknown = 34,
  /** Не удалось обновить избранное */
  CmUserStoreUpdateFailed = 35,
  /** Опрос не найден */
  QBlankNotFound = 36,
  /** Шаблон $t опроса "$n" не найден */
  QTemplateNotFound = 37,
  /** Этот символ уже используется в тексте */
  QSymbolAlreadyUsed = 38,
  /** Нет прав на это действие */
  NoAccess = 39,
  /** Не состоит в канале */
  NotInChannel = 40,
  /** $e - $r */
  EmailDomainInvalid = 41,
  /** $e - Запросите отправку кода чуть позже */
  OtpRequestLater = 42,
  /** E-mail уже привязан к вашему аккаунту */
  EmailAlreadyBound = 43,
  /** Неверный код */
  OtpIncorrect = 44,
  /** Время кода истекло */
  OtpExpired = 45,
  /** Ошибка привязки - неизвестный профиль */
  OtpUnknownProfile = 46,
  /** Ошибка привязки - другой аккаунт */
  OtpOtherAccount = 47,
  /** Ошибка привязки - e-mail не определён */
  OtpEmailMissing = 48,
  /** Невозможно привязать почту к тому же аккаунту */
  OtpSameAccount = 49,
  /** Некорректная push-подписка: неверный endpoint */
  PushEndpointInvalid = 50,
  /** Некорректная push-подписка: недопустимый push-сервис */
  PushServiceInvalid = 51,
  /** Некорректная push-подписка: не указан endpoint */
  PushEndpointMissing = 52,
  /** Некорректная push-подписка: отсутствуют ключи шифрования */
  PushKeysMissing = 53,
  /** Пользователь не найден */
  UserNotFound = 54,
  /** Эти права доступа менять нельзя */
  AccessRightImmutable = 55,
  /** Нельзя поменять роль себе же */
  RoleSelfChangeForbidden = 56,
  /** Роль не найдена */
  RoleNotFound = 57,
  /** Такая роль уже существует */
  RoleAlreadyExists = 58,
  /** Неверный код авторизации */
  AuthCodeIncorrect = 59,
  /** Прилагательное должно заканчиваться на `й` или `йся` */
  AdjectiveEndingInvalid = 60,
  /** Клиент не найден */
  ClientNotFound = 61,
  /** Языковая конфигурация не найдена */
  LangConfigNotFound = 62,
  /** Не зарегистрирован */
  NotRegistered = 63,
  /** Нет прав на изменение прав участников расписания */
  NoRightsChangeScheduleMembers = 64,
  /** Нет прав на изменение списка композиций события */
  NoRightsChangeEventComs = 65,
  /** Нет прав на редактирование */
  NoRightsScheduleRedact = 66,
  /** Нет прав на редактирование участников */
  NoRightsScheduleUsersRedact = 67,
  /** Нет прав на добавление дней */
  NoRightsScheduleAddDays = 68,
  /** Нет прав на добавление событий */
  NoRightsScheduleAddEvents = 69,
  /** Нет прав на редактирование событий */
  NoRightsScheduleEventContentRedact = 70,
  /** День не найден */
  DayNotFound = 71,
  /** VAPID-ключи не заданы. Сгенерируйте их командой `npm run gen-vapid` и заполните VAPID_PUBLIC_KEY / VAPID_PRIVATE_KEY в файле .env.json сервера. */
  VapidKeysMissing = 72,
  /** Тип вложения не найден */
  AttachmentTypeNotFound = 73,
  /** Игра не найдена */
  GameNotFound = 74,
  /** Критерий не найден */
  CriteriaNotFound = 75,
  /** Права на списки композиций: участники должны быть массивом */
  ScheduleComsMembersNotArray = 76,
  /** Права на списки композиций: участники должны быть положительными идентификаторами */
  ScheduleComsMembersPositive = 77,
  /** Права на списки композиций: ожидался объект */
  ScheduleComsObjectExpected = 78,
  /** Права на списки композиций: ключ "$k" не является числом */
  ScheduleComsKeyNotNumber = 79,
  /** Периодичность расписания: ожидался объект */
  SchedulePeriodObjectExpected = 80,
  /** Периодичность расписания: день месяца должен быть от 1 до 31 */
  SchedulePeriodMonthDayRange = 81,
  /** Периодичность расписания: неделя месяца должна быть от 1 до 5 */
  SchedulePeriodWeekRange = 82,
  /** Периодичность расписания: день недели должен быть от 0 до 6 */
  SchedulePeriodWeekdayRange = 83,
  /** Периодичность расписания: недопустимый тип $k */
  SchedulePeriodKindInvalid = 84,
  /** Недопустимый интервал напоминания: $v */
  ScheduleReminderIntervalInvalid = 85,
  /** Событие дня не найдено */
  DayEventNotFound = 86,
  /** Тип вложения является ссылкой */
  AttachmentTypeIsAnchor = 87,
  /** Ссылка вложения недействительна */
  AttachmentAnchorInvalid = 88,
  /** Значение не найдено */
  ValueNotFound = 89,
  /** Элемент списка значений вложения не является массивом */
  AttachmentValueNotArray = 90,
  /** Элемент не найден */
  ItemNotFound = 91,
  /** Категория списка не найдена */
  ListCategoryNotFound = 92,
  /** Единица списка не найдена */
  ListUnitNotFound = 93,
  /** Событие не найдено */
  EventNotFound = 94,
  /** Нет доступа к расписанию */
  ScheduleAccessDenied = 95,
  /** Нет прав на комментирование событий расписания */
  EventCommentForbidden = 96,
  /** Нет прав на комментирование скрытого события */
  SecretEventCommentForbidden = 97,
  /** Комментарий не может быть пустым */
  CommentEmpty = 98,
  /** Не удалось определить комментарий */
  CommentDetectFailed = 99,
  /** Время "$t" недействительно */
  TimeInvalid = 100,
  /** Не найдены пользователи: $n */
  UsersNotFoundByTitles = 101,
  /** Пользователь уже в расписании */
  UserAlreadyInSchedule = 102,
  /** Необходимо авторизоваться */
  AuthRequired = 103,
  /** В частное расписание можно попасть только по QR-приглашению */
  PrivateScheduleQrOnly = 104,
  /** Приглашение недействительно */
  InviteInvalid = 105,
  /** Вы не являетесь участником */
  NotParticipant = 106,
  /** Управляющий не может покинуть расписание */
  ManagerCannotLeave = 107,
  /** Не добавлено карточек: $n */
  NoCardsAdded = 108,
  /** Некорректный тип ячейки $n */
  CellTypeError = 109,
  /** Уже существуют собственные статусы */
  RackStatusesExist = 110,
  /** Уже существуют собственные словари */
  RackDictsExist = 111,
  /** Уже существуют собственные спец. поля */
  RackColsExist = 112,
  /** Нет прав на это действие (изменение в родительском стеллаже) */
  NoParentRackEditRight = 113,
  /** Не удалось обновить стеллаж */
  StorageUpdateFailed = 114,
  /** Во время формирования дочернего стеллажа обнаружено наследование от другого дочернего стеллажа */
  ChildRackInheritance = 115,
  /** Статус с индексом $i не найден */
  StatusIndexNotFound = 116,
  /** Карточка не найдена */
  CardNotFound = 117,
  /** Карточка имеет некорректную ссылку */
  CardLinkIncorrect = 118,
  /** Не указан индекс колонки */
  ColIndexMissed = 119,
  /** Колонка не найдена */
  ColumnNotFound = 120,
  /** Ячейка карточки некорректна */
  CardCellInvalid = 121,
  /** Строка карточки некорректна */
  RowHolderInvalid = 122,
  /** Некорректный тип карточки */
  CardTypeIncorrect = 123,
  /** Сводка не найдена */
  SummaryNotFound = 124,
  /** Почтовый аккаунт не настроен: ключ "$k" отсутствует и запасных аккаунтов нет */
  MailAccountNotConfigured = 125,
  /** Некорректный E-mail */
  EmailIncorrect = 126,
  /** E-mail не привязан к профилю */
  EmailNotLinked = 127,
  /** Недопустимый тип сообщений */
  DashMessageKindInvalid = 128,
  /** Не удалось подобрать уникальный ключ для md5 "$m" */
  Md5KeyUniqueFailed = 129,
  /** Некорректный md5 "$m" */
  Md5Incorrect = 130,
  /** Не удалось скачать аудио "$l": $e */
  AudioDownloadFailed = 131,
  /** Ключ аудио "$l" отсутствует в таблице аудио-ссылок */
  AudioLinkKeyMissing = 132,
  /** Не авторизован */
  NotAuthorized = 133,
  /** Ошибка сервера */
  ServerError = 134,
  /** E-mail уже привязан к другому аккаунту */
  EmailAlreadyBoundOther = 135,
  /** Некорректные аккорды: $c */
  CmChordBlockIncorrectChords = 136,
  /** Слишком сложные аккорды: $c */
  CmChordBlockComplexChords = 137,
  /** Ошибка $n */
  ErrorWithNumber = 138,
  /** Нет прав на это действие $n */
  NoAccessWithNumber = 139,
  /** Код верификации - $c */
  OtpPushTitle = 140,
  /** Код верификации */
  OtpEmailSubject = 141,
  /** Через $n минут код станет недействительным */
  OtpEmailExpireTail = 142,
  /** СФОРМИРОВАТЬ ПИСЬМО */
  OtpTelegramMakeLetterButton = 143,
  /** Ошибка отправки OTP-письма */
  OtpTelegramSendError = 144,
  /** Новая ошибка */
  DashErrorPushTitle = 145,
  /** Система */
  DashErrorPushSystemAuthor = 146,
  /** JesmyL-отчет (промежуточный) $d, $t */
  VisitReportEmailSubject = 147,
  /** Визиты за $d */
  VisitReportTitle = 148,
  /** Всего визитов: $n */
  VisitReportTotal = 149,
  /** Уникальных посетителей: $n */
  VisitReportUniq = 150,
  /** Минимальная версия за день: $v */
  VisitReportMinVersion = 151,
  /** $m (отставание: $l текущая: $c) */
  VisitReportMinVersionDiff = 152,
  /** Визиты по посетителям */
  VisitReportByVisitors = 153,
  /** Визиты по часам (МСК) */
  VisitReportByHours = 154,
  /** Версии */
  VisitReportVersions = 155,
  /** Минимальные версии по дням */
  VisitReportMinVersionsByDays = 156,
  /** Анонимные */
  VisitReportAnonymous = 157,
  /** $u уник. / $v */
  VisitReportUniqVisits = 158,
  /** $n визитов */
  VisitVisitCount = 159,
  /** Список композиций */
  SchedulePushComsActionTitle = 160,
  /** Перейти к списку композиций */
  SchedulePushGoToComsTitle = 161,
  /** Напоминание за $n минут — */
  SchedulePushReminderPrefix = 162,
  /** Приложение для вашего служения */
  OgAppDescription = 163,
  /** Звуковая дорожка */
  OgAudioTrack = 164,
  /** Старт бота */
  TgCommandStart = 165,
  /** Инициализировать */
  TgCommandInit = 166,
  /** Действия */
  TgActions = 167,
  /** Запросить права JesmyL */
  TgRequestRights = 168,
  /** Получить реквизиты чата */
  TgGetChatRequisites = 169,
  /** 1. Для связывания этого чата с JesmyL-мероприятием необходимо вставить следующую строчку в поле управления мероприятием в приложении $u <code>$r</code> 2. Закрепите следующее сообщение для быстрого доступа к расписанию дня 3. Удалите это сообщение - оно больше не понадобится */
  TgChatRequisites = 170,
  /** Посмотреть */
  TgViewSchedule = 171,
  /** Расписание дня */
  TgDaySchedule = 172,
  /** Запрос подан. Свяжитесь с админом */
  TgRequestSent = 173,
  /** $n секунд */
  TgCodeExpireSeconds = 174,
  /** $n минут */
  TgCodeExpireMinutes = 175,
  /** Необходимо быть подписанным на этот канал @jesmyl_space */
  TgChannelSubscribeRequired = 176,
  /** Повторный запрос кода Логин: $l Код: <code>$c</code> */
  TgCodeRepeatMessage = 177,
  /** Повторный запрос кода авторизации$s */
  TgCodeRepeatLog = 178,
  /** Код отправлен повторно */
  TgCodeSentRepeated = 179,
  /** Код $c был упразднён */
  TgCodeCancelled = 180,
  /** Код $c был использован */
  TgCodeUsed = 181,
  /** Твой одноразовый код: <code>$c</code>. Логин: $l Зайди в приложение <a href="$h">JesmyL</a>, перейди в раздел Другое - Войти, и введи его в поле ввода. Через $m этот код будет упразднён */
  TgOtpMessage = 182,
  /** Запрос кода авторизации$s */
  TgCodeRequestLog = 183,
  /** Код отправлен */
  TgCodeSent = 184,
  /** ✅ Отправить ✅ */
  TgSendButton = 185,
  /** Сообщение отправлено */
  TgMessageSent = 186,
  /** Отправлено! */
  TgSent = 187,
  /** ❌ Отменить ❌ */
  TgCancelButton = 188,
  /** Отмена отправки сообщения */
  TgSendingCancelled = 189,
  /** 🔄 Перечитать информацию группы 🔄 */
  TgRereadGroupInfo = 190,
  /** Информация группы перечитана. Известные ссылки: $l */
  TgGroupInfoReread = 191,
  /** Что делаем с сообщением? */
  TgWhatToDoWithMessage = 192,
  /** Отправить анонимку в чат */
  TgSendAnonToChat = 193,
  /** Отправлено */
  TgSentDone = 194,
  /** $c Сделай ответ на данное сообщение, чтоб отправить анонимное сообщение в чат $t */
  TgAnonWriteHint = 195,
  /** <b>Анонимное сообщение</b> $t */
  TgAnonMessageTitle = 196,
  /** Анонимное сообщение в чат $t */
  TgAnonChatDescription = 197,
  /** Выберите пункт */
  TgChooseItem = 198,
  /** Пригласительная база */
  TgInviteBase = 199,
  /** Авторизоваться */
  TgAuthorize = 200,
  /** Новая авторизация */
  TgNewAuthorization = 201,
  /** Опрос опубликован */
  TgPollPublished = 202,
  /** Создано новое расписание $t */
  SchCreated = 203,
  /** Расписание $t переименовано */
  SchRenamed = 204,
  /** В расписании $t изменена тема: $v */
  SchTopicChanged = 205,
  /** В расписании $t изменено описание: $v */
  SchDescriptionChanged = 206,
  /** В расписании $t первый день сделан техническим */
  SchFirstDayTech = 207,
  /** В расписании $t первый день сделан обычным */
  SchFirstDayNormal = 208,
  /** В расписании $t отключено */
  SchPausedDisabled = 209,
  /** В расписании $t включено */
  SchPausedEnabled = 210,
  /** В расписании $t установлена дата начала - $d */
  SchStartTimeSet = 211,
  /** В расписании $t изменена периодичность */
  SchPeriodChanged = 212,
  /** В расписании $t уведомления в приложении включены (за $m мин. и в начале) */
  SchAppInformDisabled = 213,
  /** В расписании $t уведомления в приложении включены (только в начале) */
  SchAppInformStartOnly = 214,
  /** В расписании $t уведомления в приложении включены (за $n мин. и в начале) */
  SchAppInformBefore = 215,
  /** Расписание $t удалено */
  SchRemoved = 216,
  /** Расписание $f скопировано в $t */
  SchCopied = 217,
  /** В расписании <b>$t</b> изменение типа: $l */
  SchRegTypeChanged = 218,
  /** В расписании <b>$t</b> изменение типа: $l */
  SchRegTypeChangedList = 219,
  /** В расписании $t для новых участников установлены права по умолчанию: $r */
  SchDefaultRightsSet = 220,
  /** Неизвестный */
  SchUnknownRole = 221,
  /** Неизвестного */
  SchUnknownRoleGenitive = 222,
  /** В расписании $t обновлены права на списки композиций */
  SchComsRightsUpdated = 223,
  /** В расписании $t добавлены участники списком из Excel: $l */
  SchUsersAddedFromExcel = 224,
  /** В расписании $t новый участник по QR: $u */
  SchUserAddedByQr = 225,
  /** В расписании $t новый участник $p: $u */
  SchUserAdded = 226,
  /** В расписании $t новый участник по QR-приглашению: $u */
  SchUserAddedByInvite = 227,
  /** Вы покинули расписание $t */
  SchYouLeft = 228,
  /** В расписании $t $u теперь $l в списке $c */
  SchUserListStatus = 229,
  /** В расписании $t $u удалён из списка $c */
  SchUserRemovedFromList = 230,
  /** В расписании $t участнику выданы права $r */
  SchUserRightsGranted = 231,
  /** В расписании $t добавлен день */
  SchDayAdded = 232,
  /** В расписании $t, в $d дне установлено время начала - $v */
  SchDayBeginTimeSet = 233,
  /** В расписании $t, в $d дне установлено расписание из текста */
  SchDayScheduleFromText = 234,
  /** В расписании $t, в $d дне установлена тема "$v" */
  SchDayTopicSet = 235,
  /** В расписании $t, в $d дне установлено описание "$v" */
  SchDayDescriptionSet = 236,
  /** В расписании $t, в $d дне добавлено событие $e */
  SchDayEventAdded = 237,
  /** В расписании $t, из $d дня удалено событие $e */
  SchDayEventRemoved = 238,
  /** В расписании $t, в $d дне перемещено событие */
  SchDayEventMoved = 239,
  /** В расписании $t в событии "$e" $d-го дня */
  SchInEventOfDay = 240,
  /** В расписании $t добавлены новые типы событий списком */
  SchEventTypesAdded = 241,
  /** В расписании $t создан тип событий $n продолжительностью в $m мин. */
  SchEventTypeCreated = 242,
  /** В расписании $t для типа событий $p задано имя $n */
  SchEventTypeTitleSet = 243,
  /** В расписании $t для типа событий $n задано время проведения по умолчанию - $m мин. */
  SchEventTypeTmSet = 244,
  /** В расписании $t к типу событий $n прикреплено обзорное вложение $a с периодом обзора - $p */
  SchEventTypeAttBound = 245,
  /** В расписании $t из типа событий $n удалено обзорное вложение $a */
  SchEventTypeAttRemoved = 246,
  /** В расписании $t в типе событий $n в обзорном вложении $a установлен период обзора - $p */
  SchEventTypeAttPeriodSet = 247,
  /** В расписание $t добавлено несколько типов событий: $l */
  SchEventTypesAddedMany = 248,
  /** В расписании $t добавлена новая категория списков */
  SchListCatAdded = 249,
  /** В расписании $t добавлен новый список для категории $c */
  SchListUnitAdded = 250,
  /** В расписании $t для $i категории списков задано название "$v" */
  SchListCatTitleSet = 251,
  /** В расписании $t для $i категории списков задано название для участников: "$v" */
  SchListCatMembersTitleSet = 252,
  /** В расписании $t для $i категории списков задано название для наставников: "$v" */
  SchListCatMentorsTitleSet = 253,
  /** В расписании $t для $i категории списков задана иконка "$v" */
  SchListCatIconSet = 254,
  /** В расписании $t для списка $c задано название: "$v" */
  SchListUnitTitleSet = 255,
  /** В расписании $t для списка $c задано описание: "$v" */
  SchListUnitDescriptionSet = 256,
  /** В расписании $t добавлена новая категория ролей */
  SchRolesCatAdded = 257,
  /** В расписании $t категория ролей "$p" переименована на "$n" */
  SchRolesCatRenamed = 258,
  /** В расписании $t для роли $r задана иконка $i */
  SchRoleIconSet = 259,
  /** В расписании $t роль "$p" переименована на "$n" */
  SchRoleRenamed = 260,
  /** В расписании $t за ролью $r закреплён участник $u */
  SchRoleUserSet = 261,
  /** В расписании $t роль $r теперь относится к категории "$c" */
  SchRoleCategorySet = 262,
  /** В расписании $t роль $v освобождена (стала вакантной) */
  SchRoleFreed = 263,
  /** В расписании $t добавлена новая игра */
  SchGameAdded = 264,
  /** В расписании $t сформированы команды */
  SchGameTeamsFormed = 265,
  /** В расписании $t игра "$p" переименована на "$v" */
  SchGameRenamed = 266,
  /** В расписании $t добавлен новый критерий сортировки для игр */
  SchGameCriteriaAdded = 267,
  /** В расписании $t критерий сортировки для игр "$p" переименован на "$v" */
  SchGameCriteriaRenamed = 268,
  /** В расписании $t для критерия сортировки игр "$c" отсортированы участники */
  SchGameCriteriaSorted = 269,
  /** В расписании $t участник $u исключён из списка игроков */
  SchGamePlayerExcluded = 270,
  /** В расписании $t участник $u включён в список игроков */
  SchGamePlayerIncluded = 271,
  /** Были отправлены фото для расписания $t Загружено: $l Новых: $n */
  SchPhotosUploaded = 272,
  /** Запрос списка фото для расписания $t. Отправлено $n шт */
  SchPhotosRequested = 273,
  /** В расписании $t */
  SchInSchedule = 274,
  /** Следующий платёж $d ($r) */
  SchNextPayment = 275,
  /** Напоминание будет: */
  SchPaymentReminderWillBe = 276,
  /** за $n дней */
  SchPaymentReminderDaysBefore = 277,
  /** в день платежа */
  SchPaymentReminderOnDay = 278,
  /** Время напоминания: */
  SchPaymentReminderTime = 279,
  /** Следующее напоминание $d ($r) */
  SchNextReminder = 280,
  /** @deprecated 1342 */
  DashChangesEmailSubject = 281,
  /** Случайная глава из Писания */
  OtpBibleChapterIntro1 = 282,
  /** Случайный текст из Библии */
  OtpBibleChapterIntro2 = 283,
  /** Библейский текст */
  OtpBibleChapterIntro3 = 284,
  /** Текст из Библии, взятый случайным образом */
  OtpBibleChapterIntro4 = 285,
  /** Текст Писания для назидания (взят случайным образом) */
  OtpBibleChapterIntro5 = 286,
  /** Назидание из Библейского Писания случайно выбранной главы */
  OtpBibleChapterIntro6 = 287,
  /** Глава из Библейского текста, выбранная случайным образом */
  OtpBibleChapterIntro7 = 288,
  /** Назидательный текст Священного Библейского Писания */
  OtpBibleChapterIntro8 = 289,
  /** Взятый случайным образом текст из Библии */
  OtpBibleChapterIntro9 = 290,
  /** Текст Священного Писания */
  OtpBibleChapterIntro10 = 291,
  /** Библейский Священный текст в назидание */
  OtpBibleChapterIntro11 = 292,
  /** Текст для назидания */
  OtpBibleChapterIntro12 = 293,
  /** JesmyL - отчёт за $d */
  VisitDigestEmailSubject = 294,
  /** В расписании $t в событии "$e" $d-го дня установлена тема "$v" */
  SchEventTopicSet = 295,
  /** В расписании $t в событии "$e" $d-го дня установлено описание - "$v" */
  SchEventDescriptionSet = 296,
  /** В расписании $t в событии "$e" $d-го дня установлено время продолжительности - $v */
  SchEventDurationSet = 297,
  /** В расписании $t в событии "$e" $d-го дня установлен признак секретности */
  SchEventSecretToggled = 298,
  /** В расписании $t в событии "$e" $d-го дня уведомление в приложении отключено */
  SchEventAppInformOff = 299,
  /** В расписании $t в событии "$e" $d-го дня уведомление в приложении включено */
  SchEventAppInformOn = 300,
  /** В расписании $t в событии "$e" $d-го дня добавлено вложение $a */
  SchEventAttachmentAdded = 301,
  /** В расписании $t в событии "$e" $d-го дня добавлена ссылка на вложение $a $r-го дня */
  SchEventAttachmentRefAdded = 302,
  /** В расписании $t в событии "$e" $d-го дня удалено вложение $a */
  SchEventAttachmentRemoved = 303,
  /** В расписании $t в событии "$e" $d-го дня добавлен выполняемый пункт во вложение $a - $v */
  SchEventCheckItemAdded = 304,
  /** В расписании $t в событии "$e" $d-го дня удалён выполняемый пункт из вложения $a - $v */
  SchEventCheckItemRemoved = 305,
  /** В расписании $t в событии "$e" $d-го дня добавлено списочное значение во вложение $a - $v */
  SchEventListValueAdded = 306,
  /** В расписании $t в событии "$e" $d-го дня удалено списочное значение из вложения $a - $v */
  SchEventListValueRemoved = 307,
  /** В расписании $t в событии "$e" $d-го дня изменено списочное значение во вложении $a - $v */
  SchEventListValueSet = 308,
  /** В расписании $t в событии "$e" $d-го дня установлен ключ списочного значения во вложении $a - $v */
  SchEventListKeySet = 309,
  /** В расписании $t в событии "$e" $d-го дня изменён ключ списочного значения во вложении $a - $v */
  SchEventListKeyChanged = 310,
  /** В расписании $t в событии "$e" $d-го дня изменён порядок в списочном значении во вложении $a */
  SchEventListOrderChanged = 311,
  /** В расписании $t в событии "$e" $d-го дня участником $u поставлена оценка - ($p) */
  SchEventRatePoint = 312,
  /** В расписании $t в событии "$e" $d-го дня участником $u оставлен комментарий - "$c" */
  SchEventRateComment = 313,
  /** В расписании $t создан тип вложений */
  SchAttTypeCreated = 314,
  /** В расписании $t тип вложений "$p" переименован на "$v" */
  SchAttTypeTitleSet = 315,
  /** В расписании $t описание типа вложений "$a" изменено на "$v" */
  SchAttTypeDescriptionSet = 316,
  /** В расписании $t иконка типа вложений "$a" изменена на "$v" */
  SchAttTypeIconSet = 317,
  /** В расписании $t значение использований типа вложений "$a" изменено на $v */
  SchAttTypeUseSet = 318,
  /** В расписании $t значение использования ролей типа вложений "$a" изменено на $v */
  SchAttTypeRolesUseSet = 319,
  /** В расписании $t значение использования списков типа вложений "$a" изменено на $v */
  SchAttTypeListsUseSet = 320,
  /** В расписании $t значение $i-го заголовка типа вложений "$a", "$p" изменено на "$v" */
  SchAttTypeTitleValueSet = 321,
  /** В расписании $t создан $i-й заголовок для типа вложений "$a" */
  SchAttTypeTitleValueCreated = 322,
  /** В расписании $t уровень доступа для чтения типа вложений "$a" - $v */
  SchAttTypeReadLevelSet = 323,
  /** В расписании $t уровень доступа для редактирования типа вложений "$a" - $v */
  SchAttTypeRedactLevelSet = 324,
  /** В расписании $t $u добавлен в список для чтения вложений с типом "$a" */
  SchAttTypeUserReadAdded = 325,
  /** В расписании $t $u удалён из списка для чтения вложений с типом "$a" */
  SchAttTypeUserReadRemoved = 326,
  /** В расписании $t $u добавлен в список для редактирования вложений с типом "$a" */
  SchAttTypeUserRedactAdded = 327,
  /** В расписании $t $u удалён из списка для редактирования вложений с типом "$a" */
  SchAttTypeUserRedactRemoved = 328,
  /** Композиция $i. "$n" — */
  CmComChanged = 329,
  /** переименована на "$v" */
  CmComRenamed = 330,
  /** изменено значение ударов в минуту */
  CmComBpmSet = 331,
  /** размерность изменена */
  CmComMeterSizeSet = 332,
  /** язык изменён */
  CmComLanguageSet = 333,
  /** уровень интенсивности изменён */
  CmComDriveSet = 334,
  /** тональность изменена */
  CmComTonSet = 335,
  /** теперь бемольная */
  CmComMadeFlat = 336,
  /** теперь диезная */
  CmComMadeSharp = 337,
  /** удалена аудио-ссылка */
  CmComAudioLinkRemoved = 338,
  /** добавлена аудио-ссылка */
  CmComAudioLinkAdded = 339,
  /** создана новая композиция "$v" */
  CmComCreated = 340,
  /** удалена */
  CmComDeleted = 341,
  /** (ранее удалённая) возвращена */
  CmComRestored = 342,
  /** композиция "$v" уничтожена */
  CmComDestroyed = 343,
  /** изменён аккордный блок */
  CmChordBlockChanged = 344,
  /** изменён текстовый блок */
  CmTextBlockChanged = 345,
  /** изменены текстовые блоки */
  CmTextBlocksChanged = 346,
  /** вставлен аккордный блок$v */
  CmChordBlockInserted = 347,
  /** удалён аккордный блок$v */
  CmChordBlockRemoved = 348,
  /** вставлен текстовый блок$v */
  CmTextBlockInserted = 349,
  /** удалён текстовый блок$v */
  CmTextBlockRemoved = 350,
  /** Категория "$c": добавлена композиция $n */
  CmCatComAdded = 351,
  /** Категория "$c": удалена композиция $n */
  CmCatComRemoved = 352,
  /** Из сборника "$c" удалён номер композиции $n */
  CmCatNativeNumRemoved = 353,
  /** Для категории "$c" номер композиции $n установлен в значение $v */
  CmCatNativeNumSet = 354,
  /** Создана категория */
  CmCatCreated = 355,
  /** Переименована категория */
  CmCatRenamed = 356,
  /** Удалена категория */
  CmCatRemoved = 357,
  /** Восстановлена категория */
  CmCatRestored = 358,
  /** Изменён вид категории */
  CmCatKindSet = 359,
  /** Изменены аккорды $l */
  CmEditorChordsChanged = 360,
  /** Изменены ё/е-правила в словах $l */
  CmEditorEEWordsChanged = 361,
  /** Добавлено MP3-правило */
  CmEditorMp3RuleAdded = 362,
  /** Изменено MP3-правило */
  CmEditorMp3RuleChanged = 363,
  /** Композиции "$a" и "$b" объединены в ссылочную группу */
  CmComRefGroupMerged = 364,
  /** Удалена ссылка между композицией "$a" и композицией "$b" */
  CmComRefRemoved = 365,
  /** Обновлён список композиций в расписании $s: $l */
  CmSchComsListUpdated = 366,
  /** Удалена пачка композиций из истории события в расписании $s */
  CmSchComsHistoryBatchRemoved = 367,
  /** Создан новый пак аудио-маркеров для трека $s */
  CmAudioMarksPackCreated = 368,
  /** Создан новый пак аудио-маркеров для трека $s композиция: $n */
  CmAudioMarksPackCreatedWithCom = 369,
  /** название блока $b изменено на $v */
  CmComOrdKindSet = 370,
  /** к блоку $b прикреплён $i-й блок аккордов */
  CmComOrdChordAttached = 371,
  /** к ссылке на блок $b прикреплён $i-й блок аккордов */
  CmComOrdRefChordAttached = 372,
  /** порядковый блок $b сделан видимым */
  CmComOrdMadeVisible = 373,
  /** порядковый блок $b сделан невидимым */
  CmComOrdMadeInvisible = 374,
  /** часть ссылки на $b сделана видимой */
  CmComOrdRefPartMadeVisible = 375,
  /** часть ссылки на $b сделана невидимой */
  CmComOrdRefPartMadeInvisible = 376,
  /** удалён $b */
  CmComOrdRemoved = 377,
  /** удалена ссылка на $b */
  CmComOrdRefRemoved = 378,
  /** к порядковому блоку $b прикреплён $i-й текст */
  CmComOrdTextAttached = 379,
  /** ссылка на блок $b сделана видимой в мини-режиме */
  CmComOrdMiniLinkVisible = 380,
  /** ссылка на блок $b сделана невидимой в мини-режиме */
  CmComOrdMiniLinkInvisible = 381,
  /** заголовок в порядковом блоке $b сделан видимым */
  CmComOrdTitleVisible = 382,
  /** заголовок в порядковом блоке $b сделан невидимым */
  CmComOrdTitleInvisible = 383,
  /** в блоке $b изменена аппликатура в $i-й строке: $v */
  CmComOrdApplikaturaChanged = 384,
  /** в блоке $b удалены лишние строки аппликатуры */
  CmComOrdApplikaturaTrimmed = 385,
  /** установлено значение модулирования блока $b - $v */
  CmComOrdModulationSet = 386,
  /** установлена смена тональности в блоке $b */
  CmComOrdTonSet = 387,
  /** снята смена тональности в блоке $b */
  CmComOrdTonRemoved = 388,
  /** добавлен новый порядковый блок $b */
  CmComOrdInserted = 389,
  /** создана ссылка $b */
  CmComOrdRefCreated = 390,
  /** перемещён порядковый блок $b */
  CmComOrdMoved = 391,
  /** сброшено значение повторений для блока $b */
  CmComOrdRepeatsReset = 392,
  /** изменены повторения для блоков $l */
  CmComOrdRepeatsChanged = 393,
  /** убраны повторения в блоке $b */
  CmComOrdRepeatsRemoved = 394,
  /** В расписании $t добавлена новая роль */
  SchRoleAdded = 395,
  /** настройка слайдов */
  CmComSlidesChanged = 396,
  /** Ошибка. Этот ресурс неизвестен */
  CmMp3ResourceUnknown = 397,
  /** Запрос ОТП кода на E-mail $e */
  DashOtpRequestEmail = 398,
  /** Привязка E-mail $e к аккаунту для $f */
  DashOtpBindEmail = 399,
  /** Авторизация по E-mail $e ($f) */
  DashOtpAuthEmail = 400,
  /** Запрос DeviceId - $d */
  DashRequestDeviceId = 401,
  /** Запрос DeviceEmoji - $e */
  DashRequestDeviceEmoji = 402,
  /** Неизвестный ключ (уже удалено) $k */
  DashUnknownConfigKey = 403,
  /** Константы $l */
  DashConstantsUpdated = 404,
  /** Авторизация $f (@$n) $t */
  DashAuthorization = 405,
  /** через TG-auth-native кнопку */
  DashAuthViaTgNativeButton = 406,
  /** через TG-mini-icon кнопку */
  DashAuthViaTgMiniButton = 407,
  /** в расписании дня */
  DashAuthInScheduleDay = 408,
  /** через TG-код */
  DashAuthViaTgCode = 409,
  /** Получен ответ на опрос $b от $f */
  DashPollAnswerFromUser = 410,
  /** Получен ответ на опрос $b от анонимного пользователя */
  DashPollAnswerAnonymous = 411,
  /** $n мин. */
  SchMinutesShort = 412,
  /** имеют ВСЕ! */
  SchAttLevelAll = 413,
  /** имеет только $r */
  SchAttLevelOnly = 414,
  /** имеет $r и старше */
  SchAttLevelAndOlder = 415,
  /** *Завершена* */
  SchLiveStreamFinished = 416,
  /** Мероприятие "$t" */
  OgSchedule = 417,
  /** Руководители */
  SchListCatMentorsDefaultTitle = 418,
  /** Участники */
  SchListCatMembersDefaultTitle = 419,
  /** Для верификации вашего аккаунта в системе $n необходимо ввести одноразовый код - $c */
  OtpLetter1 = 420,
  /** Введите данный одноразовый код ($c) в поле ввода для проверки в системе $n */
  OtpLetter2 = 421,
  /** Для того, чтоб подтвердить принадлежность почты, указанной в системе $n введите код $c в соответствующее поле ввода */
  OtpLetter3 = 422,
  /** Это ваш одноразовый код - $c Введите его в поле ввода для проверки по системе $n */
  OtpLetter4 = 423,
  /** Одноразовый код верификации - $c Его необходимо ввести в соответствующее поле ввода в приложении $n для проверки подлинности владения данным почтовым ящиком */
  OtpLetter5 = 424,
  /** Код верификации данного почтового адреса - $c Его необходимо ввести в соответствующее поле ввода для верификации в системе $n */
  OtpLetter6 = 425,
  /** Для верификации вашей почты в системе $n необходимо ввести одноразовый код - $c */
  OtpLetter7 = 426,
  /** Код, который необходимо ввести в приложении $n - $c Он служит для верификации вашего почтового адреса */
  OtpLetter8 = 427,
  /** Введите код верификации в приложении $n Ваш одноразовый код - $c */
  OtpLetter9 = 428,
  /** Одноразовый код - $c Введите его для верификации акаунта в системе $n */
  OtpLetter10 = 429,
  /** Не настроены получатели отчёта */
  DashReportNoRecipients = 430,
  /** Мало слайдов на трек */
  CmSmartSearchTooFewSlides = 431,
  /** Неточное время временных меток для слайдов */
  CmSmartSearchImpreciseMarkTimes = 432,
  /** $n начал трансляцию $t */
  SchLiveStreamStarted = 433,
  /** $n начал трансляцию вне расписания */
  SchLiveStreamStartedNoSchw = 434,
  /** Аноним */
  SchLiveAnonymousName = 435,
  /** Системное изменение песни "$n" */
  CmComSystemChange = 436,
  /** У пользователя нет подписок на PUSH-уведомления */
  DashPushNoSubscriptions = 437,
  /** Проверка PUSH-уведомлений */
  DashPushCheckText = 438,

  // Тексты PUSH-проверки переехали из base-локали: фронт получает их только готовым payload'ом от сервера.
  /** Уведомление отправлено */
  PushCheckSent = 440,
  /** Нет подписок на PUSH-уведомления */
  PushSubscriptionsAbsent = 441,
  /** Отправлено на $n устройств */
  PushCheckSentToDevices = 442,
  /** У пользователя приглушены PUSH-уведомления */
  PushCheckMuted = 443,

  // Заголовки прав доступа админки: сервер отдаёт их на языке подключения администратора.
  /** Главный доступ */
  AccessRightScopeGeneralTitle = 444,
  /** Песни возрождённых */
  AccessRightScopeCmTitle = 445,
  /** Расписания */
  AccessRightScopeSchTitle = 446,
  /** Опросник */
  AccessRightScopeQTitle = 447,
  /** Склад */
  AccessRightScopeStoragesTitle = 448,
  /** Dawbord */
  AccessRightScopeDashTitle = 449,
  /** Ко всему */
  AccessRightRuleAll = 450,
  /** редактор */
  AccessRightRuleCmEdit = 451,
  /** категория */
  AccessRightRuleCmCat = 452,
  /** песня */
  AccessRightRuleCmCom = 453,
  /** песня: база */
  AccessRightRuleCmComMain = 454,
  /** песня: аппликатура */
  AccessRightRuleCmComApps = 455,
  /** песня: порядок */
  AccessRightRuleCmComOrd = 456,
  /** песня: тексты */
  AccessRightRuleCmComTxt = 457,
  /** песня: аккорды */
  AccessRightRuleCmComCh = 458,
  /** песня: аудио */
  AccessRightRuleCmComAudio = 459,
  /** песня: +категории */
  AccessRightRuleCmComCat = 460,
  /** песня: повторения */
  AccessRightRuleCmComRep = 461,
  /** песня: аудио точки */
  AccessRightRuleCmComAmark = 462,
  /** песня: трансляция */
  AccessRightRuleCmComTr = 463,
  /** песня: ссылки */
  AccessRightRuleCmComRef = 464,
  /** песня: интерпретационное */
  AccessRightRuleCmComIntp = 465,
  /** аккорды */
  AccessRightRuleCmChord = 466,
  /** события */
  AccessRightRuleCmEvent = 467,
  /** MP3 правила */
  AccessRightRuleCmMp3 = 468,
  /** Ё-Е правила */
  AccessRightRuleCmEe = 469,
  /** константы */
  AccessRightRuleCmConst = 470,
  /** расписание */
  AccessRightRuleSchSch = 471,
  /** редактор */
  AccessRightRuleQEdit = 472,
  /** список */
  AccessRightRuleStoragesList = 473,
  /** дашборд визитов */
  AccessRightRuleDashDash = 474,

  // Ошибки передачи файлов: сервер сообщает о превышении лимита и повреждённом base64.
  /** Файл слишком большой */
  TextTransferFileTooLarge = 475,
  /** Файл повреждён */
  TextTransferFileCorrupted = 476,
}
