import styled from 'styled-components';
import { verseTranslateTitleCssClassName, verseTranslateTitleCssVariableName } from '../../complect';
import { useBibleScreenTranslationFontSizeScreenAdapter } from '../../hooks/font-size-adapter/screen-adapter';
import { useGetBibleScreenTranslationScreenStyle } from '../../hooks/styles/screen-style';
import { BibleTranslationScreenConfig } from '../../model';
import { useBibleTextContentContext } from '../../ui/AddressContentContext';
import './Content.scss';

interface Props {
  screeni: number | und;
  win: Window | und;
  isPreview: boolean | und;
  windowResizeUpdatesNum: number | und;
  bibleConfig: BibleTranslationScreenConfig | und;
  isVisible: boolean;
}

export const BibleTranslationScreenContent = (props: Props) => {
  const screenStyle = useGetBibleScreenTranslationScreenStyle(props.isVisible, props.bibleConfig);
  const textContent = useBibleTextContentContext();

  const [screenWrapperRef, screenContentRef] = useBibleScreenTranslationFontSizeScreenAdapter(
    textContent,
    props.bibleConfig,
    props.windowResizeUpdatesNum,
  );

  return (
    <>
      <StyledVerseText
        className="bible-translation-screen-content absolute flex center"
        style={screenStyle}
        ref={screenWrapperRef}
      >
        <span
          className="fade-00"
          ref={screenContentRef}
          dangerouslySetInnerHTML={{ __html: textContent }}
        />
      </StyledVerseText>
    </>
  );
};

const StyledVerseText = styled.div`
  .${verseTranslateTitleCssClassName} {
    color: var(${verseTranslateTitleCssVariableName});
  }
`;
