import { BackgroundConfigProps } from '#shared/ui/configurators/model';

export const takeScreenBroadcastBackgroundStyles = (config: BackgroundConfigProps | und) =>
  config != null && config.withBg ? config.bg || config.bgColor : undefined;
