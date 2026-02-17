import { mylib } from '#shared/lib/my-lib';
import {
  CmComCommentConstructorPropsDictChordRulePropsKey,
  CmComCommentConstructorPropsDictWordRulePropsKey,
  CmComCommentConstructorRulePropsDict,
} from '$cm/shared/model/com-comment';
import { makeRegExp } from 'regexpert';

export const makeCmComCommentConstructorCommentTextFromRuleProps = (
  isSimpleBlockText: boolean,
  propsDict: CmComCommentConstructorRulePropsDict,
  chordCountDict: PRecord<CmComCommentConstructorPropsDictWordRulePropsKey, number>,
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

        if (isSimpleBlockText) commentBlocks[props.blocki] += makeCorrectText(props.kind, props.text, false);
        else
          commentBlocks[props.blocki] += props.text
            .split('\n')
            .map((line, linei) => makeCorrectText(linei ? 0 : props.kind, line, false))
            .join('\n');
      } else if ('wordi' in props) {
        const wordKey = `l${props.linei}w${props.wordi}` as const;

        if (
          'chordi' in props
            ? !propsKeysSet.has(`${wordKey}c${props.chordi}^`) &&
              !propsKeysSet.has(`${wordKey}c${props.chordi}<`) &&
              !propsKeysSet.has(`${wordKey}c${props.chordi}>`)
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
          const chordKey = `${wordKey}c${chordi}` as const;

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
        const lineKey = `l${props.linei}` as const;

        if (!propsKeysSet.has(lineKey)) continue;
        propsKeysSet.delete(lineKey);

        lineCommentsText += `\n${props.linei + 1}${makeCorrectText(props.kind, props.text, false)}`;
      }
    }

    commentBlocks[0] ??= '';
    if (lineCommentsText) commentBlocks[0] += `\n\n${lineCommentsText.trim()}`;
    if (wordCommentsText) commentBlocks[0] += `\n\n${wordCommentsText.trim()}`;

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

const makeCorrectText = (kind: 0 | 1 | 2 | nil, text: string, isSimpleStartCharEscape = true) => {
  text = text.trim();

  if ((isSimpleStartCharEscape ? simpleStartCharForEscapeSet : startCharForEscapeSet).has(text[0])) text = `.${text}`;

  return `${makeAccentMarker(kind)}${text}`;
};

const simpleStartCharForEscape = '.!';
const simpleStartCharForEscapeSet = new Set(simpleStartCharForEscape);
const startCharForEscapeSet = new Set(`0123456789${simpleStartCharForEscape}`);

const makeTextRule = (
  propsDict: CmComCommentConstructorRulePropsDict,
  key: CmComCommentConstructorPropsDictWordRulePropsKey | CmComCommentConstructorPropsDictChordRulePropsKey,
  place: '<' | '>',
) => {
  const props = propsDict[`${key}${place}`];
  const result = props && makeCorrectText(props.kind, props.text).replace(makeRegExp(`/\\]/g`), '\\]');
  return result ? `[${place}${result}]` : '';
};

const makeChordRuleLine = (place: '^' | '>' | '<', chords: string[]) =>
  chords.length ? `{${place}${chords.join(' ')}}` : '';
