import { ScreenTranslationPositionConfig } from '#features/broadcast/complect/model';
import { ScreenTranslateCurrentPositionConfigurators } from '#features/broadcast/complect/position/Position';
import { useApplyScreenFontFamilyEffect } from '#features/broadcast/hooks/set-font-family';
import { FontSizeContain } from '#shared/ui/font-size-contain/FontSizeContain';
import { FontSizeContainProps } from '#shared/ui/font-size-contain/FontSizeContain.model';
import { useCallback } from 'react';
import { cmTranslationSubConfigNext } from '../const/defaults';
import { useCmTranslationUpdateCurrentConfig } from '../hooks/update-config';
import { useCmTranslationScreenStyle } from '../lib/get-style';
import { CmTranslationScreenConfig, CmTranslationTextScreenConfig } from '../model/model';

interface Props {
  config: CmTranslationTextScreenConfig;
  win?: Window;
  text: string;
  subUpdates: string | number | und;
  isTech: boolean | und;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  parentConfig: CmTranslationScreenConfig;
  isVisible: boolean;
}

export const CmTranslationSubScreen = ({
  config,
  win,
  text,
  subUpdates,
  isTech,
  parentConfig,
  wrapperRef,
  isVisible,
}: Props & Partial<FontSizeContainProps>) => {
  const style = useCmTranslationScreenStyle(isVisible, config);
  const updateConfig = useCmTranslationUpdateCurrentConfig();

  const updateSubConfig = useCallback(
    (config: Partial<ScreenTranslationPositionConfig>) => {
      updateConfig({
        ...parentConfig,
        subs: { ...parentConfig.subs, next: { ...cmTranslationSubConfigNext, ...parentConfig.subs?.next, ...config } },
      });
    },
    [parentConfig, updateConfig],
  );

  useApplyScreenFontFamilyEffect(config?.fontFamily, win);

  return (
    <>
      <FontSizeContain
        className="inline-flex white-pre-children"
        style={style}
        html={text}
        subUpdates={'' + subUpdates + config.width + config.height}
      />
      {isTech && config && (
        <ScreenTranslateCurrentPositionConfigurators
          config={config}
          updateConfig={updateSubConfig}
          wrapperRef={wrapperRef}
        />
      )}
    </>
  );
};
