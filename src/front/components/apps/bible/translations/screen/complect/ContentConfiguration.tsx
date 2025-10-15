import { ScreenTranslationPositionConfig } from '#features/translations/complect/model';
import { ScreenTranslateCurrentPositionConfigurators } from '#features/translations/complect/position/Position';
import { useScreenTranslationCurrentConfigi } from '#features/translations/hooks/configs';
import { useBibleScreenTranslationConfig } from '$bible/translations/hooks/configs';
import { useUpdateBibleCurrentTranslationConfig } from '$bible/translations/hooks/update-config';
import { useCallback } from 'react';

export const BibleTranslationScreenContentConfiguration = (props: {
  screeni: number | und;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const currentConfigi = useScreenTranslationCurrentConfigi();
  const updateConfig = useUpdateBibleCurrentTranslationConfig();

  const currentConfig = useBibleScreenTranslationConfig(props.screeni ?? currentConfigi);

  const updateConfigScreen = useCallback(
    (config: Partial<ScreenTranslationPositionConfig>) => {
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
