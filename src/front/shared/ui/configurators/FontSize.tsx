import { translateBase } from '#basis/locale';
import { propagationStopper } from '#shared/lib/event-funcs';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { ConfiguratorEditProps } from './model';

type Props = ConfiguratorEditProps<{ fontSize?: number }>;

export const FontSizeConfigurator = ({ config, updateConfig }: Props) => {
  return (
    <div className="flex gap-2 my-2">
      {translateBase(BaseLocaleKey.FontSize)}
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
