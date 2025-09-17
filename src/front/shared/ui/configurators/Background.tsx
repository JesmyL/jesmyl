import { IconCheckbox } from '../the-icon/IconCheckbox';
import { BackgroundConfigProps, ConfiguratorEditProps } from './model';
import { BackgroundSelector } from './selectors/BackgroundSelector';

type Props = ConfiguratorEditProps<BackgroundConfigProps>;

export const BackgroundConfigurator = ({ config, updateConfig, title = 'Фон' }: Props) => {
  return (
    <>
      <div className="flex gap-2 my-2">
        {title}
        <IconCheckbox
          checked={config.isWithBackground}
          onChange={() => updateConfig({ isWithBackground: !config.isWithBackground })}
        />
        <BackgroundSelector
          background={config.backgroundInteractive}
          onSelect={backgroundInteractive => updateConfig({ backgroundInteractive })}
        />
        <input
          className="bg-x3 text-x1"
          value={config.background}
          onChange={event => updateConfig({ background: event.target.value })}
        />
        <input
          type="color"
          value={config.backgroundColor}
          onChange={event => updateConfig({ backgroundColor: event.target.value })}
        />
      </div>
    </>
  );
};
