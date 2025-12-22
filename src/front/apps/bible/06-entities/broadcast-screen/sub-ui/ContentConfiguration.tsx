import { currentBroadcastConfigiAtom } from '#features/broadcast/atoms';
import { ScreenBroadcastPositionConfig } from '#features/broadcast/complect/model';
import { ScreenTranslateCurrentPositionConfigurators } from '#features/broadcast/complect/position/Position';
import { useBibleBroadcastScreenConfig, useBibleBroadcastUpdateCurrentConfig } from '$bible/entities/broadcast';
import { useAtomValue } from 'atomaric';
import { useCallback } from 'react';

export const BibleBroadcastScreenContentConfiguration = (props: {
  screeni: number | und;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const currentConfigi = useAtomValue(currentBroadcastConfigiAtom);
  const updateConfig = useBibleBroadcastUpdateCurrentConfig();

  const currentConfig = useBibleBroadcastScreenConfig(props.screeni ?? currentConfigi);

  const updateConfigScreen = useCallback(
    (config: Partial<ScreenBroadcastPositionConfig>) => {
      if (currentConfig) updateConfig({ ...currentConfig, screen: { ...currentConfig.screen, ...config } });
    },
    [currentConfig, updateConfig],
  );

  if (currentConfig === undefined) return;

  return (
    <ScreenTranslateCurrentPositionConfigurators
      config={currentConfig.screen}
      updateConfig={updateConfigScreen}
      wrapperRef={props.wrapperRef}
    />
  );
};
