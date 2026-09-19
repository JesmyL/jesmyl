import { BibleBroadcastScreenCurrentScreen } from '$bible/entities/broadcast-screen/ui/BibleBroadcastCurrentScreen';
import { CmBroadcastSlidesContext } from '$cm/features/broadcast';
import { useCmBroadcastScreenConfig } from '$cm/shared/lib/broadcast';
import { cmIsTrackBroadcastAtom } from '$cm/shared/state';
import { CmBroadcastCurrentComTrackScreen } from '$cm/widgets/broadcast/ui/CurrentComTrackScreen';
import { CmBroadcastCurrentScreen } from '$cm/widgets/broadcast/ui/CurrentScreen';
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import { useAtomValue } from 'atomaric';
import { broadcastCurrentTextAppAtom } from './atoms';
import { useCurrentForceViweAppContext } from './Broadcast.contexts';
import { BroadcastScreenProps } from './Broadcast.model';
import { BroadcastTextScreen } from './BroadcastTextScreen';
import { AlertLineSlideText } from './controls/alert-line/AlertLineSlideText';
import { isShowBroadcastTextAtom, useBroadcastInitialSlideValue } from './initial-slide-context';

export const BroadcastScreen = (props: BroadcastScreenProps) => {
  const app = useAtomValue(broadcastCurrentTextAppAtom);
  const forceViewApp = useCurrentForceViweAppContext();
  const initialSlide = useBroadcastInitialSlideValue();
  const isShowTranslatedText = useAtomValue(isShowBroadcastTextAtom);
  const isTrackBroadcast = useAtomValue(cmIsTrackBroadcastAtom);
  const config = useCmBroadcastScreenConfig(props.configi ?? 0);

  const isShowInitialSlide = !(props.isTech || !initialSlide);

  return (
    <>
      {globalsNode}

      <StyledNextSiblingVisibiliter
        hidden={isShowInitialSlide}
        key="StyledNextSiblingVisibiliter"
        $isShowTranslatedText={isShowTranslatedText && !isShowInitialSlide}
      >
        <BroadcastTextScreen key="BroadcastTextScreen">
          {(forceViewApp ?? props.forceViewApp ?? app) === 'bible' ? (
            <BibleBroadcastScreenCurrentScreen {...props} />
          ) : (
            <CmBroadcastSlidesContext textCase={config?.case}>
              {isTrackBroadcast ? (
                <CmBroadcastCurrentComTrackScreen {...props} />
              ) : (
                <CmBroadcastCurrentScreen {...props} />
              )}
            </CmBroadcastSlidesContext>
          )}
        </BroadcastTextScreen>
      </StyledNextSiblingVisibiliter>

      {isShowInitialSlide && (
        <>
          <StyledBlackBoard
            key="StyledInitialSlide"
            hidden={props.isPreview}
          >
            {initialSlide}
          </StyledBlackBoard>

          {props.isPreview && (
            <StyledInfo
              key="StyledInitialSlide-info"
              className="full-size flex center text-center"
            >
              Начальный слайд закрывается
              <br />
              по клавише Backspace
            </StyledInfo>
          )}
        </>
      )}

      {props.isPreview || <AlertLineSlideText />}
    </>
  );
};

const globalsNode = (
  <Global
    styles={css`
      html {
        background: #000;
      }
    `}
  />
);

const StyledBlackBoard = styled.div`
  background: #000;
  height: 100%;
  width: 100%;
`;

const transparent = 'transparent !important';

const invisibleCss = css`
  *,
  * * {
    color: ${transparent};
    stroke: ${transparent};
    -webkit-text-stroke: ${transparent};
  }
`;

const StyledNextSiblingVisibiliter = styled(StyledBlackBoard)<{ $isShowTranslatedText: boolean }>`
  ${props => props.$isShowTranslatedText || invisibleCss}
`;

const StyledInfo = styled.div`
  + * {
    visibility: hidden;
  }
`;
