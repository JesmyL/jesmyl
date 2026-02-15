import {
  CmComCommentConstructorPropsDictWordRulePropsKey,
  CmComCommentConstructorRulePropsDict,
} from '$cm/shared/model/com-comment';
import { atom, Atom } from 'atomaric';

export const cmComCommentConstructorRulePropsDictAtom: Atom<{
  dict?: CmComCommentConstructorRulePropsDict;
  wordChordiMaxDict: PRecord<CmComCommentConstructorPropsDictWordRulePropsKey, number>;
}> = atom({ wordChordiMaxDict: {} });
