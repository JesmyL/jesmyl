import { checkIsNotNil } from '../checkIs';
import { comNbsp } from './com/const';

export const enum CmComOrdRepeatSlashPlacement {
  /** Слэш `/` перед повторяемым текстом */
  Before = 0,
  /** Слэш `\` после повторяемого текста */
  After = 1,
}

const slashDict: Record<CmComOrdRepeatSlashPlacement, string> = {
  [CmComOrdRepeatSlashPlacement.Before]: '/',
  [CmComOrdRepeatSlashPlacement.After]: '\\',
};

export const makeCmComOrderRepeats = (
  slashPlacement: CmComOrdRepeatSlashPlacement,
  repeatsCount: number,
  fadeCount?: number,
  nbsp: string = comNbsp,
) => {
  const slash = slashDict[slashPlacement];
  let invisibleSlash = '';
  let slashRepeat = repeatsCount;

  if (checkIsNotNil(fadeCount) && repeatsCount > fadeCount) {
    slashRepeat = fadeCount;
    invisibleSlash = `<span style=opacity:.4!important>${slash.repeat(repeatsCount - fadeCount)}</span>`;
  }

  const slashes = slash.repeat(slashRepeat);

  return slashPlacement === CmComOrdRepeatSlashPlacement.Before
    ? `${invisibleSlash}${slashes}${nbsp}`
    : `${nbsp}${slashes}${invisibleSlash}`;
};

/**
 * Пунктуация, зависящая от номера повторения: для каждого конечного символа заданы
 * варианты `[не последнее повторение, последнее повторение]`. Остальные символы не
 * меняются, поэтому по этому словарю сразу отсекаются все ненужные обработки.
 */
const repeatFinalCharsDict: Record<string, [nonLast: string, last: string]> = {
  '.': [',', '.'],
  ',': [',', '.'],
  ';': [';', '.'],
};

/**
 * Возвращает текст с пунктуацией конкретного повторения: меняется только последний
 * непробельный символ, а все хвостовые пробелы и переносы строк остаются на месте.
 */
export const takeRepeatOccurrenceText = (text: string, occurrencei: number, repeatsCount: number) => {
  // Менять пунктуацию имеет смысл только когда повторений два и больше
  if (repeatsCount < 2) return text;

  const textBody = text.trimEnd();
  const lastChar = textBody.at(-1);
  const finalChars = lastChar ? repeatFinalCharsDict[lastChar] : null;

  // Не пунктуация из словаря — текст остаётся нетронутым без единой аллокации
  if (!finalChars) return text;

  const finalChar = finalChars[occurrencei >= repeatsCount - 1 ? 1 : 0];

  // Символ уже правильный — не собираем новую строку
  if (finalChar === lastChar) return text;

  return `${textBody.slice(0, -1)}${finalChar}${text.slice(textBody.length)}`;
};

/**
 * Оборачивает текст слэшами повторений слева и справа. Пунктуацию не меняет: она уже
 * рассчитана при раскрытии повторений в `_expandRepeats`, поэтому здесь текст берётся как есть.
 */
export const makeCmComOrderRepeatedText = (
  text: string,
  repeatsCount: number,
  fadeCount?: number,
  nbsp: string = comNbsp,
) =>
  `${makeCmComOrderRepeats(CmComOrdRepeatSlashPlacement.Before, repeatsCount, fadeCount, nbsp)}${text}${makeCmComOrderRepeats(CmComOrdRepeatSlashPlacement.After, repeatsCount, fadeCount, nbsp)}`;
