import {
  CmComCommentConstructorPropsDictWordRulePropsKey,
  CmComCommentConstructorRulePropsDict,
} from '$cm/shared/model/com-comment';
import { atom, Atom } from 'atomaric';

export const cmLineCommentConstructorRulePropsDictAtom: Atom<{
  dict?: CmComCommentConstructorRulePropsDict;
  wordChordiMaxDict: PRecord<CmComCommentConstructorPropsDictWordRulePropsKey, number>;
}> = atom({ wordChordiMaxDict: {} });
