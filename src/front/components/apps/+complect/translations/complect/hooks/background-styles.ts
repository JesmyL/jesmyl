import { BackgroundConfigProps } from '#entities/configurators/model';

export const useScreenTranslationBackgroundStyles = (config: BackgroundConfigProps | und) => {
  return config !== undefined && config.isWithBackground ? config.background || config.backgroundColor : undefined;
};
