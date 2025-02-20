import { ScreenTranslationsFaceLine } from '#features/translations/ui/config-line/FaceLine';
import { ExpandableContent } from '#shared/ui/expand/ExpandableContent';
import { memo } from 'react';
import { BibleTranslateCurrentScreenConfigurations } from './CurrentConfigs';
import { useBibleScreenTranslationCurrentConfig } from './hooks/configs';
import { useUpdateBibleCurrentTranslationConfig } from './hooks/update-config';

export const BibleTranslateScreenConfigurations = memo(function BibleTranslateScreenConfigurations(): JSX.Element {
  const currentConfig = useBibleScreenTranslationCurrentConfig();
  const updateConfig = useUpdateBibleCurrentTranslationConfig();

  return (
    <div className="margin-big-gap-t">
      <ScreenTranslationsFaceLine updateConfig={updateConfig} />
      {currentConfig && (
        <ExpandableContent title="Настроить">
          <div className="margin-gap-l">
            <BibleTranslateCurrentScreenConfigurations currentConfig={currentConfig} />
          </div>
        </ExpandableContent>
      )}
    </div>
  );
});
