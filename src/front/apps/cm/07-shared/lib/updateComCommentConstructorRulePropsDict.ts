import {
  cmComCommentCurrentComw2OpenAltiDictAtom,
  takeCmComCommentKindBlockDict,
  takeCmComCommentTextBlock,
} from '$cm/entities/com-comment';
import { CmComCommentBlockSimpleSelector, CmComCommentBlockSpecialSelector, CmComWid } from 'shared/api';
import {
  CmComCommentConstructorPropsDictWordRulePropsKey,
  CmComCommentConstructorRulePropsDict,
} from 'shared/model/cm/com-comment';
import { cmComCommentTextRulesDetector } from 'shared/utils/cm';
import { fillCmComCommentConstructorCommentInKey2PropsDict } from 'shared/utils/cm/com/makeCommentTextFromRuleProps';
import { CmComBlockKindKey } from 'shared/values/cm/block-kinds/BlockKind.model';
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
  const altCommentKeys = cmComCommentCurrentComw2OpenAltiDictAtom.get();
  const commentAlti = altCommentKeys[comw] ?? altCommentKeys.lasti;

  const fillDict = (isSimpleBlockText: boolean, selector: CmComCommentBlockSimpleSelector) => {
    const commentTexts = takeCmComCommentTextBlock(comw, selector, localCommentBlock, commentBlock, commentAlti);

    if (commentTexts) {
      cmComCommentTextRulesDetector(isSimpleBlockText, `s${selector}`, commentTexts, props =>
        fillCmComCommentConstructorCommentInKey2PropsDict(propsDict, props, wordChordiMaxDict),
      );
    }
  };

  if (selector === CmComCommentBlockSpecialSelector.Head) {
    fillDict(true, selector);
  } else {
    let isFound = false;
    const icom = await cmIDB.tb.coms.get(comw);
    const orders = icom ? new CmCom(icom, null)?.orders : null;

    if (orders) {
      const usedOrdKindsSet = new Set<CmComBlockKindKey>();

      for (const ord of orders) {
        isFound ||= ord.wid === selector;
        if (!isFound) continue;
        if (ord.kind) usedOrdKindsSet.add(ord.kind);
        if (ord.wid !== selector && (!ord.kind || !cmComOrderPlusKindSet.has(ord.kind))) break;

        fillDict(false, ord.wid);
      }

      usedOrdKindsSet.forEach(kind => {
        const commentText = takeCmComCommentKindBlockDict(comw, localCommentBlock, commentBlock)?.[kind];

        if (commentText) {
          cmComCommentTextRulesDetector(false, `k${kind}`, [commentText], props =>
            fillCmComCommentConstructorCommentInKey2PropsDict(propsDict, props, wordChordiMaxDict),
          );
        }
      });
    }
  }

  cmComCommentConstructorRulePropsDictAtom.set({
    dict: propsDict,
    wordChordiMaxDict,
    selector,
    comw,
    commentAlti,
  });
};
