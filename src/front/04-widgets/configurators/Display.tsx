import IconCheckbox from '#shared/ui/the-icon/IconCheckbox';
import { ConfiguratorEditProps } from './model';

export type ScreenTranslateConfigTypeDisplay = 'none' | 'initial';

type Props = ConfiguratorEditProps<{ display?: ScreenTranslateConfigTypeDisplay }>;

export const DisplayConfigurator = ({ config, updateConfig }: Props) => {
  return (
    <>
      <div className="flex flex-gap flex-max">
        Видимость
        <IconCheckbox
          checked={config.display !== 'none'}
          onChange={() => updateConfig({ display: config.display === 'initial' ? 'none' : 'initial' })}
        />
      </div>
    </>
  );
};
