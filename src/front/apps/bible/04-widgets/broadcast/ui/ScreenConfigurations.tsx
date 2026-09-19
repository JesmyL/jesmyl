import { translateBase } from '#basis/locale';
import { ScreenBroadcastFaceLine } from '#features/broadcast/complect/config-line/FaceLine';
import { ExpandableContent } from '#shared/ui/expand/ExpandableContent';
import { bibleBroadcastUpdateCurrentConfig, useBibleBroadcastScreenCurrentConfig } from '$bible/entities/broadcast';
import { JSX, memo } from 'react';
import { BibleBroadcastCurrentScreenConfigurations } from './CurrentConfigs';

export const BibleBroadcastScreenConfigurations = memo(function BibleTranslateScreenConfigurations(): JSX.Element {
  const currentConfig = useBibleBroadcastScreenCurrentConfig();

  return (
    <div className="mt-5">
      <ScreenBroadcastFaceLine updateConfig={bibleBroadcastUpdateCurrentConfig} />
      {currentConfig && (
        <ExpandableContent title={translateBase(it => it.setup)}>
          <div className="ml-2">
            <BibleBroadcastCurrentScreenConfigurations currentConfig={currentConfig} />
          </div>
        </ExpandableContent>
      )}
    </div>
  );
});
