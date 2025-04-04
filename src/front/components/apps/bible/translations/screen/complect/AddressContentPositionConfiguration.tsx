import { useBibleScreenTranslationConfig } from '$bible/translations/hooks/configs';
import { useUpdateBibleCurrentTranslationConfig } from '$bible/translations/hooks/update-config';
import { ScreenTranslationPositionConfig } from 'front/components/apps/+complect/translations/complect/model';
import { ScreenTranslateCurrentPositionConfigurators } from 'front/components/apps/+complect/translations/complect/position/Position';
import { useScreenTranslationCurrentConfigi } from 'front/components/apps/+complect/translations/hooks/configs';
import { useCallback } from 'react';

export const BibleTranslationScreenAddressContentPositionConfiguration = (props: {
  screeni: number | und;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
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
