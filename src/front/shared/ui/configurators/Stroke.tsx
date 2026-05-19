import { ConfiguratorEditProps } from './model';

type Props = ConfiguratorEditProps<{ stroke?: string; strokeW?: number }>;

export const StrokeConfigurator = ({ config, updateConfig, title = 'Контур' }: Props) => {
  return (
    <div className="flex gap-2 flex-max my-2">
      {title}
      <input
        type="color"
        value={config.stroke}
        onChange={event => updateConfig({ stroke: event.target.value })}
      />
      <input
        type="range"
        min={0}
        max={0.1}
        step={0.005}
        defaultValue={config.strokeW}
        onChange={event => updateConfig({ strokeW: event.target.valueAsNumber })}
      />
    </div>
  );
};
