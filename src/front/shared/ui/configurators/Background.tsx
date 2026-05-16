import { MyFileBackgroundSelector } from 'x/my-files';
import { IconCheckbox } from '../the-icon/IconCheckbox';
import { BackgroundConfigProps, ConfiguratorEditProps } from './model';

type Props = ConfiguratorEditProps<BackgroundConfigProps>;

export const BackgroundConfigurator = ({ config, updateConfig, title = 'Фон' }: Props) => {
  return (
    <>
      <div className="flex gap-2 my-2">
        {title}
        <IconCheckbox
          checked={config.withBg}
          onChange={() => updateConfig({ withBg: !config.withBg })}
        />
        <MyFileBackgroundSelector
          bgFileId={config.bgFileId}
          onSelect={bgFileId => updateConfig({ bgFileId })}
        />
        <input
          className="bg-x3 text-x1"
          value={config.bg}
          onChange={event => updateConfig({ bg: event.target.value })}
        />
        <input
          type="color"
          value={config.bgColor}
          onChange={event => updateConfig({ bgColor: event.target.value })}
        />
      </div>
    </>
  );
};
