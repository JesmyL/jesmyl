import { translateBase } from '#basis/locale';
import { defaultTextCase, textCaseTitles } from 'shared/const/textCase';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { TextCase } from 'shared/model/common';
import { mapObjectEntries } from 'shared/utils/object.utils';
import { Dropdown } from '../dropdown/Dropdown';
import { ConfiguratorEditProps } from './model';

type Props = ConfiguratorEditProps<{ case?: TextCase }>;

export const TextCaseConfigurator = ({ config, updateConfig, title }: Props) => (
  <div className="flex gap-2 flex-max my-2">
    {title ?? translateBase(BaseLocaleKey.ConfigLetterHeight)}
    <Dropdown
      id={config.case ?? defaultTextCase}
      items={mapObjectEntries(textCaseTitles, (caseStr, title) => ({
        id: +caseStr,
        title: translateBase(it => it[title]),
      }))}
      onSelectId={textCase => updateConfig({ case: textCase })}
    />
  </div>
);
