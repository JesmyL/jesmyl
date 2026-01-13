import { BroadcastScreenProps } from '#features/broadcast/Broadcast.model';
import { ScreenTranslateCurrentPositionConfigurators } from '#features/broadcast/complect/position/Position';
import { useSetBroadcastScreenInteractiveBackground } from '#features/broadcast/hooks/interactive-back';
import { useApplyScreenFontFamilyEffect } from '#features/broadcast/hooks/set-font-family';
import { HorizontalDirection } from '#shared/model/Direction';
import { FontSizeContain } from '#shared/ui/font-size-contain/FontSizeContain';
import { FontSizeContainProps } from '#shared/ui/font-size-contain/FontSizeContain.model';
import { cmBroadcastSwitchBlockDirectionAtom } from '$cm/entities/broadcast';
import { useAtomValue } from 'atomaric';
import { useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
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
    isTechnicalText?: boolean;
    isNextTechnicalText?: boolean;
    isChorded: boolean;
    isNextChorded: boolean;
  };

export const CmBroadcastScreen = (props: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const switchDirection = useAtomValue(cmBroadcastSwitchBlockDirectionAtom);

  const style = useCmBroadcastScreenStyle(
    props.isVisible,
    props.isChorded ? (props.cmConfig?.subs?.chorded ?? props.cmConfig) : props.cmConfig,
  );

  const wrapperStyle = useCmBroadcastScreenWrapperStyle(props.cmConfig);
  const background = useSetBroadcastScreenInteractiveBackground(
    props.cmConfig?.isWithBackground ? props.cmConfig.backgroundInteractive : undefined,
  );

  useApplyScreenFontFamilyEffect(props.cmConfig?.fontFamily, props.win);
  let nextSlideNode = null;

  if (props.cmConfig?.subs?.next !== undefined) {
    nextSlideNode = (
      <CmBroadcastSubScreen
        config={
          props.isNextChorded
            ? props.cmConfig.subs.chorded
              ? { ...props.cmConfig.subs.next, ...props.cmConfig.subs.chorded }
              : props.cmConfig.subs.next
            : props.cmConfig.subs.next
        }
        win={props.win}
        subUpdates={props.subUpdates}
        text={props.nextText}
        wrapperRef={wrapperRef}
        isTech={props.isTech}
        parentConfig={props.cmConfig}
        isVisible={props.isVisible}
        isTechnicalText={props.isNextTechnicalText}
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
      {nextSlideNode}
      <StyledFontSizeContain
        key={props.text + switchDirection}
        $dir={switchDirection}
        className="inline-flex white-pre-children"
        style={props.isTechnicalText ? { ...style, opacity: Math.min(+(style.opacity || 1) || 1, 0.3) } : style}
        html={props.text}
        subUpdates={`${props.subUpdates}${props.cmConfig == null ? '' : props.cmConfig.width + props.cmConfig.height}`}
      />
    </div>
  );
};

const anims = [1, -1].map(
  num =>
    keyframes`${css`
      from {
        opacity: 0.1;
        transform: translate(${num}vw, 0);
      }

      to {
        opacity: 1;
        transform: translate(0, 0);
      }
    `}`,
) as never as ['', '', ''];

const StyledFontSizeContain = styled(FontSizeContain)<{ $dir: HorizontalDirection }>`
  animation: ${props => anims[props.$dir]} 0.5s ease-in-out;
`;
