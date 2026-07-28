import { translateBase } from '#basis/locale';
import { ConfiguratorEditProps } from '#shared/ui/configurators/model';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { cmComLineGroupingDefaultKinds } from 'shared/const/cm/comLineGroupingKind';

type Props = ConfiguratorEditProps<{ pushKind?: number }>;

export const CmBroadcastScreenConfigurationPushKind = ({ config, updateConfig }: Props) => {
  return (
    <>
      <div className="flex gap-2">
        {translateBase(it => it.cm.linnes)}
        <Dropdown
          id={config.pushKind}
          items={cmComLineGroupingDefaultKinds.map((title, id) => ({ title, id }))}
          onSelectId={pushKind => updateConfig({ pushKind })}
        />
      </div>
    </>
  );
};
