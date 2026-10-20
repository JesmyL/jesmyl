import { translateBase } from '#basis/locale';
import { useEffect, useState } from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { ConfiguratorEditProps } from './model';

type Props = ConfiguratorEditProps<{ opacity?: number }>;

export const OpacityConfigurator = ({ config, updateConfig }: Props) => {
  const [opacity, setValue] = useState(config.opacity ?? 1);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => updateConfig({ opacity }), [opacity]);

  return (
    <>
      <div className="flex gap-2 flex-max">
        {translateBase(BaseLocaleKey.ConfigOpacity)}
        <input
          type="range"
          value={opacity}
          max={1}
          min={0}
          step={0.01}
          onChange={event => setValue(+event.target.value)}
        />
      </div>
    </>
  );
};
