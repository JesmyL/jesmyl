import { makeRegExp } from 'regexpert';
import { checkIsNil, checkIsObject, checkIsString } from 'shared/utils/checkIs';
import { escapeHtmlLazy } from 'shared/utils/string.utils';

/** Приводит значение обратной связи к тексту: строки остаются как есть, остальное — pretty-JSON, отсутствие — `null`. */
export const stringifyDiffValue = (value: unknown): nil | string =>
  checkIsString(value) ? value : (JSON.stringify(value, null, 2) ?? null);

/** Вид куска диффа: совпавший текст, удалённый или добавленный. */
export const enum DiffKind {
  equal,
  removed,
  added,
}

/** Кусок текстового диффа: вид изменения и сам текст. */
export type DiffSegment = [kind: DiffKind, text: string];
type LineDiffSegment = [kind: DiffKind, lines: string[]];

/** Посимвольный LCS строится только до такой длины строки, иначе строка сравнивается по словам. */
const diffLcsCap = 1500;
/** Предел ячеек строковой матрицы LCS: выше него строки сопоставляются жадным хеш-поиском без таблицы. */
const diffLineLcsCellCap = 4_000_000;
/** Предел ячеек словесной матрицы LCS: выше него слова сопоставляются жадным хеш-поиском. */
const diffTokenLcsCellCap = 4_000_000;
/** Длина списка для `Uint16Array`: длины LCS не должны переполнять 16 бит. */
const diffLcsArrayLimit = 0xffff;

/** Пара строк или слов считается полностью заменённой, начиная с такой доли изменений. */
const diffChangeThreshold = 0.6;

/** Дописывает кусок в список, склеивая соседние куски одного вида. */
const pushSegment = (segments: DiffSegment[], kind: DiffKind, text: string) => {
  if (!text) return;

  const last = segments.at(-1);
  if (last?.[0] === kind) last[1] += text;
  else segments.push([kind, text]);
};

/** Доля изменённых символов от более длинной стороны: `1 - equalChars / max(oldLen, newLen)`. */
const makeChangedRatio = (segments: DiffSegment[], oldLen: number, newLen: number): number => {
  const maxLen = Math.max(oldLen, newLen);
  if (!maxLen) return 0;

  let equalChars = 0;
  for (const [kind, text] of segments) if (kind === DiffKind.equal) equalChars += text.length;

  return 1 - equalChars / maxLen;
};

/**
 * LCS оставляет общие слова равными кусками, поэтому изменения между пробелами образуют пары слов.
 * Пара, изменённая на порог и сильнее, становится целым удалённым словом и целым добавленным.
 */
const collapseWordGroups = (segments: DiffSegment[]): DiffSegment[] => {
  const collapsed: DiffSegment[] = [];
  let group: DiffSegment[] = [];

  /** Схлопывает накопленную группу слов: слабо изменённую — по кускам, сильно изменённую — целыми словами. */
  const flushGroup = () => {
    if (!group.length) return;

    const groupSegments = group;
    group = [];

    let oldText = '';
    let newText = '';
    for (const [kind, text] of groupSegments) {
      if (kind !== DiffKind.added) oldText += text;
      if (kind !== DiffKind.removed) newText += text;
    }

    if (makeChangedRatio(groupSegments, oldText.length, newText.length) < diffChangeThreshold) {
      for (const [kind, text] of groupSegments) pushSegment(collapsed, kind, text);
      return;
    }

    pushSegment(collapsed, DiffKind.removed, oldText);
    pushSegment(collapsed, DiffKind.added, newText);
  };

  // Режем текст на пробельные и непробельные куски: пробелы закрывают текущую группу слов.
  for (const [kind, text] of segments) {
    for (const chunk of text.match(makeRegExp('/\\s+|[^\\s]+/g')) ?? []) {
      if (chunk.trim()) group.push([kind, chunk]);
      else {
        flushGroup();
        pushSegment(collapsed, kind, chunk);
      }
    }
  }
  flushGroup();

  return collapsed;
};

