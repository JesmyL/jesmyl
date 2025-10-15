import { ScreenTranslationPositionConfig } from '#features/translations/complect/model';
import { ScreenTranslateCurrentPositionConfigurators } from '#features/translations/complect/position/Position';
import { useScreenTranslationCurrentConfigi } from '#features/translations/hooks/configs';
import { useBibleScreenTranslationConfig } from '$bible/translations/hooks/configs';
import { useUpdateBibleCurrentTranslationConfig } from '$bible/translations/hooks/update-config';
import { useCallback } from 'react';

export const BibleTranslationScreenAddressPanel = (props: {
  screeni: number | und;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const currentConfigi = useScreenTranslationCurrentConfigi();
  const updateConfig = useUpdateBibleCurrentTranslationConfig();
  const currentConfig = useBibleScreenTranslationConfig(props.screeni ?? currentConfigi);

  const updateConfigAddressPanel = useCallback(
    (config: Partial<ScreenTranslationPositionConfig>) => {
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
