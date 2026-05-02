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
import { CmCom } from './Com';

export const updateCmComCommentConstructorRulePropsDict = async (
  comw: CmComWid,
  selector: CmComCommentBlockSimpleSelector,
) => {
  const localCommentBlock = await cmIDB.tb.localComCommentBlocks.get(comw);
  const commentBlock = await cmIDB.tb.comCommentBlocks.get(comw);

  const propsDict: CmComCommentConstructorRulePropsDict = {};
  const wordChordiMaxDict: PRecord<CmComCommentConstructorPropsDictWordRulePropsKey, number> = {};
  const altCommentKeys = cmComCommentCurrentOpenedAltKeyAtom.get();
  const altCommentKey = altCommentKeys[comw] ?? altCommentKeys.last;

  const fillDict = (selector: CmComCommentBlockSimpleSelector) => {
    const commentTexts = takeCmComCommentTextBlock(comw, selector, localCommentBlock, commentBlock, altCommentKey);

    if (commentTexts) {
      cmComCommentTextRulesDetector(false, selector, commentTexts, props =>
        fillCmComCommentConstructorCommentInKey2PropsDict(selector, propsDict, props, wordChordiMaxDict),
      );
    }
  };

  if (selector === CmComCommentBlockSpecialSelector.Head) {
    fillDict(selector);
  } else {
    let isFound = false;
    const icom = await cmIDB.tb.coms.get(comw);
    const orders = icom ? new CmCom(icom)?.orders : null;

    if (orders)
      for (const ord of orders) {
        isFound ||= ord.wid === selector;
        if (!isFound) continue;
        if (ord.wid !== selector && (!ord.kind || !cmComOrderPlusKindSet.has(ord.kind))) break;

        fillDict(ord.wid);
      }
  }

  cmComCommentConstructorRulePropsDictAtom.set({ dict: propsDict, wordChordiMaxDict, selector, comw, altCommentKey });
};
