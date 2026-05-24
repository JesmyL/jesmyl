import { MyLib } from '#shared/lib/my-lib';
import { TextCase } from 'shared/model/common';
import { Dropdown } from '../dropdown/Dropdown';
import { ConfiguratorEditProps } from './model';

type Props = ConfiguratorEditProps<{ case?: TextCase }>;

const titles: { [Id in TextCase]: { title: string; id: Id } } = {
  [TextCase.Capitalize]: { id: TextCase.Capitalize, title: 'Абвгд' },
  [TextCase.Lowercase]: { id: TextCase.Lowercase, title: 'абвгд' },
  [TextCase.Uppercase]: { id: TextCase.Uppercase, title: 'АБВГД' },
};

export const TextCaseConfigurator = ({ config, updateConfig, title = 'Высота букв' }: Props) => (
  <div className="flex gap-2 flex-max my-2">
    {title}
    <Dropdown
      id={config.case ?? TextCase.Capitalize}
      items={MyLib.values(titles)}
      onSelectId={textCase => updateConfig({ case: textCase })}
    />
  </div>
);
