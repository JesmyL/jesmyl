import { CmComIntensityLevel } from 'shared/api';

export type ConstantsConfigConfiguratorItem<Type, ParsedValue> = {
  /** default value */
  def: Type;

  unzip: (value: string) => ParsedValue;
  str: (value: string, def: Type) => string;
  title: string;
  error: (value: Type, checkValue: unknown) => string | nil;
};

export type ConstantsConfigConfigurator = Record<`>${string}`, 0> & {
  [K in keyof ConstantsConfig]: ConstantsConfigConfiguratorItem<ConstantsConfigTypes[K][0], ConstantsConfigTypes[K][1]>;
};

type ConstantsConfigInfer<T extends Record<string, [unknown, unknown]>> = T;

export type ConstantsConfigTypes = ConstantsConfigInfer<{
  maxFavouritesCount: [number, number];
  maxAvailableComLineLength: [number, number];
  maxSelectedComsCount: [number, number];
  maxLaterComsVizitedCount: [number, number];
  maxComCommentAlternativesCount: [number, number];
  maxComCommentHeadLen: [number, number];
  maxComCommentBlockLen: [number, number];
  maxComCommentLineLen: [number, number];
  maxComCommentWordLen: [number, number];
  maxComCommentChordLen: [number, number];
  showFragmentSlidesBelow: [CmComIntensityLevel, CmComIntensityLevel];

  availEmailDomainZone: [string, Set<string>];
}>;

export type ConstantsConfig = { [K in keyof ConstantsConfigTypes]: ConstantsConfigTypes[K][0] };
