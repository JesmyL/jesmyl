import { BibleCurrentTextsContext } from '$bible/basis/contexts/CurrentTextsContext';
import { BibleTranslatesContextProvider } from '$bible/basis/contexts/TranslatesContext';
import { BibleTranslationCurrentScreen } from '$bible/translations/screen/BibleTranslationCurrentScreen';
import { CmTranslationCurrentScreen } from '$cm/translation/complect/controlled/screen/CmTranslationCurrentScreen';
import { useAtomValue } from 'atomaric';
import styled, { css } from 'styled-components';
import { complectIDB } from '../_idb/complectIDB';
import { AlertLineSlideText } from './controls/alert-line/AlertLineSlideText';
import { isShowTranslatedTextAtom, useTranslationInitialSlideValue } from './initial-slide-context';
import { useCurrentForceViweAppContext } from './Translation.contexts';
import { TranslationScreenProps } from './Translations.model';
import { TranslationTextScreen } from './TranslationTextScreen';

export const TranslationScreen = (props: TranslationScreenProps) => {
  const app = complectIDB.useValue.currentTranslationTextApp();
  const forceViewApp = useCurrentForceViweAppContext();
  const initialSlide = useTranslationInitialSlideValue();
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
        <TranslationTextScreen key="TranslationTextScreen">
          {(forceViewApp ?? props.forceViewApp ?? app) === 'cm' ? (
            <CmTranslationCurrentScreen {...props} />
          ) : (
            <BibleTranslatesContextProvider>
              <BibleCurrentTextsContext isPreview={props.isPreview}>
                <BibleTranslationCurrentScreen {...props} />
              </BibleCurrentTextsContext>
            </BibleTranslatesContextProvider>
          )}
        </TranslationTextScreen>
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
