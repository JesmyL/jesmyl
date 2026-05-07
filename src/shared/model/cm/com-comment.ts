import { CmComCommentBlockSimpleSelector } from 'shared/api';
import { CmComBlockKindKey } from 'shared/values/cm/block-kinds/BlockKind.model';

export type CmComCommentTextDetectorRuleProps =
  | CmComCommentTextDetectorBlockRuleProps
  | CmComCommentTextDetectorLineRuleProps
  | CmComCommentTextDetectorWordRuleProps
  | CmComCommentTextDetectorChordRuleProps;

type CommonType = {
  text: string;
  type: 0 | 1 | 2;
  rate: number;
  sel: CmComCommentBlockSimpleSelector;
  pre: CmComCommentConstructorPropsDictSelectorRulePropsKey;
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

export type CmComCommentConstructorPropsDictSelectorRulePropsKey =
  | `s${CmComCommentBlockSimpleSelector}`
  | `k${CmComBlockKindKey}`;

export type CmComCommentConstructorPropsDictBlockRulePropsKey =
  `${CmComCommentConstructorPropsDictSelectorRulePropsKey}b${number}`;

export type CmComCommentConstructorPropsDictLineRulePropsKey =
  `${CmComCommentConstructorPropsDictSelectorRulePropsKey}l${number}`;

export type CmComCommentConstructorPropsDictWordRulePropsKey =
  `${CmComCommentConstructorPropsDictLineRulePropsKey}w${number}`;

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

export const enum CmComCommentConstructorRuleType {
  Head,
  Block,
  Line,
  Word,
  Chord,
}

export type CmComCommentConstructorRuleKindByPropsType<Key extends CmComCommentTextDetectorRuleProps | und> =
  Key extends CmComCommentTextDetectorChordRuleProps
    ? CmComCommentConstructorRuleType.Chord
    : Key extends CmComCommentTextDetectorWordRuleProps
      ? CmComCommentConstructorRuleType.Word
      : Key extends CmComCommentTextDetectorLineRuleProps
        ? CmComCommentConstructorRuleType.Line
        : Key extends CmComCommentTextDetectorBlockRuleProps
          ? CmComCommentConstructorRuleType.Block | CmComCommentConstructorRuleType.Head
          : null;
