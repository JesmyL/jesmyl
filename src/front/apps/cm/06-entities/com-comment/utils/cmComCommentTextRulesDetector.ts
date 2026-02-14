import { mylib } from '#shared/lib/my-lib';
import { makeRegExp } from 'regexpert';
import {
  CmComCommentTextDetectorBlockRuleProps,
  CmComCommentTextDetectorChordRuleProps,
  CmComCommentTextDetectorLineRuleProps,
  CmComCommentTextDetectorRuleProps,
  CmComCommentTextDetectorWordRuleProps,
} from '../model/common';
import {
  cmComCommentPseudoCommentContentAccentsKind,
  cmComCommentTrimHighlightMarkers,
} from './makePseudoComment.props';

export const cmComCommentTextRulesDetector = (
  commentBlocks: string[],
  onFound: (props: CmComCommentTextDetectorRuleProps) => void,
) => {
  const lineCommentKeys = new Set<string | number>();
  const lineComments: Record<string, string[]> = {};

  for (let blocki = 0; blocki < commentBlocks.length; blocki++) {
    let block = commentBlocks[blocki];
    if (!block) continue;

    block = block.replace(
      makeRegExp(`/(?<=^|\\n) *(/*)( *\\d{1,2} *)(.*)/g`),
      (_all, pre: string, num: string, rest: string) => {
        let key;

        if (rest.startsWith(':')) {
          rest = rest.slice(1);

          key = `${num.trim().padStart(lineWordPositionDigitsSeparationCount, ' ')}${`${parseInt(rest) || 1}`.padStart(lineWordPositionDigitsSeparationCount, ' ')}`;
          rest = rest.slice(numsSet.has(rest[0]) && numsSet.has(rest[1]) ? 2 : 1);
        } else key = +num.trim();

        lineCommentKeys.add(key);
        (lineComments[key] ??= []).push(pre ? `${pre} ${rest}` : rest);

        return '';
      },
    );

    block = block.trim();

    if (block)
      onFound({
        blocki,
        kind: cmComCommentPseudoCommentContentAccentsKind(block),
        text: cmComCommentTrimHighlightMarkers(block),
        rate: blocki,
      } satisfies CmComCommentTextDetectorBlockRuleProps);
  }

  Array.from(lineCommentKeys).map(commentKey => {
    let comment = lineComments[commentKey].join('\n');

    if (mylib.isNum(commentKey)) {
      onFound({
        linei: commentKey - 1,
        kind: cmComCommentPseudoCommentContentAccentsKind(comment),
        text: cmComCommentTrimHighlightMarkers(comment),
        rate: cmComCommentTextDetectorCalculateRate(commentKey),
      } satisfies CmComCommentTextDetectorLineRuleProps);
      return;
    }

    const linei = +commentKey.slice(0, lineWordPositionDigitsSeparationCount) - 1;
    const wordi = +commentKey.slice(lineWordPositionDigitsSeparationCount) - 1;
    const wordKind = cmComCommentPseudoCommentContentAccentsKind(comment);

    if (wordKind) {
      onFound({
        linei,
        wordi,
        place: '^',
        kind: wordKind,
        text: '',
        rate: cmComCommentTextDetectorCalculateRate(linei, wordi),
      } satisfies CmComCommentTextDetectorWordRuleProps);
    }

    comment = comment.replace(groupScopeDetectRegExp, (_all, wordContent: string | nil, chordContent: string | nil) => {
      let content = (wordContent || chordContent || '').trim();
      let place = content[0];

      if (place !== '<' && place !== '^') {
        if (place !== '>') place = '>';
        if (place !== '>') return '';
      }

      if (wordContent && place === '^') return '';

      content = content.slice(1);

      if (wordContent) {
        onFound({
          linei,
          wordi,
          place,
          kind: cmComCommentPseudoCommentContentAccentsKind(content),
          text: cmComCommentTrimHighlightMarkers(content).replace(makeRegExp('/(?:\\\\)[ \\]]/g'), all => all.slice(1)),
          rate: cmComCommentTextDetectorCalculateRate(linei, wordi),
        } satisfies CmComCommentTextDetectorWordRuleProps);
      } else if (chordContent) {
        const chords = content.split(' ');

        for (let chordi = 0; chordi < chords.length; chordi++) {
          let chord = chords[chordi];
          if (chord === '.') continue;

          const kind = cmComCommentPseudoCommentContentAccentsKind(chord);

          chord = cmComCommentTrimHighlightMarkers(chord);
          if (chord === '.') chord = '';

          onFound({
            chordi,
            linei,
            wordi,
            text: chord.replace(makeRegExp('/(?:\\\\)[ }]/g'), all => all.slice(1)),
            place,
            kind,
            rate: cmComCommentTextDetectorCalculateRate(linei, wordi, chordi),
          } satisfies CmComCommentTextDetectorChordRuleProps);
        }
      }

      return '';
    });
  });
};

const lineWordPositionDigitsSeparationCount = 3;
const numsSet = new Set('0123456789');
const chordiPow = 10;
const wordiPow = chordiPow * 10;
const lineiPow = wordiPow * 10;
const makeGroupScopeRegexp = <Open extends '\\[' | '{', Close extends '\\]' | '}'>(open: Open, close: Close) =>
  `${open}((?:\\\\${close}|[^\\n${close}])+)${close}` as const;
const groupScopeDetectRegExp = makeRegExp(`/${makeGroupScopeRegexp('\\[', '\\]')}|${makeGroupScopeRegexp('{', '}')}/g`);

export const cmComCommentTextDetectorCalculateRate = (linei: number, wordi = 0, chordi = 0) =>
  (linei + 1) * lineiPow + (wordi + 1) * wordiPow + (chordi + 1) * chordiPow;
