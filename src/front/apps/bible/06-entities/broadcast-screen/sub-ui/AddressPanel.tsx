import { currentBroadcastConfigiAtom } from '#features/broadcast/atoms';
import { BroadcastResizeBorderPositions } from '#features/broadcast/complect/model';
import { ScreenTranslateCurrentPositionConfigurators } from '#features/broadcast/complect/position/Position';
import { bibleBroadcastUpdateCurrentConfig, useBibleBroadcastScreenConfig } from '$bible/entities/broadcast';
import { useAtomValue } from 'atomaric';

export const BibleBroadcastScreenAddressPanel = (props: {
  configi: number | und;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const currentConfigi = useAtomValue(currentBroadcastConfigiAtom);
  const currentConfig = useBibleBroadcastScreenConfig(props.configi ?? currentConfigi);

  if (!currentConfig) return;

  return (
    <>
      <ScreenTranslateCurrentPositionConfigurators
        config={currentConfig.addressPanel}
        wrapperRef={props.wrapperRef}
        resizeOnly={[BroadcastResizeBorderPositions.Top]}
        isCantMove
        updateConfig={config => {
          if (currentConfig)
            bibleBroadcastUpdateCurrentConfig({
              ...currentConfig,
              addressPanel: {
                ...currentConfig.addressPanel,
                ...config,
                ...(config.height ? { top: 100 - config.height } : null),
              },
            });
        }}
      />
    </>
  );
};
