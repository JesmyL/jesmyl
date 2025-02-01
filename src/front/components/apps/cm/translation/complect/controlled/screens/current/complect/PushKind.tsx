import { ConfiguratorEditProps } from 'front/complect/configurators/model';
import Dropdown from '../../../../../../../../../complect/dropdown/Dropdown';
import { translationPushKinds } from '../../../../../../col/com/Com.complect';

type Props = ConfiguratorEditProps<{ pushKind?: number }>;

const ExtractTitels = ({ title }: { title: string }, id: number) => ({ title, id });

export const CmScreenTranslateConfigurationPushKind = ({ config, updateConfig }: Props) => {
  return (
    <>
      <div className="flex flex-gap">
        Строчки
        <Dropdown
          id={config.pushKind}
          items={translationPushKinds.map(ExtractTitels)}
          onSelectId={pushKind => updateConfig({ pushKind })}
        />
      </div>
    </>
  );
};
