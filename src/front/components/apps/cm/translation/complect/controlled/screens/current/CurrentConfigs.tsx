import { useCallback } from 'react';
import { ScreenTranslateConfigurationBackground } from '../../../../../../+complect/translations/complect/Background';
import { ScreenTranslateConfigurationColor } from '../../../../../../+complect/translations/complect/Color';
import { ScreenTranslateConfigurationFontFamily } from '../../../../../../+complect/translations/complect/FontFamily';
import { ScreenTranslateConfigurationNameChanger } from '../../../../../../+complect/translations/complect/NameChanger';
import { ScreenTranslateConfigurationTextAlign } from '../../../../../../+complect/translations/complect/TextAlign';
import { ScreenTranslateConfigurationFontWeight } from '../../../../../../+complect/translations/complect/FontWeight';
import EvaButton from '../../../../../../../../complect/eva-icon/EvaButton';
import { ExpandableContent } from '../../../../../../../../complect/expand/ExpandableContent';
import { useDebounceAction } from '../../../../../../../../complect/useDebounceAction';
import { useUpdateCmCurrentTranslationConfig } from '../../hooks/update-config';
import { CmTranslationScreenConfig, CmTranslationTextScreenConfig } from '../../model';
import { cmTranslationSubConfigNext } from '../defaults';

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
        <ScreenTranslateConfigurationColor
          config={currentConfig}
          updateConfig={update}
        />
        <ScreenTranslateConfigurationFontWeight
          config={currentConfig}
          updateConfig={update}
        />
        <ScreenTranslateConfigurationTextAlign
          config={currentConfig}
          updateConfig={update}
        />
        <ScreenTranslateConfigurationFontFamily
          config={currentConfig}
          updateConfig={update}
        />
        <ScreenTranslateConfigurationBackground
          config={currentConfig}
          updateConfig={update}
        />
        <ExpandableContent title="Доп. блоки">
          <div className="margin-gap-l">
            {currentConfig.subs?.next ? (
              <>
                <EvaButton
                  name="close"
                  className="color--ko"
                  postfix="Убрать текст следующего блока"
                  confirm="Убрать текст следующего блока?"
                  onClick={() => putSubConfigUpdate(null)}
                />
                <ScreenTranslateConfigurationColor
                  config={currentConfig.subs.next}
                  updateConfig={putSubConfigUpdate}
                />
                <ScreenTranslateConfigurationFontWeight
                  config={currentConfig.subs.next}
                  updateConfig={putSubConfigUpdate}
                />
                <ScreenTranslateConfigurationTextAlign
                  config={currentConfig.subs.next}
                  updateConfig={putSubConfigUpdate}
                />
                <ScreenTranslateConfigurationFontFamily
                  config={currentConfig.subs.next}
                  updateConfig={putSubConfigUpdate}
                />
              </>
            ) : (
              <div>
                <EvaButton
                  name="plus"
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
