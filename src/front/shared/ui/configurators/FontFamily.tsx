import { MyFileBoxId, MyFilesFontFamilySelector } from 'x/my-files';
import { ConfiguratorEditProps } from './model';

type Props = ConfiguratorEditProps<{ fontFileId?: MyFileBoxId }>;

export const FontFamilyConfigurator = ({ config, updateConfig }: Props) => {
  return (
    <div className="flex gap-2 my-2">
      Шрифт
      <MyFilesFontFamilySelector
        fileId={config.fontFileId}
        onSelect={fontFileId => updateConfig({ fontFileId })}
      />
    </div>
  );
};
