import { ScreenTranslateConfigurationNameChanger } from '#features/translations/complect/NameChanger';
import { useDebounceAction } from '#shared/lib/hooks/useDebounceAction';
import { BackgroundConfigurator } from '#shared/ui/configurators/Background';
import { ColorConfigurator } from '#shared/ui/configurators/Color';
import { FontFamilyConfigurator } from '#shared/ui/configurators/FontFamily';
import { FontWeightConfigurator } from '#shared/ui/configurators/FontWeight/ui';
import { ScreenTranslateConfigurationTextAlign } from '#shared/ui/configurators/TextAlign';
import { ExpandableContent } from '#shared/ui/expand/ExpandableContent';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { useCallback } from 'react';
import { cmTranslationSubConfigNext } from '../const/defaults';
import { useCmTranslationUpdateCurrentConfig } from '../hooks/update-config';
import { CmTranslationScreenConfig, CmTranslationTextScreenConfig } from '../model/model';
import { CmTranslationScreenConfigurationPushKind } from './PushKind';

interface Props {
  currentConfig: CmTranslationScreenConfig;
}

export const CmTranslationCurrentScreenConfigurations = ({ currentConfig }: Props) => {
  const updateConfig = useCmTranslationUpdateCurrentConfig();
  const update = useDebounceAction(updateConfig);

  const putSubConfigUpdate = useCallback(
    (config: Partial<CmTranslationTextScreenConfig> | null) => {
      const next = config === null ? null : { ...cmTranslationSubConfigNext, ...currentConfig.subs?.next, ...config };

      const newConfig: CmTranslationScreenConfig = {
        ...currentConfig,
        subs: {
          ...currentConfig.subs,
          next: next!,
        },
      };

      if (config === null) delete newConfig.subs!.next;

      updateConfig(newConfig);
    },
    [currentConfig, updateConfig],
  );
  const onAddSubConfig = useCallback(() => putSubConfigUpdate(cmTranslationSubConfigNext), [putSubConfigUpdate]);

  return (
    <ExpandableContent title="Настроить">
      <div className="ml-2">
        <ScreenTranslateConfigurationNameChanger />

        <CmTranslationScreenConfigurationPushKind
          config={currentConfig}
          updateConfig={updateConfig}
        />

        <ColorConfigurator
          config={currentConfig}
          updateConfig={update}
        />
        <FontWeightConfigurator
          config={currentConfig}
          updateConfig={update}
        />
        <ScreenTranslateConfigurationTextAlign
          config={currentConfig}
          updateConfig={update}
        />
        <FontFamilyConfigurator
          config={currentConfig}
          updateConfig={update}
        />
        <BackgroundConfigurator
          config={currentConfig}
          updateConfig={update}
        />
        <ExpandableContent title="Доп. блоки">
          <div className="ml-2">
            {currentConfig.subs?.next ? (
              <>
                <TheIconButton
                  icon="Cancel01"
                  className="text-xKO"
                  postfix="Убрать текст следующего блока"
                  confirm="Убрать текст следующего блока?"
                  onClick={() => putSubConfigUpdate(null)}
                />
                <ColorConfigurator
                  config={currentConfig.subs.next}
                  updateConfig={putSubConfigUpdate}
                />
                <FontWeightConfigurator
                  config={currentConfig.subs.next}
                  updateConfig={putSubConfigUpdate}
                />
                <ScreenTranslateConfigurationTextAlign
                  config={currentConfig.subs.next}
                  updateConfig={putSubConfigUpdate}
                />
                <FontFamilyConfigurator
                  config={currentConfig.subs.next}
                  updateConfig={putSubConfigUpdate}
                />
              </>
            ) : (
              <div>
                <TheIconButton
                  icon="PlusSign"
                  className="my-5"
                  postfix="Вставить окно следующего блока"
                  onClick={onAddSubConfig}
                />
              </div>
            )}
          </div>
        </ExpandableContent>
      </div>
    </ExpandableContent>
  );
};
