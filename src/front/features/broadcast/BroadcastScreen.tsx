import { BibleBroadcastScreenCurrentScreen } from '$bible/entities/broadcast-screen/ui/BibleBroadcastCurrentScreen';
import { BibleCurrentTextsContext } from '$bible/shared/state/CurrentTextsContext';
import { BibleTranslatesContextProvider } from '$bible/shared/state/TranslatesContext';
import { cmIsTrackBroadcastAtom } from '$cm/shared/state';
import { CmBroadcastCurrentComTrackScreen } from '$cm/widgets/broadcast/ui/CurrentComTrackScreen';
import { CmBroadcastCurrentScreen } from '$cm/widgets/broadcast/ui/CurrentScreen';
import { useAtomValue } from 'atomaric';
import styled, { css } from 'styled-components';
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

  return (
    <>
      {initialSlide && (
        <>
          <StyledInitialSlide
            key="StyledInitialSlide"
            className="full-size"
            hidden={props.isPreview}
          >
            {initialSlide}
          </StyledInitialSlide>

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

      <StyledNextSiblingVisibiliter
        key="StyledNextSiblingVisibiliter"
        className="full-size"
        $isShowTranslatedText={isShowTranslatedText && !initialSlide}
      >
        <BroadcastTextScreen key="BroadcastTextScreen">
          {(forceViewApp ?? props.forceViewApp ?? app) === 'bible' ? (
            <BibleTranslatesContextProvider>
              <BibleCurrentTextsContext isPreview={props.isPreview}>
                <BibleBroadcastScreenCurrentScreen {...props} />
              </BibleCurrentTextsContext>
            </BibleTranslatesContextProvider>
          ) : isTrackBroadcast ? (
            <CmBroadcastCurrentComTrackScreen {...props} />
          ) : (
            <CmBroadcastCurrentScreen {...props} />
          )}
        </BroadcastTextScreen>
      </StyledNextSiblingVisibiliter>

      {props.isPreview || <AlertLineSlideText />}
    </>
  );
};

const StyledNextSiblingVisibiliter = styled.div<{ $isShowTranslatedText: boolean }>`
  background-color: black;

  ${props =>
    !props.$isShowTranslatedText &&
    css`
      *,
      * * {
        color: transparent !important;
      }
    `}
`;

const StyledInitialSlide = styled.div`
  background-color: black;
`;

const StyledInfo = styled.div`
  + * {
    visibility: hidden;
  }
`;
