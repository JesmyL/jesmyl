import { ScreenTranslationsFaceLine } from 'front/components/apps/+complect/translations/complect/config-line/FaceLine';
import { useCmTranslationCurrentScreenConfig } from '../hooks/configs';
import { useCmTranslationUpdateConfig } from '../hooks/update-config';
import { CmTranslationCurrentScreenConfigurations } from './CurrentConfigs';

export const CmTranslationScreenConfigurations = () => {
  const currentConfig = useCmTranslationCurrentScreenConfig();
  const updateConfig = useCmTranslationUpdateConfig();

  return (
    <div className="mt-5">
      <ScreenTranslationsFaceLine updateConfig={updateConfig} />
      {currentConfig && <CmTranslationCurrentScreenConfigurations currentConfig={currentConfig} />}
    </div>
  );
};
