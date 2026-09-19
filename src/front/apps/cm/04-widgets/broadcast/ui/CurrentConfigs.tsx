import { translateBase } from '#basis/locale';
import { defaultScreenBroadcastTextConfig } from '#features/broadcast/complect/defaults';
import { ScreenBroadcastTextConfig } from '#features/broadcast/complect/model';
import { ScreenTranslateConfigurationNameChanger } from '#features/broadcast/complect/NameChanger';
import { useDebounceAction } from '#shared/lib/hooks/useDebounceAction';
import { BackgroundConfigurator } from '#shared/ui/configurators/Background';
import { ColorConfigurator } from '#shared/ui/configurators/Color';
import { FontFamilyConfigurator } from '#shared/ui/configurators/FontFamily';
import { FontWeightConfigurator } from '#shared/ui/configurators/FontWeight/ui';
import { ScreensConfigurator } from '#shared/ui/configurators/Screens';
import { StrokeConfigurator } from '#shared/ui/configurators/Stroke';
import { ScreenTranslateConfigurationTextAlign } from '#shared/ui/configurators/TextAlign';
import { TextCaseConfigurator } from '#shared/ui/configurators/TextCase';
import { ExpandableContent } from '#shared/ui/expand/ExpandableContent';
import { useCmBroadcastUpdateCurrentConfig } from '$cm/shared/lib/broadcast';
import { useCallback } from 'react';
import {
  CmBroadcastScreenConfig,
  CmBroadcastScreenConfigSubConfigs,
  CmBroadcastTextScreenConfig,
} from 'shared/model/cm/broadcast';
import { cmBroadcastSubConfigNext } from '../const/defaults';
import { CmBroadcastSubBlockConfigurator } from './SubBlockConfigurator';

interface Props {
  currentConfig: CmBroadcastScreenConfig;
}

export const CmBroadcastCurrentScreenConfigurations = ({ currentConfig }: Props) => {
  const updateConfig = useCmBroadcastUpdateCurrentConfig();
  const update = useDebounceAction(updateConfig);

  const putSubConfigUpdate = useCallback(
    (
      field: keyof CmBroadcastScreenConfigSubConfigs,
      defaultConfig: ScreenBroadcastTextConfig | nil,
      config: Partial<CmBroadcastTextScreenConfig> | null,
    ) => {
      const updatedConfig = config === null ? null : { ...defaultConfig, ...currentConfig.subs?.[field], ...config };

      const newConfig = {
        ...currentConfig,
        subs: {
          ...currentConfig.subs,
          [field]: updatedConfig!,
        },
      } satisfies CmBroadcastScreenConfig;

      if (config === null) delete newConfig.subs[field];

      updateConfig(newConfig);
    },
    [currentConfig, updateConfig],
  );

  return (
    <ExpandableContent title={translateBase(it => it.setup)}>
      <div className="ml-2">
        <ScreenTranslateConfigurationNameChanger />
        <ScreensConfigurator />
        <ColorConfigurator
          config={currentConfig}
          updateConfig={update}
        />
        <TextCaseConfigurator
          config={currentConfig}
          updateConfig={update}
        />
        <StrokeConfigurator
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
        <ExpandableContent title={translateBase(it => it.cm.blocks)}>
          <CmBroadcastSubBlockConfigurator
            blockTitle={translateBase(it => it.cm.nxBlockConfig)}
            subKey="next"
            plusButtonPostfix={translateBase(it => it.cm.insertNxBlock)}
            deleteButtonPostfix={translateBase(it => it.cm.hideNxBlock)}
            putSubConfigUpdate={putSubConfigUpdate}
            currentConfig={currentConfig}
            defaultConfig={cmBroadcastSubConfigNext}
          />

          <CmBroadcastSubBlockConfigurator
            blockTitle={translateBase(it => it.cm.chBlockConfig)}
            subKey="chorded"
            plusButtonPostfix={translateBase(it => it.cm.insertChBlock)}
            deleteButtonPostfix={translateBase(it => it.cm.hideChBlock)}
            putSubConfigUpdate={putSubConfigUpdate}
            currentConfig={currentConfig}
            defaultConfig={defaultScreenBroadcastTextConfig}
          />
        </ExpandableContent>
      </div>
    </ExpandableContent>
  );
};
