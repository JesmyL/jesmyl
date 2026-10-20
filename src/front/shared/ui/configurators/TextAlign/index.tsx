import { translateBase } from '#basis/locale';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { DropdownItem } from '#shared/ui/dropdown/Dropdown.model';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { ConfiguratorEditProps } from '../model';
import { TextAlignConfigurator } from './model';

const makeItems = (): DropdownItem<TextAlignConfigurator>[] => [
  {
    id: TextAlignConfigurator.Left,
    title: translateBase(BaseLocaleKey.ConfigLeft),
  },
  {
    id: TextAlignConfigurator.Center,
    title: translateBase(BaseLocaleKey.ConfigCenter),
  },
  {
    id: TextAlignConfigurator.Right,
    title: translateBase(BaseLocaleKey.ConfigRight),
  },
  {
    id: TextAlignConfigurator.Justify,
    title: translateBase(BaseLocaleKey.ConfigJustify),
  },
];

type Props = ConfiguratorEditProps<{ textAlign: TextAlignConfigurator }>;

export const ScreenTranslateConfigurationTextAlign = ({ config, updateConfig }: Props) => {
  return (
    <>
      <div className="flex gap-2 flex-max">
        {translateBase(BaseLocaleKey.ConfigAlign)}
        <Dropdown
          id={config.textAlign}
          items={makeItems()}
          onSelectId={textAlign => updateConfig({ textAlign })}
        />
      </div>
    </>
  );
};
