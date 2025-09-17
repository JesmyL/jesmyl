import { ConfiguratorEditProps } from '#shared/ui/configurators/model';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { translationPushKinds } from '$cm/col/com/translationPushKinds';

type Props = ConfiguratorEditProps<{ pushKind?: number }>;

const ExtractTitels = ({ title }: { title: string }, id: number) => ({ title, id });

export const CmScreenTranslateConfigurationPushKind = ({ config, updateConfig }: Props) => {
  return (
    <>
      <div className="flex gap-2">
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
