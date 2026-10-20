import { translateBase } from '#basis/locale';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { DropdownItem } from '#shared/ui/dropdown/Dropdown.model';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { ConfiguratorEditProps } from '../model';
import { FontStyleType } from './model';

const makeItems = (): DropdownItem<FontStyleType>[] => [
  {
    id: FontStyleType.None,
    title: translateBase(BaseLocaleKey.StoragesUsual),
  },
  {
    id: FontStyleType.Italic,
    title: translateBase(BaseLocaleKey.ConfigItalic),
  },
];

type Props = ConfiguratorEditProps<{ fontStyle?: FontStyleType }>;

export const FontStyleConfigurator = ({ config, updateConfig }: Props) => {
  return (
    <div className="flex gap-2 flex-max my-2">
      {translateBase(BaseLocaleKey.ConfigTextStyle)}
      <Dropdown
        id={config.fontStyle}
        items={makeItems()}
        onSelectId={fontStyle => updateConfig({ fontStyle })}
      />
    </div>
  );
};
