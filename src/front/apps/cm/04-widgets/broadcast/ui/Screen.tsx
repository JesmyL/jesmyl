import { BroadcastScreenProps } from '#features/broadcast/Broadcast.model';
import { ScreenTranslateCurrentPositionConfigurators } from '#features/broadcast/complect/position/Position';
import { useSetBroadcastScreenInteractiveBackground } from '#features/broadcast/hooks/interactive-back';
import { useApplyScreenFontFamilyEffect } from '#features/broadcast/hooks/set-font-family';
import { FontSizeContain } from '#shared/ui/font-size-contain/FontSizeContain';
import { FontSizeContainProps } from '#shared/ui/font-size-contain/FontSizeContain.model';
import { useRef } from 'react';
import { useCmBroadcastScreenStyle } from '../lib/get-style';
import { useCmBroadcastScreenWrapperStyle } from '../lib/get-wrapper-style';
import { CmBroadcastScreenConfig } from '../model/model';
import { CmBroadcastSubScreen } from './SubScreen';

type Props = BroadcastScreenProps &
  Partial<FontSizeContainProps> & {
    cmConfig: CmBroadcastScreenConfig | und;
    text: string;
    nextText: string;
    isVisible: boolean;
    isChordedBlockText?: boolean;
    isChordedBlockNextText?: boolean;
  };

export const CmBroadcastScreen = (props: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const style = useCmBroadcastScreenStyle(props.isVisible, props.cmConfig);
  const wrapperStyle = useCmBroadcastScreenWrapperStyle(props.cmConfig);
  const background = useSetBroadcastScreenInteractiveBackground(
    props.cmConfig?.isWithBackground ? props.cmConfig.backgroundInteractive : undefined,
  );

  useApplyScreenFontFamilyEffect(props.cmConfig?.fontFamily, props.win);
  let subScreens = null;

  if (props.cmConfig?.subs?.next !== undefined) {
    const config = props.cmConfig.subs.next;

    subScreens = (
      <CmBroadcastSubScreen
        config={config}
        win={props.win}
        subUpdates={props.subUpdates}
        text={props.nextText}
        wrapperRef={wrapperRef}
        isTech={props.isTech}
        parentConfig={props.cmConfig}
        isVisible={props.isVisible}
        isChordedBlockText={props.isChordedBlockNextText}
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
        style={props.isChordedBlockText ? { ...style, opacity: Math.min(+(style.opacity ?? 1), 0.3) } : style}
        html={props.text}
        subUpdates={
          '' + props.subUpdates + (props.cmConfig === undefined ? '' : props.cmConfig.width + props.cmConfig.height)
        }
      />
    </div>
  );
};
