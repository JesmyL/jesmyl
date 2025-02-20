import { propagationStopper } from '#shared/lib/event-stubs';
import { useScreenTranslationCurrentConfig, useScreenTranslationCurrentConfigi } from '../lib/hooks/configs';
import { useScreenTranslationWindows } from '../lib/hooks/windows';
import { useUpdateScreenTranslationConfig } from '../lib/hooks/with-config';

export const ScreenTranslateConfigurationNameChanger = () => {
  const config = useScreenTranslationCurrentConfig();
  const updateConfig = useUpdateScreenTranslationConfig();
  const currentConfigi = useScreenTranslationCurrentConfigi();
  const windows = useScreenTranslationWindows();

  if (config == null) return null;

  return (
    <div className="flex flex-gap">
      Название
      <input
        value={config.title}
        className="bgcolor--2"
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
