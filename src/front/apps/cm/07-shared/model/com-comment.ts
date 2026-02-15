import {
  CmComCommentTextDetectorBlockRuleProps,
  CmComCommentTextDetectorChordRuleProps,
  CmComCommentTextDetectorLineRuleProps,
  CmComCommentTextDetectorWordRuleProps,
} from '$cm/entities/com-comment';

export type CmComCommentConstructorPropKey = keyof CmComCommentConstructorRulePropsDict;

export type CmComCommentConstructorPropsDictWordRulePropsKey = `l${number}w${number}`;
export type CmComCommentConstructorPropsDictBlockRulePropsKey = `b${number}`;
export type CmComCommentConstructorPropsDictChordRulePropsKey =
  `${CmComCommentConstructorPropsDictWordRulePropsKey}c${number}`;

export type CmComCommentConstructorRulePropsDict = Partial<
  Record<CmComCommentConstructorPropsDictBlockRulePropsKey, CmComCommentTextDetectorBlockRuleProps> &
    Record<`l${number}`, CmComCommentTextDetectorLineRuleProps> &
    Record<
      `${CmComCommentConstructorPropsDictWordRulePropsKey}${'<' | '>' | '^'}`,
      CmComCommentTextDetectorWordRuleProps
    > &
    Record<
      `${CmComCommentConstructorPropsDictChordRulePropsKey}${'<' | '>' | '^'}`,
      CmComCommentTextDetectorChordRuleProps
    >
>;
