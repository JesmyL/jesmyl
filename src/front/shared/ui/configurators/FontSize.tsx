import { propagationStopper } from '#shared/lib/event-funcs';
import { ConfiguratorEditProps } from './model';

type Props = ConfiguratorEditProps<{ fontSize?: number }>;

export const FontSizeConfigurator = ({ config, updateConfig }: Props) => {
  return (
    <div className="flex gap-2 my-2">
      Размер шрифта
      <input
        className="bg-x3 text-x1"
        value={config.fontSize}
        type="number"
        onChange={event => updateConfig({ ...config, fontSize: +event.currentTarget?.value || 10 })}
        onKeyDown={propagationStopper}
      />
    </div>
  );
};
