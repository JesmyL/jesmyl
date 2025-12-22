import { currentBroadcastConfigiAtom } from '#features/broadcast/atoms';
import { BroadcastResizeBorderPositions, ScreenBroadcastPositionConfig } from '#features/broadcast/complect/model';
import { ScreenTranslateCurrentPositionConfigurators } from '#features/broadcast/complect/position/Position';
import { useBibleBroadcastScreenConfig, useBibleBroadcastUpdateCurrentConfig } from '$bible/entities/broadcast';
import { useAtomValue } from 'atomaric';
import { useCallback } from 'react';

export const BibleBroadcastScreenAddressPanel = (props: {
  screeni: number | und;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const currentConfigi = useAtomValue(currentBroadcastConfigiAtom);
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
        resizeOnly={[BroadcastResizeBorderPositions.Top]}
        isCantMove
      />
    </>
  );
};
