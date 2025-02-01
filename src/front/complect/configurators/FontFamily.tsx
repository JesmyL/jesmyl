import { ConfiguratorEditProps } from './model';
import { FontFamilySelector } from './selectors/FontFamilySelector';

type Props = ConfiguratorEditProps<{ fontFamily?: string }>;

export const FontFamilyConfigurator = ({ config, updateConfig }: Props) => {
  return (
    <div className="flex flex-gap margin-gap-v">
      Шрифт
      <FontFamilySelector
        fontFamily={config.fontFamily}
        onSelect={fontFamily => updateConfig({ fontFamily })}
      />
    </div>
  );
};
