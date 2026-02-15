import {
  CmComCommentConstructorPropsDictWordRulePropsKey,
  CmComCommentConstructorRulePropsDict,
} from '$cm/shared/model/com-comment';
import { atom, Atom } from 'atomaric';
import { CmComCommentBlockSimpleSelector } from 'shared/api';

export const cmComCommentConstructorRulePropsDictAtom: Atom<{
  dict?: CmComCommentConstructorRulePropsDict;
  selector?: CmComCommentBlockSimpleSelector;
  wordChordiMaxDict: PRecord<CmComCommentConstructorPropsDictWordRulePropsKey, number>;
}> = atom({ wordChordiMaxDict: {} });
