import { useBibleBroadcastScreenScreenStyle } from '$bible/entities/broadcast';
import { BibleBroadcastTextMapBlocks } from '$bible/features/BroadcastTextMapBlocks';
import { bibleTagControledContentGlobalCssNode } from '$bible/shared/const/bibleTagControledContentGlobalCssNode';
import { useBibleTextMapBlocksContentContext } from '$bible/shared/contexts/texts';
import { useBibleBroadcastScreenFontSizeScreenAdapter } from '$bible/shared/lib';
import { BibleBroadcastScreenConfig } from 'shared/model/bible/broadcast';

interface Props {
  configi: number | und;
  win: Window | und;
  isPreview: boolean | und;
  windowResizeUpdatesNum: number | und;
  bibleConfig: BibleBroadcastScreenConfig | und;
  isVisible: boolean;
}

export function BibleBroadcastScreenContent(props: Props) {
  const screenStyle = useBibleBroadcastScreenScreenStyle(props.isVisible, props.bibleConfig);
  const texts = useBibleTextMapBlocksContentContext();

  const [screenWrapperRef, screenContentRef] = useBibleBroadcastScreenFontSizeScreenAdapter(
    texts.map(it => `${it.head}/${it.texts.map(({ text, address }) => `${address}|${text}`)}`).join(''),
    props.bibleConfig,
    props.windowResizeUpdatesNum,
  );

  return (
    <>
      {bibleTagControledContentGlobalCssNode}
      <div
        className="bible-tag-controled-content absolute flex center"
        style={screenStyle}
        ref={screenWrapperRef}
      >
        <div
          className="opacity-0"
          ref={screenContentRef}
        >
          <BibleBroadcastTextMapBlocks blocks={texts} />
        </div>
      </div>
    </>
  );
}
