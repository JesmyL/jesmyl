export type CmComCommentTextDetectorRuleProps =
  | CmComCommentTextDetectorBlockRuleProps
  | CmComCommentTextDetectorLineRuleProps
  | CmComCommentTextDetectorWordRuleProps
  | CmComCommentTextDetectorChordRuleProps;

type CommonType = {
  text: string;
  kind: 0 | 1 | 2;
  rate: number;
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
