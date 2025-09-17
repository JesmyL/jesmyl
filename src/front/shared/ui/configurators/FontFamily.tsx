import { ConfiguratorEditProps } from './model';
import { FontFamilySelector } from './selectors/FontFamilySelector';

type Props = ConfiguratorEditProps<{ fontFamily?: string }>;

export const FontFamilyConfigurator = ({ config, updateConfig }: Props) => {
  return (
    <div className="flex gap-2 my-2">
      Шрифт
      <FontFamilySelector
        fontFamily={config.fontFamily}
        onSelect={fontFamily => updateConfig({ fontFamily })}
      />
    </div>
  );
};
