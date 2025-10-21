import { ScreenBroadcastPositionConfig } from '#features/broadcast/complect/model';
import { ScreenTranslateCurrentPositionConfigurators } from '#features/broadcast/complect/position/Position';
import { useScreenBroadcastCurrentConfigi } from '#features/broadcast/hooks/configs';
import { useBibleBroadcastScreenConfig, useBibleBroadcastUpdateCurrentConfig } from '$bible/entities/broadcast';
import { useCallback } from 'react';

export const BibleBroadcastScreenAddressPanel = (props: {
  screeni: number | und;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const currentConfigi = useScreenBroadcastCurrentConfigi();
  const updateConfig = useBibleBroadcastUpdateCurrentConfig();
  const currentConfig = useBibleBroadcastScreenConfig(props.screeni ?? currentConfigi);

  const updateConfigAddressPanel = useCallback(
    (config: Partial<ScreenBroadcastPositionConfig>) => {
      if (currentConfig)
        updateConfig({
          ...currentConfig,
          addressPanel: {
            ...currentConfig.addressPanel,
            ...config,
            ...(config.height ? { top: 100 - config.height } : null),
          },
        });
    },
    [currentConfig, updateConfig],
  );

  if (currentConfig === undefined) return;

  return (
    <>
      <ScreenTranslateCurrentPositionConfigurators
        config={currentConfig.addressPanel}
        updateConfig={updateConfigAddressPanel}
        wrapperRef={props.wrapperRef}
        resizeOnly="top"
        isCantMove
      />
    </>
  );
};
