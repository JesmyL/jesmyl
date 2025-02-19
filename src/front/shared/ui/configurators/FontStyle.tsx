import { Dropdown } from '../dropdown/Dropdown';
import { DropdownItem } from '../dropdown/Dropdown.model';
import { ConfiguratorEditProps } from './model';

export enum FontStyleType {
  Italic = 'italic',
  None = 'none',
}

const items: DropdownItem<FontStyleType>[] = [
  {
    id: FontStyleType.None,
    title: 'Обычный',
  },
  {
    id: FontStyleType.Italic,
    title: 'Наклон',
  },
];

type Props = ConfiguratorEditProps<{ fontStyle?: FontStyleType }>;

export const FontStyleConfigurator = ({ config, updateConfig }: Props) => {
  return (
    <div className="flex flex-gap flex-max margin-gap-v">
      Стиль текста
      <Dropdown
        id={config.fontStyle}
        items={items}
        onSelectId={fontStyle => updateConfig({ fontStyle })}
      />
    </div>
  );
};
