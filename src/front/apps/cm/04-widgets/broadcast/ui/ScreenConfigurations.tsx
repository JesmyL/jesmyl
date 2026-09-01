import { ScreenBroadcastFaceLine } from '#features/broadcast/complect/config-line/FaceLine';
import { useCmBroadcastCurrentScreenConfig, useCmBroadcastUpdateConfig } from '$cm/shared/lib/broadcast';
import { CmBroadcastCurrentScreenConfigurations } from './CurrentConfigs';

export const CmBroadcastScreenConfigurations = () => {
  const currentConfig = useCmBroadcastCurrentScreenConfig();
  const updateConfig = useCmBroadcastUpdateConfig();

  return (
    <div className="mt-5">
      <ScreenBroadcastFaceLine updateConfig={updateConfig} />
      {currentConfig && <CmBroadcastCurrentScreenConfigurations currentConfig={currentConfig} />}
    </div>
  );
};
