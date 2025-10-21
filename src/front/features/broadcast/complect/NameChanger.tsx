import { propagationStopper } from '#shared/lib/event-funcs';
import { useScreenBroadcastCurrentConfig, useScreenBroadcastCurrentConfigi } from '../hooks/configs';
import { useScreenBroadcastWindows } from '../hooks/windows';
import { useUpdateScreenBroadcastConfig } from '../hooks/with-config';

export const ScreenTranslateConfigurationNameChanger = () => {
  const config = useScreenBroadcastCurrentConfig();
  const updateConfig = useUpdateScreenBroadcastConfig();
  const currentConfigi = useScreenBroadcastCurrentConfigi();
  const windows = useScreenBroadcastWindows();

  if (config == null) return null;

  return (
    <div className="flex gap-2">
      Название
      <input
        value={config.title}
        className="bg-x2"
        onKeyDown={propagationStopper}
        onChange={event => {
          const title = event.target.value;
          updateConfig(currentConfigi, { title });
          const win = windows[currentConfigi];
          if (win == null) return;

          win.win.document.title = title;
        }}
      />
    </div>
  );
};
