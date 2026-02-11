import { mylib } from '#shared/lib/my-lib';
import { makeRegExp } from 'regexpert';
import {
  cmComCommentPseudoCommentContentAccentsKind,
  cmComCommentTrimHighlightMarkers,
} from './makePseudoComment.props';

export const cmComCommentReplaceLineWordComments = (
  commentBlocks: string[],
  onFound: (
    props: (
      | { blocki: number }
      | { linei: number }
      | { linei: number; wordi: number; add?: '<' | '>' }
      | { linei: number; wordi: number; chordi: number; add: '<' | '>' | ''; kind: 0 | 1 | 2 }
    ) & { text: string },
  ) => void,
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

    if (block) onFound({ blocki, text: block });
  }

  Array.from(lineCommentKeys).map(commentKey => {
    let comment = lineComments[commentKey].join('\n');

    if (mylib.isNum(commentKey)) {
      onFound({ linei: commentKey, text: comment });
      return;
    }

    const linei = +commentKey.slice(0, lineWordPositionDigitsSeparationCount) - 1;
    const wordi = +commentKey.slice(lineWordPositionDigitsSeparationCount) - 1;

    comment = comment.replace(makeRegExp('/\\[([^\\n\\]]+)\\]/g'), (_all, content: string) => {
      const leadChar = content[0];
      content = content.slice(1);

      switch (leadChar) {
        case '^': {
          const chords = content.split(makeRegExp('/ +/'));

          for (let chordi = 0; chordi < chords.length; chordi++) {
            if (chords[chordi] === '.') continue;

            let chord = chords[chordi];

            const kind = cmComCommentPseudoCommentContentAccentsKind(chord);

            chord = cmComCommentTrimHighlightMarkers(chord);
            if (chord === '.') chord = '';
            const isPreAdd = chord[0] === '>';
            const isPostAdd = chord[0] === '<';

            if (chord !== '') {
              if (isPreAdd || isPostAdd) chord = chord.slice(1);
            }

            onFound({ chordi, linei, wordi, text: chord, add: isPreAdd ? '<' : isPostAdd ? '>' : '', kind });
          }

          break;
        }
        case '<':
        case '>': {
          onFound({ linei, wordi, text: content + (leadChar === '<' ? '' : ' '), add: leadChar });
          break;
        }
      }

      return '';
    });
  });
};

const lineWordPositionDigitsSeparationCount = 3;
const numsSet = new Set('0123456789');
