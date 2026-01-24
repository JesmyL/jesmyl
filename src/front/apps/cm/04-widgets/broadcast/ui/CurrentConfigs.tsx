import { defaultScreenBroadcastTextConfig } from '#features/broadcast/complect/defaults';
import { ScreenBroadcastTextConfig } from '#features/broadcast/complect/model';
import { ScreenTranslateConfigurationNameChanger } from '#features/broadcast/complect/NameChanger';
import { useDebounceAction } from '#shared/lib/hooks/useDebounceAction';
import { BackgroundConfigurator } from '#shared/ui/configurators/Background';
import { ColorConfigurator } from '#shared/ui/configurators/Color';
import { FontFamilyConfigurator } from '#shared/ui/configurators/FontFamily';
import { FontWeightConfigurator } from '#shared/ui/configurators/FontWeight/ui';
import { ScreenTranslateConfigurationTextAlign } from '#shared/ui/configurators/TextAlign';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { ExpandableContent } from '#shared/ui/expand/ExpandableContent';
import { useCallback } from 'react';
import { cmBroadcastSubConfigNext } from '../const/defaults';
import { useCmBroadcastUpdateCurrentConfig } from '../hooks/update-config';
import {
  CmBroadcastScreenConfig,
  CmBroadcastScreenConfigSubConfigs,
  CmBroadcastTextScreenConfig,
} from '../model/model';
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
    <ExpandableContent title="Настроить">
      <div className="ml-2">
        <ScreenTranslateConfigurationNameChanger />

        <Dropdown
          id={currentConfig.pushKind}
          label="Разбивка строк"
          undTitle="так как есть"
          items={[
            { id: '1', title: 'фрагменты' },
            { id: '2', title: 'минимальный' },
          ]}
          onSelectId={pushKind => updateConfig({ pushKind })}
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
        <ExpandableContent title="Блоки">
          <CmBroadcastSubBlockConfigurator
            blockTitle="Конфиг следующего блока"
            subKey="next"
            plusButtonPostfix="Вставить окно следующего блока"
            deleteButtonPostfix="Убрать текст следующего блока"
            putSubConfigUpdate={putSubConfigUpdate}
            currentConfig={currentConfig}
            defaultConfig={cmBroadcastSubConfigNext}
          />

          <CmBroadcastSubBlockConfigurator
            blockTitle="Конфиг аккордного блока"
            subKey="chorded"
            plusButtonPostfix="Добавить конфиг аккордного блока"
            deleteButtonPostfix="Убрать конфиг аккордного блока"
            putSubConfigUpdate={putSubConfigUpdate}
            currentConfig={currentConfig}
            defaultConfig={defaultScreenBroadcastTextConfig}
          />
        </ExpandableContent>
      </div>
    </ExpandableContent>
  );
};
