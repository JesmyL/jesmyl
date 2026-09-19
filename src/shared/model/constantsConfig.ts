export type ConstantsConfigConfiguratorItem<Type> = {
  /** default value */
  def: Type;

  checked: (value: unknown) => Type;
  str: (value: unknown) => string;
  title: string;
  error?: (value: Type, checkValue: unknown) => string | nil;
};

export type ConstantsConfigConfigurator = Record<`>${string}`, 0> & {
  [K in keyof ConstantsConfig]: ConstantsConfigConfiguratorItem<ConstantsConfigTypes[K]>;
};

type ConstantsConfigInfer<T extends Record<string, unknown>> = T;

export type ConstantsConfigTypes = ConstantsConfigInfer<{
  maxFavouritesCount: number;
  maxAvailableComLineLength: number;
  maxSelectedComsCount: number;
  maxLaterComsVizitedCount: number;
  maxComCommentAlternativesCount: number;
  maxComCommentHeadLen: number;
  maxComCommentBlockLen: number;
  maxComCommentLineLen: number;
  maxComCommentWordLen: number;
  maxComCommentChordLen: number;

  availEmailDomainZone: string;
}>;

export type ConstantsConfig = { [K in keyof ConstantsConfigTypes]: ConstantsConfigTypes[K] };
