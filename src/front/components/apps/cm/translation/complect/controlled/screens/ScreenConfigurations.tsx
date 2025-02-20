import { ScreenTranslationsFaceLine } from '#features/translations/ui/config-line/FaceLine';
import { useCmScreenTranslationCurrentConfig } from '../hooks/configs';
import { useUpdateCmTranslationConfig } from '../hooks/update-config';
import { CmTranslateCurrentScreenConfigurations } from './current/CurrentConfigs';

export const CmTranslateScreenConfigurations = () => {
  const currentConfig = useCmScreenTranslationCurrentConfig();
  const updateConfig = useUpdateCmTranslationConfig();

  return (
    <div className="margin-big-gap-t">
      <ScreenTranslationsFaceLine updateConfig={updateConfig} />
      {currentConfig && <CmTranslateCurrentScreenConfigurations currentConfig={currentConfig} />}
    </div>
  );
};
