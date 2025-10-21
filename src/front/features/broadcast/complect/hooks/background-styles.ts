import { BackgroundConfigProps } from '#shared/ui/configurators/model';

export const useScreenBroadcastBackgroundStyles = (config: BackgroundConfigProps | und) => {
  return config !== undefined && config.isWithBackground ? config.background || config.backgroundColor : undefined;
};
