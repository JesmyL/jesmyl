import { ScreenTranslationPositionConfig } from '#features/translations/model/Position.model';
import { ScreenTranslateCurrentPositionConfigurators } from '#features/translations/ui/position/Position';
import { useApplyScreenFontFamilyEffect } from '#shared/ui/configurators/hooks/useApplyScreenFontFamilyEffect';
import { FontSizeContain } from 'front/components/apps/cm/base/font-size-contain/FontSizeContain';
import { useCallback } from 'react';
import { FontSizeContainProps } from '../../../../base/font-size-contain/FontSizeContain.model';
import { useUpdateCmCurrentTranslationConfig } from '../hooks/update-config';
import { CmTranslationScreenConfig, CmTranslationTextScreenConfig } from '../model';
import { cmTranslationSubConfigNext } from '../screens/defaults';
import { useGetCmScreenTranslationStyle } from './hooks/get-style';

interface Props {
  config: CmTranslationTextScreenConfig;
  win?: Window;
  text: string;
  subUpdates: string | number | und;
  isTech: boolean | und;
  wrapperRef: React.RefObject<HTMLDivElement>;
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
  const style = useGetCmScreenTranslationStyle(isVisible, config);
  const updateConfig = useUpdateCmCurrentTranslationConfig();

  const updateSubConfig = useCallback(
    (config: Partial<ScreenTranslationPositionConfig>) => {
      updateConfig({
        ...parentConfig,
        subs: {
          ...parentConfig.subs,
          next: {
            ...cmTranslationSubConfigNext,
            ...parentConfig.subs?.next,
            ...config,
          },
        },
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
