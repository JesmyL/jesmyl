import type { BaseLocaleKey } from './+locale/_BaseLocaleKey';
import type { NonInterpolatedBaseLocaleKey } from './+locale/base';

/** Локализуемая ошибка значения конфигурации: ключ базовой локали и подстановка `$z` (пустая строка, если подстановка не нужна). */
export type ConstantsConfigError = {
  key: BaseLocaleKey;
  z: string;
};

export type ConstantsConfigConfiguratorItem<Type> = {
  /** default value */
  def: Type;

  checked: (value: unknown) => Type;
  str: (value: unknown) => string;
  title: NonInterpolatedBaseLocaleKey;
  error?: (value: Type | nil, checkValue: unknown) => ConstantsConfigError | nil;
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

  // Максимальный объём передаваемого файла в мегабайтах.
  maxTransferFileSize: number;

  availEmailDomainZone: string;
}>;

export type ConstantsConfig = { [K in keyof ConstantsConfigTypes]: ConstantsConfigTypes[K] };
