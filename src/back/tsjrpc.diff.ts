import { escapeHtmlLazy } from 'shared/utils/string.utils';
import { makeDiffSegments } from 'shared/utils/textDiff';

/** Общий разбор значения диффа переэкспортируется, чтобы прежние импорты из back оставались рабочими. */
export { stringifyDiffValue } from 'shared/utils/textDiff';

/** Собирает плоский текстовый дифф в `<pre>`: без цветовых спанов, только общий текст. */
export const makeDiffHtml = (was: string, newV: string): string => {
  const minLen = Math.min(was.length, newV.length);

  let prefixLen = 0;
  while (prefixLen < minLen && was[prefixLen] === newV[prefixLen]) prefixLen++;

  let suffixLen = 0;
  while (suffixLen < minLen - prefixLen && was[was.length - 1 - suffixLen] === newV[newV.length - 1 - suffixLen])
    suffixLen++;

  // Склеиваем изменённую середину без цветовых спанов и экранируем её как единый текст.
  const escapeHtml = escapeHtmlLazy();
  const changed = escapeHtml(
    makeDiffSegments(was.slice(prefixLen, was.length - suffixLen), newV.slice(prefixLen, newV.length - suffixLen))
      .map(([, text]) => text)
      .join(''),
  );
  // Общие начало и конец экранируем отдельно, чтобы не гонять через дифф неизменённые части.
  const prefix = escapeHtml(was.slice(0, prefixLen));
  const suffix = escapeHtml(was.slice(was.length - suffixLen));

  return `<pre style="white-space:pre-wrap">${prefix}${changed}${suffix}</pre>`;
};
