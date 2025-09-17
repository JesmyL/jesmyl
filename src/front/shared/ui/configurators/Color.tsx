import { ConfiguratorEditProps } from './model';

type Props = ConfiguratorEditProps<{ color: string }>;

export const ColorConfigurator = ({ config, updateConfig, title = 'Цвет шрифта' }: Props) => {
  return (
    <div className="flex gap-2 flex-max my-2">
      {title}
      <input
        type="color"
        value={config.color}
        onChange={event => updateConfig({ color: event.target.value })}
      />
    </div>
  );
};
