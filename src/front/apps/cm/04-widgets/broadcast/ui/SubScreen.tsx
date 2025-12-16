import { ScreenBroadcastPositionConfig } from '#features/broadcast/complect/model';
import { ScreenTranslateCurrentPositionConfigurators } from '#features/broadcast/complect/position/Position';
import { useApplyScreenFontFamilyEffect } from '#features/broadcast/hooks/set-font-family';
import { FontSizeContain } from '#shared/ui/font-size-contain/FontSizeContain';
import { FontSizeContainProps } from '#shared/ui/font-size-contain/FontSizeContain.model';
import { useCallback } from 'react';
import { cmBroadcastSubConfigNext } from '../const/defaults';
import { useCmBroadcastUpdateCurrentConfig } from '../hooks/update-config';
import { useCmBroadcastScreenStyle } from '../lib/get-style';
import { CmBroadcastScreenConfig, CmBroadcastTextScreenConfig } from '../model/model';

interface Props {
  config: CmBroadcastTextScreenConfig;
  win?: Window;
  text: string;
  subUpdates: string | number | und;
  isTech: boolean | und;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  parentConfig: CmBroadcastScreenConfig;
  isVisible: boolean;
  isChordedBlockText?: boolean;
}

export const CmBroadcastSubScreen = ({
  config,
  win,
  text,
  subUpdates,
  isTech,
  parentConfig,
  wrapperRef,
  isVisible,
  isChordedBlockText,
}: Props & Partial<FontSizeContainProps>) => {
  const style = useCmBroadcastScreenStyle(isVisible, config);
  const updateConfig = useCmBroadcastUpdateCurrentConfig();

  const updateSubConfig = useCallback(
    (config: Partial<ScreenBroadcastPositionConfig>) => {
      updateConfig({
        ...parentConfig,
        subs: { ...parentConfig.subs, next: { ...cmBroadcastSubConfigNext, ...parentConfig.subs?.next, ...config } },
      });
    },
    [parentConfig, updateConfig],
  );

  useApplyScreenFontFamilyEffect(config?.fontFamily, win);

  return (
    <>
      <FontSizeContain
        className="inline-flex white-pre-children"
        style={isChordedBlockText ? { ...style, opacity: Math.min(+(style.opacity || 1) || 1, 0.3) } : style}
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
