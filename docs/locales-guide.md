# Локализация JesmyL — справочник разработчика

Документ описывает четыре независимых словаря локализации, механизм их доставки на фронт, формат серверных ошибок и правило выбора языка в каждом канале. Все утверждения сверены с кодом; расхождения с ожиданиями собраны в разделе «Расхождения».

## 1. Кратко

- Языков четыре: `Ru`, `Ua`, `Kz`, `En` (`Langi` в `src/shared/api/complect/enums.ts`).
- Словарей четыре: `BaseLocaleKey`, `EditorLocaleKey`, `DynLocaleKey`, `BackLocaleKey`.
- Первые три живут и на бэке, и на фронте и доставляются по WebSocket (`tsjrpc`); четвёртый — только для бэкенда.
- Ключи — числовые `const enum`; словари — обычные объекты, превращаемые в числовые массивы (`convertObjectToArray`), поэтому обращение `dict[Key]` идёт по числовому индексу.
- Язык интерфейса хранится только на клиенте (`currentLangiAtom`) и передаётся серверу в `visitInfo.langi` при каждом подключении. В базе данных языка пользователя нет.

## 2. Языки и их коды

`src/shared/api/complect/enums.ts`:

```ts
export const enum Langi {
  Ru = 0,
  Ua = 1,
  Kz = 2,
  En = 3,
}
```

Порядок чисел важен: он же порядок текстов в payload ошибки (раздел 8).

| Место | Соответствие |
| --- | --- |
| `langCodeDict` (`src/shared/const/+locale/index.ts`) | `Ru: 'ru'`, `Ua: 'ua'`, `Kz: 'kz'`, `En: 'en'` |
| `currentLangiAtom` (`src/front/basis/locale/index.ts`) | `ru → Ru`, `ua`/`uk → Ua`, `kz`/`kk → Kz`, `en → En`, иначе `Ru` |
| `takeRequestLangi` (`src/back/startExpressRouting/index.ts`) | то же самое, но из первого значения заголовка `Accept-Language`; неизвестный код → `nil` → `Ru` |
| `langSystemCodeDict` (`src/front/basis/locale/index.ts`) | `ru-RU`, `uk-UA`, `kk-KZ`, `en-GB` |

## 3. Четыре словаря

| Словарь | Enum | Тип словаря | Исходники | Кто переводит |
| --- | --- | --- | --- | --- |
| Базовый | `BaseLocaleKey` | `LocaleBase<L>` | `src/back/locales/base/{ru,ua,kz,en}.ts` | `translateBase(key, interp)` на фронте |
| Редакторский | `EditorLocaleKey` | `LocaleCmEditor` | `src/back/locales/editor/{ru,ua,kz,en}.ts` | `translateEditorBase(key, interp)` на фронте |
| Динамический | `DynLocaleKey` | `LocaleDynamic<L>` | `src/back/locales/dynamic/{ru,ua,kz,en}.ts` | `translateDynamic(langi)(...)` на фронте |
| Серверный | `BackLocaleKey` | `Record<BackLocaleKey, string>` | `src/back/locales/back/{ru,ua,kz,en}.ts` | `translateBackTexts(langi, key, interp)` на бэке |

Общие типы: `src/shared/model/+locale/{base,editor,dynamic,model}.ts`.
Имена экспортов: `localeBaseRu`, `localeEditorRu`, `localeDynamicRu`, `backLocalesRu` (и аналогично для остальных языков).

Каждый словарь начинается со служебных полей:

| Enum | Служебные поля в начале |
| --- | --- |
| `BaseLocaleKey` | `Langi = 0`, `LocaleVersion = 1` |
| `DynLocaleKey` | `Langi = 0`, `Version = 1` |
| `EditorLocaleKey` | только `LocaleVersion = 0` (поля `Langi` нет) |
| `BackLocaleKey` | служебных полей нет, ключи начинаются с `0` |

`LocaleVersion`/`Version` сейчас равны `0` (у динамических — `1`) и ни на что не влияют: доставку ограничивает не версия словаря, а версия клиента (раздел 10).

## 4. Базовый словарь (BaseLocaleKey)

