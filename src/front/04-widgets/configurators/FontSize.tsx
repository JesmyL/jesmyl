import { propagationStopper } from '../../07-shared/lib/events-and-callbacks';
import { ConfiguratorEditProps } from './model';

type Props = ConfiguratorEditProps<{ fontSize?: number }>;

export const FontSizeConfigurator = ({ config, updateConfig }: Props) => {
  return (
    <div className="flex flex-gap margin-gap-v">
      Размер шрифта
      <input
        className="bgcolor--3 color--1"
        value={config.fontSize}
        type="number"
        onChange={event => updateConfig({ ...config, fontSize: +event.currentTarget?.value || 10 })}
        onKeyDown={propagationStopper}
      />
    </div>
  );
};
