import { ExpandableContent } from '#shared/ui/expand/ExpandableContent';
import { JSX, memo } from 'react';
import { ScreenTranslationsFaceLine } from '../../../../features/translations/complect/config-line/FaceLine';
import { BibleTranslateCurrentScreenConfigurations } from './CurrentConfigs';
import { useBibleScreenTranslationCurrentConfig } from './hooks/configs';
import { useUpdateBibleCurrentTranslationConfig } from './hooks/update-config';

export const BibleTranslateScreenConfigurations = memo(function BibleTranslateScreenConfigurations(): JSX.Element {
  const currentConfig = useBibleScreenTranslationCurrentConfig();
  const updateConfig = useUpdateBibleCurrentTranslationConfig();

  return (
    <div className="mt-5">
      <ScreenTranslationsFaceLine updateConfig={updateConfig} />
      {currentConfig && (
        <ExpandableContent title="Настроить">
          <div className="ml-2">
            <BibleTranslateCurrentScreenConfigurations currentConfig={currentConfig} />
          </div>
        </ExpandableContent>
      )}
    </div>
  );
});
