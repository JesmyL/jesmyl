import { atom } from 'atomaric';
import { CmComCommentBlockSimpleSelector, CmComWid } from 'shared/api';
import {
  CmComCommentConstructorPropsDictWordRulePropsKey,
  CmComCommentConstructorRulePropsDict,
} from 'shared/model/cm/com-comment';

export const cmComCommentConstructorRulePropsDictAtom = atom(
  (): {
    dict?: CmComCommentConstructorRulePropsDict;
    selector?: CmComCommentBlockSimpleSelector;
    comw: CmComWid;
    altCommentKey: string | null;
    wordChordiMaxDict: PRecord<CmComCommentConstructorPropsDictWordRulePropsKey, number>;
  } => ({ wordChordiMaxDict: {}, comw: CmComWid.def, altCommentKey: null }),
);
