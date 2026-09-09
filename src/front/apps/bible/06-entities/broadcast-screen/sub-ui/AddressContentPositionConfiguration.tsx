import { currentBroadcastConfigiAtom } from '#features/broadcast/atoms';
import { ScreenTranslateCurrentPositionConfigurators } from '#features/broadcast/complect/position/Position';
import { bibleBroadcastUpdateCurrentConfig, useBibleBroadcastScreenConfig } from '$bible/entities/broadcast';
import { useAtomValue } from 'atomaric';

export const BibleBroadcastScreenAddressContentPositionConfiguration = (props: {
  configi: number | und;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const currentConfigi = useAtomValue(currentBroadcastConfigiAtom);
  const currentConfig = useBibleBroadcastScreenConfig(props.configi ?? currentConfigi);

  if (!currentConfig) return;

  return (
    <>
      <ScreenTranslateCurrentPositionConfigurators
        config={currentConfig.address}
        wrapperRef={props.wrapperRef}
        updateConfig={config => {
          if (currentConfig)
            bibleBroadcastUpdateCurrentConfig({ ...currentConfig, address: { ...currentConfig.address, ...config } });
        }}
      />
    </>
  );
};
