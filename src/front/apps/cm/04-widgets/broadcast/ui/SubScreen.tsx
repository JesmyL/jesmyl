import { ScreenBroadcastPositionConfig } from '#features/broadcast/complect/model';
import { ScreenTranslateCurrentPositionConfigurators } from '#features/broadcast/complect/position/Position';
import { FontSizeContain } from '#shared/ui/font-size-contain/FontSizeContain';
import { FontSizeContainProps } from '#shared/ui/font-size-contain/FontSizeContain.model';
import { useCallback } from 'react';
import { CmBroadcastScreenConfig, CmBroadcastTextScreenConfig } from 'shared/model/cm/broadcast';
import { useApplyScreenFontFamilyEffect } from 'x/my-files';
import { cmBroadcastSubConfigNext } from '../const/defaults';
import { useCmBroadcastUpdateCurrentConfig } from '../hooks/update-config';
import { useCmBroadcastScreenStyle } from '../lib/get-style';

interface Props {
  config: CmBroadcastTextScreenConfig;
  win?: Window;
  text: string;
  subUpdates: string | number | und;
  isTech: boolean | und;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  parentConfig: CmBroadcastScreenConfig;
  isVisible: boolean;
  isTechnicalText?: boolean;
}

export const CmBroadcastSubScreen = (props: Props & Partial<FontSizeContainProps>) => {
  const style = useCmBroadcastScreenStyle(props.isVisible, props.config);
  const updateConfig = useCmBroadcastUpdateCurrentConfig();

  const updateSubConfig = useCallback(
    (config: Partial<ScreenBroadcastPositionConfig>) => {
      updateConfig({
        ...props.parentConfig,
        subs: {
          ...props.parentConfig.subs,
          next: { ...cmBroadcastSubConfigNext, ...props.parentConfig.subs?.next, ...config },
        },
      });
    },
    [props.parentConfig, updateConfig],
  );

  useApplyScreenFontFamilyEffect(props.config?.fontFileId, props.win);

  return (
    <>
      <FontSizeContain
        className="inline-flex white-pre-children"
        style={props.isTechnicalText ? { ...style, opacity: Math.min(+(style.opacity || 1) || 1, 0.3) } : style}
        html={props.text}
        subUpdates={'' + props.subUpdates + props.config.width + props.config.height}
      />
      {props.isTech && props.config && (
        <ScreenTranslateCurrentPositionConfigurators
          config={props.config}
          updateConfig={updateSubConfig}
          wrapperRef={props.wrapperRef}
        />
      )}
    </>
  );
};
