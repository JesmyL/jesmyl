import { propagationStopper } from '#shared/lib/event-funcs';
import { useScreenTranslationCurrentConfig, useScreenTranslationCurrentConfigi } from '../hooks/configs';
import { useScreenTranslationWindows } from '../hooks/windows';
import { useUpdateScreenTranslationConfig } from '../hooks/with-config';

export const ScreenTranslateConfigurationNameChanger = () => {
  const config = useScreenTranslationCurrentConfig();
  const updateConfig = useUpdateScreenTranslationConfig();
  const currentConfigi = useScreenTranslationCurrentConfigi();
  const windows = useScreenTranslationWindows();

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
