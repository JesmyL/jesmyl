import IconCheckbox from 'front/08-shared/ui/the-icon/IconCheckbox';
import { BackgroundConfigProps, ConfiguratorEditProps } from './model';
import { BackgroundSelector } from './selectors/BackgroundSelector';

type Props = ConfiguratorEditProps<BackgroundConfigProps>;

export const BackgroundConfigurator = ({ config, updateConfig, title = 'Фон' }: Props) => {
  return (
    <>
      <div className="flex flex-gap margin-gap-v">
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
          className="bgcolor--3 color--1"
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
