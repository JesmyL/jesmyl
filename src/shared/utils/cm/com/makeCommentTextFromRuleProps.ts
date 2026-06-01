import { makeRegExp } from 'regexpert';
import { CmComCommentBlockSpecialSelector } from 'shared/api';
import {
  CmComCommentConstructorPropKey,
  CmComCommentConstructorPropsDictChordRulePropsKeyPrefix,
  CmComCommentConstructorPropsDictSelectorRulePropsKey,
  CmComCommentConstructorPropsDictWordRulePropsKeyPrefix,
  CmComCommentConstructorRulePropsDict,
  CmComCommentTextDetectorRuleProps,
} from 'shared/model/cm/com-comment';
import { smylib } from 'shared/utils/SMyLib';
import { itIt } from 'shared/utils/utils';

export const fillCmComCommentConstructorCommentInKey2PropsDict = (
  propsDict: CmComCommentConstructorRulePropsDict,
  props: CmComCommentTextDetectorRuleProps,
  wordChordiMaxDict: PRecord<CmComCommentConstructorPropsDictWordRulePropsKeyPrefix, number>,
) => {
  const key = makeCmComCommentConstructorPropsKey(props, wordChordiMaxDict);
  if (!(key in propsDict)) propsDict[key] = props as never;
};

export const makeCmComCommentConstructorPropsKey = (
  props: CmComCommentTextDetectorRuleProps,
  $wordChordiMaxDict: PRecord<CmComCommentConstructorPropsDictWordRulePropsKeyPrefix, number>,
) => {
  let key: CmComCommentConstructorPropKey;

  if ('blocki' in props) key = `${props.pre}b${props.blocki}`;
  else if ('chordi' in props) {
    const wordKey = `${props.pre}l${props.linei}w${props.wordi}` as const;

    $wordChordiMaxDict[wordKey] ??= 0;
    $wordChordiMaxDict[wordKey]++;

    key = `${wordKey}c${props.chordi}${props.place}`;
  } else if ('wordi' in props) key = `${props.pre}l${props.linei}w${props.wordi}${props.place}`;
  else key = `${props.pre}l${props.linei}`;

  return key;
};

