import {
  CmComCommentConstructorPropsDictWordRulePropsKey,
  CmComCommentConstructorRulePropsDict,
} from '$cm/shared/model/com-comment';
import { atom } from 'atomaric';
import { CmComCommentBlockSimpleSelector, CmComWid } from 'shared/api';

export const cmComCommentConstructorRulePropsDictAtom = atom(
  (): {
    dict?: CmComCommentConstructorRulePropsDict;
    selector?: CmComCommentBlockSimpleSelector;
    comw: CmComWid;
    altCommentKey: string | null;
    wordChordiMaxDict: PRecord<CmComCommentConstructorPropsDictWordRulePropsKey, number>;
  } => ({ wordChordiMaxDict: {}, comw: CmComWid.def, altCommentKey: null }),
);
