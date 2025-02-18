import { useDebounceAction } from 'front/08-shared/lib/hooks/useDebounceAction';
import { ExpandableContent } from 'front/08-shared/ui/expand/ExpandableContent';
import IconButton from 'front/08-shared/ui/the-icon/IconButton';
import { useCallback } from 'react';
import { ScreenTranslateConfigurationNameChanger } from '../../../../../../+complect/translations/complect/NameChanger';
import { BackgroundConfigurator } from '../../../../../../../../06-entities/configurators/Background';
import { ColorConfigurator } from '../../../../../../../../06-entities/configurators/Color';
import { FontFamilyConfigurator } from '../../../../../../../../06-entities/configurators/FontFamily';
import { FontWeightConfigurator } from '../../../../../../../../06-entities/configurators/FontWeight';
import { ScreenTranslateConfigurationTextAlign } from '../../../../../../../../06-entities/configurators/TextAlign';
import { useUpdateCmCurrentTranslationConfig } from '../../hooks/update-config';
import { CmTranslationScreenConfig, CmTranslationTextScreenConfig } from '../../model';
import { cmTranslationSubConfigNext } from '../defaults';
import { CmScreenTranslateConfigurationPushKind } from './complect/PushKind';

interface Props {
  currentConfig: CmTranslationScreenConfig;
}

export const CmTranslateCurrentScreenConfigurations = ({ currentConfig }: Props) => {
  const updateConfig = useUpdateCmCurrentTranslationConfig();
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
      <div className="margin-gap-l">
        <ScreenTranslateConfigurationNameChanger />

        <CmScreenTranslateConfigurationPushKind
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
          <div className="margin-gap-l">
            {currentConfig.subs?.next ? (
              <>
                <IconButton
                  icon="Cancel01"
                  className="color--ko"
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
                <IconButton
                  icon="PlusSign"
                  className="margin-big-gap-v"
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
