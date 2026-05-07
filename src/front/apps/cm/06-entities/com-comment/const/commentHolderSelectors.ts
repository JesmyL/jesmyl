const enum PseudoKey {
  Before,
  After,
}

const make = <
  const Num extends number,
  const Pseudo extends PseudoKey,
  const PseudoVal extends Pseudo extends PseudoKey.After ? 'after' : 'before',
>(
  num: Num,
  pseudo: Pseudo,
) => `.comment-holder:nth-of-type(${num})::${(pseudo === PseudoKey.Before ? 'before' : 'after') as PseudoVal}` as const;

export const cmComCommentHeaderHolderSelectors = [
  make(1, PseudoKey.Before),
  make(1, PseudoKey.After),
  make(2, PseudoKey.Before),
  make(2, PseudoKey.After),
  make(3, PseudoKey.Before),
  make(3, PseudoKey.After),
  make(4, PseudoKey.Before),
  make(4, PseudoKey.After),
  make(5, PseudoKey.Before),
] as const;