/** Пара совпавших индексов: старый и новый элементы, которые LCS признал равными. */
type DiffMatch = [oldIndex: number, newIndex: number];

/** Находит пары совпавших индексов DP-таблицей LCS; вызывается только для размеров, помещающихся в `Uint16Array`. */
const makeLcsMatches = (oldItems: string[], newItems: string[]): DiffMatch[] => {
  const rows = Array.from({ length: oldItems.length + 1 }, () => new Uint16Array(newItems.length + 1));
  for (let i = oldItems.length; i--; )
    for (let j = newItems.length; j--; )
      rows[i][j] =
        oldItems[i] === newItems[j] ? rows[i + 1][j + 1] + 1 : Math.max(rows[i + 1][j], rows[i][j + 1]);

  // Идём по таблице вперёд и забираем общие элементы; всё пропущенное станет удалённым и добавленным.
  const matches: DiffMatch[] = [];
  let i = 0;
  let j = 0;
  while (i < oldItems.length && j < newItems.length) {
    if (oldItems[i] === newItems[j]) {
      matches.push([i, j]);
      i++;
      j++;
      continue;
    }

    if (rows[i + 1][j] >= rows[i][j + 1]) i++;
    else j++;
  }

  return matches;
};

/**
 * Находит совпадения жадно по хеш-карте: каждый старый элемент ищет ближайшее следующее вхождение в новом.
 * Для почти уникальных строк JSON это даёт LCS-подобный результат за O(n) и без матрицы.
 */
const makeHashMatches = (oldItems: string[], newItems: string[]): DiffMatch[] => {
  // Списки индексов на каждый элемент и курсоры по ним: повторные вхождения не просматриваются заново.
  const newIndicesByItem = new Map<string, number[]>();
  newItems.forEach((item, index) => {
    const indices = newIndicesByItem.get(item);
    if (indices) indices.push(index);
    else newIndicesByItem.set(item, [index]);
  });
  const cursors = new Map<string, number>();
  const matches: DiffMatch[] = [];
  let fromIndex = 0;

  oldItems.forEach((item, oldIndex) => {
    const indices = newIndicesByItem.get(item);
    if (!indices) return;

    let cursor = cursors.get(item) ?? 0;
    while (cursor < indices.length && indices[cursor] < fromIndex) cursor++;
    cursors.set(item, cursor);
    if (cursor === indices.length) return;

    matches.push([oldIndex, indices[cursor]]);
    fromIndex = indices[cursor] + 1;
  });

  return matches;
};

/** Выбирает LCS для умеренной матрицы, а для большой — жадный хеш-поиск, не зависящий от размеров текста. */
const makeDiffMatches = (oldItems: string[], newItems: string[], cellCap: number): DiffMatch[] =>
  (oldItems.length + 1) * (newItems.length + 1) <= cellCap &&
  oldItems.length <= diffLcsArrayLimit &&
  newItems.length <= diffLcsArrayLimit
    ? makeLcsMatches(oldItems, newItems)
    : makeHashMatches(oldItems, newItems);

/** Разворачивает пары совпадений в плоский дифф: всё между парами — удалённое или добавленное. */
const makeMatchedTokenDiff = (oldTokens: string[], newTokens: string[], matches: DiffMatch[]): DiffSegment[] => {
  const segments: DiffSegment[] = [];
  let oldIndex = 0;
  let newIndex = 0;

  for (const [matchedOldIndex, matchedNewIndex] of matches) {
    while (oldIndex < matchedOldIndex) pushSegment(segments, DiffKind.removed, oldTokens[oldIndex++]);
    while (newIndex < matchedNewIndex) pushSegment(segments, DiffKind.added, newTokens[newIndex++]);
    pushSegment(segments, DiffKind.equal, oldTokens[oldIndex++]);
    newIndex++;
  }

  while (oldIndex < oldTokens.length) pushSegment(segments, DiffKind.removed, oldTokens[oldIndex++]);
  while (newIndex < newTokens.length) pushSegment(segments, DiffKind.added, newTokens[newIndex++]);

  return segments;
};

