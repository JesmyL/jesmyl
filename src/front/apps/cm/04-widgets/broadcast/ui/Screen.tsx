import { BroadcastScreenProps } from '#features/broadcast/Broadcast.model';
import { ScreenTranslateCurrentPositionConfigurators } from '#features/broadcast/complect/position/Position';
import { useSetBroadcastScreenInteractiveBackground } from '#features/broadcast/hooks/interactive-back';
import { useApplyScreenFontFamilyEffect } from '#features/broadcast/hooks/set-font-family';
import { mylib } from '#shared/lib/my-lib';
import { HorizontalDirection } from '#shared/model/Direction';
import { FontSizeContain } from '#shared/ui/font-size-contain/FontSizeContain';
import { FontSizeContainProps } from '#shared/ui/font-size-contain/FontSizeContain.model';
import { CmBroadcastShowChordedSlideMode } from '$cm/shared/model';
import { cmShowChordedSlideModeAtom } from '$cm/shared/state';
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
    text: string | string[];
    nextText: string;
    isVisible: boolean;
    isTechnicalText?: boolean;
    isNextTechnicalText?: boolean;
    isChorded: boolean;
    isNextChorded: boolean;
    freshSlideKey: string;
    slideSwitchDir: HorizontalDirection;
  };

export const CmBroadcastScreen = (props: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const showChordedSlideMode = useAtomValue(cmShowChordedSlideModeAtom);
  const isBlindMode = showChordedSlideMode === CmBroadcastShowChordedSlideMode.Blind;

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
        text={isBlindMode && props.isNextChorded ? '' : props.nextText}
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
      className="relative full-size bg-black overflow-hidden"
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
        key={props.freshSlideKey}
        className="inline-flex white-pre-children"
        style={{
          ['--direction' as 'left']: props.slideSwitchDir,
          ...style,
          opacity: props.isTechnicalText ? Math.min(+(style.opacity || 1) || 1, 0.3) : style.opacity,
        }}
        html={(isBlindMode && props.isChorded) || mylib.isArr(props.text) ? undefined : props.text}
        content={
          mylib.isArr(props.text)
            ? props.text.map((line, linei) => (
                <div
                  key={linei}
                  className="fragmented-slide-line"
                  fragmented-slide-linei={linei}
                  dangerouslySetInnerHTML={{ __html: line }}
                />
              ))
            : undefined
        }
        subUpdates={`${props.subUpdates}${props.cmConfig == null ? '' : props.cmConfig.width + props.cmConfig.height}`}
      />
    </div>
  );
};

const simpleAnimation = keyframes`${css`
  from {
    opacity: 0.1;
    transform: translate(calc(var(--direction) * 1vw), 0);
  }

  to {
    opacity: 1;
    transform: translate(0, 0);
  }
`}`;

const lineEnterAnimation = keyframes`${css`
  from {
    opacity: 0.1;
  }

  to {
    opacity: 1;
  }
`}`;

const lineFlyAnimation = keyframes`${css`
  from {
    translate: calc(var(--direction) * -1vw) 0;
  }

  to {
    translate: calc(var(--direction) * 1vw) 0;
  }
`}`;

const StyledFontSizeContain = styled(FontSizeContain)`
  line-height: 1;

  &:not(:has(.fragmented-slide-line)) {
    animation: ${simpleAnimation} 0.5s ease-in-out;
  }

  &:has(.fragmented-slide-line) {
    scale: 0.5;

    .fragmented-slide-line {
      translate: calc(var(--direction) * 1vw) 0;
      animation:
        ${lineEnterAnimation} 0.3s linear forwards,
        ${lineFlyAnimation} 60s linear forwards;
    }

    [fragmented-slide-linei='0'] {
      --direction: 1;

      text-align: left;
    }

    [fragmented-slide-linei='1'] {
      --direction: -1;

      text-align: right;
    }
  }
`;
