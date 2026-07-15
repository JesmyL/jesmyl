import { atom } from 'atomaric';
import { CmComCommentBlockSimpleSelector, CmComWid, CmComWidDef } from 'shared/api';
import {
  CmComCommentConstructorPropsDictWordRulePropsKeyPrefix,
  CmComCommentConstructorRulePropsDict,
} from 'shared/model/cm/com-comment';

export const cmComCommentConstructorRulePropsDictAtom = atom(
  (): {
    dict?: CmComCommentConstructorRulePropsDict;
    selector?: CmComCommentBlockSimpleSelector;
    comw: CmComWid;
    commentAlti: number;
    wordChordiMaxDict: PRecord<CmComCommentConstructorPropsDictWordRulePropsKeyPrefix, number>;
  } => ({ wordChordiMaxDict: {}, comw: CmComWidDef, commentAlti: 0 }),
);