/** Посимвольный дифф строк, которые помещаются в `diffLcsCap`. */
const makeCharDiff = (a: string, b: string): DiffSegment[] => {
  const oldChars = a.split('');
  const newChars = b.split('');

  return makeMatchedTokenDiff(oldChars, newChars, makeLcsMatches(oldChars, newChars));
};

/** Режет текст на пробельные и непробельные куски; длинные куски дробятся по 64 символа, чтобы дифф не вырождался. */
const splitDiffTokens = (text: string) => text.match(makeRegExp('/\\s+|[^\\s]{1,64}/g')) ?? [];

/** Сравнивает длинные середины по словам и кускам: LCS по токенам дешевле, при переполнении — жадное сопоставление. */
const makeWordDiff = (a: string, b: string): DiffSegment[] => {
  const oldTokens = splitDiffTokens(a);
  const newTokens = splitDiffTokens(b);

  return makeMatchedTokenDiff(
    oldTokens,
    newTokens,
    makeDiffMatches(oldTokens, newTokens, diffTokenLcsCellCap),
  );
};

/** Сравнивает длинные строки: общие начало и конец сразу равны, а середину диффит посимвольно или по словам. */
const makeLongDiff = (a: string, b: string): DiffSegment[] => {
  // Общие префикс и суффикс вырезаются до LCS: они точно равны и обычно многократно уменьшают середину.
  const minLength = Math.min(a.length, b.length);
  let prefixLength = 0;
  while (prefixLength < minLength && a[prefixLength] === b[prefixLength]) prefixLength++;

  let suffixLength = 0;
  while (
    suffixLength < minLength - prefixLength &&
    a[a.length - 1 - suffixLength] === b[b.length - 1 - suffixLength]
  )
    suffixLength++;

  const oldMiddle = a.slice(prefixLength, a.length - suffixLength);
  const newMiddle = b.slice(prefixLength, b.length - suffixLength);

  const middleSegments =
    oldMiddle.length <= diffLcsCap && newMiddle.length <= diffLcsCap
      ? makeCharDiff(oldMiddle, newMiddle)
      : makeWordDiff(oldMiddle, newMiddle);

  const segments: DiffSegment[] = [];
  pushSegment(segments, DiffKind.equal, a.slice(0, prefixLength));
  for (const [kind, text] of middleSegments) pushSegment(segments, kind, text);
  pushSegment(segments, DiffKind.equal, a.slice(a.length - suffixLength));

  return segments;
};

/** Строит дифф строк: короткие — посимвольно, длинные — через срезание общих краёв и сравнение по словам. */
const makeLcsDiff = (a: string, b: string): DiffSegment[] =>
  a.length <= diffLcsCap && b.length <= diffLcsCap ? makeCharDiff(a, b) : makeLongDiff(a, b);

/** Одинаковые переводы строк структурны, поэтому они не участвуют в расчёте доли изменений. */
const refineLinePair = (oldLine: string, newLine: string): DiffSegment[] => {
  const hasEqualLineEnding = oldLine.at(-1) === '\n' && newLine.at(-1) === '\n';
  const oldContent = hasEqualLineEnding ? oldLine.slice(0, -1) : oldLine;
  const newContent = hasEqualLineEnding ? newLine.slice(0, -1) : newLine;

  const segments = makeLcsDiff(oldContent, newContent);
  const refined: DiffSegment[] =
    makeChangedRatio(segments, oldContent.length, newContent.length) >= diffChangeThreshold
      ? [
          [DiffKind.removed, oldContent],
          [DiffKind.added, newContent],
        ]
      : collapseWordGroups(segments);

  if (hasEqualLineEnding) refined.push([DiffKind.equal, '\n']);

  return refined;
};

