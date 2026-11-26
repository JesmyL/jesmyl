# README.cm-smart-search.md

Серверный умный поиск по базам комов в редакторе: список фильтров, их параметры и селектор фильтра.
Читай этот файл перед изменением набора фильтров умного поиска, их параметров или компонента `CmEditorSmartSearchFilterSelector`.

## Устройство

- `getSmartSearchFilters` возвращает список фильтров `{ id, title }`, `getSmartSearchComws_1` — комы под выбранный фильтр; оба метода живут в `src/back/apps/cm/editor.tsjrpc.base.ts`.
- `id` фильтра — ключ `BackLocaleKey`, а заголовок сервер переводит сам по языку посетителя (`translateBackTexts(visitInfo?.langi, ...)`); на фронт приходит готовый текст, собственных подписей фильтров фронт не хранит.
- Отбор всегда идёт по `comDB` только среди неудалённых комов (`isRemoved = false`) и возвращает `CmComWid[]` по возрастанию `w`.
- Семь фильтров вынесены в `src/back/apps/cm/smart-search/*` (по одному `take*Comws` на фильтр, экспорт через `index.ts`), остальные шесть реализованы ветками `switch` прямо в `getSmartSearchComws_1`; неизвестный `filterId` бросает `BackLocaleKey.CmSmartSearchUnknownFilter` (**Неизвестный фильтр умного поиска**).
- Список фильтров фронт кеширует на сессию (`filtersCache` в `useCmEditorSmartSearchFilters`).
- Подробности по фильтрам, привязанным к своим фичам, — в `README.com-audio.md`, `README.cm-ord-visibility.md`, `README.cm-chords.md` и `README.cm-ee-rules.md`.

## Список фильтров

| `BackLocaleKey`                | Русский заголовок                                            |
| ------------------------------ | ------------------------------------------------------------ |
| `CmSmartSearchNoSecondTextSplit` | **Только с первой разбивкой текстов на слайды**              |
| `CmSmartSearchNoTextSplits`      | **Без разбивок текстов на слайды**                           |
| `CmSmartSearchIncorrectChords`   | **Некорректные аккорды**                                     |
| `CmSmartSearchTooFewSlides`      | **Мало слайдов на трек**                                     |
| `CmSmartSearchImpreciseMarkTimes` | **Неточное время временных меток для слайдов**               |
| `CmSmartSearchAnchorsAndAnchorPlus` | **Песни с якорями и якорь+**                              |
| `CmSmartSearchNoAudio`           | **Песни без аудио**                                          |
| `CmSmartSearchLineLengthMore`    | **Со строкой больше чем:элементов[$n;]**                     |
| `CmSmartSearchRepeatsByRegExp`   | **Ключи повторений по регулярке:/~/i**                       |
| `CmSmartSearchMatchInRepeated`   | **Поиск по блоку с повторениями:/\\/\\//i**                  |
| `CmSmartSearchChordsMismatch`    | **Количество аккордов не равно аппликатуре**                 |
| `CmSmartSearchUnknownChords`     | **С неизвестными аккордами**                                 |
| `CmSmartSearchIncorrectYoYe`     | **Некорректные Ё-Е**                                         |

У заголовков с хвостом после `:` (регулярка, элементы) хвост показывает значение параметра по умолчанию; в `CmSmartSearchLineLengthMore` вместо `$n` подставляется текущий `maxAvailableComLineLength`.

## Параметр фильтра

- Поле параметра (`TextInput`) показывается под `Dropdown` только для трёх фильтров — `CmSmartSearchLineLengthMore`, `CmSmartSearchRepeatsByRegExp` и `CmSmartSearchMatchInRepeated` (набор `paramFilterIds` в `CmEditorSmartSearchFilterSelector`).
- Placeholder поля — `EditorLocaleKey.CmEditorSmartSearchParam` (**Параметр**); значение уходит в `getSmartSearchComws_1` как `param`.
- Смена фильтра запускает отбор сразу, а правка параметра — с дебаунсом 300 мс; прежний результат сбрасывается в `null` и при смене фильтра, и при каждой правке параметра — ещё до дебаунс-запроса, чтобы не показывать устаревшие результаты.
- `CmSmartSearchLineLengthMore`: длина строки числом; пустое или нечисловое значение (в том числе `0`) заменяется на `maxAvailableComLineLength` из `constantsConfigFileStore`, поэтому без параметра порог совпадает с подставленным в заголовок `$n`.
- `CmSmartSearchRepeatsByRegExp` и `CmSmartSearchMatchInRepeated`: строка регулярки в формате `makeRegExp` (`/источник/флаги`); значения по умолчанию — `/~/i` и `/\/\//i`; невалидная регулярка даёт пустой результат, а не ошибку RPC.
- Параметр длиннее 100 символов отклоняется: сервер бросает `BackLocaleKey.CmSmartSearchParamTooLong` (**Параметр фильтра слишком длинный**), а клиентский `TextInput` ограничен `maxLength={100}`.

## Доступ

- `getSmartSearchComws_1` проверяет право чтения редактора той же схемой, что и `setChords`: `if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'EDIT', 'R')) throw '';`.
- Список фильтров (`getSmartSearchFilters`) проверки прав не требует — фильтры нужны для отрисовки селектора.

## Селектор

- `CmEditorSmartSearchFilterSelector` (`src/front/apps/cm+editor/07-shared/ui/CmEditorSmartSearchFilterSelector.tsx`) — это `Dropdown` с placeholder `BaseLocaleKey.CmSmartSearch` (**Умный поиск**) и, для параметрических фильтров, поле параметра.
- Выбранный фильтр хранится в `smartSearchFilterIdAtom`, результат — в `smartSearchComwsAtom`.
- Умный поиск подключается списком комов (`CmComListSearchFilterInput`) только в режиме `SearchMode.Smart`; пока фильтр не выбран, список пуст.
- Ошибка RPC при отборе показывается тостом.

## Проверка

- [ ] Все тринадцать фильтров отдают комы только среди `isRemoved = false`.
- [ ] Заголовки приходят с сервера уже переведёнными на язык посетителя.
- [ ] Поле параметра видно только у трёх параметрических фильтров.
- [ ] Правка параметра дебаунсится 300 мс, смена фильтра — нет.
- [ ] Параметр длиннее 100 символов не уходит на сервер, а сервер отклоняет его `CmSmartSearchParamTooLong`.
- [ ] Невалидная регулярка даёт пустой список, а не ошибку.
- [ ] Без параметра длины порог равен `maxAvailableComLineLength`.
