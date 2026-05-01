import { makeRegExp } from 'regexpert';
import { CmComCommentBlockSimpleSelector } from 'shared/api';
import {
  CmComCommentConstructorPropKey,
  CmComCommentConstructorPropsDictChordRulePropsKey,
  CmComCommentConstructorPropsDictWordRulePropsKey,
  CmComCommentConstructorRulePropsDict,
  CmComCommentTextDetectorRuleProps,
} from 'shared/model/cm/com-comment';
import { smylib } from 'shared/utils/SMyLib';
import { itIt } from 'shared/utils/utils';

export const fillCmComCommentConstructorCommentInKey2PropsDict = (
  selector: CmComCommentBlockSimpleSelector,
  propsDict: CmComCommentConstructorRulePropsDict,
  props: CmComCommentTextDetectorRuleProps,
  wordChordiMaxDict: PRecord<CmComCommentConstructorPropsDictWordRulePropsKey, number>,
) => {
  let key: CmComCommentConstructorPropKey;

  if ('blocki' in props) key = `s${selector}b${props.blocki}`;
  else if ('chordi' in props) {
    const wordKey = `s${props.sel}l${props.linei}w${props.wordi}` as const;

    wordChordiMaxDict[wordKey] ??= 0;
    wordChordiMaxDict[wordKey]++;

    key = `${wordKey}c${props.chordi}${props.place}`;
  } else if ('wordi' in props) key = `s${props.sel}l${props.linei}w${props.wordi}${props.place}`;
  else key = `s${props.sel}l${props.linei}`;

  if (!(key in propsDict)) propsDict[key] = props as never;
};

export const makeCmComCommentConstructorCommentOrdSelector2TextsDictFromRuleProps = (
  isSimpleBlockText: boolean,
  propsDict: CmComCommentConstructorRulePropsDict,
  chordCountDict: PRecord<CmComCommentConstructorPropsDictWordRulePropsKey, number>,
) => {
  try {
    const wordCommentsText: PRecord<CmComCommentBlockSimpleSelector, string> = {};
    const lineCommentsText: PRecord<CmComCommentBlockSimpleSelector, string> = {};
    const commentOrdBlocks: PRecord<CmComCommentBlockSimpleSelector, string[]> = {};
    const usedOrdsSet = new Set<CmComCommentBlockSimpleSelector>();

    const propsList = smylib.values(propsDict);
    propsList.sort((a, b) => a!.rate - b!.rate);
    const propsKeysSet = new Set(smylib.keys(propsDict));

    for (let propsi = 0; propsi < propsList.length; propsi++) {
      const props = propsList[propsi];
      if (props == null) continue;
      const commentBlocks = (commentOrdBlocks[props.sel] ??= []);
      usedOrdsSet.add(props.sel);

      if ('blocki' in props) {
        commentBlocks[props.blocki] ??= '';

        if (!props.text) continue;

        if (isSimpleBlockText) commentBlocks[props.blocki] += makeCorrectText(props.kind, props.text, false);
        else
          commentBlocks[props.blocki] += props.text
            .split('\n')
            .map((line, linei) => makeCorrectText(linei ? 0 : props.kind, line, false))
            .join('\n');
      } else if ('wordi' in props) {
        const wordKey = `s${props.sel}l${props.linei}w${props.wordi}` as const;

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

        let wordText = makeAccentMarker(propsDict[`${wordKey}^`]?.kind);

        wordText += makeWordTextRule(propsDict, wordKey, '<');
        wordText += makeWordTextRule(propsDict, wordKey, '>');

        wordText += makeChordTextRule('<', preChordRulesList);
        wordText += makeChordTextRule('^', replaceChordRulesList);
        wordText += makeChordTextRule('>', postChordRulesList);

        if (wordText) {
          wordCommentsText[props.sel] ??= '';
          wordCommentsText[props.sel] += `\n${props.linei + 1}:${props.wordi + 1}${wordText}`;
        }
      } else {
        const lineKey = `s${props.sel}l${props.linei}` as const;

        if (!propsKeysSet.has(lineKey) || !props.text) continue;
        propsKeysSet.delete(lineKey);

        lineCommentsText[props.sel] ??= '';
        lineCommentsText[props.sel] += `\n${props.linei + 1}${makeCorrectText(props.kind, props.text, false)}`;
      }
    }

    usedOrdsSet.forEach(ordw => {
      if (!commentOrdBlocks[ordw]) return;

      commentOrdBlocks[ordw][0] ??= '';
      if (lineCommentsText[ordw]) commentOrdBlocks[ordw][0] += `\n\n${lineCommentsText[ordw].trim()}`;
      if (wordCommentsText[ordw]) commentOrdBlocks[ordw][0] += `\n\n${wordCommentsText[ordw].trim()}`;

      commentOrdBlocks[ordw][0] = commentOrdBlocks[ordw][0].trim();
      commentOrdBlocks[ordw] = commentOrdBlocks[ordw].filter(itIt);
    });

    return commentOrdBlocks;
  } catch (e) {
    console.error(e);
    return {};
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

const makeWordTextRule = (
  propsDict: CmComCommentConstructorRulePropsDict,
  key: CmComCommentConstructorPropsDictWordRulePropsKey | CmComCommentConstructorPropsDictChordRulePropsKey,
  place: '<' | '>',
) => {
  const props = propsDict[`${key}${place}`];
  if (!props?.text) return '';
  return `[${place}${makeCorrectText(props.kind, props.text).replace(makeRegExp(`/\\]/g`), '\\]')}]`;
};

const makeChordTextRule = (place: '^' | '>' | '<', chords: string[]) =>
  chords.length ? `{${place}${chords.join(' ')}}` : '';
