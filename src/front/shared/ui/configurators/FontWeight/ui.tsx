import { translateBase } from '#basis/locale';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { DropdownItem } from '#shared/ui/dropdown/Dropdown.model';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { ConfiguratorEditProps } from '../model';
import { FontWeightType } from './model';

const makeItems = (): DropdownItem<FontWeightType>[] => [
  {
    id: FontWeightType.Normal,
    title: translateBase(BaseLocaleKey.ConfigNormal),
  },
  {
    id: FontWeightType.Bold,
    title: translateBase(BaseLocaleKey.ConfigBold),
  },
  {
    id: FontWeightType.Thin,
    title: translateBase(BaseLocaleKey.ConfigThin),
  },
];

type Props = ConfiguratorEditProps<{ fontWeight?: FontWeightType }>;

export const FontWeightConfigurator = ({ config, updateConfig }: Props) => {
  return (
    <div className="flex gap-2 flex-max">
      {translateBase(BaseLocaleKey.Type)}
      <Dropdown
        id={config.fontWeight}
        items={makeItems()}
        onSelectId={fontWeight => updateConfig({ fontWeight })}
      />
    </div>
  );
};
