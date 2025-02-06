import { useEffect, useState } from 'react';
import { ConfiguratorEditProps } from './model';

type Props = ConfiguratorEditProps<{ opacity?: number }>;

export const OpacityConfigurator = ({ config, updateConfig }: Props) => {
  const [opacity, setValue] = useState(config.opacity ?? 1);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => updateConfig({ opacity }), [opacity]);

  return (
    <>
      <div className="flex flex-gap flex-max">
        Прозрачность
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
