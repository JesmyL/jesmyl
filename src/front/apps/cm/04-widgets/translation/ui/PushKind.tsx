import { ConfiguratorEditProps } from '#shared/ui/configurators/model';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { cmComTranslationPushKinds } from '$cm/entities/com';

type Props = ConfiguratorEditProps<{ pushKind?: number }>;

const ExtractTitels = ({ title }: { title: string }, id: number) => ({ title, id });

export const CmTranslationScreenConfigurationPushKind = ({ config, updateConfig }: Props) => {
  return (
    <>
      <div className="flex gap-2">
        Строчки
        <Dropdown
          id={config.pushKind}
          items={cmComTranslationPushKinds.map(ExtractTitels)}
          onSelectId={pushKind => updateConfig({ pushKind })}
        />
      </div>
    </>
  );
};
