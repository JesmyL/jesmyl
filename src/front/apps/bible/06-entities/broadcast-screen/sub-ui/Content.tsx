import { BibleBroadcastScreenConfig, useBibleBroadcastScreenScreenStyle } from '$bible/entities/broadcast';
import { verseTranslateTitleCssClassName, verseTranslateTitleCssVariableName } from '$bible/shared/const/ids';
import { useBibleTextContentContext } from '$bible/shared/contexts/texts';
import { useBibleBroadcastScreenFontSizeScreenAdapter } from '$bible/shared/lib';
import styled from 'styled-components';
import '../style/Content.scss';

interface Props {
  screeni: number | und;
  win: Window | und;
  isPreview: boolean | und;
  windowResizeUpdatesNum: number | und;
  bibleConfig: BibleBroadcastScreenConfig | und;
  isVisible: boolean;
}

export function BibleBroadcastScreenContent(props: Props) {
  const screenStyle = useBibleBroadcastScreenScreenStyle(props.isVisible, props.bibleConfig);
  const textContent = useBibleTextContentContext();

  const [screenWrapperRef, screenContentRef] = useBibleBroadcastScreenFontSizeScreenAdapter(
    textContent,
    props.bibleConfig,
    props.windowResizeUpdatesNum,
  );

  return (
    <>
      <StyledVerseText
        className="bible-tag-controled-content absolute flex center"
        style={screenStyle}
        ref={screenWrapperRef}
      >
        <span
          className="opacity-0"
          ref={screenContentRef}
          dangerouslySetInnerHTML={{ __html: textContent }}
        />
      </StyledVerseText>
    </>
  );
}

const StyledVerseText = styled.div`
  .${verseTranslateTitleCssClassName} {
    color: var(${verseTranslateTitleCssVariableName});
  }
`;
