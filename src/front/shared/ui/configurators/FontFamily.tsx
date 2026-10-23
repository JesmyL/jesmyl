import { translateBase } from '#basis/locale';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { MyFileId, MyFilesFontFamilySelector } from 'x/my-files';
import { ConfiguratorEditProps } from './model';

type Props = ConfiguratorEditProps<{ fontFileId?: MyFileId }>;

export const FontFamilyConfigurator = ({ config, updateConfig }: Props) => {
  return (
    <div className="flex gap-2 my-2">
      {translateBase(BaseLocaleKey.Font)}
      <MyFilesFontFamilySelector
        fileId={config.fontFileId}
        onSelect={fontFileId => updateConfig({ fontFileId })}
      />
    </div>
  );
};
