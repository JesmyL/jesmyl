import { cmComCommentTextRulesDetector, takeCmComCommentTextBlock } from '$cm/entities/com-comment';
import { CmComCommentBlockSimpleSelector, CmComCommentBlockSpecialSelector, CmComWid } from 'shared/api';
import {
  CmComCommentConstructorPropKey,
  CmComCommentConstructorPropsDictWordRulePropsKey,
  CmComCommentConstructorRulePropsDict,
} from '../model/com-comment';
import { cmIDB } from '../state';
import { cmComCommentConstructorRulePropsDictAtom } from '../state/com-comment.atoms';

export const updateCmComCommentConstructorRulePropsDict = async (
  comw: CmComWid,
  selector: CmComCommentBlockSimpleSelector,
) => {
  const localCommentBlock = await cmIDB.tb.localComCommentBlocks.get(comw);
  const commentBlock = await cmIDB.tb.comCommentBlocks.get(comw);

  const propsDict: CmComCommentConstructorRulePropsDict = {};
  const wordChordiMaxDict: PRecord<CmComCommentConstructorPropsDictWordRulePropsKey, number> = {};
  const commentTexts = takeCmComCommentTextBlock(comw, selector, localCommentBlock, commentBlock);

  if (commentTexts) {
    cmComCommentTextRulesDetector(selector === CmComCommentBlockSpecialSelector.Head, commentTexts, props => {
      let key: CmComCommentConstructorPropKey;

      if ('blocki' in props) key = `b${props.blocki}`;
      else if ('chordi' in props) {
        const wordKey = `l${props.linei}w${props.wordi}` as const;

        wordChordiMaxDict[wordKey] ??= 0;
        wordChordiMaxDict[wordKey]++;

        key = `${wordKey}c${props.chordi}${props.place}`;
      } else if ('wordi' in props) key = `l${props.linei}w${props.wordi}${props.place}`;
      else key = `l${props.linei}`;

      if (!(key in propsDict)) propsDict[key] = props as never;
    });
  }

  cmComCommentConstructorRulePropsDictAtom.set({ dict: propsDict, wordChordiMaxDict, selector, comw });
};