- Enum: `src/shared/model/+locale/_BaseLocaleKey.ts` (≈750 ключей: интерфейс, расписание, стеллажи, игры, файлы).
- Типизация значений: `LocaleBase<L>` в `src/shared/model/+locale/base.ts` — каждый ключ описан точным типом интерполяции, `LocaleSimpleString` или `LocaleStrRecord` для вложенных словарей (например, `CmCategoryList`, `BibleTranslate`).
- Тексты: `src/back/locales/base/ru.ts` и т. д., собираются через `baseLocaleTemplate` (`src/shared/utils/locale/templates.ts`).
- Фронт: `translateBase` из `src/shared/utils/locale/base.ts`; провайдер словаря регистрируется через `setBaseLocaleProvider(() => takeBaseLanguageAtom().get())` в `src/front/basis/locale/index.ts`.
- Для реактивного использования в компонентах есть `useTranslateBase()` (`src/front/basis/locale/index.ts`).

## 5. Редакторский словарь (EditorLocaleKey)

- Enum: `src/shared/model/+locale/_EditorLocaleKey.ts`.
- Тип: `LocaleCmEditor` (`src/shared/model/+locale/editor.ts`) — тексты редактора композиций, категорий и дашборда посещений.
- Исходники: `src/back/locales/editor/*.ts`.
- Фронт: `translateEditorBase` (`src/shared/utils/locale/editor.ts`), провайдер — `setCmEditorLocaleProvider`.
- Доступ: словарь отдаётся только при праве `cm:EDIT` или `dash:DASH` (`throwIfNoEditorLocaleAccess` в `src/back/apps/index/tsjrpc.base/lib/requestFreshes.ts`); без прав сервер его не присылает.
- Особенность: у `EditorLocaleKey` нет поля `Langi`, поэтому «язык словаря» на фронте определяется только базовым словарём.

## 6. Динамический словарь (DynLocaleKey)

- Enum: `src/shared/model/+locale/_DynLocaleKey.ts`; все ключи — вложенные записи, а не плоские тексты: `Lang`, `CmComKind`, `BibleTitleFull`, `BibleTitleShort`, `BibleChapterNum`.
- Тип: `LocaleDynamic<L>` (`src/shared/model/+locale/dynamic.ts`).
- Перевод: `translateDynamic(langi)(it => it[DynLocaleKey.X][key], interp)` — язык указывается явно в каждом вызове, поэтому динамические тексты можно показывать на языке, отличном от языка интерфейса (например, названия блоков композиции на её собственном `langi`).
- Второй вариант вызова: `translateDynamic(langi, key, interp)` для плоского ключа.

## 7. Серверный словарь (BackLocaleKey)

- Enum: `src/shared/model/+locale/_BackLocaleKey.ts` — коды ошибок и служебные тексты (push, письма, OG-мета).
- Исходники: `src/back/locales/back/{ru,ua,kz,en}.ts`, сборка словаря — `src/back/locales/back/index.ts`.
- Перевод: `translateBackTexts(langi: Langi | nil, key, interp?)`; `nil` → `Ru`.
- **На фронт не доставляется.** Фронт видит серверные тексты только в виде уже переведённой строки (ошибка RPC) либо в виде payload с четырьмя вариантами (дашборд).

## 8. Формат payload ошибки

`backLocaleError(key, interp?)` (`src/back/locales/back/index.ts`) возвращает **строку** с JSON:

```json
{ "title": ["ru-текст", "ua-текст", "kz-текст", "en-текст"], "intr": { "n": 5 } }
```

- `title` индексируется числами `Langi`: `Ru = 0`, `Ua = 1`, `Kz = 2`, `En = 3`.
- `intr` — значения интерполяции; шаблон разворачивается в момент показа через `stringTemplater`, поэтому `FUNCTION('dec')`/`IF` работают уже на принимающей стороне.
- Бросать нужно строкой: `throw backLocaleError(...)`, не `new Error(...)`.

Как payload живёт дальше:

