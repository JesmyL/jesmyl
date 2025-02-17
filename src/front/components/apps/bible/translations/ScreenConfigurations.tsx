import { memo } from 'react';
import { ScreenTranslationsFaceLine } from '../../+complect/translations/complect/config-line/FaceLine';
import { ExpandableContent } from '../../../../07-shared/ui/expand/ExpandableContent';
import BibleTranslateCurrentScreenConfigurations from './CurrentConfigs';
import { useBibleScreenTranslationCurrentConfig } from './hooks/configs';
import { useUpdateBibleCurrentTranslationConfig } from './hooks/update-config';

export default memo(function BibleTranslateScreenConfigurations(): JSX.Element {
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
