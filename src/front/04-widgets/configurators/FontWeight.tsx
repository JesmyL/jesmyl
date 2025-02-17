import Dropdown from '#shared/ui/dropdown/Dropdown';
import { DropdownItem } from '#shared/ui/dropdown/Dropdown.model';
import { ConfiguratorEditProps } from './model';

export enum FontWeightType {
  Normal = 'normal',
  Bold = 'bold',
  Thin = 'lighter',
}

let items: DropdownItem<FontWeightType>[] = [
  {
    id: FontWeightType.Normal,
    title: 'Нормальный',
  },
  {
    id: FontWeightType.Bold,
    title: 'Жирный',
  },
  {
    id: FontWeightType.Thin,
    title: 'Тонкий',
  },
];

type Props = ConfiguratorEditProps<{ fontWeight?: FontWeightType }>;

export const FontWeightConfigurator = ({ config, updateConfig }: Props) => {
  return (
    <div className="flex flex-gap flex-max">
      Тип
      <Dropdown
        id={config.fontWeight}
        items={items}
        onSelectId={fontWeight => updateConfig({ fontWeight })}
      />
    </div>
  );
};