| Этап | Что происходит |
| --- | --- |
| Ошибка RPC | `onErrorMessage` (`src/back/tsjrpc.base.server.ts`) пишет в дашборд исходную строку с payload и аргументами вызова |
| Ответ клиенту | `SokiServer.sendInvokeEvent` (`src/back/complect/soki/SokiServer.ts`) заменяет payload на один текст на языке `visitInfo.langi` через `localizeBackLocaleErrorPayload` |
| Хранение | `dashErrorDB` хранит сырой payload — язык зрителя на момент записи неизвестен |
| Показ в дашборде | `src/front/basis/locale/backLocaleError.ts` + `src/front/apps/+index/03-pages/VisitsDashboardPage/ui/Page.tsx`: для `DashMessageKind.Errors` — две строки (`Ru`, затем язык зрителя), для остальных видов — одна строка на языке зрителя; краткая строка в списке сообщений всегда `Ru` |
| Push об ошибке | `takeErrorPushSummary` (`src/back/dash/visits.ts`) разворачивает payload в `Ru` и обрезает до 100 символов |

Payload может быть встроен в более длинный текст: парсер (`parseBackLocaleErrorPayload` на обеих сторонах) разбивает сообщение по `\n\n` и ищет сегмент, который целиком является payload с массивом ровно из четырёх строк.

Дополнительно есть `backLocalePayload(makeText)` — тот же конверт без `intr`, для произвольных многоязычных текстов (используется в дневной сводке посещений).

## 9. Язык по каналам

| Канал | Язык | Источник в коде |
| --- | --- | --- |
| Интерфейс фронта | Выбранный пользователем; по умолчанию — из `navigator.language` | `currentLangiAtom` (`src/front/basis/locale/index.ts`), отправка — `src/front/shared/soki.ts` |
| Ошибка RPC пользователю | Язык пользователя, перевод на сервере | `localizeBackLocaleErrorPayload(raw, tool.visitInfo?.langi)` |
| Дашборд: `Errors` | `Ru` + язык зрителя | `makeBackLocaleErrorMessageDuoText` |
| Дашборд: `Log`/`Changes`/`Support`/`VisitError` | Язык зрителя | `makeBackLocaleErrorMessageText` |
| Письмо-отчёт о посещениях | Язык запросившего админа | `sendCurrentDashReport(auth.login, visitInfo?.langi)` (`src/back/apps/index/tsjrpc.base/lib/visitsDashboard.ts`) |
| Письмо об изменениях (`Changes`) | Тема — язык инициатора (`visitInfo.langi`), тело — текст call-site (практически всегда `Ru`) | `sendChangesEmail(html, langi)` из `postJRPCMessage` |
| OTP: письмо | Тема и хвост «код истечёт» — язык пользователя; основной текст письма — `Ru` | `src/back/apps/index/tsjrpc.base/lib/otp.methods.ts` |
| OTP: push | Язык пользователя | там же, `OtpPushTitle` |
| Push об ошибке (роль `TOP`) | `Ru` | `sendDashErrorPush` (`src/back/dash/visits.ts`) |
| Push расписания | `Ru` | `translateBackTexts(null, ...)` в `schedule-informer.ts` |
| Telegram-бот | `Ru` (тексты захардкожены) | `src/back/sides/telegram-bot/**` |
| OG-мета страниц `/track`, `/audio` | Из `Accept-Language` запроса | `takeRequestLangi` + `makePage` в `src/back/startExpressRouting/index.ts` |

Почему push и бот — `Ru`: в базе нет языка пользователя. `userDB` (`src/back/drizzle/schema/user.ts`) и `pushSubscriptionsDB` (`src/back/drizzle/schema/pushSubscription.ts`) не содержат колонки `langi`; `visitDB` тоже её не хранит — язык есть только в живом подключении (`SokiVisit` в `src/shared/api/complect/soki.model.ts`).

## 10. Путь словаря до фронта

```
Исходники .ts  →  серверные файловые хранилища  →  tsjrpc  →  атомы фронта  →  translate*()
```

**Сервер.** `src/back/locales/file-storages.ts`:

| Словарь | Хранилище | Путь |
| --- | --- | --- |
| Базовый | `FileStore` на язык | `/locales/base/{langi}.json` |
| Редакторский | `FileStore` на язык | `/locales/editor/{langi}.json` |
| Динамический | `DirStorage` по `DynLocaleKey.Langi` | `/locales/dynamic/` |

Хранилище при старте сравнивает сохранённый JSON с исходником (`checkIsEq`) и перезаписывает файл при расхождении, поэтому правка `.ts` подхватывается при следующем запуске бэка; меняется `fileModifiedAt`, и клиенты получают свежий словарь.

