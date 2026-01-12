import { ScreenBroadcastTextConfig } from '#features/broadcast/complect/model';
import { ColorConfigurator } from '#shared/ui/configurators/Color';
import { FontFamilyConfigurator } from '#shared/ui/configurators/FontFamily';
import { FontWeightConfigurator } from '#shared/ui/configurators/FontWeight';
import { ScreenTranslateConfigurationTextAlign } from '#shared/ui/configurators/TextAlign';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import {
  CmBroadcastScreenConfig,
  CmBroadcastScreenConfigSubConfigs,
  CmBroadcastTextScreenConfig,
} from '../model/model';

type Props = {
  currentConfig: CmBroadcastScreenConfig;
  subKey: keyof CmBroadcastScreenConfigSubConfigs;
  defaultConfig: ScreenBroadcastTextConfig;
  plusButtonPostfix: React.ReactNode;
  deleteButtonPostfix: React.ReactNode;
  blockTitle: React.ReactNode;

  putSubConfigUpdate: (
    field: keyof CmBroadcastScreenConfigSubConfigs,
    defaultConfig: ScreenBroadcastTextConfig | nil,
    config: Partial<CmBroadcastTextScreenConfig> | null,
  ) => void;
};

export const CmBroadcastSubBlockConfigurator = ({
  putSubConfigUpdate,
  currentConfig,
  defaultConfig,
  subKey,
  deleteButtonPostfix,
  plusButtonPostfix,
  blockTitle,
}: Props) => {
  const update = (config: Partial<CmBroadcastTextScreenConfig> | null) =>
    putSubConfigUpdate(subKey, defaultConfig, config);

  if (!currentConfig.subs?.[subKey])
    return (
      <div>
        <TheIconButton
          icon="PlusSign"
          className="my-5"
          postfix={plusButtonPostfix}
          onClick={() => putSubConfigUpdate(subKey, defaultConfig, defaultConfig)}
        />
      </div>
    );

  return (
    <div className="ml-2 border p-3 border-[2px]">
      <div className="italic mb-5">{blockTitle}</div>
      <TheIconButton
        icon="Cancel01"
        className="text-xKO"
        postfix={deleteButtonPostfix}
        confirm={deleteButtonPostfix}
        onClick={() => putSubConfigUpdate(subKey, null, null)}
      />
      <ColorConfigurator
        config={currentConfig.subs[subKey]}
        updateConfig={update}
      />
      <FontWeightConfigurator
        config={currentConfig.subs[subKey]}
        updateConfig={update}
      />
      <ScreenTranslateConfigurationTextAlign
        config={currentConfig.subs[subKey]}
        updateConfig={update}
      />
      <FontFamilyConfigurator
        config={currentConfig.subs[subKey]}
        updateConfig={update}
      />
    </div>
  );
};
