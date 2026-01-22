import { propagationStopper } from '#shared/lib/event-funcs';
import { TextInput } from '#shared/ui/TextInput';
import { useAtomValue } from 'atomaric';
import { currentBroadcastConfigiAtom } from '../atoms';
import { useScreenBroadcastCurrentConfig } from '../hooks/configs';
import { useScreenBroadcastWindows } from '../hooks/windows';
import { useUpdateScreenBroadcastConfig } from '../hooks/with-config';

export const ScreenTranslateConfigurationNameChanger = () => {
  const config = useScreenBroadcastCurrentConfig();
  const updateConfig = useUpdateScreenBroadcastConfig();
  const currentConfigi = useAtomValue(currentBroadcastConfigiAtom);
  const windows = useScreenBroadcastWindows();

  if (config == null) return null;

  return (
    <div className="flex gap-2">
      Название
      <TextInput
        defaultValue={config.title}
        className="bg-x2 mb-3"
        onKeyDown={propagationStopper}
        onChanged={title => {
          updateConfig(currentConfigi, { title });
          const win = windows[currentConfigi];
          if (win == null) return;

          if (win.win) win.win.document.title = title;
        }}
      />
    </div>
  );
};
