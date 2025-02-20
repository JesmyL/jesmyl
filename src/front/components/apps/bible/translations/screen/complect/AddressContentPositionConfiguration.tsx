import { useScreenTranslationCurrentConfigi } from '#features/translations/lib/hooks/configs';
import { ScreenTranslationPositionConfig } from '#features/translations/model/Position.model';
import { ScreenTranslateCurrentPositionConfigurators } from '#features/translations/ui/position/Position';
import { useCallback } from 'react';
import { useBibleScreenTranslationConfig } from '../../hooks/configs';
import { useUpdateBibleCurrentTranslationConfig } from '../../hooks/update-config';

export const BibleTranslationScreenAddressContentPositionConfiguration = (props: {
  screeni: number | und;
  wrapperRef: React.RefObject<HTMLDivElement>;
}) => {
  const currentConfigi = useScreenTranslationCurrentConfigi();
  const updateConfig = useUpdateBibleCurrentTranslationConfig();
  const currentConfig = useBibleScreenTranslationConfig(props.screeni ?? currentConfigi);

  const updateConfigAddress = useCallback(
    (config: Partial<ScreenTranslationPositionConfig>) => {
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
