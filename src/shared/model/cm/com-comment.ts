import { CmComCommentBlockSimpleSelector } from 'shared/api';

export type CmComCommentTextDetectorRuleProps =
  | CmComCommentTextDetectorBlockRuleProps
  | CmComCommentTextDetectorLineRuleProps
  | CmComCommentTextDetectorWordRuleProps
  | CmComCommentTextDetectorChordRuleProps;

type CommonType = {
  text: string;
  kind: 0 | 1 | 2;
  rate: number;
  sel: CmComCommentBlockSimpleSelector;
};

export type CmComCommentTextDetectorBlockRuleProps = { blocki: number } & CommonType;
export type CmComCommentTextDetectorLineRuleProps = { linei: number } & CommonType;

export type CmComCommentTextDetectorWordRuleProps = CmComCommentTextDetectorLineRuleProps & {
  wordi: number;
  place: '<' | '>' | '^';
};

export type CmComCommentTextDetectorChordRuleProps = CmComCommentTextDetectorWordRuleProps & {
  chordi: number;
};

export type CmComCommentConstructorPropKey = keyof CmComCommentConstructorRulePropsDict;

export type CmComCommentConstructorPropsDictLineRulePropsKey = `s${CmComCommentBlockSimpleSelector}l${number}`;
export type CmComCommentConstructorPropsDictWordRulePropsKey =
  `${CmComCommentConstructorPropsDictLineRulePropsKey}w${number}`;
export type CmComCommentConstructorPropsDictBlockRulePropsKey = `s${CmComCommentBlockSimpleSelector}b${number}`;
export type CmComCommentConstructorPropsDictChordRulePropsKey =
  `${CmComCommentConstructorPropsDictWordRulePropsKey}c${number}`;

export type CmComCommentConstructorRulePropsDict = Partial<
  Record<CmComCommentConstructorPropsDictBlockRulePropsKey, CmComCommentTextDetectorBlockRuleProps> &
    Record<CmComCommentConstructorPropsDictLineRulePropsKey, CmComCommentTextDetectorLineRuleProps> &
    Record<
      `${CmComCommentConstructorPropsDictWordRulePropsKey}${'<' | '>' | '^'}`,
      CmComCommentTextDetectorWordRuleProps
    > &
    Record<
      `${CmComCommentConstructorPropsDictChordRulePropsKey}${'<' | '>' | '^'}`,
      CmComCommentTextDetectorChordRuleProps
    >
>;
