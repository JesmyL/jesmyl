import { cmComCommentCurrentOpenedAltKeyAtom, takeCmComCommentTextBlock } from '$cm/entities/com-comment';
import { CmComCommentBlockSimpleSelector, CmComCommentBlockSpecialSelector, CmComWid } from 'shared/api';
import {
  CmComCommentConstructorPropsDictWordRulePropsKey,
  CmComCommentConstructorRulePropsDict,
} from 'shared/model/cm/com-comment';
import { cmComCommentTextRulesDetector } from 'shared/utils/cm';
import { fillCmComCommentConstructorCommentInKey2PropsDict } from 'shared/utils/cm/com/makeCommentTextFromRuleProps';
import { cmComOrderPlusKindSet } from 'shared/values/cm/block-kinds/kind-sets';
import { cmIDB } from '../state';
import { cmComCommentConstructorRulePropsDictAtom } from '../state/com-comment.atoms';

export const updateCmComCommentConstructorRulePropsDict = async (
  comw: CmComWid,
  selector: CmComCommentBlockSimpleSelector,
) => {
  const localCommentBlock = await cmIDB.tb.localComCommentBlocks.get(comw);
  const commentBlock = await cmIDB.tb.comCommentBlocks.get(comw);
  const icom = await cmIDB.tb.coms.get(comw);

  const propsDict: CmComCommentConstructorRulePropsDict = {};
  const wordChordiMaxDict: PRecord<CmComCommentConstructorPropsDictWordRulePropsKey, number> = {};
  const altCommentKeys = cmComCommentCurrentOpenedAltKeyAtom.get();
  const altCommentKey = altCommentKeys[comw] ?? altCommentKeys.last;
  let isFound = false;
  const orders = icom?.o;

  if (orders)
    for (const ord of orders) {
      isFound ||= ord.w === selector;
      if (!isFound) continue;
      if (ord.w !== selector && (!ord.k || !cmComOrderPlusKindSet.has(ord.k))) break;

      const commentTexts = takeCmComCommentTextBlock(comw, ord.w, localCommentBlock, commentBlock, altCommentKey);

      if (commentTexts) {
        cmComCommentTextRulesDetector(selector === CmComCommentBlockSpecialSelector.Head, ord.w, commentTexts, props =>
          fillCmComCommentConstructorCommentInKey2PropsDict(ord.w, propsDict, props, wordChordiMaxDict),
        );
      }
    }

  cmComCommentConstructorRulePropsDictAtom.set({ dict: propsDict, wordChordiMaxDict, selector, comw, altCommentKey });
};