export const makeCmComCommentConstructorCommentOrdSelector2TextsDictFromRuleProps = (
  propsDict: CmComCommentConstructorRulePropsDict,
  chordCountDict: PRecord<CmComCommentConstructorPropsDictWordRulePropsKeyPrefix, number>,
) => {
  try {
    const wordCommentsText: PRecord<CmComCommentConstructorPropsDictSelectorRulePropsKey, string> = {};
    const lineCommentsText: PRecord<CmComCommentConstructorPropsDictSelectorRulePropsKey, string> = {};
    const commentOrdBlocks: PRecord<CmComCommentConstructorPropsDictSelectorRulePropsKey, string[]> = {};
    const usedSelectorsSet = new Set<CmComCommentConstructorPropsDictSelectorRulePropsKey>();

    const propsList = smylib.values(propsDict);
    propsList.sort((a, b) => a!.rate - b!.rate);
    const propsKeysSet = new Set(smylib.keys(propsDict));

    for (let propsi = 0; propsi < propsList.length; propsi++) {
      const props = propsList[propsi];
      if (props == null) continue;

      const commentBlocks = (commentOrdBlocks[props.pre] ??= []);
      usedSelectorsSet.add(props.pre);

      if ('blocki' in props) {
        commentBlocks[props.blocki] ??= '';

        if (!props.text) continue;

        if (props.pre === `s${CmComCommentBlockSpecialSelector.Head}`)
          commentBlocks[props.blocki] += makeCorrectText(props.type, props.text, false);
        else
          commentBlocks[props.blocki] += props.text
            .split('\n')
            .map((line, linei) => makeCorrectText(linei ? 0 : props.type, line, false))
            .join('\n');
      } else if ('wordi' in props) {
        const wordKey = `${props.pre}l${props.linei}w${props.wordi}` as const;

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
            replaceProps && replaceChordInText(makeCorrectText(replaceProps.type, replaceProps.text));
          const preChordText = preProps && replaceChordInText(makeCorrectText(0, preProps.text));
          const postChordText = postProps && replaceChordInText(makeCorrectText(0, postProps.text));

          if (replaceChordText) replaceChordRulesList[chordi] = replaceChordText;
          if (preChordText) preChordRulesList[chordi] = preChordText;
          if (postChordText) postChordRulesList[chordi] = postChordText;
        }

        let wordText = makeAccentMarker(propsDict[`${wordKey}^`]?.type);

        wordText += makeWordTextRule(propsDict, wordKey, '<');
        wordText += makeWordTextRule(propsDict, wordKey, '>');

        wordText += makeChordTextRule('<', preChordRulesList);
        wordText += makeChordTextRule('^', replaceChordRulesList);
        wordText += makeChordTextRule('>', postChordRulesList);

        if (wordText) {
          wordCommentsText[props.pre] ??= '';
          wordCommentsText[props.pre] += `\n${props.linei + 1}:${props.wordi + 1}${wordText}`;
        }
      } else {
        const lineKey = `${props.pre}l${props.linei}` as const;

        if (!propsKeysSet.has(lineKey) || !props.text) continue;
        propsKeysSet.delete(lineKey);

        lineCommentsText[props.pre] ??= '';
        lineCommentsText[props.pre] += `\n${props.linei + 1}${makeCorrectText(props.type, props.text, false)}`;
      }
    }

    usedSelectorsSet.forEach(prefix => {
      if (!commentOrdBlocks[prefix]) return;

      commentOrdBlocks[prefix][0] ??= '';
      if (lineCommentsText[prefix]) commentOrdBlocks[prefix][0] += `\n\n${lineCommentsText[prefix].trim()}`;
      if (wordCommentsText[prefix]) commentOrdBlocks[prefix][0] += `\n\n${wordCommentsText[prefix].trim()}`;

      commentOrdBlocks[prefix][0] = commentOrdBlocks[prefix][0].trim();
      commentOrdBlocks[prefix] = commentOrdBlocks[prefix].filter(itIt);
    });

    return commentOrdBlocks;
  } catch (e) {
    console.error(e);
    return {};
  }
};

const makeAccentMarker = (type: 0 | 1 | 2 | nil) => '!'.repeat(type ?? 0);

const replaceChordEscapes = {
  ' ': '_',
  '}': '\\}',
};

const chordEscapesReplacer = (all: string) => replaceChordEscapes[all as never];
const replaceChordInText = (text: string) => text.replace(makeRegExp('/(?<!\\\\)[ }]/g'), chordEscapesReplacer);

const makeCorrectText = (type: 0 | 1 | 2 | nil, text: string, isSimpleStartCharEscape = true) => {
  text = text.trim();

  if ((isSimpleStartCharEscape ? simpleStartCharForEscapeSet : startCharForEscapeSet).has(text[0])) text = `.${text}`;

  return `${makeAccentMarker(type)}${text}`;
};

const simpleStartCharForEscape = '.!';
const simpleStartCharForEscapeSet = new Set(simpleStartCharForEscape);
const startCharForEscapeSet = new Set(`0123456789${simpleStartCharForEscape}`);

const makeWordTextRule = (
  propsDict: CmComCommentConstructorRulePropsDict,
  key: CmComCommentConstructorPropsDictWordRulePropsKeyPrefix | CmComCommentConstructorPropsDictChordRulePropsKeyPrefix,
  place: '<' | '>',
) => {
  const props = propsDict[`${key}${place}`];
  if (!props?.text) return '';
  return `[${place}${makeCorrectText(props.type, props.text).replace(makeRegExp(`/\\]/g`), '\\]')}]`;
};

const makeChordTextRule = (place: '^' | '>' | '<', chords: string[]) =>
  chords.length ? `{${place}${chords.join(' ')}}` : '';