**Отдача.** Основной путь — `requestFreshLocales` (`src/back/apps/index/tsjrpc.base/lib/requestFreshLocales.ts`): отдаёт только изменившееся после `lastModifiedAt`; базовый и редакторский словари дополнительно пересылаются целиком при смене языка (`prevLangi !== langi`). Методы `reqLocaleBaseConfig`, `reqLocaleEditorConfig`, `reqLocaleDynConfig` в `src/back/apps/index/tsjrpc.base/index.ts` объявлены и работают, но вызовов с фронта у них нет.

**Приём.** `src/front/apps/+index/07-shared/tsjrpc/tsjrpc.shares.tsx`:

| Метод сервера | Атом фронта |
| --- | --- |
| `baseLocConf` | `takeBaseLanguageAtom()` |
| `editorLocConf` | `takeEditorLanguageAtom()` |
| `dynLocConf` | `takeDynamicLanguageAtom(langi)` |

**Кэш.** `src/front/basis/state/locale.ts` + `locale.storage.ts`: атомы держатся в памяти, гидратируются из трёх уровней (IndexedDB `locales` → Cache Storage `locales` → `localStorage` с префиксом `lc:`) и сохраняются в первый доступный уровень; остальные уровни при этом очищаются, чтобы устаревшая копия не пережила свежий перевод. Ключи кэша: `B`, `E`, `D0`…`D3`. Отметка свежести — `localeLastModifiedAtAtom`.

**Смена языка.** `LangiPickerModal` (`src/front/basis/locale/LangiPickerModal.tsx`) пишет `currentLangiAtom`, сбрасывает `localeLastModifiedAtAtom` и перезагружает страницу; дальше сервер видит новый `visitInfo.langi` и присылает словари заново.

**Ограничитель версии.** `baseLocaleMinVersion` и `editorLocaleMinVersion` (`src/back/apps/index/tsjrpc.base/lib/requestFreshes.ts`, обе равны `1341`) сравниваются с `visitInfo.version` — версией клиента (`jversion.num`, которую фронт отправляет при подключении). Клиент старее порога словарей не получает. `baseLocaleMinVersion` проверяется в `requestFreshes`, `requestFreshLocales` и `reqLocaleBaseConfig`; `editorLocaleMinVersion` — только в `reqLocaleEditorConfig`. Обе константы больше не поднимаются: повышение отрезало бы словари от старых фронтов.

**Инициализация.** `src/front/app/app-initial-invokes.ts` вызывает `requestFreshLocales` после авторизации и на каждом открытии соединения; `src/front/app/AppComponent.tsx` перемонтирует дерево, когда приходит словарь без текстов (или в первые 20 секунд после старта).

## 11. Синтаксис текстов (stringTemplater)

Реализация: `src/shared/utils/stringTemplater/{index,concepts,const,model}.ts`.

- Плейсхолдеры: `$n`, `$c`, `$d` — одна буква, подставляется из объекта интерполяции.
- Конструкции в шаблоне: `IF`, `SWITCH`, `AND`, `OR`, `GENERATE`, функции (`dec`, `isGT` …). Сериализованно это имя плюс группы в фигурных скобках, например `$dec{{$n}{й}{е}}`; в коде словаря такие строки почти всегда собираются типизированными хелперами:

```ts
`Некорректны${FUNCTION('dec')('$n', 'й', 'е')} аккорд${FUNCTION('dec')('$n', '', 'ы')}: $c`
`Н${IF('$v').THEN`е н`}апоминать мне`
```

- Разделитель аргументов — `}{`, закрытие — `}}`; литеральные фигурные скобки в тексте экранируются автоматически.
- Интерполяция проверяется типами: `StringTemplaterInterpolation<{ n: number }>` в модели словаря гарантирует набор и типы плейсхолдеров; при четырёх и более ключах проверяется только наличие каждого (факториальный перебор вариантов исчерпывает чекер).

## 12. Правила работы с ключами

