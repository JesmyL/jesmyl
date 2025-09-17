import { Dropdown } from '../../dropdown/Dropdown';
import { DropdownItem } from '../../dropdown/Dropdown.model';
import { ConfiguratorEditProps } from '../model';
import { FontStyleType } from './model';

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
    <div className="flex gap-2 flex-max my-2">
      Стиль текста
      <Dropdown
        id={config.fontStyle}
        items={items}
        onSelectId={fontStyle => updateConfig({ fontStyle })}
      />
    </div>
  );
};
