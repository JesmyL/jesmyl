import BibleTranslatesContextProvider from '#basis/lib/contexts/bible/TranslatesContext';
import { useCurrentForceViweAppContext } from '#basis/lib/contexts/CurrentForceViweAppContext';
import { complectIDB } from '#basis/lib/idb/complect';
import { useAtomValue } from 'front/08-shared/lib/atoms';
import styled, { css } from 'styled-components';
import { TranslationScreenProps } from '../../../../07-basis/model/Translations.model';
import { BibleTranslationScreenTextsContext } from '../../bible/texts/AddressContentContext';
import BibleTranslationCurrentScreen from '../../bible/translations/screen/BibleTranslationCurrentScreen';
import { CmTranslationCurrentScreen } from '../../cm/translation/complect/controlled/screen/CmTranslationCurrentScreen';
import { AlertLineSlideText } from './controls/alert-line/AlertLineSlideText';
import { isShowTranslatedTextAtom, useTranslationInitialSlideValue } from './initial-slide-context';
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
              <BibleTranslationScreenTextsContext isPreview={props.isPreview}>
                <BibleTranslationCurrentScreen {...props} />
              </BibleTranslationScreenTextsContext>
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
