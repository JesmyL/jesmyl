import { translateBase } from '#basis/locale';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { IconCheckbox } from '../the-icon/IconCheckbox';
import { ConfiguratorEditProps } from './model';

export type ScreenTranslateConfigTypeDisplay = 'none' | 'initial';

type Props = ConfiguratorEditProps<{ display?: ScreenTranslateConfigTypeDisplay }>;

export const DisplayConfigurator = ({ config, updateConfig }: Props) => {
  return (
    <>
      <div className="flex gap-2 flex-max">
        {translateBase(BaseLocaleKey.ConfigVisibility)}
        <IconCheckbox
          checked={config.display !== 'none'}
          onChange={() => updateConfig({ display: config.display === 'initial' ? 'none' : 'initial' })}
        />
      </div>
    </>
  );
};
