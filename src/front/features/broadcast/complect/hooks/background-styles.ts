import { BackgroundConfigProps } from '#shared/ui/configurators/model';

export const takeScreenBroadcastBackgroundStyles = (config: BackgroundConfigProps | und) => ({
  background: config != null && config.withBg ? config.bg || config.bgColor : undefined,
});
