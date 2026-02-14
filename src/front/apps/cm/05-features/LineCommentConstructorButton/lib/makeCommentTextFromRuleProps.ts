import { mylib } from '#shared/lib/my-lib';
import {
  CmLineCommentConstructorButtonPropsDictChordRulePropsKey,
  CmLineCommentConstructorButtonPropsDictWordRulePropsKey,
  CmLineCommentConstructorButtonRulePropsDict,
} from '$cm/shared/model/com-comment';
import { makeRegExp } from 'regexpert';

export const makeCmLineCommentConstructorButtonCommentTextFromRuleProps = (
  propsDict: CmLineCommentConstructorButtonRulePropsDict,
  chordCountDict: PRecord<CmLineCommentConstructorButtonPropsDictWordRulePropsKey, number>,
) => {
  try {
    let wordCommentsText = '';
    let lineCommentsText = '';
    const commentBlocks: string[] = [];

    const propsList = mylib.values(propsDict);
    propsList.sort((a, b) => a!.rate - b!.rate);
    const propsKeysSet = new Set(mylib.keys(propsDict));

    for (let propsi = 0; propsi < propsList.length; propsi++) {
      const props = propsList[propsi];
      if (props == null) continue;

      if ('blocki' in props) {
        commentBlocks[props.blocki] ??= '';
        commentBlocks[props.blocki] += props.text;
      } else if ('wordi' in props) {
        const wordKey = `${props.linei}:${props.wordi}` as const;

        if (
          'chordi' in props
            ? !propsKeysSet.has(`${wordKey}/${props.chordi}^`) &&
              !propsKeysSet.has(`${wordKey}/${props.chordi}<`) &&
              !propsKeysSet.has(`${wordKey}/${props.chordi}>`)
            : !propsKeysSet.has(`${wordKey}${props.place}`)
        )
          continue;

        propsKeysSet.delete(`${wordKey}^`);
        propsKeysSet.delete(`${wordKey}<`);
        propsKeysSet.delete(`${wordKey}>`);

        const chordsCount = chordCountDict[wordKey] ?? -1;
        const replaceChordRulesList: string[] = [];
        const preChordRulesList: string[] = [];
        const postChordRulesList: string[] = [];

        for (let chordi = chordsCount; chordi >= 0; chordi--) {
          const chordKey = `${wordKey}/${chordi}` as const;

          propsKeysSet.delete(`${chordKey}^`);
          propsKeysSet.delete(`${chordKey}<`);
          propsKeysSet.delete(`${chordKey}>`);

          const replaceProps = propsDict[`${chordKey}^`];
          const preProps = propsDict[`${chordKey}<`];
          const postProps = propsDict[`${chordKey}>`];

          const replaceChordText =
            replaceProps && replaceChordInText(makeCorrectText(replaceProps.kind, replaceProps.text));
          const preChordText = preProps && replaceChordInText(makeCorrectText(0, preProps.text));
          const postChordText = postProps && replaceChordInText(makeCorrectText(0, postProps.text));

          if (replaceChordText) replaceChordRulesList[chordi] = replaceChordText;
          if (preChordText) preChordRulesList[chordi] = preChordText;
          if (postChordText) postChordRulesList[chordi] = postChordText;
        }

        const accentMarker = makeAccentMarker(propsDict[`${wordKey}^`]?.kind);

        wordCommentsText += `\n${props.linei + 1}:${props.wordi + 1}${accentMarker}${makeTextRule(propsDict, wordKey, '<')}${makeTextRule(propsDict, wordKey, '>')}${makeChordRuleLine('<', preChordRulesList)}${makeChordRuleLine('^', replaceChordRulesList)}${makeChordRuleLine('>', postChordRulesList)}`;
      } else {
        const lineKey = `${props.linei}` as const;

        if (!propsKeysSet.has(lineKey)) continue;
        propsKeysSet.delete(lineKey);

        lineCommentsText += `\n${props.linei + 1}${makeCorrectText(props.kind, props.text)}`;
      }
    }

    commentBlocks[0] ??= '';
    commentBlocks[0] += `\n\n${lineCommentsText.trim()}`;
    commentBlocks[0] += `\n\n${wordCommentsText.trim()}`;
    commentBlocks[0] = commentBlocks[0].trim();

    return commentBlocks;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const makeAccentMarker = (kind: 0 | 1 | 2 | nil) => '!'.repeat(kind ?? 0);

const replaceChordEscapes = {
  ' ': '_',
  '}': '\\}',
};

const chordEscapesReplacer = (all: string) => replaceChordEscapes[all as never];
const replaceChordInText = (text: string) => text.replace(makeRegExp('/(?<!\\\\)[ }]/g'), chordEscapesReplacer);

const makeCorrectText = (kind: 0 | 1 | 2 | nil, text: string) => {
  text = text.trim();

  if (text[0] === '!' || text[0] === '.') text = `.${text}`;

  return `${makeAccentMarker(kind)}${text}`;
};

const makeTextRule = (
  propsDict: CmLineCommentConstructorButtonRulePropsDict,
  key:
    | CmLineCommentConstructorButtonPropsDictWordRulePropsKey
    | CmLineCommentConstructorButtonPropsDictChordRulePropsKey,
  place: '<' | '>',
) => {
  const props = propsDict[`${key}${place}`];
  const result = props && makeCorrectText(props.kind, props.text).replace(makeRegExp(`/\\]/g`), '\\]');
  return result ? `[${place}${result}]` : '';
};

const makeChordRuleLine = (place: '^' | '>' | '<', chords: string[]) =>
  chords.length ? `{${place}${chords.join(' ')}}` : '';