/** Дописывает строку в блочный дифф, склеивая соседние блоки одного вида. */
const pushLine = (segments: LineDiffSegment[], kind: DiffKind, line: string) => {
  const last = segments.at(-1);
  if (last?.[0] === kind) last[1].push(line);
  else segments.push([kind, [line]]);
};

/** Разворачивает пары совпадений строк в блочный дифф, оставляя пропуски удалёнными и добавленными строками. */
const makeMatchedLineDiff = (oldLines: string[], newLines: string[], matches: DiffMatch[]): LineDiffSegment[] => {
  const segments: LineDiffSegment[] = [];
  let oldIndex = 0;
  let newIndex = 0;

  for (const [matchedOldIndex, matchedNewIndex] of matches) {
    while (oldIndex < matchedOldIndex) pushLine(segments, DiffKind.removed, oldLines[oldIndex++]);
    while (newIndex < matchedNewIndex) pushLine(segments, DiffKind.added, newLines[newIndex++]);
    pushLine(segments, DiffKind.equal, oldLines[oldIndex++]);
    newIndex++;
  }

  while (oldIndex < oldLines.length) pushLine(segments, DiffKind.removed, oldLines[oldIndex++]);
  while (newIndex < newLines.length) pushLine(segments, DiffKind.added, newLines[newIndex++]);

  return segments;
};

/** Строит построчный дифф: умеренные тексты — LCS, большие — жадное хеш-сопоставление без роста памяти. */
const makeLineDiff = (oldLines: string[], newLines: string[]): LineDiffSegment[] =>
  makeMatchedLineDiff(oldLines, newLines, makeDiffMatches(oldLines, newLines, diffLineLcsCellCap));

/**
 * Сравнивает текст иерархически: сначала строки, затем пары изменённых строк — посимвольно или по словам;
 * отдаёт плоский список кусков. Построчный дифф работает и для больших текстов через хеш-сопоставление.
 */
export const makeDiffSegments = (a: string, b: string): DiffSegment[] => {
  const splitLines = (text: string) => text.match(makeRegExp('/[^\\n]*\\n|[^\\n]+$/g')) ?? [];
  const oldLines = splitLines(a);
  const newLines = splitLines(b);

  const segments: DiffSegment[] = [];
  let removedLines: string[] = [];
  let addedLines: string[] = [];

  // Изменённые блоки строк сравниваются попарно; лишние строки блока уходят целыми блоками.
  const flushLineBlock = () => {
    const pairedCount = Math.min(removedLines.length, addedLines.length);
    for (let i = 0; i < pairedCount; i++)
      for (const [kind, text] of refineLinePair(removedLines[i], addedLines[i])) pushSegment(segments, kind, text);

    if (removedLines.length > pairedCount)
      pushSegment(segments, DiffKind.removed, removedLines.slice(pairedCount).join(''));
    if (addedLines.length > pairedCount) pushSegment(segments, DiffKind.added, addedLines.slice(pairedCount).join(''));

    removedLines = [];
    addedLines = [];
  };

  // Равные строки сразу уходят в результат, а изменённые копятся до конца своего блока.
  for (const [kind, lines] of makeLineDiff(oldLines, newLines)) {
    if (kind === DiffKind.equal) {
      flushLineBlock();
      for (const line of lines) pushSegment(segments, DiffKind.equal, line);
      continue;
    }

    (kind === DiffKind.removed ? removedLines : addedLines).push(...lines);
  }
  flushLineBlock();

  return segments;
};

