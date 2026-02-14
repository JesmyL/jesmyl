import {
  CmLineCommentConstructorButtonPropsDictWordRulePropsKey,
  CmLineCommentConstructorButtonRulePropsDict,
} from '$cm/shared/model/com-comment';
import { atom, Atom } from 'atomaric';

export const cmLineCommentConstructorButtonRulePropsDictAtom: Atom<{
  dict?: CmLineCommentConstructorButtonRulePropsDict;
  wordChordiMaxDict: PRecord<CmLineCommentConstructorButtonPropsDictWordRulePropsKey, number>;
}> = atom({ wordChordiMaxDict: {} });
