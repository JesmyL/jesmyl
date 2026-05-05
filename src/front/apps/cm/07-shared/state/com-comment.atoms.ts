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
    commentAlti: number;
    wordChordiMaxDict: PRecord<CmComCommentConstructorPropsDictWordRulePropsKey, number>;
  } => ({ wordChordiMaxDict: {}, comw: CmComWid.def, commentAlti: 0 }),
);
