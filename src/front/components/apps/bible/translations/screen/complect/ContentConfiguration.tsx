import { useScreenTranslationCurrentConfigi } from '#features/translations/lib/hooks/configs';
import { ScreenTranslationPositionConfig } from '#features/translations/model/Position.model';
import { ScreenTranslateCurrentPositionConfigurators } from '#features/translations/ui/position/Position';
import { useCallback } from 'react';
import { useBibleScreenTranslationConfig } from '../../hooks/configs';
import { useUpdateBibleCurrentTranslationConfig } from '../../hooks/update-config';

export const BibleTranslationScreenContentConfiguration = (props: {
  screeni: number | und;
  wrapperRef: React.RefObject<HTMLDivElement>;
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