1. Новый ключ добавляется **в конец** `const enum` со следующим по порядку числом; существующие значения не меняются и не переиспользуются.
2. Только `const enum`, никаких строковых литералов и обычных `enum`.
3. Плейсхолдеры — одна буква (`$n`, `$c`, `$t`), описательные локальные переменные маппятся на них в месте вызова.
4. Пустых значений (`''`) в словарях быть не должно. Ненужный текст помечается `@deprecated <версия>` в словаре, где версия — `num` из `src/shared/values/+version.json`.
5. Одинаковые во всех языках тексты дублируются как есть — выдумывать переводы не нужно.
6. Перед добавлением ключа ищутся существующие: переиспользование предпочтительнее.
7. `IF`/`THEN`/`ELSE` не должны иметь пустой ветки — общая часть выносится наружу, булево значение инвертируется в месте вызова.
8. Сокращать слова в `FUNCTION('dec')` можно, когда общая часть ≈50 % и больше; иначе слова пишутся целиком.
9. `editorLocaleMinVersion`/`baseLocaleMinVersion` не поднимаются. Изменения текстов доезжают за счёт `fileModifiedAt`, а не версии.
10. Группировка: новые ключи в словарях ставятся рядом со смысловыми соседями, но в enum — строго в конец.
11. Терминология: `coms`, не `songs`; в интерфейсе для людей показывается `fio | nick | email | login`, а не сырой логин.
12. Серверные ошибки бросаются строкой: `throw backLocaleError(BackLocaleKey.X, { n })`.

## 13. Расхождения с ожиданиями (проверено по коду)

1. **`reqLocaleBaseConfig` не используется фронтом.** Доставка идёт через `requestFreshLocales` → `baseLocConf`/`editorLocConf`/`dynLocConf`. Три метода `reqLocale*` остаются в API и в собранном `src/back/back.index.cjs`, но клиентских вызовов нет.
2. **OTP-письмо локализовано частично.** Тема (`OtpEmailSubject`), хвост об истечении кода (`OtpEmailExpireTail`) и push (`OtpPushTitle`) — на языке пользователя; основной текст — случайная русская фраза из `src/back/apps/index/tsjrpc.base/const/emailSentOTPLetters.ts`.
3. **Тело письма `Changes` не локализовано.** `langi` влияет только на тему (`DashChangesEmailSubject`); HTML собирается call-site и на практике русский, как и тексты Telegram-бота.
4. **`EditorLocaleKey` не содержит `Langi`.** Язык редакторского словаря определяется только по базовому (`BaseLocaleKey.Langi`), отдельного поля нет.
5. **У `BackLocaleKey` нет служебных полей.** Нумерация начинается сразу с текстов, поэтому индексы ошибок и `Langi` не связаны.
6. **Заголовок загрузки локалей захардкожен.** `langCodeLoadingTitleDict` в `src/shared/const/+locale/index.ts` содержит четыре строки прямо в коде (используется в `AppComponent.tsx`) — единственное место интерфейса с инлайновыми переводами.
7. **`@deprecated`-записей в словарях сейчас нет.** Правило действует, но фактических помеченных ключей в `src/back/locales/**` не осталось.
8. **`LocaleVersion`/`Version` в словарях не влияют на доставку.** Ограничитель — версия клиента, а свежесть определяется `fileModifiedAt`.

## 14. Шпаргалка «что править»

| Задача | Файлы |
| --- | --- |
| Текст интерфейса | `src/shared/model/+locale/_BaseLocaleKey.ts`, `src/back/locales/base/*.ts`, `src/shared/model/+locale/base.ts` |
| Текст редактора/дашборда | `src/shared/model/+locale/_EditorLocaleKey.ts`, `src/back/locales/editor/*.ts`, `src/shared/model/+locale/editor.ts` |
| Названия блоков, книг, языков | `src/shared/model/+locale/_DynLocaleKey.ts`, `src/back/locales/dynamic/*.ts`, `src/shared/model/+locale/dynamic.ts` |
| Серверная ошибка, push, письмо | `src/shared/model/+locale/_BackLocaleKey.ts`, `src/back/locales/back/*.ts` |
| Показ ошибки в дашборде | `src/front/basis/locale/backLocaleError.ts`, `src/front/apps/+index/03-pages/VisitsDashboardPage/ui/Page.tsx` |
| Доставка словарей | `src/back/apps/index/tsjrpc.base/lib/requestFreshLocales.ts`, `src/back/locales/file-storages.ts`, `src/front/basis/state/locale.ts` |
| Выбор языка пользователем | `src/front/basis/locale/index.ts`, `src/front/basis/locale/LangiPickerModal.tsx` |
