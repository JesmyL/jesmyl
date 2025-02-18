import { useRef } from 'react';
import { ScreenTranslateCurrentPositionConfigurators } from '../../../../../+complect/translations/complect/position/Position';
import { useSetScreenTranslationInteractiveBackground } from '../../../../../+complect/translations/hooks/interactive-back';
import { useApplyScreenFontFamilyEffect } from '../../../../../+complect/translations/hooks/set-font-family';
import { TranslationScreenProps } from '../../../../../../../07-basis/model/Translations.model';
import FontSizeContain from '../../../../base/font-size-contain/FontSizeContain';
import { FontSizeContainProps } from '../../../../base/font-size-contain/FontSizeContain.model';
import { CmTranslationScreenConfig } from '../model';
import { CmTranslationSubScreen } from './CmTranslationSubScreen';
import { useGetCmScreenTranslationStyle } from './hooks/get-style';
import { useGetCmScreenTranslationWrapperStyle } from './hooks/get-wrapper-style';

type Props = TranslationScreenProps &
  Partial<FontSizeContainProps> & {
    cmConfig: CmTranslationScreenConfig | und;
    text: string;
    nextText: string;
    isVisible: boolean;
  };

export const CmTranslationScreen = (props: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const style = useGetCmScreenTranslationStyle(props.isVisible, props.cmConfig);
  const wrapperStyle = useGetCmScreenTranslationWrapperStyle(props.cmConfig);
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
      className="relative full-size bgcolor-black"
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
