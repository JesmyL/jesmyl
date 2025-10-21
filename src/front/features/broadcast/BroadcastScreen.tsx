import { BibleBroadcastScreenCurrentScreen } from '$bible/entities/broadcast-screen/ui/BibleBroadcastCurrentScreen';
import { BibleCurrentTextsContext } from '$bible/shared/state/CurrentTextsContext';
import { BibleTranslatesContextProvider } from '$bible/shared/state/TranslatesContext';
import { CmBroadcastCurrentScreen } from '$cm/widgets/broadcast/ui/CurrentScreen';
import { complectIDB } from '$index/shared/state';
import { useAtomValue } from 'atomaric';
import styled, { css } from 'styled-components';
import { useCurrentForceViweAppContext } from './Broadcast.contexts';
import { BroadcastScreenProps } from './Broadcast.model';
import { BroadcastTextScreen } from './BroadcastTextScreen';
import { AlertLineSlideText } from './controls/alert-line/AlertLineSlideText';
import { isShowTranslatedTextAtom, useBroadcastInitialSlideValue } from './initial-slide-context';

export const BroadcastScreen = (props: BroadcastScreenProps) => {
  const app = complectIDB.useValue.currentBroadcastTextApp();
  const forceViewApp = useCurrentForceViweAppContext();
  const initialSlide = useBroadcastInitialSlideValue();
  const isShowTranslatedText = useAtomValue(isShowTranslatedTextAtom);

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

          {props.isPreview && info}
        </>
      )}

      <StyledNextSiblingVisibiliter
        key="StyledNextSiblingVisibiliter"
        className="full-size"
        $isShowTranslatedText={isShowTranslatedText && !initialSlide}
      >
        <BroadcastTextScreen key="BroadcastTextScreen">
          {(forceViewApp ?? props.forceViewApp ?? app) === 'cm' ? (
            <CmBroadcastCurrentScreen {...props} />
          ) : (
            <BibleTranslatesContextProvider>
              <BibleCurrentTextsContext isPreview={props.isPreview}>
                <BibleBroadcastScreenCurrentScreen {...props} />
              </BibleCurrentTextsContext>
            </BibleTranslatesContextProvider>
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

const info = (
  <StyledInfo
    key="StyledInitialSlide-info"
    className="full-size flex center text-center"
  >
    Начальный слайд закрывается
    <br />
    по клавише Backspace
  </StyledInfo>
);
