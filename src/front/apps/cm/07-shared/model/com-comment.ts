import {
  CmComCommentTextDetectorBlockRuleProps,
  CmComCommentTextDetectorChordRuleProps,
  CmComCommentTextDetectorLineRuleProps,
  CmComCommentTextDetectorWordRuleProps,
} from '$cm/entities/com-comment';

export type CmLineCommentConstructorButtonPropKey = keyof CmLineCommentConstructorButtonRulePropsDict;

export type CmLineCommentConstructorButtonPropsDictWordRulePropsKey = `${number}:${number}`;
export type CmLineCommentConstructorButtonPropsDictChordRulePropsKey =
  `${CmLineCommentConstructorButtonPropsDictWordRulePropsKey}/${number}`;

export type CmLineCommentConstructorButtonRulePropsDict = Partial<
  Record<`[${number}]`, CmComCommentTextDetectorBlockRuleProps> &
    Record<`${number}`, CmComCommentTextDetectorLineRuleProps> &
    Record<
      `${CmLineCommentConstructorButtonPropsDictWordRulePropsKey}${'<' | '>' | '^'}`,
      CmComCommentTextDetectorWordRuleProps
    > &
    Record<
      `${CmLineCommentConstructorButtonPropsDictChordRulePropsKey}${'<' | '>' | '^'}`,
      CmComCommentTextDetectorChordRuleProps
    >
>;
