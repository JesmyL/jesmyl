import { ScreenBroadcastPositionConfig } from '#features/broadcast/complect/model';
import { ScreenTranslateCurrentPositionConfigurators } from '#features/broadcast/complect/position/Position';
import { useScreenBroadcastCurrentConfigi } from '#features/broadcast/hooks/configs';
import { useBibleBroadcastScreenConfig, useBibleBroadcastUpdateCurrentConfig } from '$bible/entities/broadcast';
import { useCallback } from 'react';

export const BibleBroadcastScreenAddressContentPositionConfiguration = (props: {
  screeni: number | und;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const currentConfigi = useScreenBroadcastCurrentConfigi();
  const updateConfig = useBibleBroadcastUpdateCurrentConfig();
  const currentConfig = useBibleBroadcastScreenConfig(props.screeni ?? currentConfigi);

  const updateConfigAddress = useCallback(
    (config: Partial<ScreenBroadcastPositionConfig>) => {
      if (currentConfig) updateConfig({ ...currentConfig, address: { ...currentConfig.address, ...config } });
    },
    [currentConfig, updateConfig],
  );

  if (currentConfig === undefined) return;

  return (
    <>
      <ScreenTranslateCurrentPositionConfigurators
        config={currentConfig.address}
        updateConfig={updateConfigAddress}
        wrapperRef={props.wrapperRef}
      />
    </>
  );
};
