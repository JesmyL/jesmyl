import { Dropdown } from '../../dropdown/Dropdown';
import { DropdownItem } from '../../dropdown/Dropdown.model';
import { ConfiguratorEditProps } from '../model';
import { TextAlignConfigurator } from './model';

const items: DropdownItem<TextAlignConfigurator>[] = [
  {
    id: TextAlignConfigurator.Left,
    title: 'Лево',
  },
  {
    id: TextAlignConfigurator.Center,
    title: 'Центр',
  },
  {
    id: TextAlignConfigurator.Right,
    title: 'Право',
  },
  {
    id: TextAlignConfigurator.Justify,
    title: 'Ширина',
  },
];

type Props = ConfiguratorEditProps<{ textAlign: TextAlignConfigurator }>;

export const ScreenTranslateConfigurationTextAlign = ({ config, updateConfig }: Props) => {
  return (
    <>
      <div className="flex gap-2 flex-max">
        Выравнивание
        <Dropdown
          id={config.textAlign}
          items={items}
          onSelectId={textAlign => updateConfig({ textAlign })}
        />
      </div>
    </>
  );
};
