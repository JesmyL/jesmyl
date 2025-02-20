import { complectIDB } from '#basis/idb';
import { TranslationScreenProps } from '#features/translations/model/Translations.model';
import { TranslationTextScreen } from '#features/translations/ui/TranslationTextScreen';
import { AlertLineSlideText } from '#features/translations/ui/alert-line/AlertLineSlideText';
import { useAtomValue } from '#shared/lib/atom';
import styled, { css } from 'styled-components';
import { BibleTranslatesContextProvider } from '../../bible/translates/TranslatesContext';
import { BibleTranslationCurrentScreen } from '../../bible/translations/screen/BibleTranslationCurrentScreen';
import { BibleTranslationScreenTextsContext } from '../../bible/translations/ui/AddressContentContext';
import { CmTranslationCurrentScreen } from '../../cm/translation/complect/controlled/screen/CmTranslationCurrentScreen';
import { useCurrentForceViweAppContext } from './Translation.contexts';
import { isShowTranslatedTextAtom, useTranslationInitialSlideValue } from './atoms';

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
