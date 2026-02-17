import {
  CmComCommentConstructorPropsDictWordRulePropsKey,
  CmComCommentConstructorRulePropsDict,
} from '$cm/shared/model/com-comment';
import { atom, Atom } from 'atomaric';
import { CmComCommentBlockSimpleSelector, CmComWid } from 'shared/api';

export const cmComCommentConstructorRulePropsDictAtom: Atom<{
  dict?: CmComCommentConstructorRulePropsDict;
  selector?: CmComCommentBlockSimpleSelector;
  comw: CmComWid;
  wordChordiMaxDict: PRecord<CmComCommentConstructorPropsDictWordRulePropsKey, number>;
}> = atom({ wordChordiMaxDict: {}, comw: CmComWid.def });
