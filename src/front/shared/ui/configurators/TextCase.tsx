import { MyLib } from '#shared/lib/my-lib';
import { defaultTextCase, textCaseTitles } from 'shared/const/textCase';
import { TextCase } from 'shared/model/common';
import { Dropdown } from '../dropdown/Dropdown';
import { ConfiguratorEditProps } from './model';

type Props = ConfiguratorEditProps<{ case?: TextCase }>;

export const TextCaseConfigurator = ({ config, updateConfig, title = 'Высота букв' }: Props) => (
  <div className="flex gap-2 flex-max my-2">
    {title}
    <Dropdown
      id={config.case ?? defaultTextCase}
      items={MyLib.entries(textCaseTitles).map(([caseStr, title]) => ({ id: +caseStr, title }))}
      onSelectId={textCase => updateConfig({ case: textCase })}
    />
  </div>
);
