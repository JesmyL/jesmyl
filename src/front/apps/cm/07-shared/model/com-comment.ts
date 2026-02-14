import {
  CmComCommentTextDetectorBlockRuleProps,
  CmComCommentTextDetectorChordRuleProps,
  CmComCommentTextDetectorLineRuleProps,
  CmComCommentTextDetectorWordRuleProps,
} from '$cm/entities/com-comment';

export type CmLineCommentConstructorButtonPropKey = keyof CmLineCommentConstructorButtonRulePropsDict;

export type CmLineCommentConstructorButtonPropsDictWordRulePropsKey = `l${number}w${number}`;
export type CmLineCommentConstructorButtonPropsDictBlockRulePropsKey = `b${number}`;
export type CmLineCommentConstructorButtonPropsDictChordRulePropsKey =
  `${CmLineCommentConstructorButtonPropsDictWordRulePropsKey}c${number}`;

export type CmLineCommentConstructorButtonRulePropsDict = Partial<
  Record<CmLineCommentConstructorButtonPropsDictBlockRulePropsKey, CmComCommentTextDetectorBlockRuleProps> &
    Record<`l${number}`, CmComCommentTextDetectorLineRuleProps> &
    Record<
      `${CmLineCommentConstructorButtonPropsDictWordRulePropsKey}${'<' | '>' | '^'}`,
      CmComCommentTextDetectorWordRuleProps
    > &
    Record<
      `${CmLineCommentConstructorButtonPropsDictChordRulePropsKey}${'<' | '>' | '^'}`,
      CmComCommentTextDetectorChordRuleProps
    >
>;