/** HTML-разметка диффа: удалённое — красное зачёркнутое, добавленное — зелёное жирное; цвета инлайновые ради писем, остальной текст экранируется для `innerHTML`. Экспортируется, чтобы бэк готовил окончательный HTML и клиент/почта только подставляли его. */
export const makeDiffMarkupHtml = (was: string, newV: string) => {
  const escapeHtml = escapeHtmlLazy();

  // Цвет и лёгкая подсветка инлайновые: почтовые клиенты выбрасывают CSS-классы, а на тёмной теме дашборда светлый фон держит красный/зелёный текст читаемым.
  return makeDiffSegments(was, newV)
    .map(([kind, text]) =>
      kind === DiffKind.removed
        ? `<s style="color:#b3261e;background:#ffe3e3;">${escapeHtml(text)}</s>`
        : kind === DiffKind.added
          ? `<b style="color:#0a7a3e;background:#e3f9e9;">${escapeHtml(text)}</b>`
          : escapeHtml(text),
    )
    .join('');
};

/** Начало структурной JSON-секции диффа, которую бэк пишет в сообщение дашборда. */
const diffSectionStartText = '{"was":';

/** Пропускает только строку или `nil`; `undefined` помечает значение невалидной дифф-секции. */
const takeDiffValue = (value: unknown): string | nil => {
  if (checkIsNil(value)) return null;

  return checkIsString(value) ? value : undefined;
};

/** Разбирает JSON-секцию диффа; `null` означает, что это не дифф-секция или её форма не сошлась. */
const parseDiffSection = (text: string) => {
  let parsed: unknown;

  try {
    parsed = JSON.parse(text);
  } catch {
    return null;
  }

  if (!checkIsObject(parsed)) return null;

  const was = takeDiffValue(parsed.was);
  const newV = takeDiffValue(parsed.new);
  if (was === undefined || newV === undefined) return null;

  return { was, new: newV };
};

/**
 * Находит первую сбалансированную JSON-секцию диффа и подменяет её готовой HTML-разметкой;
 * `null` — дифф-секции в тексте нет. `isPreWrap` включает `<pre>`, чтобы письмо сохраняло переносы строк.
 * `isEscapeOutsideText` экранирует текст до и после диффа: JSON диффа остаётся сырым до разбора, а весь остальной текст безопасен для `innerHTML`.
 */
export const makeDiffSectionHtml = (message: string, isPreWrap = false, isEscapeOutsideText = false) => {
  // Экранирование включается только по запросу: в письмах вокруг диффа может лежать готовая HTML-разметка.
  const escapeHtml = isEscapeOutsideText ? escapeHtmlLazy() : null;

  // Вхождения перебираются по одному: литеральный `{"was":` в тексте не должен ломать настоящую секцию.
  let fromIndex = message.indexOf(diffSectionStartText);

  while (fromIndex >= 0) {
    // Обход скобок: depth считает только скобки вне строк, поэтому JSON внутри значения не закрывает диапазон раньше времени.
    let depth = 0;
    let isInString = false;
    let end = -1;
    for (let index = fromIndex; index < message.length; index++) {
      const char = message[index];

      if (isInString) {
        if (char === '\\') index++;
        else if (char === '"') isInString = false;
      } else if (char === '"') isInString = true;
      else if (char === '{') depth++;
      else if (char === '}' && !--depth) {
        end = index + 1;
        break;
      }
    }

    if (end > 0) {
      const diff = parseDiffSection(message.slice(fromIndex, end));
      if (diff) {
        const html = makeDiffMarkupHtml(diff.was ?? '', diff.new ?? '');
        const wrapped = isPreWrap ? `<pre style="white-space:pre-wrap">${html}</pre>` : html;
        const prefix = escapeHtml ? escapeHtml(message.slice(0, fromIndex)) : message.slice(0, fromIndex);
        const suffix = escapeHtml ? escapeHtml(message.slice(end)) : message.slice(end);

        return `${prefix}${wrapped}${suffix}`;
      }
    }

    fromIndex = message.indexOf(diffSectionStartText, fromIndex + diffSectionStartText.length);
  }

  return null;
};
