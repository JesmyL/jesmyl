import { CmTranslationConfigsRef } from '../../../hooks/configs';
import { TrnslationScreenConfig } from '../../../model';

export const CmTranslateCurrentScreenConfigurationName = ({
  configsStateRef,
  currentConfig,
}: {
  configsStateRef: CmTranslationConfigsRef;
  currentConfig: TrnslationScreenConfig;
}) => {
  const { currentConfigi, updateConfig, windows } = configsStateRef.current;

  return (
    <>
      <input
        value={currentConfig.title}
        className="bgcolor--2"
        onChange={event => {
          const title = event.target.value;
          updateConfig({ title });
          if (windows[currentConfigi] == null) return;
          windows[currentConfigi]!.document.title = title;
        }}
      />
    </>
  );
};