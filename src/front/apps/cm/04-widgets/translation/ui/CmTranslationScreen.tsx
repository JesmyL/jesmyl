import { ScreenTranslateCurrentPositionConfigurators } from '#features/broadcast/complect/position/Position';
import { useSetScreenTranslationInteractiveBackground } from '#features/broadcast/hooks/interactive-back';
import { useApplyScreenFontFamilyEffect } from '#features/broadcast/hooks/set-font-family';
import { TranslationScreenProps } from '#features/broadcast/Translations.model';
import { FontSizeContain } from '#shared/ui/font-size-contain/FontSizeContain';
import { FontSizeContainProps } from '#shared/ui/font-size-contain/FontSizeContain.model';
import { useRef } from 'react';
import { useCmTranslationScreenStyle } from '../lib/get-style';
import { useCmTranslationScreenWrapperStyle } from '../lib/get-wrapper-style';
import { CmTranslationScreenConfig } from '../model/model';
import { CmTranslationSubScreen } from './CmTranslationSubScreen';

type Props = TranslationScreenProps &
  Partial<FontSizeContainProps> & {
    cmConfig: CmTranslationScreenConfig | und;
    text: string;
    nextText: string;
    isVisible: boolean;
  };

export const CmTranslationScreen = (props: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const style = useCmTranslationScreenStyle(props.isVisible, props.cmConfig);
  const wrapperStyle = useCmTranslationScreenWrapperStyle(props.cmConfig);
  const background = useSetScreenTranslationInteractiveBackground(
    props.cmConfig?.isWithBackground ? props.cmConfig.backgroundInteractive : undefined,
  );

  useApplyScreenFontFamilyEffect(props.cmConfig?.fontFamily, props.win);
  let subScreens = null;

  if (props.cmConfig?.subs?.next !== undefined) {
    const config = props.cmConfig.subs.next;

    subScreens = (
      <CmTranslationSubScreen
        config={config}
        win={props.win}
        subUpdates={props.subUpdates}
        text={props.nextText}
        wrapperRef={wrapperRef}
        isTech={props.isTech}
        parentConfig={props.cmConfig}
        isVisible={props.isVisible}
      />
    );
  }

  return (
    <div
      className="relative full-size bg-black"
      style={wrapperStyle}
      ref={wrapperRef}
    >
      {background}
      {props.isTech && props.cmConfig && (
        <ScreenTranslateCurrentPositionConfigurators
          config={props.cmConfig}
          wrapperRef={wrapperRef}
        />
      )}
      {subScreens}
      <FontSizeContain
        className="inline-flex white-pre-children"
        style={style}
        html={props.text}
        subUpdates={
          '' + props.subUpdates + (props.cmConfig === undefined ? '' : props.cmConfig.width + props.cmConfig.height)
        }
      />
    </div>
  );
};
