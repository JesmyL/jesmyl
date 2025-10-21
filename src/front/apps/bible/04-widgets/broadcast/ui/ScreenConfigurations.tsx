import { ScreenBroadcastFaceLine } from '#features/broadcast/complect/config-line/FaceLine';
import { ExpandableContent } from '#shared/ui/expand/ExpandableContent';
import { useBibleBroadcastScreenCurrentConfig, useBibleBroadcastUpdateCurrentConfig } from '$bible/entities/broadcast';
import { JSX, memo } from 'react';
import { BibleBroadcastCurrentScreenConfigurations } from './CurrentConfigs';

export const BibleBroadcastScreenConfigurations = memo(function BibleTranslateScreenConfigurations(): JSX.Element {
  const currentConfig = useBibleBroadcastScreenCurrentConfig();
  const updateConfig = useBibleBroadcastUpdateCurrentConfig();

  return (
    <div className="mt-5">
      <ScreenBroadcastFaceLine updateConfig={updateConfig} />
      {currentConfig && (
        <ExpandableContent title="Настроить">
          <div className="ml-2">
            <BibleBroadcastCurrentScreenConfigurations currentConfig={currentConfig} />
          </div>
        </ExpandableContent>
      )}
    </div>
  );
});
