import { makeRegExp } from 'regexpert';
import { checkIsString } from 'shared/utils/checkIs';
import { escapeHtmlLazy } from 'shared/utils/string.utils';

export const stringifyDiffValue = (value: unknown): nil | string =>
  checkIsString(value) ? value : (JSON.stringify(value, null, 2) ?? null);

const enum DiffKind {
  equal,
  removed,
  added,
}

type DiffSegment = [kind: DiffKind, text: string];
type LineDiffSegment = [kind: DiffKind, lines: string[]];

/** Longer middles switch to a plain removed/added block to keep the LCS DP bounded. */
const diffLcsCap = 1500;
const diffLineLcsCap = 400;

/** A line or word pair is fully replaced once at least this share of it changed. */
const diffChangeThreshold = 0.6;

const diffLineRegExp = makeRegExp('/[^\\n]*\\n|[^\\n]+$/g');
const diffWordChunkRegExp = makeRegExp('/\\s+|[^\\s]+/g');

const diffSpanStarts = ['', '<span style="color:#c33;background:#fee">', '<span style="color:#184;background:#efe">'];

const splitDiffLines = (text: string): string[] => text.match(diffLineRegExp) ?? [];

const pushSegment = (segments: DiffSegment[], kind: DiffKind, text: string) => {
  if (!text) return;

  const last = segments.at(-1);
  if (last?.[0] === kind) last[1] += text;
  else segments.push([kind, text]);
};

/** Changed share of the longer side: `1 - equalChars / max(oldLen, newLen)`. */
const makeChangedRatio = (segments: DiffSegment[], oldLen: number, newLen: number): number => {
  const maxLen = Math.max(oldLen, newLen);
  if (!maxLen) return 0;

  let equalChars = 0;
  for (const [kind, text] of segments) if (kind === DiffKind.equal) equalChars += text.length;

  return 1 - equalChars / maxLen;
};

/**
 * LCS keeps common words as equal runs, so changes between whitespace delimiters form word pairs.
 * A pair changed by the threshold or more becomes one full removed word plus one full added word.
 */
const collapseWordGroups = (segments: DiffSegment[]): DiffSegment[] => {
  const collapsed: DiffSegment[] = [];
  let group: DiffSegment[] = [];

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

  for (const [kind, text] of segments) {
    for (const chunk of text.match(diffWordChunkRegExp) ?? []) {
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

const makeLcsDiff = (a: string, b: string): DiffSegment[] => {
  if (a.length > diffLcsCap || b.length > diffLcsCap)
    return [
      [DiffKind.removed, a],
      [DiffKind.added, b],
    ];

  const rows = Array.from({ length: a.length + 1 }, () => new Uint16Array(b.length + 1));
  for (let i = a.length; i--; )
    for (let j = b.length; j--; )
      rows[i][j] = a[i] === b[j] ? rows[i + 1][j + 1] + 1 : Math.max(rows[i + 1][j], rows[i][j + 1]);

  const segments: DiffSegment[] = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      pushSegment(segments, DiffKind.equal, a[i]);
      i++;
      j++;
      continue;
    }

    if (rows[i + 1][j] >= rows[i][j + 1]) pushSegment(segments, DiffKind.removed, a[i++]);
    else pushSegment(segments, DiffKind.added, b[j++]);
  }
  while (i < a.length) pushSegment(segments, DiffKind.removed, a[i++]);
  while (j < b.length) pushSegment(segments, DiffKind.added, b[j++]);

  return segments;
};

/** Equal line endings are structural, so they stay out of the ratio and outside the colored spans. */
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

const pushLine = (segments: LineDiffSegment[], kind: DiffKind, line: string) => {
  const last = segments.at(-1);
  if (last?.[0] === kind) last[1].push(line);
  else segments.push([kind, [line]]);
};

const makeLineDiff = (oldLines: string[], newLines: string[]): LineDiffSegment[] => {
  const rows = Array.from({ length: oldLines.length + 1 }, () => new Uint16Array(newLines.length + 1));
  for (let i = oldLines.length; i--; )
    for (let j = newLines.length; j--; )
      rows[i][j] =
        oldLines[i] === newLines[j] ? rows[i + 1][j + 1] + 1 : Math.max(rows[i + 1][j], rows[i][j + 1]);

  const segments: LineDiffSegment[] = [];
  let i = 0;
  let j = 0;
  while (i < oldLines.length && j < newLines.length) {
    if (oldLines[i] === newLines[j]) {
      pushLine(segments, DiffKind.equal, oldLines[i]);
      i++;
      j++;
      continue;
    }

    if (rows[i + 1][j] >= rows[i][j + 1]) pushLine(segments, DiffKind.removed, oldLines[i++]);
    else pushLine(segments, DiffKind.added, newLines[j++]);
  }
  while (i < oldLines.length) pushLine(segments, DiffKind.removed, oldLines[i++]);
  while (j < newLines.length) pushLine(segments, DiffKind.added, newLines[j++]);

  return segments;
};

const makeHierarchicalDiff = (a: string, b: string): DiffSegment[] => {
  const oldLines = splitDiffLines(a);
  const newLines = splitDiffLines(b);

  if (oldLines.length > diffLineLcsCap || newLines.length > diffLineLcsCap) return makeLcsDiff(a, b);

  const segments: DiffSegment[] = [];
  let removedLines: string[] = [];
  let addedLines: string[] = [];

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

export const makeDiffHtml = (was: string, newV: string): string => {
  const minLen = Math.min(was.length, newV.length);

  let prefixLen = 0;
  while (prefixLen < minLen && was[prefixLen] === newV[prefixLen]) prefixLen++;

  let suffixLen = 0;
  while (suffixLen < minLen - prefixLen && was[was.length - 1 - suffixLen] === newV[newV.length - 1 - suffixLen])
    suffixLen++;

  const escapeHtml = escapeHtmlLazy();
  const changed = makeHierarchicalDiff(
    was.slice(prefixLen, was.length - suffixLen),
    newV.slice(prefixLen, newV.length - suffixLen),
  )
    .map(([kind, text]) => (text ? `${diffSpanStarts[kind]}${escapeHtml(text)}${kind ? '</span>' : ''}` : ''))
    .join('');
  const prefix = escapeHtml(was.slice(0, prefixLen));
  const suffix = escapeHtml(was.slice(was.length - suffixLen));

  return `<pre style="white-space:pre-wrap">${prefix}${changed}${suffix}</pre>`;
};
